import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample data - in a real app this would come from your API/database
  const expenseData = {
    id: parseInt(id),
    name: 'Super 99',
    category: 'Groceries',
    date: '03/10/2025',
    amount: 45.67,
    emisor: 'Super 99, S.A.',
    totalNeto: 42.68,
    montoExentoITBMS: 0.00,
    montoGravadoITBMS: 42.68,
    itbms: 2.99,
    totalImpuesto: 2.99,
    total: 45.67,
    pdfUrl: 'https://example.com/receipt.pdf'
  };
  
  // Use different data based on the ID
  if (id === '2') {
    expenseData.name = 'Farmacia Arrocha';
    expenseData.category = 'Healthcare';
    expenseData.date = '03/08/2025';
    expenseData.amount = 32.15;
    expenseData.emisor = 'Farmacia Arrocha, S.A.';
    expenseData.totalNeto = 30.05;
    expenseData.montoExentoITBMS = 15.00;
    expenseData.montoGravadoITBMS = 15.05;
    expenseData.itbms = 2.10;
    expenseData.totalImpuesto = 2.10;
    expenseData.total = 32.15;
  } else if (id === '3') {
    expenseData.name = 'Esso Gas Station';
    expenseData.category = 'Transportation';
    expenseData.date = '03/05/2025';
    expenseData.amount = 28.50;
    expenseData.emisor = 'Esso Panamá, S.A.';
    expenseData.totalNeto = 26.64;
    expenseData.montoExentoITBMS = 0.00;
    expenseData.montoGravadoITBMS = 26.64;
    expenseData.itbms = 1.86;
    expenseData.totalImpuesto = 1.86;
    expenseData.total = 28.50;
  }
  
  return (
    <div className="main-content">
      <div className="expense-detail">
        <div className="expense-header">
          <button 
            className="back-button"
            onClick={() => navigate('/expenses')}
          >
            <i className="fi fi-rr-arrow-left"></i> Back
          </button>
          
          <h2 className="expense-title">{expenseData.name}</h2>
          <div className="expense-meta">
            {expenseData.category} • {expenseData.date}
          </div>
        </div>
        
        {/* Remove the blue block, no summary here */}
        
        <div className="expense-details-section">
          <h3 className="section-title">Receipt Details</h3>
          
          <div className="detail-table">
            <div className="detail-row">
              <div className="detail-label">Emisor</div>
              <div className="detail-value">{expenseData.emisor}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Total Neto</div>
              <div className="detail-value">${expenseData.totalNeto.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Monto Exento ITBMS</div>
              <div className="detail-value">${expenseData.montoExentoITBMS.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Monto Gravado ITBMS</div>
              <div className="detail-value">${expenseData.montoGravadoITBMS.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">ITBMS</div>
              <div className="detail-value">${expenseData.itbms.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Total Impuesto</div>
              <div className="detail-value">${expenseData.totalImpuesto.toFixed(2)}</div>
            </div>
            
            <div className="detail-row total-row">
              <div className="detail-label">Total</div>
              <div className="detail-value">${expenseData.total.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="action-buttons">
            <a href={expenseData.pdfUrl} target="_blank" rel="noopener noreferrer" className="view-pdf-button">
              <i className="fi fi-rr-file-pdf"></i> View CAFE PDF
            </a>
            
            <button className="share-button">
              <i className="fi fi-rr-share"></i> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetail;
