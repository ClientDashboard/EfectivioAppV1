import React, { useState } from 'react';
import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel,
  IonText
} from '@ionic/react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Reusable chart component for visualizing data with different chart types
 * 
 * @param {string} type - Chart type ('pie', 'bar', 'line')
 * @param {Array} data - Data for the chart
 * @param {string} title - Chart title
 * @param {Object} config - Additional configuration options
 */
const ChartComponent = ({ 
  type = 'bar', 
  data = [], 
  title = 'Chart', 
  config = {} 
}) => {
  const { t } = useLanguage();
  const [chartType, setChartType] = useState(type);
  
  // Check if data is empty
  if (!data || data.length === 0) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '220px' }}>
          <IonText color="medium">{t('No data available')}</IonText>
        </IonCardContent>
      </IonCard>
    );
  }

  // Colors for chart elements
  const COLORS = [
    '#1976d2', '#2196f3', '#64b5f6', '#90caf9', '#bbdefb',
    '#0097a7', '#00bcd4', '#4dd0e1', '#80deea', '#b2ebf2',
    '#388e3c', '#4caf50', '#66bb6a', '#81c784', '#a5d6a7',
  ];

  // Format for pie chart data - expects objects with name and value
  const getPieChartData = () => {
    return data.map((item) => {
      return {
        name: item[config.labelKey || 'name'] || '',
        value: parseFloat(item[config.valueKey || 'value'] || 0),
      };
    });
  };

  // Format for line and bar chart data - expects arrays of labels and datasets
  const getChartData = () => {
    return data.map(item => {
      const label = item[config.labelKey || 'name'] || '';
      const trimmedLabel = label.length > 10 ? label.substring(0, 10) + '...' : label;
      
      const chartDataObj = {
        name: trimmedLabel,
        value: parseFloat(item[config.valueKey || 'value'] || 0)
      };
      
      // Support for multiple datasets
      if (config.dataKeys) {
        config.dataKeys.forEach(key => {
          chartDataObj[key] = parseFloat(item[key] || 0);
        });
      }
      
      return chartDataObj;
    });
  };

  // Render different chart types
  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={getPieChartData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {getPieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatValue(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={getChartData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatValue(value)} />
              <Legend />
              {config.dataKeys ? (
                config.dataKeys.map((key, index) => (
                  <Line 
                    key={key}
                    type="monotone" 
                    dataKey={key} 
                    stroke={COLORS[index % COLORS.length]} 
                    activeDot={{ r: 8 }} 
                  />
                ))
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1976d2" 
                  activeDot={{ r: 8 }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
      default:
        return (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={getChartData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatValue(value)} />
              <Legend />
              {config.dataKeys ? (
                config.dataKeys.map((key, index) => (
                  <Bar 
                    key={key}
                    dataKey={key} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))
              ) : (
                <Bar dataKey="value" fill="#1976d2" />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  // Format value with suffix if provided
  const formatValue = (value) => {
    if (config.formatValue) {
      return config.formatValue(value);
    }
    if (config.yAxisSuffix) {
      return `${value}${config.yAxisSuffix}`;
    }
    return value;
  };

  return (
    <IonCard>
      <IonCardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IonCardTitle>{title}</IonCardTitle>
          <IonSegment value={chartType} onIonChange={e => setChartType(e.detail.value)}>
            <IonSegmentButton value="bar">
              <IonLabel>{t('Bar')}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="line">
              <IonLabel>{t('Line')}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="pie">
              <IonLabel>{t('Pie')}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
      </IonCardHeader>
      <IonCardContent>
        {renderChart()}
      </IonCardContent>
    </IonCard>
  );
};

ChartComponent.propTypes = {
  type: PropTypes.oneOf(['bar', 'line', 'pie']),
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  config: PropTypes.shape({
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    dataKeys: PropTypes.arrayOf(PropTypes.string),
    yAxisSuffix: PropTypes.string,
    formatValue: PropTypes.func
  })
};

export default ChartComponent;