export const SITE_NAME = 'Agarwal Events & Wedding Planners';
export const SITE_URL = 'https://agarwalevents.com';

export const CONTACT = {
  phones: ['+91-9392561785 - Vishal Agarwal, Director', '+91-7416361785'],
  email: 'agarwalevents42@gmail.com',
  whatsapp: ['919392561785', '917416361785'],
  whatsappLink:
    'https://wa.me/919392561785?text=Hello%21%20I%20would%20like%20to%20inquire%20about%20your%20event%20planning%20services.',
  instagram: 'https://www.instagram.com/agarwaleventsweddingplanner',
  instagramHandle: '@agarwaleventsweddingplanner',
  facebook: 'https://www.facebook.com/people/Vishal-Agarwal/pfbid02wEsxn9riWmZsdYQz9Df6K2QAZYGcRt311wq86yc3DdUDDVBJAhM59D1vxz5ofEf2l/?ref=PROFILE_EDIT_ig_profile_ac',
  facebookName: 'Agarwal Events & Wedding Planner',
  linkedin: 'https://www.linkedin.com/in/aewp1234',
};

export const LOCATIONS = ['All India Services Available'];

export const ABOUT_TEXT =
  'Agarwal Events & Wedding Planners are professional event and wedding planners known for crafting unforgettable celebrations with creativity, precision, and personal care. Our team focuses on turning dreams into reality — whether for grand weddings, intimate ceremonies, multicultural celebrations, or special events — by handling everything from conceptual planning to flawless execution.';

export const MISSION_QUOTE =
  'At Agarwal Events & Wedding Planners, our mission has always been to turn dreams into unforgettable celebrations. Every wedding and event we plan is a reflection of love, creativity, and meticulous attention to detail. We are committed to delivering excellence at every step, ensuring our clients enjoy a stress-free, seamless, and truly memorable experience. Your vision is our passion, and your special day is our promise.';

export const STATS = [
  { value: 100, suffix: '%', label: 'Customization' },
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Availability' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

export const WHY_CHOOSE_US = [
  { title: 'Creative Vision', description: 'Unique themes and custom designs tailored to your personality and style.' },
  { title: 'Precision Planning', description: 'Meticulous attention to every detail, from concept to flawless execution.' },
  { title: 'End-to-End Service', description: 'We handle everything — venue, décor, catering, entertainment, and logistics.' },
  { title: 'Budget Management', description: 'Transparent pricing and smart planning to maximize value within your budget.' },
  { title: 'Trusted Vendors', description: 'A curated network of top-quality vendors for every aspect of your event.' },
  { title: 'On-Site Team', description: 'Experienced coordinators present on-ground ensuring smooth, stress-free events.' },
];

export const HOW_IT_WORKS = [
  { step: 1, title: 'Consultation', description: 'We sit down to understand your vision, preferences, and budget for the perfect celebration.' },
  { step: 2, title: 'Planning', description: 'Our team creates a detailed plan covering venue, décor, catering, entertainment, and logistics.' },
  { step: 3, title: 'Coordination', description: 'We manage every vendor, timeline, and detail so you can relax and enjoy the journey.' },
  { step: 4, title: 'Celebration', description: 'On the big day, our on-site team ensures flawless execution of every moment.' },
];

// Instagram reels — clients can replace these later
export const INSTAGRAM_REELS = [
  { id: 1, url: 'https://www.instagram.com/reel/DVbIaqGk1NV/?igsh=MThvaHY3bmw1M2xlMA%3D%3D', headline: 'Grand Stage Décor', img: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352922/agarwal-events/gallery/rt2vk750rg7hmwg7znty.jpg' },
  { id: 2, url: 'https://www.instagram.com/reel/DVOsLlPEx4H/?igsh=dHVtaG1ndzE2bXc0', headline: 'Spiritual Wedding Ceremony', img: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352918/agarwal-events/gallery/xid9sgi55cfcjphqw2ev.jpg' },
  { id: 3, url: 'https://www.instagram.com/reel/DVLwkuNk_FV/?igsh=MWd3NG00MXplOTF0Mg%3D%3D', headline: 'Romantic Sangeet Celebration', img: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774355497/Screenshot_2026-03-24_175700_zg1wxc.png' },
  { id: 4, url: 'https://www.instagram.com/reel/DUs99yKE0jP/?igsh=bXpzYm15MHR3bGt1', headline: 'Reception decor', img: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774355566/Screenshot_2026-03-24_175949_q397tg.png' },
  { id: 5, url: 'https://www.instagram.com/reel/DT2XzVZE1E2/?igsh=MWVnZWVmZXl3amQ3OA%3D%3D', headline: 'Mehendi Carnival', img: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774355566/Screenshot_2026-03-24_175830_p8pami.png' },
  { id: 6, url: 'https://www.instagram.com/reel/DTNWqAME_gU/?igsh=MThvejBhMGI0d3Fqaw%3D%3D', headline: 'Royal sangeeth Elegance', img: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774355697/Screenshot_2026-03-24_180422_gt1ug0.png' },
 
];

// ─── ALL SERVICES FROM PDF ───────────────────────────────────
// Each category has: slug, name, image, description, subTypes[]
// Each subType has: name, services[] (array of strings)

export const ALL_SERVICES = [
  {
    slug: 'weddings',
    name: 'Weddings',
    image: 'https://images.unsplash.com/photo-1654157085616-cd80ec5fca2f',
    description: 'From intimate ceremonies to grand celebrations, we plan and execute every wedding function with perfection — handling décor, catering, entertainment, and coordination end-to-end.',
    subTypes: [
      {
        name: 'Bridal Shower',
        services: ['Concept and theme planning', 'Venue selection and booking', 'Décor design (balloons, floral arrangements, backdrops)', 'Game and activity planning', 'Bridal entry styling', 'Customized hampers and return gifts', 'Catering (high tea / brunch)', 'Photography and videography', 'Guest coordination'],
      },
      {
        name: 'Bachelorette Party',
        services: ['Destination or local venue planning', 'Travel and accommodation arrangements', 'Club/lounge reservations', 'Theme décor and props', 'DJ or live music', 'Entertainment and games', 'Customized merchandise (sashes, T-shirts)', 'Food and bar services', 'Photography and videography'],
      },
      {
        name: 'Roka Ceremony',
        services: ['Venue setup (home or banquet)', 'Traditional décor and floral arrangements', 'Ritual setup and materials', 'Catering services', 'Photography and videography', 'Guest management', 'Music and lighting arrangements'],
      },
      {
        name: 'Patrika Lekhan',
        services: ['Priest (Pandit) arrangement', 'Ritual setup and samagri', 'Traditional décor (rangoli, flowers)', 'Invitation design and printing coordination', 'Photography (optional)'],
      },
      {
        name: 'Vinayak Bhoj',
        services: ['Religious ceremony setup (Ganesh Pooja)', 'Seating and dining arrangements', 'Catering (satvik menu)', 'Traditional décor', 'Guest hospitality'],
      },
      
      {
        name: 'Chaak Ceremony',
        services: ['Cultural and traditional décor', 'Ritual setup and coordination', 'Folk music or dhol arrangements', 'Catering (regional cuisine)', 'Photography and videography'],
      },
     
      {
        name: 'Mehendi Ceremony',
        services: ['Mehendi artists (bridal and guest services)', 'Thematic décor (bohemian, colorful setups)', 'Lounge seating arrangements', 'Live music or dhol', 'Catering and refreshments', 'Bridal seating stage', 'Photography and videography'],
      },
      
      {
        name: 'Mehendi Carnival',
        services: ['Carnival-style décor and setup', 'Food stalls and live counters', 'Game booths and entertainment', 'Live performers (magicians, dancers, artists)', 'DJ and sound setup', 'Photo booths and interactive elements'],
      },
      
      {
        name: 'Haldi Ceremony',
        services: ['Theme décor (yellow/marigold-based)', 'Haldi setup and ritual materials', 'Floral jewelry for bride and groom', 'Music and dhol arrangements', 'Water and floral play arrangements', 'Photography and videography'],
      },
      {
        name: 'Phoolon Ki Holi',
        services: ['Floral décor and setup', 'Flower petal arrangements and sourcing', 'Petal showers and props', 'Live music and dhol', 'Photography and videography'],
      },
      {
        name: 'Sangeet / Engagement (Sagai)',
        services: ['Stage design and production', 'LED walls, lighting, and sound systems', 'Choreography and dance rehearsals', 'Artist management (DJ, host, performers)', 'Entry planning for couple and family', 'Catering and bar services', 'Photography and videography'],
      },
      {
        name: 'Pool Party',
        services: ['Poolside décor (tropical themes)', 'Safety and supervision arrangements', 'Props and pool accessories', 'DJ and sound system', 'Catering and bar setup', 'Changing and lounge facilities'],
      },
      {
        name: 'Cocktail Party',
        services: ['Bar setup with bartenders/mixologists', 'Premium glassware and service staff', 'Lounge seating arrangements', 'DJ or live band', 'Lighting and ambience design', 'Catering (finger food and starters)', 'Entry styling and guest handling'],
      },
      
      {
        name: 'Mayra / Mamera',
        services: ['Traditional décor and setup', 'Gift arrangement and display', 'Ritual coordination', 'Folk music or dhol', 'Catering services', 'Photography and videography'],
      },
      {
        name: 'Tilak Ceremony',
        services: ['Ritual setup and materials', 'Groom welcome arrangements', 'Gift and token management', 'Catering services', 'Photography and videography'],
      },
      {
        name: 'Baraat',
        services: ['Band, dhol, and DJ arrangements', 'Ghodi or luxury vehicle booking', 'Baraat props (umbrellas, LED items)', 'Groom entry planning', 'Fireworks (subject to permissions)', 'Crowd and procession management'],
      },
      {
        name: 'Shaadi (Wedding Ceremony)',
        services: ['Mandap design and décor', 'Priest and ritual coordination', 'Seating arrangements', 'Bridal and groom entry planning', 'Lighting and sound systems', 'Catering (multi-cuisine)', 'Guest hospitality and management', 'Photography and cinematic videography'],
      },
      {
        name: 'Ganga Aarti',
        services: ['Priest and ritual coordination', 'Venue setup (riverfront or themed setup)', 'Diyas, flowers, and décor', 'Sound system for chants', 'Guest seating arrangements', 'Photography and videography'],
      },
      {
        name: 'Jai Mala / Varmala',
        services: ['Stage setup and décor', 'Floral garland design', 'Special effects (cold pyrotechnics, fog)', 'Entry coordination', 'Music and cue management'],
      },
      {
        name: 'Mangal Phera',
        services: ['Sacred fire setup', 'Ritual materials and samagri', 'Priest coordination', 'Seating and lighting arrangements', 'Close-range videography'],
      },
      {
        name: 'Vidai',
        services: ['Departure planning and coordination', 'Vehicle decoration', 'Flower shower arrangements', 'Music and emotional setup', 'Family coordination'],
      },
      {
        name: 'Wedding House Décor',
        services: ['Entrance decoration', 'Interior room styling', 'Lighting setup (fairy lights, diyas)', 'Floral arrangements', 'Customized signage and elements'],
      },
      {
        name: 'Reception',
        services: ['Stage and backdrop design', 'Elegant décor themes', 'Live entertainment (band/DJ)', 'Catering (premium menu)', 'Guest welcome and management', 'Photography and videography'],
      },
      {
        name: 'Pag Phera',
        services: ['Intimate home setup', 'Minimal décor', 'Ritual coordination', 'Catering (light meals)', 'Photography (optional)'],
      },
    ],
    coreServices: [
      'Budget planning and cost management',
      'Vendor sourcing and coordination',
      'Invitation design (digital and printed)',
      'Logistics and transportation management',
      'Guest hospitality (accommodation, welcome kits)',
      'Makeup and styling coordination',
      'Permissions and licensing',
      'Timeline and event flow management',
    ],
  },
  {
    slug: 'birthdays',
    name: 'Birthdays',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    description: 'From newborn celebrations to milestone adult birthdays — we create themed, fun-filled, and memorable birthday experiences for every age group.',
    subTypes: [
      {
        name: 'New Born / Naming Ceremony',
        services: ['Theme planning (pastel, cartoon, traditional)', 'Venue setup (home or banquet)', 'Décor (balloons, floral setups, cradle decoration)', 'Naming ceremony arrangements (if applicable)', 'Customized cake design', 'Catering (light snacks / buffet)', 'Return gifts for guests', 'Photography and videography', 'Guest management'],
      },
      {
        name: "Kids' Birthday Parties",
        services: ['Theme-based décor (cartoons, superheroes, fantasy)', 'Activity zones (games, play areas)', 'Entertainment (magician, clown, puppet show)', 'Cake table setup', 'Customized invitations and return gifts', 'Catering (kid-friendly menu)', 'DJ or music setup', 'Photography and videography'],
      },
      {
        name: 'Teen Birthday Parties',
        services: ['Trend-based themes (neon, Hollywood, pool party)', 'DJ and sound system', 'Dance floor setup', 'Lighting effects', 'Food and beverage arrangements', 'Lounge seating', 'Photography and reels creation', 'Entry and surprise planning'],
      },
      {
        name: 'Adult Birthday Parties',
        services: ['Concept and theme planning (elegant, retro, luxury)', 'Venue selection', 'Décor and ambiance lighting', 'Live music or DJ', 'Catering and bar services', 'Cake and dessert setup', 'Photography and videography', 'Guest handling'],
      },
    ],
    coreServices: [
      'Budget planning and management',
      'Vendor sourcing and coordination',
      'Invitation design and distribution',
      'Logistics and transportation',
      'Guest hospitality and RSVP management',
    ],
  },
  {
    slug: 'anniversary',
    name: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80',
    description: 'Celebrating milestones of love — from romantic 1st anniversaries to grand Silver and Golden Jubilee celebrations, planned with elegance and heart.',
    subTypes: [
      {
        name: '1st Anniversary',
        services: ['Romantic theme décor', 'Venue setup (home or banquet)', 'Couple entry planning', 'Cake and dessert arrangements', 'Photography and videography', 'Catering services', 'Surprise elements (video montage, performances)'],
      },
      {
        name: '25th Anniversary (Silver Jubilee)',
        services: ['Elegant theme planning', 'Stage and backdrop design', 'Family performances and coordination', 'Audio-visual presentations', 'Catering (multi-cuisine)', 'Photography and videography', 'Guest hospitality'],
      },
      {
        name: '50th Anniversary (Golden Jubilee)',
        services: ['Grand theme and luxury décor', 'Stage and seating arrangements', 'Tribute videos and speeches', 'Live music or band', 'Catering (premium services)', 'Photography and cinematic videography', 'Guest management and logistics'],
      },
      {
        name: 'Other Anniversaries',
        services: ['Customized theme planning', 'Venue and décor setup', 'Catering and entertainment', 'Photography and videography', 'Guest coordination'],
      },
    ],
    coreServices: [
      'Budget planning and management',
      'Vendor sourcing and coordination',
      'Invitation design and distribution',
      'Logistics and transportation',
    ],
  },
  {
    slug: 'retirement-party',
    name: 'Retirement Party',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    description: 'Honoring a lifetime of dedication with a memorable farewell celebration — from formal corporate farewells to intimate family gatherings.',
    subTypes: [
      {
        name: 'Retirement Celebration',
        services: ['Theme planning (formal or celebratory)', 'Venue booking', 'Stage and podium setup', 'Audio-visual arrangements for speeches', 'Video presentations and memory highlights', 'Catering services', 'Photography and videography', 'Guest management'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'corporate-events',
    name: 'Corporate Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'Professional event management for conferences, product launches, team-building activities, award functions, and corporate parties — executed with precision.',
    subTypes: [
      {
        name: 'Corporate Event Management',
        services: ['Event conceptualization and branding', 'Venue sourcing and setup', 'Stage design and production', 'Audio-visual equipment (LED screens, microphones)', 'Registration and guest management', 'Corporate branding (standees, banners)', 'Catering services', 'Entertainment (hosts, speakers, performers)', 'Photography and videography', 'Logistics and coordination'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'festivities',
    name: 'Festivities',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    description: 'Celebrate festivals in grand style — from colorful Holi events and glamorous New Year\'s Eve parties to warm Christmas gatherings.',
    subTypes: [
      {
        name: 'Holi Events',
        services: ['Theme décor (color-based setups)', 'Organic colors arrangement', 'Rain dance setup', 'DJ and sound system', 'Food stalls and live counters', 'Security and safety arrangements', 'Photography and videography'],
      },
      {
        name: "New Year's Eve (NYE)",
        services: ['Theme-based décor (glam, neon, luxury)', 'DJ, live band, or performances', 'Countdown setup', 'Lighting and special effects', 'Catering and bar services', 'Entry and guest management', 'Photography and videography'],
      },
      {
        name: 'Christmas Events',
        services: ['Christmas-themed décor (tree, lights, props)', 'Santa Claus and entertainment activities', 'Gift exchange arrangements', 'Catering (festive menu)', 'Music and performances', 'Photography and videography'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'get-togethers',
    name: 'Get Togethers',
    image: 'https://images.unsplash.com/photo-1590650046871-92c887180603',
    description: 'Simple yet special gatherings — whether at home, a restaurant, or outdoors — planned with warmth and care for quality time with loved ones.',
    subTypes: [
      {
        name: 'Get Together Planning',
        services: ['Venue selection (home, restaurant, outdoor)', 'Simple décor and seating arrangements', 'Catering services', 'Music setup', 'Guest coordination', 'Photography (optional)'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'mata-ki-chowki',
    name: 'Mata Ki Chowki',
    image: 'https://images.herzindagi.info/image/2022/Sep/how-to-decorate-mata-ki-chowki-for-navratri.jpg',
    description: 'Sacred and devotional Mata Ki Chowki organized with traditional décor, bhajan mandali, and complete ritual arrangements.',
    subTypes: [
      {
        name: 'Mata Ki Chowki',
        services: ['Priest and bhajan mandali arrangement', 'Stage and seating setup', 'Floral and traditional décor', 'Sound system for bhajans', 'Prasad distribution', 'Catering (satvik food)', 'Guest management'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'jaagran',
    name: 'Jaagran',
    image: 'https://gaurishankarmandir.ca/wp-content/uploads/2022/12/jagran.jpg',
    description: 'Overnight devotional Jaagran events with live bhajan singers, stage setup, religious décor, and complete hospitality arrangements.',
    subTypes: [
      {
        name: 'Jaagran Event',
        services: ['Bhajan singers and live band arrangement', 'Stage and lighting setup', 'Religious décor', 'Sound system for overnight event', 'Seating arrangements', 'Prasad and catering services', 'Security and crowd management'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'baby-showers',
    name: 'Baby Showers',
    image: 'https://static.vecteezy.com/system/resources/previews/023/802/191/large_2x/baby-shower-cute-background-illustration-ai-generative-free-photo.jpg',
    description: 'Beautiful and memorable baby shower celebrations with themed décor, fun games, delicious food, and heartfelt moments.',
    subTypes: [
      {
        name: 'Baby Shower Celebration',
        services: ['Theme planning (pastel, floral, gender-neutral)', 'Venue setup', 'Décor (balloons, backdrops, props)', 'Games and activities', 'Catering services', 'Cake and dessert table', 'Return gifts', 'Photography and videography'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'house-warming',
    name: 'House Warming (Griha Pravesh)',
    image: 'https://www.lofarisbackdrop.com/cdn/shop/files/sheep-indian-family-green-housewarming-backdrop-custom-made-free-shipping-265.jpg?v=1692958528',
    description: 'Auspicious Griha Pravesh ceremonies with traditional pooja setup, beautiful entrance décor, and warm hospitality for your guests.',
    subTypes: [
      {
        name: 'Griha Pravesh Ceremony',
        services: ['Priest and ritual coordination', 'Pooja setup and samagri', 'Entrance and home décor', 'Catering (satvik or regular meals)', 'Guest hospitality', 'Photography and videography'],
      },
    ],
    coreServices: [],
  },
  {
    slug: 'customize-event',
    name: 'Customize Event',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    description: 'Plan your own customized event based on your unique needs, preferences, and ideas.',
    subTypes: [
      {
        name: 'Custom Event Planning',
        services: [
          'Personalized event consultation',
          'Custom theme and concept design',
          'Flexible vendor selection',
          'Budget-based planning',
          'End-to-end coordination',
        ],
      },
    ],
    coreServices: [],
  }
];

export const EVENT_TYPES = ALL_SERVICES.map((s) => s.name);

export const GALLERY_CATEGORIES = ['All', 'Weddings', 'Mehendi', 'Haldi', 'Sangeet', 'Reception', 'Corporate', 'Birthday'];

export const FAQ_CATEGORIES = ['All', 'General', 'Wedding', 'Event Services', 'Booking & Process', 'Cost & Payment', 'Execution', 'Additional'];

export const SEED_FAQS = [
  { question: 'What services does Agarwal Events & Wedding Planners provide?', answer: 'We offer complete event planning and execution services including weddings, pre-wedding functions, birthday parties, corporate events, religious events, and social gatherings.', category: 'General' },
  { question: 'Do you provide end-to-end event planning?', answer: 'Yes, we handle everything from concept development, venue selection, décor, catering coordination, entertainment, logistics, and on-ground execution.', category: 'General' },
  { question: 'What wedding services do you offer?', answer: 'We provide planning and execution for all wedding functions including engagement, mehendi, haldi, sangeet, wedding, and reception.', category: 'Wedding' },
  { question: 'Do you manage destination weddings?', answer: 'Yes, we specialize in destination weddings including venue booking, guest management, travel arrangements, and complete coordination.', category: 'Wedding' },
  { question: 'Can you work within a specific budget?', answer: 'Yes, we customize every wedding based on your budget while ensuring quality and memorable experiences.', category: 'Wedding' },
  { question: 'Do you organize birthday and anniversary events?', answer: "Yes, we organize events for all age groups including kids' birthdays, milestone anniversaries, and private celebrations.", category: 'Event Services' },
  { question: 'Do you handle corporate events?', answer: 'Yes, we manage conferences, product launches, team-building events, award functions, and corporate parties.', category: 'Event Services' },
  { question: 'Do you organize religious events?', answer: 'Yes, we organize events like Mata Ki Chowki, Jaagran, housewarming ceremonies, and baby showers.', category: 'Event Services' },
  { question: 'How early should we book your services?', answer: 'It is recommended to book at least 2–6 months in advance, especially for weddings and large-scale events.', category: 'Booking & Process' },
  { question: 'What is the booking process?', answer: 'The process includes consultation, requirement discussion, proposal sharing, budget finalization, and confirmation with advance payment.', category: 'Booking & Process' },
  { question: 'Do you offer partial planning services?', answer: 'Yes, we offer both full-service planning and partial/event-day coordination services.', category: 'Booking & Process' },
  { question: 'How do you charge for your services?', answer: 'Our charges depend on the scale, type of event, services required, and customization level.', category: 'Cost & Payment' },
  { question: 'Do you provide packages?', answer: 'Yes, we offer customizable packages based on client needs and event size.', category: 'Cost & Payment' },
  { question: 'What are the payment terms?', answer: 'A percentage of the total cost is taken as advance, with the remaining amount paid in agreed milestones.', category: 'Cost & Payment' },
  { question: 'Will your team be present during the event?', answer: 'Yes, our team is present on-site to ensure smooth execution and handle any last-minute requirements.', category: 'Execution' },
  { question: 'Do you handle last-minute changes?', answer: 'We always try to accommodate last-minute changes depending on feasibility.', category: 'Execution' },
  { question: 'Can we choose our own vendors?', answer: 'Yes, you can bring your own vendors or choose from our trusted network.', category: 'Additional' },
  { question: 'Do you provide décor and theme design services?', answer: 'Yes, we specialize in customized décor, themes, and creative concepts.', category: 'Additional' },
  { question: 'Do you handle guest management?', answer: 'Yes, we manage invitations, guest hospitality, accommodation, and logistics.', category: 'Additional' },
];

export const INQUIRY_STATUSES = ['new', 'contacted', 'booked', 'closed'];

export const BUDGET_RANGES = [
  'Under ₹1,00,000', '₹1,00,000 – ₹3,00,000', '₹3,00,000 – ₹5,00,000',
  '₹5,00,000 – ₹10,00,000', '₹10,00,000 – ₹25,00,000', '₹25,00,000+',
];

export const GUEST_COUNT_OPTIONS = ['Under 50', '50 – 100', '100 – 300', '300 – 500', '500 – 1000', '1000+'];
