export type MemberType = 'Business' | 'Startup' | 'Investor' | 'Mentor' | 'Executive';

export interface SocialMedia {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  facebook?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
}

export interface Review {
  rating: number;
  count: number;
}

export interface Member {
  id: string;
  name: string;
  designation: string;
  experience: string;
  achievements: string[];
  photo: string;
  type: MemberType;
  industry: string;
  location: string;
  socialMedia: SocialMedia;
  reviews: Review;
  company: {
    name: string;
    logo: any;
    category: string;
    services: string[];
    products: string[];
    needs?: string[];
    foundedYear: string;
    website: string;
    contactInfo: string;
    description: string;
  };
  startupInfo?: {
    description: string;
    fundingStage: string;
    categories: string[];
  };
  isFeatured?: boolean;
}

export const mockMembers: Member[] = [
  {
    "id": "200",
    "name": "Meenakshi Nathan",
    "designation": "Managing Director",
    "experience": "13 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=200",
    "type": "Business",
    "industry": "Construction & Engineering",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.8,
      "count": 112
    },
    "company": {
      "name": "Arul Builders",
      "logo": "",
      "category": "Construction & Engineering",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2012",
      "website": "www.arul builders.com",
      "contactInfo": "contact@arul builders.com",
      "description": "Leading experts in Construction & Engineering, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "201",
    "name": "Priya M",
    "designation": "Managing Director",
    "experience": "14 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=201",
    "type": "Business",
    "industry": "Construction & Engineering",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.6,
      "count": 79
    },
    "company": {
      "name": "Sri Murugan Constructions",
      "logo": "",
      "category": "Construction & Engineering",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2024",
      "website": "www.sri murugan constructions.com",
      "contactInfo": "contact@sri murugan constructions.com",
      "description": "Leading experts in Construction & Engineering, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "202",
    "name": "Kavitha Kumar",
    "designation": "Managing Director",
    "experience": "13 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=202",
    "type": "Business",
    "industry": "Construction & Engineering",
    "location": "Trichy",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.7,
      "count": 112
    },
    "company": {
      "name": "Kaveri Infrastructure",
      "logo": "",
      "category": "Construction & Engineering",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2003",
      "website": "www.kaveri infrastructure.com",
      "contactInfo": "contact@kaveri infrastructure.com",
      "description": "Leading experts in Construction & Engineering, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "210",
    "name": "Suresh Swamy",
    "designation": "Managing Director",
    "experience": "18 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=210",
    "type": "Business",
    "industry": "Fashion & Beauty",
    "location": "Coimbatore",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.9,
      "count": 89
    },
    "company": {
      "name": "Kaveri Textiles",
      "logo": "",
      "category": "Fashion & Beauty",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2002",
      "website": "www.kaveri textiles.com",
      "contactInfo": "contact@kaveri textiles.com",
      "description": "Leading experts in Fashion & Beauty, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "211",
    "name": "Prakash M",
    "designation": "Managing Director",
    "experience": "19 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=211",
    "type": "Business",
    "industry": "Fashion & Beauty",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.8,
      "count": 64
    },
    "company": {
      "name": "Kongu Cotton Mills",
      "logo": "",
      "category": "Fashion & Beauty",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2016",
      "website": "www.kongu cotton mills.com",
      "contactInfo": "contact@kongu cotton mills.com",
      "description": "Leading experts in Fashion & Beauty, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "212",
    "name": "Kavitha Vel",
    "designation": "Managing Director",
    "experience": "14 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=212",
    "type": "Business",
    "industry": "Fashion & Beauty",
    "location": "Trichy",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.5,
      "count": 98
    },
    "company": {
      "name": "Tamil Threads",
      "logo": "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&auto=format&fit=crop&q=80",
      "category": "Fashion & Beauty",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2003",
      "website": "www.tamil threads.com",
      "contactInfo": "contact@tamil threads.com",
      "description": "Leading experts in Fashion & Beauty, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "220",
    "name": "Ramesh M",
    "designation": "Managing Director",
    "experience": "16 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=220",
    "type": "Business",
    "industry": "Agriculture & Farming",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.8,
      "count": 165
    },
    "company": {
      "name": "Green Harvest Farms",
      "logo": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&auto=format&fit=crop&q=80",
      "category": "Agriculture & Farming",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2023",
      "website": "www.green harvest farms.com",
      "contactInfo": "contact@green harvest farms.com",
      "description": "Leading experts in Agriculture & Farming, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "221",
    "name": "Meenakshi Vel",
    "designation": "Managing Director",
    "experience": "8 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=221",
    "type": "Business",
    "industry": "Agriculture & Farming",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.5,
      "count": 147
    },
    "company": {
      "name": "Kaveri Agro Products",
      "logo": "",
      "category": "Agriculture & Farming",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2014",
      "website": "www.kaveri agro products.com",
      "contactInfo": "contact@kaveri agro products.com",
      "description": "Leading experts in Agriculture & Farming, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "222",
    "name": "Karthik Nathan",
    "designation": "Managing Director",
    "experience": "18 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=222",
    "type": "Business",
    "industry": "Agriculture & Farming",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.9,
      "count": 243
    },
    "company": {
      "name": "Fresh Roots Organics",
      "logo": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&auto=format&fit=crop&q=80",
      "category": "Agriculture & Farming",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2000",
      "website": "www.fresh roots organics.com",
      "contactInfo": "contact@fresh roots organics.com",
      "description": "Leading experts in Agriculture & Farming, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "230",
    "name": "Karthik Vel",
    "designation": "Managing Director",
    "experience": "18 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=230",
    "type": "Business",
    "industry": "Technology",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.4,
      "count": 125
    },
    "company": {
      "name": "Tamil Tech Solutions",
      "logo": "",
      "category": "Technology",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2010",
      "website": "www.tamil tech solutions.com",
      "contactInfo": "contact@tamil tech solutions.com",
      "description": "Leading experts in Technology, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "231",
    "name": "Senthil Nathan",
    "designation": "Managing Director",
    "experience": "10 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=231",
    "type": "Business",
    "industry": "Technology",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.6,
      "count": 70
    },
    "company": {
      "name": "SmartCode Technologies",
      "logo": "",
      "category": "Technology",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2019",
      "website": "www.smartcode technologies.com",
      "contactInfo": "contact@smartcode technologies.com",
      "description": "Leading experts in Technology, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "232",
    "name": "Karthik M",
    "designation": "Managing Director",
    "experience": "15 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=232",
    "type": "Business",
    "industry": "Technology",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.5,
      "count": 172
    },
    "company": {
      "name": "NextGen Software",
      "logo": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=80",
      "category": "Technology",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2000",
      "website": "www.nextgen software.com",
      "contactInfo": "contact@nextgen software.com",
      "description": "Leading experts in Technology, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "240",
    "name": "Arul Nathan",
    "designation": "Managing Director",
    "experience": "16 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=240",
    "type": "Business",
    "industry": "Manufacturing",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.2,
      "count": 91
    },
    "company": {
      "name": "Vel Industries",
      "logo": "",
      "category": "Manufacturing",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2015",
      "website": "www.vel industries.com",
      "contactInfo": "contact@vel industries.com",
      "description": "Leading experts in Manufacturing, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "241",
    "name": "Suresh Rajan",
    "designation": "Managing Director",
    "experience": "14 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=241",
    "type": "Business",
    "industry": "Manufacturing",
    "location": "Coimbatore",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.8,
      "count": 221
    },
    "company": {
      "name": "Southern Steel Works",
      "logo": "",
      "category": "Manufacturing",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2015",
      "website": "www.southern steel works.com",
      "contactInfo": "contact@southern steel works.com",
      "description": "Leading experts in Manufacturing, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "242",
    "name": "Kavitha Swamy",
    "designation": "Managing Director",
    "experience": "14 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=242",
    "type": "Business",
    "industry": "Manufacturing",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.7,
      "count": 174
    },
    "company": {
      "name": "Kaveri Manufacturing",
      "logo": "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=300&auto=format&fit=crop&q=80",
      "category": "Manufacturing",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2013",
      "website": "www.kaveri manufacturing.com",
      "contactInfo": "contact@kaveri manufacturing.com",
      "description": "Leading experts in Manufacturing, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "250",
    "name": "Karthik Rajan",
    "designation": "Managing Director",
    "experience": "7 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=250",
    "type": "Business",
    "industry": "Wholesale & Trading",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.5,
      "count": 103
    },
    "company": {
      "name": "Tamil Traders",
      "logo": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80",
      "category": "Wholesale & Trading",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2020",
      "website": "www.tamil traders.com",
      "contactInfo": "contact@tamil traders.com",
      "description": "Leading experts in Wholesale & Trading, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "251",
    "name": "Arul Babu",
    "designation": "Managing Director",
    "experience": "7 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=251",
    "type": "Business",
    "industry": "Wholesale & Trading",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.4,
      "count": 149
    },
    "company": {
      "name": "Kaveri Enterprises",
      "logo": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80",
      "category": "Wholesale & Trading",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2007",
      "website": "www.kaveri enterprises.com",
      "contactInfo": "contact@kaveri enterprises.com",
      "description": "Leading experts in Wholesale & Trading, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "252",
    "name": "Murugan Nathan",
    "designation": "Managing Director",
    "experience": "7 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=252",
    "type": "Business",
    "industry": "Wholesale & Trading",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.9,
      "count": 61
    },
    "company": {
      "name": "Smart Retail Hub",
      "logo": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80",
      "category": "Wholesale & Trading",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2011",
      "website": "www.smart retail hub.com",
      "contactInfo": "contact@smart retail hub.com",
      "description": "Leading experts in Wholesale & Trading, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "261",
    "name": "Priya Nathan",
    "designation": "Managing Director",
    "experience": "14 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=261",
    "type": "Business",
    "industry": "Handicrafts",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.7,
      "count": 113
    },
    "company": {
      "name": "Kavitha Creations",
      "logo": "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&auto=format&fit=crop&q=80",
      "category": "Handicrafts",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2010",
      "website": "www.kavitha creations.com",
      "contactInfo": "contact@kavitha creations.com",
      "description": "Leading experts in Handicrafts, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "264",
    "name": "Murugan Nathan",
    "designation": "Managing Director",
    "experience": "7 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=264",
    "type": "Business",
    "industry": "Food & Catering",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.9,
      "count": 113
    },
    "company": {
      "name": "Nandhini Foods",
      "logo": "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&auto=format&fit=crop&q=80",
      "category": "Food & Catering",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2013",
      "website": "www.nandhini foods.com",
      "contactInfo": "contact@nandhini foods.com",
      "description": "Leading experts in Food & Catering, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "265",
    "name": "Kavitha Vel",
    "designation": "Managing Director",
    "experience": "18 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=265",
    "type": "Business",
    "industry": "Food & Catering",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.5,
      "count": 98
    },
    "company": {
      "name": "Amudha Catering Services",
      "logo": "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&auto=format&fit=crop&q=80",
      "category": "Food & Catering",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2004",
      "website": "www.amudha catering services.com",
      "contactInfo": "contact@amudha catering services.com",
      "description": "Leading experts in Food & Catering, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "266",
    "name": "Ramesh Nathan",
    "designation": "Managing Director",
    "experience": "10 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=266",
    "type": "Business",
    "industry": "Handicrafts",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.5,
      "count": 242
    },
    "company": {
      "name": "Revathi Handicrafts",
      "logo": "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&auto=format&fit=crop&q=80",
      "category": "Handicrafts",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2007",
      "website": "www.revathi handicrafts.com",
      "contactInfo": "contact@revathi handicrafts.com",
      "description": "Leading experts in Handicrafts, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "268",
    "name": "Senthil Babu",
    "designation": "Managing Director",
    "experience": "18 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=268",
    "type": "Business",
    "industry": "Education & Training",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.3,
      "count": 73
    },
    "company": {
      "name": "Anitha Learning Center",
      "logo": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&auto=format&fit=crop&q=80",
      "category": "Education & Training",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2018",
      "website": "www.anitha learning center.com",
      "contactInfo": "contact@anitha learning center.com",
      "description": "Leading experts in Education & Training, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "269",
    "name": "Kavitha Kumar",
    "designation": "Managing Director",
    "experience": "10 Years",
    "achievements": [
      "Industry Leader Award",
      "Top Performer 2025"
    ],
    "photo": "https://i.pravatar.cc/150?u=269",
    "type": "Business",
    "industry": "E-Commerce",
    "location": "Trichy",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.9,
      "count": 180
    },
    "company": {
      "name": "Deepika Digital Store",
      "logo": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&auto=format&fit=crop&q=80",
      "category": "E-Commerce",
      "services": [
        "Consulting",
        "Strategy",
        "Operations"
      ],
      "products": [],
      "foundedYear": "2005",
      "website": "www.deepika digital store.com",
      "contactInfo": "contact@deepika digital store.com",
      "description": "Leading experts in E-Commerce, providing top-tier solutions in Tamil Nadu and beyond."
    },
    "isFeatured": false
  },
  {
    "id": "4",
    "name": "Prakash Vel",
    "designation": "Logistics & Transport Specialist",
    "experience": "5 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=prakashvel",
    "type": "Business",
    "industry": "Transport & Logistics",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.8,
      "count": 83
    },
    "company": {
      "name": "Vel Logistics",
      "logo": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=300&auto=format&fit=crop&q=80",
      "category": "Transport & Logistics",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2007",
      "website": "www.vellogistics.com",
      "contactInfo": "contact@vellogistics.com",
      "description": "Leading experts in Transport & Logistics."
    },
    "isFeatured": false
  },
  {
    "id": "9",
    "name": "Saravanan P",
    "designation": "Business Development Consultant",
    "experience": "12 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=saravananp",
    "type": "Business",
    "industry": "Consulting",
    "location": "Coimbatore",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.8,
      "count": 257
    },
    "company": {
      "name": "Saravanan Consultants",
      "logo": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80",
      "category": "Consulting",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2019",
      "website": "www.saravananconsultants.com",
      "contactInfo": "contact@saravananconsultants.com",
      "description": "Leading experts in Consulting."
    },
    "isFeatured": false
  },
  {
    "id": "10",
    "name": "Thirumalai Selvan",
    "designation": "Real Estate Advisor",
    "experience": "7 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=thirumalaiselvan",
    "type": "Business",
    "industry": "Real Estate",
    "location": "Coimbatore",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.6,
      "count": 143
    },
    "company": {
      "name": "Thirumalai Realtors",
      "logo": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&auto=format&fit=crop&q=80",
      "category": "Real Estate",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "1995",
      "website": "www.thirumalairealtors.com",
      "contactInfo": "contact@thirumalairealtors.com",
      "description": "Leading experts in Real Estate."
    },
    "isFeatured": false
  },
  {
    "id": "12",
    "name": "Kavitha Raj",
    "designation": "Food Processing Consultant",
    "experience": "8 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=kavitharaj",
    "type": "Business",
    "industry": "Food & Catering",
    "location": "Coimbatore",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.2,
      "count": 146
    },
    "company": {
      "name": "Kavitha Foods",
      "logo": "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&auto=format&fit=crop&q=80",
      "category": "Food & Catering",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2006",
      "website": "www.kavithafoods.com",
      "contactInfo": "contact@kavithafoods.com",
      "description": "Leading experts in Food & Catering."
    },
    "isFeatured": false
  },
  {
    "id": "14",
    "name": "Nandhini K",
    "designation": "E-Commerce Expert",
    "experience": "11 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=nandhinik",
    "type": "Business",
    "industry": "E-Commerce",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.2,
      "count": 229
    },
    "company": {
      "name": "Nandhini E-Com",
      "logo": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&auto=format&fit=crop&q=80",
      "category": "E-Commerce",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2003",
      "website": "www.nandhinie-com.com",
      "contactInfo": "contact@nandhinie-com.com",
      "description": "Leading experts in E-Commerce."
    },
    "isFeatured": false
  },
  {
    "id": "15",
    "name": "Revathi M",
    "designation": "Beauty & Wellness Advisor",
    "experience": "11 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=revathim",
    "type": "Business",
    "industry": "Health & Wellness",
    "location": "Trichy",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.6,
      "count": 55
    },
    "company": {
      "name": "Revathi Wellness",
      "logo": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&auto=format&fit=crop&q=80",
      "category": "Health & Wellness",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2011",
      "website": "www.revathiwellness.com",
      "contactInfo": "contact@revathiwellness.com",
      "description": "Leading experts in Health & Wellness."
    },
    "isFeatured": false
  },
  {
    "id": "16",
    "name": "Lakshmi Narayanan",
    "designation": "Handicrafts Specialist",
    "experience": "18 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=lakshminarayanan",
    "type": "Business",
    "industry": "Handicrafts",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.8,
      "count": 182
    },
    "company": {
      "name": "Lakshmi Crafts",
      "logo": "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&auto=format&fit=crop&q=80",
      "category": "Handicrafts",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "1992",
      "website": "www.lakshmicrafts.com",
      "contactInfo": "contact@lakshmicrafts.com",
      "description": "Leading experts in Handicrafts."
    },
    "isFeatured": false
  },
  {
    "id": "17",
    "name": "Anitha Selvi",
    "designation": "Education & Training Expert",
    "experience": "15 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=anithaselvi",
    "type": "Business",
    "industry": "Education & Training",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.1,
      "count": 82
    },
    "company": {
      "name": "Anitha Academy",
      "logo": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&auto=format&fit=crop&q=80",
      "category": "Education & Training",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2010",
      "website": "www.anithaacademy.com",
      "contactInfo": "contact@anithaacademy.com",
      "description": "Leading experts in Education & Training."
    },
    "isFeatured": false
  },
  {
    "id": "20",
    "name": "Jayanthi Velmurugan",
    "designation": "Healthcare Business Expert",
    "experience": "13 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=jayanthivelmurugan",
    "type": "Business",
    "industry": "Health & Wellness",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.6,
      "count": 123
    },
    "company": {
      "name": "Jayanthi Healthcare",
      "logo": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&auto=format&fit=crop&q=80",
      "category": "Health & Wellness",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "1997",
      "website": "www.jayanthihealthcare.com",
      "contactInfo": "contact@jayanthihealthcare.com",
      "description": "Leading experts in Health & Wellness."
    },
    "isFeatured": false
  },
  {
    "id": "21",
    "name": "Dr. Aravind Rajan",
    "designation": "Chief Business Advisor",
    "experience": "19 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=dr.aravindrajan",
    "type": "Executive",
    "industry": "Consulting",
    "location": "Salem",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.7,
      "count": 104
    },
    "company": {
      "name": "Aravind Advisory",
      "logo": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80",
      "category": "Consulting",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2001",
      "website": "www.aravindadvisory.com",
      "contactInfo": "contact@aravindadvisory.com",
      "description": "Leading experts in Consulting."
    },
    "isFeatured": true
  },
  {
    "id": "23",
    "name": "S. Vijayalakshmi",
    "designation": "Women Entrepreneurs Coordinator",
    "experience": "19 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=s.vijayalakshmi",
    "type": "Executive",
    "industry": "Consulting",
    "location": "Madurai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.2,
      "count": 288
    },
    "company": {
      "name": "Vijayalakshmi Network",
      "logo": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80",
      "category": "Consulting",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2008",
      "website": "www.vijayalakshminetwork.com",
      "contactInfo": "contact@vijayalakshminetwork.com",
      "description": "Leading experts in Consulting."
    },
    "isFeatured": true
  },
  {
    "id": "24",
    "name": "M. Dhanasekar",
    "designation": "MSME Growth Advisor",
    "experience": "5 Years",
    "achievements": [
      "Industry Leader Award"
    ],
    "photo": "https://i.pravatar.cc/150?u=m.dhanasekar",
    "type": "Executive",
    "industry": "Finance",
    "location": "Chennai",
    "socialMedia": {
      "linkedin": "https://linkedin.com"
    },
    "reviews": {
      "rating": 4.7,
      "count": 347
    },
    "company": {
      "name": "Dhanasekar MSME Support",
      "logo": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&auto=format&fit=crop&q=80",
      "category": "Finance",
      "services": [
        "Consulting",
        "Strategy"
      ],
      "products": [],
      "foundedYear": "2000",
      "website": "www.dhanasekarmsmesupport.com",
      "contactInfo": "contact@dhanasekarmsmesupport.com",
      "description": "Leading experts in Finance."
    },
    "isFeatured": true
  }
];


export const mockEvents = [
  {
    id: '1',
    title: 'Global Business Summit 2026',
    date: 'Oct 15, 2026',
    location: 'Grand Hotel, Mumbai',
    type: 'Business Summit',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '3',
    title: 'Manufacturing Expo',
    date: 'Dec 10, 2026',
    location: 'Trade Center, Delhi',
    type: 'Expo',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '4',
    title: 'Tamil Nadu Investors Meet',
    date: 'Jan 20, 2027',
    location: 'ITC Grand Chola, Chennai',
    type: 'Networking',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '6',
    title: 'AgriTech Future Seminar',
    date: 'Mar 05, 2027',
    location: 'Madurai Convention Center, Madurai',
    type: 'Seminar',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '7',
    title: 'Women Entrepreneurs Conclave',
    date: 'Mar 08, 2027',
    location: 'Leela Palace, Chennai',
    type: 'Conclave',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&auto=format&fit=crop&q=60',
  },
];

export const mockOpportunities = [
  {
    id: '1',
    title: 'Seeking Series A Investment',
    company: 'EcoCharge Network',
    type: 'Investment Needs',
    date: '2 Days Ago',
  },
  {
    id: '2',
    title: 'Bulk Fabric Suppliers Needed',
    company: 'PS Textiles',
    type: 'Vendor Requirements',
    date: '5 Days Ago',
  },
  {
    id: '3',
    title: 'Senior Civil Engineer',
    company: 'AK Civil Engineering',
    type: 'Job Openings',
    date: '1 Week Ago',
  },
];

// Helper array for the extensive categories
export const ALL_INDUSTRIES = [
  'All',
  'Construction & Engineering',
  'Manufacturing',
  'Agriculture & Farming',
  'Automobile',
  'Transport & Logistics',
  'Technology',
  'Wholesale & Trading',
  'Fashion & Beauty',
  'Food & Catering',
  'Handicrafts',
  'Health & Wellness',
  'Education & Training',
  'E-Commerce'
];

export interface Lead {
  id: string;
  title: string;
  description: string;
  postedBy: string;
  category: string;
  createdAt: string;
  status: 'Open' | 'Closed';
}

export const mockLeads: Lead[] = [
  {
    id: 'l1',
    title: 'Hotel Construction Project',
    description: 'Looking for reliable contractors and material suppliers for a 5-star hotel project in Coimbatore. Need steel, cement, and interior designers.',
    postedBy: 'Arul Builders',
    category: 'Construction & Engineering',
    createdAt: '2026-06-01T10:00:00Z',
    status: 'Open'
  },
  {
    id: 'l2',
    title: 'School Uniform Supply Requirement',
    description: 'Need a bulk manufacturer for 5000 sets of school uniforms. Must deliver before August.',
    postedBy: 'Kaveri Textiles',
    category: 'Textile Manufacturing',
    createdAt: '2026-06-02T14:30:00Z',
    status: 'Open'
  },
  {
    id: 'l3',
    title: 'Organic Food Distributor Needed',
    description: 'Seeking distributors for our new range of organic spices across Tamil Nadu.',
    postedBy: 'Fresh Roots Organics',
    category: 'Agriculture & Farming',
    createdAt: '2026-06-03T09:15:00Z',
    status: 'Open'
  },
  {
    id: 'l4',
    title: 'Mobile App Development Requirement',
    description: 'Looking for a reliable agency to build our e-commerce application.',
    postedBy: 'Smart Retail Hub',
    category: 'Technology',
    createdAt: '2026-06-03T16:45:00Z',
    status: 'Open'
  },
  {
    id: 'l5',
    title: 'Packaging Materials Wanted',
    description: 'Looking for sustainable and eco-friendly packaging for our organic products. Monthly requirement of 10,000 units.',
    postedBy: 'Fresh Roots Organics',
    category: 'Packaging',
    createdAt: '2026-06-04T08:00:00Z',
    status: 'Open'
  },
  {
    id: 'l6',
    title: 'Warehouse Space Needed',
    description: 'Seeking 5,000 sq.ft warehouse space near Madurai bypass for textile storage.',
    postedBy: 'Kongu Cotton Mills',
    category: 'Transport & Logistics',
    createdAt: '2026-06-04T11:20:00Z',
    status: 'Open'
  }
];

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  sellerId: string;
  sellerName: string;
  category: string;
  image: string;
  type: 'Product' | 'Service' | 'Equipment';
}

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: 'm1',
    name: 'Industrial Steel Pipes',
    description: 'High-grade industrial steel pipes suitable for heavy construction.',
    price: '₹120 / kg',
    sellerId: '241',
    sellerName: 'Southern Steel Works',
    category: 'Manufacturing',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80',
    type: 'Product'
  },
  {
    id: 'm2',
    name: 'Digital Marketing Package',
    description: 'Comprehensive digital marketing and SEO services for 3 months.',
    price: '₹50,000 / month',
    sellerId: '230',
    sellerName: 'Tamil Tech Solutions',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=300&auto=format&fit=crop&q=80',
    type: 'Service'
  },
  {
    id: 'm3',
    name: 'Used Cement Mixer',
    description: 'Heavy duty cement mixer in good condition. 2 years old.',
    price: '₹45,000',
    sellerId: '200',
    sellerName: 'Arul Builders',
    category: 'Construction & Engineering',
    image: 'https://images.unsplash.com/photo-1541888086925-0c770f4e747b?w=300&auto=format&fit=crop&q=80',
    type: 'Equipment'
  },
  {
    id: 'm4',
    name: 'Consulting: Financial Audits',
    description: 'Full-service financial auditing and tax advisory for SMEs.',
    price: '₹25,000 / audit',
    sellerId: '201',
    sellerName: 'Sri Murugan Constructions',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80',
    type: 'Service'
  },
  {
    id: 'm5',
    name: 'Bulk Cotton Yarn',
    description: 'Premium quality cotton yarn suitable for export-grade garments. Minimum order 500kg.',
    price: '₹350 / kg',
    sellerId: '211',
    sellerName: 'Kongu Cotton Mills',
    category: 'Textile',
    image: 'https://images.unsplash.com/photo-1605280263929-1c429624440f?w=300&auto=format&fit=crop&q=80',
    type: 'Product'
  },
  {
    id: 'm6',
    name: 'Industrial Generator 500kVA',
    description: 'Reliable backup power generator for large manufacturing units. Includes installation.',
    price: '₹8,50,000',
    sellerId: '240',
    sellerName: 'Vel Industries',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1580975618451-2292f7041c2c?w=300&auto=format&fit=crop&q=80',
    type: 'Equipment'
  }
];

export interface NetworkGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  image: string;
}

export const mockNetworkGroups: NetworkGroup[] = [
  {
    id: 'g1',
    name: 'Manufacturing & Industrial',
    description: 'Network for manufacturers, steel works, and heavy industries.',
    memberCount: 154,
    category: 'Manufacturing',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'g2',
    name: 'Retail & Distribution',
    description: 'Connect with retail owners, grocery distributors, and wholesalers.',
    memberCount: 320,
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'g3',
    name: 'Tech & IT Services',
    description: 'For software companies, IT consultants, and digital marketers.',
    memberCount: 89,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'g4',
    name: 'Women in Business',
    description: 'Empowering women entrepreneurs across Tamil Nadu. Mentorship, networking, and support.',
    memberCount: 412,
    category: 'Networking',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'g5',
    name: 'Agri-Tech Innovators',
    description: 'For farmers, agritech startups, and distributors focusing on sustainable agriculture.',
    memberCount: 125,
    category: 'Agriculture & Farming',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'g6',
    name: 'Construction & Real Estate',
    description: 'Builders, architects, and suppliers collaborating on major infrastructure projects.',
    memberCount: 280,
    category: 'Construction & Engineering',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&auto=format&fit=crop&q=80'
  }
];
