const fs = require('fs');
const lines = fs.readFileSync('c:/Users/vitou/OneDrive/Documents/GitHub/oppakimchi.github.io/ansoncalista/style.css', 'utf8').split('\n');
lines.forEach((line, i) => {
    if (line.toLowerCase().includes('background')) {
        console.log(`${i+1}: ${line}`);
    }
});
