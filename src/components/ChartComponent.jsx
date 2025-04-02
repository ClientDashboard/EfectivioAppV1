// src/components/ChartComponent.jsx
import React from 'react';
import PropTypes from 'prop-types';

// This is a simplified chart component that won't cause type errors
const ChartComponent = ({ type, data, title, config }) => {
  // Type can be 'pie', 'bar', 'line', etc.
  
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <div className="chart-placeholder" style={{ 
        height: '200px', 
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px dashed #ccc',
        borderRadius: '8px',
        marginTop: '8px'
      }}>
        <p>Chart: {type} with {data.length} data points</p>
      </div>
      <div className="chart-legend" style={{ marginTop: '10px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: getColor(index), 
              marginRight: '6px',
              borderRadius: '2px'
            }}></div>
            <span>{item[config?.labelKey || 'category']}: {item[config?.valueKey || 'amount']}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate colors for chart segments
function getColor(index) {
  const colors = [
    '#4285F4', '#EA4335', '#FBBC05', '#34A853', 
    '#FF6D01', '#46BDC6', '#9900EF', '#00C49F',
    '#FFBB28', '#FF8042', '#0088FE', '#00C49F'
  ];
  
  return colors[index % colors.length];
}

ChartComponent.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  config: PropTypes.shape({
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    formatValue: PropTypes.func,
    // Add other config properties as needed
    formatYLabel: PropTypes.func
  })
};

ChartComponent.defaultProps = {
  type: 'bar',
  title: 'Chart',
  config: {
    labelKey: 'category',
    valueKey: 'amount'
  }
};

export default ChartComponent;