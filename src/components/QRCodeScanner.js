import React, { useState } from 'react';
import { QrScanner } from 'react-qr-scanner';
import { supabase } from '../services/supabaseClient';

const QRCodeScanner = () => {
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('');

  const handleScan = async (data) => {
    if (data && data.text) {
      setScanning(false);
      setScanResult(data.text);
      setProcessingStatus('QR code detected. Processing...');
      
      try {
        // Extract URL from QR code
        const url = data.text;
        if (url.includes('dgi-fep.mef.gob.pa/Consultas/FacturasPorQR')) {
          setProcessingStatus('Valid receipt URL detected. Fetching data...');
          await processReceiptUrl(url);
        } else {
          setProcessingStatus('Not a valid receipt QR code.');
        }
      } catch (error) {
        console.error('Error processing QR code:', error);
        setProcessingStatus('Error: ' + error.message);
      }
    }
  };

  const processReceiptUrl = async (url) => {
    try {
      setProcessingStatus('Fetching receipt page...');
      
      // This should be a server-side function to avoid CORS issues
      // For demo purposes we're simulating the response
      setProcessingStatus('Extracting PDF link...');
      
      // Simulate PDF data extraction
      const receiptData = {
        emisor: 'Example Store',
        totalNeto: '100.00',
        montoExento: '0.00',
        montoGravado: '100.00',
        itbms: '7.00',
        totalImpuesto: '7.00',
        total: '107.00',
        pdfUrl: 'https://example.com/receipt.pdf',
        date: new Date().toISOString()
      };
      
      setProcessingStatus('Saving to database...');
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('expenses')
        .insert([receiptData]);
        
      if (error) throw error;
      
      setProcessingStatus('Receipt saved successfully!');
      
    } catch (error) {
      console.error('Error processing receipt:', error);
      setProcessingStatus('Error: ' + error.message);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setProcessingStatus('Error: ' + err.message);
  };

  const resetScanner = () => {
    setScanResult(null);
    setProcessingStatus('');
    setScanning(true);
  };

  return (
    <div className="qr-scanner-container">
      <h2>Scan Receipt QR Code</h2>
      
      {scanning && (
        <div className="scanner">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <p>Position the QR code in the center of the screen</p>
        </div>
      )}
      
      {scanResult && (
        <div className="result">
          <h3>Result:</h3>
          <p>{processingStatus}</p>
          <button onClick={resetScanner}>Scan Another</button>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
