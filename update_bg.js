const fs = require('fs');
const cssPath = 'c:/Users/vitou/OneDrive/Documents/GitHub/oppakimchi.github.io/ansoncalista/style.css';
let content = fs.readFileSync(cssPath, 'utf8');

// Replace CSS variables in :root
content = content.replace(/--surface:.*?;/g, '--surface: transparent;');
content = content.replace(/--surface-strong:.*?;/g, '--surface-strong: transparent;');
content = content.replace(/--text:.*?;/g, '--text: #ffffff;');
content = content.replace(/--muted:.*?;/g, '--muted: rgba(255, 255, 255, 0.8);');
content = content.replace(/--brand-dark:.*?;/g, '--brand-dark: #ffffff;');
content = content.replace(/--border:.*?;/g, '--border: rgba(255, 255, 255, 0.2);');

// Replace panel backgrounds with transparent or #435132
content = content.replace(/\.venue-panel\s*\{\s*background:.*?\s*\}/g, '.venue-panel {\n    background: transparent;\n}');
content = content.replace(/\.soft-panel\s*\{\s*background:.*?\s*\}/g, '.soft-panel {\n    background: transparent;\n}');
content = content.replace(/\.gallery-panel\s*\{\s*background:.*?\s*\}/g, '.gallery-panel {\n    background: transparent;\n}');

// Replace hero backgrounds with #435132
content = content.replace(/background:\s*linear-gradient\(145deg,\s*rgba\(40,\s*24,\s*22,\s*0\.18\),\s*rgba\(40,\s*24,\s*22,\s*0\.34\)\);/g, 'background: #435132;');
content = content.replace(/background:\s*linear-gradient\(145deg,\s*rgba\(67,\s*81,\s*50,\s*0\.98\),\s*rgba\(43,\s*52,\s*31,\s*0\.96\)\);/g, 'background: #435132;');

// Remove body::before background-image entirely
content = content.replace(/body::before\s*\{[\s\S]*?\}/, 'body::before {\n    display: none;\n}');

// Remove .hero-menu and .hero-menu::before backgrounds
content = content.replace(/\.hero-menu\s*\{[\s\S]*?\}/, '.hero-menu {\n    background: #435132;\n}');
content = content.replace(/\.hero-menu::before\s*\{[\s\S]*?\}/, '.hero-menu::before {\n    display: none;\n}');

// There might be some other elements like .photo-card that need to be updated? 
// .photo-card has background: #fff; -> if it's #fff on a #435132 bg, that's fine.
// .venue-card has background: rgba(255, 255, 255, 0.94); -> fine as a card on dark bg.
// If the user meant "ALL backgrounds", maybe I should just strip all backgrounds?
// "make all the background colour color #435132 without any colour shift or gradient or anything"
// I will also change any other gradients just in case.

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Updated style.css');
