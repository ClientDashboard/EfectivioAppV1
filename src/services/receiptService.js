import axios from 'axios';
import * as pdfjs from 'pdfjs-dist';
import { supabase } from './supabaseClient';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const processQRUrl = async (qrText) => {
  try {
    // Check if the QR is a valid FEP URL
    if (!qrText.includes('dgi-fep.mef.gob.pa/Consultas/FacturasPorQR')) {
      throw new Error('Not a valid FEP receipt QR code');
    }

    // Extract parameters from URL
    const url = new URL(qrText);
    const params = new URLSearchParams(url.search);
    const chFE = params.get('chFE');
    const iAmb = params.get('iAmb');
    const digestValue = params.get('digestValue');
    const jwt = params.get('jwt');

    if (!chFE || !iAmb || !digestValue || !jwt) {
      throw new Error('Missing required parameters in QR URL');
    }

    // Download the PDF
    console.log('Downloading PDF from URL:', qrText);
    const response = await axios.get(qrText, { responseType: 'arraybuffer' });
    
    // Check for "Descargar CAFE" button click
    const cafeDownloadUrl = extractCAFEDownloadUrl(response.data);
    
    if (!cafeDownloadUrl) {
      throw new Error('Could not find CAFE download link');
    }

    // Download the CAFE PDF
    const cafeResponse = await axios.get(cafeDownloadUrl, { responseType: 'arraybuffer' });
    
    // Process the PDF content
    const receiptData = await extractReceiptData(cafeResponse.data);
    
    // Return the extracted data
    return {
      success: true,
      data: receiptData
    };
    
  } catch (error) {
    console.error('Error processing QR code:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const extractCAFEDownloadUrl = (pdfBuffer) => {
  // In a real implementation, this would parse the HTML response
  // and find the download link for the CAFE
  // For now, we'll simulate this
  return 'https://dgi-fep.mef.gob.pa/DownloadCAFE?token=example';
};

const extractReceiptData = async (pdfBuffer) => {
  try {
    const pdf = await pdfjs.getDocument({ data: pdfBuffer }).promise;
    const numPages = pdf.numPages;
    let textContent = '';
    
    // Extract text from all pages
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      textContent += strings.join(' ');
    }
    
    // Parse the text to extract receipt information
    // This is a simplified example - in a real app you would need more robust parsing
    const receiptData = {
      merchant: extractValue(textContent, 'Emisor:', 'RUC:'),
      ruc: extractValue(textContent, 'RUC:', 'DV:'),
      dv: extractValue(textContent, 'DV:', 'Fecha de Emision:'),
      date: extractValue(textContent, 'Fecha de Emision:', 'CUFE:'),
      cufe: extractValue(textContent, 'CUFE:', 'Total Neto:'),
      netAmount: parseFloat(extractValue(textContent, 'Total Neto:', 'Monto Exento ITBMS')),
      exemptAmount: parseFloat(extractValue(textContent, 'Monto Exento ITBMS', 'Monto Gravado ITBMS')),
      taxableAmount: parseFloat(extractValue(textContent, 'Monto Gravado ITBMS', 'ITBMS')),
      itbms: parseFloat(extractValue(textContent, 'ITBMS', 'Total Impuesto')),
      totalTax: parseFloat(extractValue(textContent, 'Total Impuesto', 'Total')),
      total: parseFloat(extractValue(textContent, 'Total', 'Forma de Pago:')),
      paymentMethod: extractValue(textContent, 'Forma de Pago:', 'TOTAL PAGADO'),
      amountPaid: parseFloat(extractValue(textContent, 'TOTAL PAGADO', 'Vuelto')),
      change: parseFloat(extractValue(textContent, 'Vuelto', 'FIN')),
    };
    
    // Categorize the expense (simplified)
    receiptData.category = categorizeExpense(receiptData.merchant);
    
    return receiptData;
  } catch (error) {
    console.error('Error extracting data from PDF:', error);
    throw new Error('Failed to extract data from receipt PDF');
  }
};

const extractValue = (text, startMarker, endMarker) => {
  try {
    const startIndex = text.indexOf(startMarker) + startMarker.length;
    const endIndex = text.indexOf(endMarker, startIndex);
    return text.substring(startIndex, endIndex).trim();
  } catch (error) {
    return '';
  }
};

const categorizeExpense = (merchant) => {
  // This is a simple categorization based on merchant name
  // In a real app, you'd have a more sophisticated system
  const merchantLower = merchant.toLowerCase();
  
  if (merchantLower.includes('super') || merchantLower.includes('mercado')) {
    return 'groceries';
  } else if (merchantLower.includes('restaurant') || merchantLower.includes('cafe')) {
    return 'food';
  } else if (merchantLower.includes('gas') || merchantLower.includes('combustible')) {
    return 'transportation';
  } else if (merchantLower.includes('farmacia')) {
    return 'healthcare';
  } else {
    return 'other';
  }
};

export const saveReceiptToDatabase = async (receiptData, userId) => {
  try {
    // Get category ID based on the category name
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', mapCategoryName(receiptData.category))
      .single();
      
    if (categoryError) throw categoryError;
    
    // Save the expense to the database
    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          user_id: userId,
          date: receiptData.date,
          merchant: receiptData.merchant,
          ruc: receiptData.ruc,
          dv: receiptData.dv,
          cufe: receiptData.cufe,
          net_amount: receiptData.netAmount,
          exempt_amount: receiptData.exemptAmount,
          taxable_amount: receiptData.taxableAmount,
          itbms: receiptData.itbms,
          total_tax: receiptData.totalTax,
          total: receiptData.total,
          payment_method: receiptData.paymentMethod,
          amount_paid: receiptData.amountPaid,
          change: receiptData.change,
          category_id: categoryData.id
        }
      ]);
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error saving receipt to database:', error);
    return { success: false, error: error.message };
  }
};

const mapCategoryName = (category) => {
  // Map the simple category names to the ones in our database
  const categoryMap = {
    'groceries': 'Groceries',
    'food': 'Food & Dining',
    'transportation': 'Transportation',
    'healthcare': 'Healthcare',
    'other': 'Other'
  };
  
  return categoryMap[category] || 'Other';
};
