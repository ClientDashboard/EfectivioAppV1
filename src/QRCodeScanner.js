import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useZxing } from 'react-zxing';
import { Camera } from '@capacitor/camera';
import { supabase } from '../services/supabaseClient';
import './QRCodeScanner.css';

const QRCodeScanner = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [scanning, setScanning] = useState(false);

  const { ref } = useZxing({
    onDecodeResult(decodedResult) {
      const qrText = decodedResult.getText();
      processQRCode(qrText);
    },
    timeBetweenDecodingAttempts: 300,
  });

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      await Camera.requestPermissions();
      setScanning(true);
    } catch (error) {
      setError('Error getting camera permission');
    }
  };

  const fetchReceiptPage = async (url) => {
    try {
      const response = await fetch(url);
      const pageHtml = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(pageHtml, "text/html");
      const downloadButton = doc.querySelector("a[href*='pdf']");
      return downloadButton ? downloadButton.href : null;
    } catch (error) {
      return null;
    }
  };

  const processQRCode = async (qrText) => {
    if (!qrText.includes('dgi-fep.mef.gob.pa/Consultas/FacturasPorQR')) {
      setError('Invalid QR code. Not a valid receipt.');
      return;
    }

    setProcessing(true);
    const pdfUrl = await fetchReceiptPage(qrText);
    if (!pdfUrl) {
      setError('Failed to retrieve PDF link');
      setProcessing(false);
      return;
    }

    console.log("PDF URL:", pdfUrl);
    setProcessing(false);
  };

  return (
    <div>
      <video ref={ref} style={{ width: '100%' }} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default QRCodeScanner;

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return data.user?.id;
};

const saveExpenseToSupabase = async (receiptData) => {
  const userId = await getUser();
  if (!userId) {
    console.error("No user logged in, cannot save expense.");
    return;
  }

  const { error } = await supabase
    .from('expenses')
    .insert([
      {
        user_id: userId, // Associate expense with the logged-in user
        emisor: receiptData.emisor,
        total_neto: receiptData.totalNeto,
        monto_exento: receiptData.montoExento,
        monto_gravado: receiptData.montoGravado,
        itbms: receiptData.itbms,
        total_impuesto: receiptData.totalImpuesto,
        total: receiptData.total,
        pdf_link: receiptData.pdfUrl
      }
    ]);

  if (error) {
    console.error("Error saving receipt:", error);
  } else {
    console.log("Receipt saved successfully!");
  }
};
