const fs = require('fs');

const dataStr = `
Construction & Engineering
Arul Builders
Sri Murugan Constructions
Kaveri Infrastructure
Thamirabarani Developers
Velavan Engineering Works
Kongu Builders
Royal Foundations
Tamilan Construction Solutions
Green Land Developers
Victory Engineering

Textile & Garments
Kaveri Textiles
Kongu Cotton Mills
Tamil Threads
Golden Looms
Heritage Garments
Sri Amman Textiles
Southern Weaves
Classic Cotton House
Elite Fabrics
Lotus Textiles

Agriculture & Food
Green Harvest Farms
Kaveri Agro Products
Fresh Roots Organics
Tamil Agro Traders
Golden Coconut Exports
Natural Farms India
Village Harvest Foods
Farm Fresh Products
Healthy Earth Organics
AgriGrow Solutions

Technology & IT
Tamil Tech Solutions
SmartCode Technologies
NextGen Software
Digital Tamil Innovations
TechWave Systems
FutureApps Technologies
CloudMatrix Solutions
BluePixel Technologies
Innovate IT Services
CodeBridge Solutions

Manufacturing
Vel Industries
Southern Steel Works
Kaveri Manufacturing
Titan Engineering Products
Elite Industrial Solutions
Victory Metal Industries
Tamil Precision Components
Prime Manufacturing Hub
GreenTech Industries
Royal Engineering Works

Retail & Trading
Tamil Traders
Kaveri Enterprises
Smart Retail Hub
Golden Market Place
Southern Distributors
Elite Trading Company
Victory Enterprises
City Choice Retail
Kongu Trading House
Prime Business Mart

Women-Owned Business Ideas
Meenakshi Boutique
Kavitha Creations
Lotus Beauty Studio
Priya Fashion House
Nandhini Foods
Amudha Catering Services
Revathi Handicrafts
Lakshmi Jewels
Anitha Learning Center
Deepika Digital Store

Startup Business Names
Startup Tamil
Innovate TN
Business Bridge
Future Ventures
Growth Circle
Startup Connect
Vision Entrepreneurs
Smart Business Hub
Venture Tamil
Success Network
`;

// Unsplash keywords for each category
const categoryImages = {
  'Construction & Engineering': 'construction,building,architecture',
  'Textile & Garments': 'textile,fabric,clothing',
  'Agriculture & Food': 'agriculture,farm,harvest',
  'Technology & IT': 'technology,software,code',
  'Manufacturing': 'manufacturing,factory,industry',
  'Retail & Trading': 'retail,store,market',
  'Women-Owned Business Ideas': 'women,business,creative',
  'Startup Business Names': 'startup,innovation,business'
};

const mapToRealIndustry = {
  'Construction & Engineering': 'Construction & Engineering',
  'Textile & Garments': 'Fashion & Beauty',
  'Agriculture & Food': 'Agriculture & Farming',
  'Technology & IT': 'Technology',
  'Manufacturing': 'Manufacturing',
  'Retail & Trading': 'Wholesale & Trading',
  'Women-Owned Business Ideas': 'Fashion & Beauty',
  'Startup Business Names': 'Technology'
};

const sections = dataStr.trim().split('\n\n');
let newMembers = [];
let idCounter = 100; // Start high to avoid collision with existing data

const indianNames = ['Ravi', 'Ganesh', 'Siva', 'Mani', 'Vasanth', 'Mohan', 'Balu', 'Ajith', 'Vijay', 'Surya', 'Prakash', 'Raj', 'Anand', 'Deva', 'Selvam'];
const indianNamesWomen = ['Anitha', 'Kavitha', 'Priya', 'Nandhini', 'Meena', 'Lakshmi', 'Deepa', 'Revathi', 'Uma', 'Geetha', 'Sujatha', 'Latha', 'Shanthi'];

sections.forEach(section => {
  const lines = section.trim().split('\n');
  const catTitle = lines[0].trim();
  const companies = lines.slice(1);
  
  const keywords = categoryImages[catTitle] || 'business';
  const industry = mapToRealIndustry[catTitle] || 'Consulting';
  
  const isWomen = catTitle === 'Women-Owned Business Ideas';
  const isStartup = catTitle === 'Startup Business Names';

  companies.forEach(company => {
    company = company.trim();
    if (!company) return;
    
    // Pick random name
    const namePool = isWomen ? indianNamesWomen : indianNames;
    const randomName = namePool[Math.floor(Math.random() * namePool.length)] + ' ' + (isWomen ? '' : indianNames[Math.floor(Math.random() * indianNames.length)]);
    
    const photoUrl = `https://i.pravatar.cc/150?u=${randomName.replace(/ /g, '').toLowerCase()}${idCounter}`;
    const logoUrl = `https://source.unsplash.com/150x150/?${keywords}&sig=${idCounter}`; // Unsplash source with sig for uniqueness
    
    const m = {
      id: String(idCounter++),
      name: randomName.trim(),
      designation: isStartup ? 'Founder & CEO' : 'Managing Director',
      experience: (Math.floor(Math.random() * 15) + 2) + ' Years',
      achievements: ['Excellence Award 2024'],
      photo: photoUrl,
      type: isStartup ? 'Startup' : 'Business',
      industry: industry,
      location: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruppur', 'Salem', 'Erode'][Math.floor(Math.random() * 6)],
      socialMedia: { linkedin: 'https://linkedin.com' },
      reviews: { rating: Number((Math.random() * (5 - 4) + 4).toFixed(1)), count: Math.floor(Math.random() * 500) + 20 },
      company: {
        name: company,
        logo: logoUrl,
        category: industry,
        services: ['Primary Service', 'Consulting'],
        products: [],
        foundedYear: String(Math.floor(Math.random() * (2024 - 2010) + 2010)),
        website: `www.${company.replace(/ /g, '').toLowerCase()}.com`,
        contactInfo: `contact@${company.replace(/ /g, '').toLowerCase()}.com`,
        description: `Top tier services in ${industry} by ${company}.`
      }
    };
    
    if (isStartup) {
      m.startupInfo = {
        description: `Innovative startup aiming to disrupt the ${industry} space.`,
        fundingStage: ['Seed', 'Series A', 'Bootstrapped'][Math.floor(Math.random() * 3)],
        categories: [industry, 'Innovation']
      };
    }
    
    newMembers.push(m);
  });
});

const oldData = fs.readFileSync('mockData.ts', 'utf8');

// Find start and end of mockMembers array
const startIndex = oldData.indexOf('export const mockMembers: Member[] = [');
const endIndex = oldData.indexOf('];', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find mockMembers array');
  process.exit(1);
}

// We will parse the existing array and append to it. 
// Actually, string manipulation is safer to preserve formatting.
const arrayContent = oldData.substring(startIndex, endIndex + 2);

// Let's just run an eval to get the old members, then merge and stringify. Wait, eval might fail with TS interfaces.
// Instead, let's just insert the new JSON string into the array.
// Find the last '}' before '];'
const lastBraceIndex = oldData.lastIndexOf('}', endIndex);
if (lastBraceIndex !== -1) {
  // Convert newMembers to string, remove the outer [ ]
  let newMembersStr = JSON.stringify(newMembers, null, 2);
  newMembersStr = newMembersStr.substring(1, newMembersStr.length - 1); // remove [ and ]
  
  const newData = oldData.substring(0, lastBraceIndex + 1) + ',\n' + newMembersStr + '\n' + oldData.substring(endIndex);
  fs.writeFileSync('mockData.ts', newData);
  console.log('Successfully added ' + newMembers.length + ' businesses to mockData.ts');
} else {
  console.log('Error parsing mockMembers array.');
  process.exit(1);
}
