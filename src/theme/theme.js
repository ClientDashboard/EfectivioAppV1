// src/theme/theme.js
export const theme = {
    colors: {
      primary: '#062644',
      accent: '#39FFBD',
      background: '#FFFFFF',
      surface: '#FFFFFF',
      text: '#071C2B',
      error: '#FF6B6B',
      success: '#4CAF50',
      // Additional colors for easy reference
      secondary: '#39FFBD',
      danger: '#FF6B6B',
      warning: '#FFC107',
      info: '#2196F3',
      light: '#F5F5F5',
      dark: '#212121',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      round: '50%',
    },
    // Add other theme properties as needed
  };
  
  // Helper function to get color with optional opacity
  export const getColorWithOpacity = (colorName, opacity = 1) => {
    const color = theme.colors[colorName];
    if (!color) return '';
    
    // If it's already an rgba color
    if (color.startsWith('rgba')) {
      return color.replace(/rgba\((.+?)\)/, `rgba($1, ${opacity})`);
    }
    
    // If it's a hex color
    if (color.startsWith('#')) {
      let r = 0, g = 0, b = 0;
      
      if (color.length === 4) {
        r = parseInt(color[1] + color[1], 16);
        g = parseInt(color[2] + color[2], 16);
        b = parseInt(color[3] + color[3], 16);
      } else if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
      }
      
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return color;
  };