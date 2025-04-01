import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRCodeScanner = () => {
  const [scanning, setScanning] = useState(true);
  const [status, setStatus] = useState('Ready to scan receipts');
  const [processingSteps, setProcessingSteps] = useState([]);
  const navigate = useNavigate();
  
  // Simulate a scan for demonstration purposes
  const simulateScan = () => {
    setScanning(false);
    setStatus('Processing QR code...');
    setProcessingSteps(['Detected QR code']);
    
    // Simulate processing steps
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, 'Extracting URL from QR code']);
      setStatus('Extracting URL...');
    }, 1000);
    
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, 'Accessing receipt webpage']);
      setStatus('Accessing receipt webpage...');
    }, 2000);
    
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, 'Finding "Descargar CAFE" button']);
      setStatus('Finding "Descargar CAFE" button...');
    }, 3000);
    
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, 'Downloading PDF']);
      setStatus('Downloading PDF...');
    }, 4000);
    
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, 'Extracting receipt data']);
      setStatus('Extracting receipt data...');
    }, 5000);
    
    setTimeout(() => {
      setProcessingSteps(prev => [...prev, 'Saving to expense list']);
      setStatus('Saved to expenses!');
    }, 6000);
    
    // Simulate navigation to the new expense
    setTimeout(() => {
      navigate('/expenses/1');
    }, 7000);
  };
  
  return (
    <div className="main-content">
      <div className="scanner-container">
        <div className="scanner-frame">
          {/* Camera view would be here with react-qr-scanner */}
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888',
              flexDirection: 'column'
            }}
            onClick={simulateScan}
          >
            {scanning ? (
              <>
                <i className="fi fi-br-qr-scan" style={{ fontSize: '48px', marginBottom: '10px' }}></i>
                <div>Point camera at QR code</div>
                <div style={{ fontSize: '12px', marginTop: '10px' }}>(Tap to simulate scan)</div>
              </>
            ) : (
              <div className="processing-animation">
                <div className="spinner"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="scanner-status">
          <h3 className="status-title">Scanner Status</h3>
          <p className="status-message">{status}</p>
          
          {processingSteps.length > 0 && (
            <div className="processing-steps">
              {processingSteps.map((step, index) => (
                <div key={index} className="processing-step">
                  <i className="fi fi-ss-check"></i> {step}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
