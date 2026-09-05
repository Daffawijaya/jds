const fs = require('fs');

const file = fs.readFileSync('src/app/(about)/about/page.tsx', 'utf8');

// Extract the box-shadow value
const shadowMatch = file.match(/boxShadow:\s*'([^']+)'/);
if (!shadowMatch) { console.log('No boxShadow found'); process.exit(1); }

const shadow = shadowMatch[1];
const entries = shadow.split(',').map(s => s.trim());

// Parse each entry into {x, y, color}
const parsed = entries.map(e => {
  const m = e.match(/^([#\da-f]+)\s+(-?\d+)px\s+(-?\d+)px$/i);
  if (!m) return null;
  return { color: m[1].toLowerCase(), x: parseInt(m[2]), y: parseInt(m[3]) };
}).filter(Boolean);

// Determine the center column (roughly x=22, which is the boundary between red/green)
const maxX = Math.max(...parsed.map(p => p.x));

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}

// Target blue: #098cbf -> dark version near black
const targetBlue = hexToRgb('#098cbf');

const transformed = parsed.map(p => {
  const rgb = hexToRgb(p.color);
  
  // Keep left side (red tones) as-is: where g < r (reddish)
  // Right side (greens/teals): where g > r or g > b
  const isGreenish = rgb.g > rgb.r && rgb.g > 20;
  
  if (isGreenish) {
    // Interpolate from targetBlue to black based on y position
    // y=0 is brightest, y=21 is darkest (black)
    const brightness = 1 - (p.y / 21);
    // Fade the blue towards black at the bottom
    const fade = Math.pow(brightness, 1.2);
    
    const newR = Math.round(targetBlue.r * fade);
    const newG = Math.round(targetBlue.g * fade);
    const newB = Math.round(targetBlue.b * fade);
    
    return `${rgbToHex(newR, newG, newB)} ${p.x}px ${p.y}px`;
  }
  
  // Keep red side unchanged
  return `${p.color} ${p.x}px ${p.y}px`;
});

const newShadow = transformed.join(',');

// Replace in file
const newFile = file.replace(
  /boxShadow:\s*'[^']+'/,
  `boxShadow: '${newShadow}'`
);

fs.writeFileSync('src/app/(about)/about/page.tsx', newFile);
console.log('Done! Replaced', transformed.length, 'pixel entries.');
