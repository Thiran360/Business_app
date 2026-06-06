const fs = require('fs');
const content = fs.readFileSync('mockData.ts', 'utf8');

const lines = content.split('\n');

let currentName = '';
for (let i = 0; i < lines.length; i++) {
  const nameMatch = lines[i].match(/name:\s*['"]([^'"]+)['"]/);
  if (nameMatch) {
    currentName = nameMatch[1];
  }
  
  const photoMatch = lines[i].match(/photo:\s*['"`](https:\/\/i\.pravatar\.cc[^'"`]+)['"`]/);
  if (photoMatch && currentName) {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentName)}&background=random`;
    lines[i] = lines[i].replace(photoMatch[1], avatar);
  }
}

let currentLogoLineIndex = -1;
let currentLogoUrl = '';

for (let i = 0; i < lines.length; i++) {
  const logoMatch = lines[i].match(/logo:\s*['"`](https:\/\/via\.placeholder\.com[^'"`]+)['"`]/);
  if (logoMatch) {
    currentLogoLineIndex = i;
    currentLogoUrl = logoMatch[1];
  }
  
  const catMatch = lines[i].match(/category:\s*['"`]([^'"`]+)['"`]/);
  if (catMatch && currentLogoLineIndex !== -1 && i - currentLogoLineIndex <= 3) {
    let keyword = 'business';
    const category = catMatch[1];
    if (category.includes('Construction')) keyword = 'construction';
    else if (category.includes('Manufacturing')) keyword = 'factory';
    else if (category.includes('Agriculture')) keyword = 'farm';
    else if (category.includes('Technology')) keyword = 'technology';
    else if (category.includes('Fashion')) keyword = 'fashion';
    else if (category.includes('Consulting')) keyword = 'office';
    else if (category.includes('Finance')) keyword = 'finance';
    else if (category.includes('Handicrafts')) keyword = 'craft';
    else if (category.includes('Education')) keyword = 'education';
    else if (category.includes('Health')) keyword = 'health';
    else if (category.includes('Food')) keyword = 'food';
    else if (category.includes('E-Commerce')) keyword = 'ecommerce';
    else if (category.includes('Trading')) keyword = 'market';
    else if (category.includes('Real Estate')) keyword = 'building';
    else if (category.includes('Beauty')) keyword = 'beauty';
    else if (category.includes('Logistics')) keyword = 'logistics';
    
    const unsplash = `https://source.unsplash.com/150x150/?${keyword}&sig=${Math.floor(Math.random()*1000)}`;
    lines[currentLogoLineIndex] = lines[currentLogoLineIndex].replace(currentLogoUrl, unsplash);
    currentLogoLineIndex = -1; // reset
  }
}

fs.writeFileSync('mockData.ts', lines.join('\n'));
console.log('Successfully updated avatars and placeholder logos.');
