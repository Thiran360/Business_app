const fs = require('fs');

const maleExperts = [
  ['Arul Raj', 'Construction & Infrastructure Expert', 'Construction & Engineering', 'Arul Constructions'],
  ['Karthikeyan M', 'Manufacturing Consultant', 'Manufacturing', 'Karthik Manufacturing'],
  ['Senthil Kumar', 'Textile Industry Expert', 'Wholesale & Trading', 'Senthil Textiles'],
  ['Prakash Vel', 'Logistics & Transport Specialist', 'Transport & Logistics', 'Vel Logistics'],
  ['Suresh Babu', 'Retail Business Consultant', 'Wholesale & Trading', 'Suresh Retails'],
  ['Ramesh Krishnan', 'Agriculture & Farming Expert', 'Agriculture & Farming', 'Ramesh Farms'],
  ['Muruganandam', 'Steel & Engineering Specialist', 'Manufacturing', 'Murugan Steel Works'],
  ['Vigneshwaran', 'Technology & IT Expert', 'Technology', 'Vignesh Tech Solutions'],
  ['Saravanan P', 'Business Development Consultant', 'Consulting', 'Saravanan Consultants'],
  ['Thirumalai Selvan', 'Real Estate Advisor', 'Real Estate', 'Thirumalai Realtors'],
];

const femaleExperts = [
  ['Meenakshi Devi', 'Fashion & Boutique Expert', 'Fashion & Beauty', 'Meenakshi Boutiques'],
  ['Kavitha Raj', 'Food Processing Consultant', 'Food & Catering', 'Kavitha Foods'],
  ['Priya Shanmugam', 'Digital Marketing Specialist', 'Technology', 'Priya Digital'],
  ['Nandhini K', 'E-Commerce Expert', 'E-Commerce', 'Nandhini E-Com'],
  ['Revathi M', 'Beauty & Wellness Advisor', 'Health & Wellness', 'Revathi Wellness'],
  ['Lakshmi Narayanan', 'Handicrafts Specialist', 'Handicrafts', 'Lakshmi Crafts'],
  ['Anitha Selvi', 'Education & Training Expert', 'Education & Training', 'Anitha Academy'],
  ['Uma Maheswari', 'Catering & Hospitality Consultant', 'Food & Catering', 'Uma Caterers'],
  ['Deepika Raman', 'Technology Entrepreneur', 'Technology', 'Deepika Innovations'],
  ['Jayanthi Velmurugan', 'Healthcare Business Expert', 'Health & Wellness', 'Jayanthi Healthcare'],
];

const premiumBoard = [
  ['Dr. Aravind Rajan', 'Chief Business Advisor', 'Consulting', 'Aravind Advisory'],
  ['R. Kannan', 'Industry Development Head', 'Manufacturing', 'Kannan Industries'],
  ['S. Vijayalakshmi', 'Women Entrepreneurs Coordinator', 'Consulting', 'Vijayalakshmi Network'],
  ['M. Dhanasekar', 'MSME Growth Advisor', 'Finance', 'Dhanasekar MSME Support'],
  ['P. Mahalakshmi', 'Startup Development Director', 'Technology', 'Mahalakshmi Startup Hub'],
];

let members = [];
let idCounter = 1;

function createMember(data, type) {
  const [name, designation, industry, companyName] = data;
  const isPremium = type === 'Executive';
  return {
    id: String(idCounter++),
    name: name,
    designation: designation,
    experience: (Math.floor(Math.random() * 15) + 5) + ' Years',
    achievements: ['Industry Leader Award'],
    photo: `https://i.pravatar.cc/150?u=${name.replace(/ /g, '').toLowerCase()}`,
    type: type,
    industry: industry,
    location: ['Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem'][Math.floor(Math.random() * 5)],
    socialMedia: { linkedin: 'https://linkedin.com' },
    reviews: { rating: Number((Math.random() * (5 - 4) + 4).toFixed(1)), count: Math.floor(Math.random() * 300) + 50 },
    company: {
      name: companyName,
      logo: `https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}/fff.png`,
      category: industry,
      services: ['Consulting', 'Strategy'],
      products: [],
      foundedYear: String(Math.floor(Math.random() * (2020 - 1990) + 1990)),
      website: `www.${companyName.replace(/ /g, '').toLowerCase()}.com`,
      contactInfo: `contact@${companyName.replace(/ /g, '').toLowerCase()}.com`,
      description: `Leading experts in ${industry}.`,
    },
    isFeatured: isPremium
  };
}

maleExperts.forEach(m => members.push(createMember(m, 'Business')));
femaleExperts.forEach(m => members.push(createMember(m, 'Business')));
premiumBoard.forEach(m => members.push(createMember(m, 'Executive')));

const oldData = fs.readFileSync('mockData.ts', 'utf8');

// Find start and end of mockMembers array
const startIndex = oldData.indexOf('export const mockMembers: Member[] = [');
const endIndex = oldData.indexOf('];', startIndex) + 2;

if (startIndex === -1 || endIndex === 1) {
  console.log('Could not find mockMembers array');
  process.exit(1);
}

const newData = oldData.substring(0, startIndex) + 'export const mockMembers: Member[] = ' + JSON.stringify(members, null, 2) + ';\n' + oldData.substring(endIndex);

fs.writeFileSync('mockData.ts', newData);
console.log('Successfully updated mockData.ts');
