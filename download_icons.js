// This is a placeholder script. In a real implementation, you'd download the actual Flaticon Uicons here.
// For now, we'll create placeholder SVG files for the icons we need

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'public/icons/uicons');

// Create directory if it doesn't exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Create simple SVG icons
const icons = [
  { name: 'fi-rr-home.svg', paths: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { name: 'fi-rr-receipt.svg', paths: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z' },
  { name: 'fi-rr-qr-scan.svg', paths: 'M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3z' },
  { name: 'fi-rr-user.svg', paths: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { name: 'fi-rr-angle-right.svg', paths: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' }
];

// Save SVG files
icons.forEach(icon => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="${icon.paths}" fill="currentColor" />
    </svg>
  `;
  
  fs.writeFileSync(path.join(ICONS_DIR, icon.name), svgContent);
  console.log(`Created ${icon.name}`);
});

console.log('All icons created successfully!');
