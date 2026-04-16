/**
 * Agarwal Events — Full Seed Script
 * 1. Uploads all images to Cloudinary (unsigned upload preset)
 * 2. Inserts all seed data into Supabase using service_role key
 *
 * Run: node scripts/seed.mjs
 */

import { createClient } from '@supabase/supabase-js';
import FormData from 'form-data';
import fetch from 'node-fetch';
import https from 'https';

// ─── CONFIG ──────────────────────────────────────────────────
const SUPABASE_URL = 'https://mcaskmovwdkehreksygq.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jYXNrbW92d2RrZWhyZWtzeWdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzkyNjY5NiwiZXhwIjoyMDg5NTAyNjk2fQ.zkeQ0tozcfxRtLH59U4O5lLprnQnoCmmmc4qSq91EEE';
const CLOUDINARY_CLOUD = 'dbq4mjfk6';
const CLOUDINARY_PRESET = 'agarwal-events';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── HELPERS ─────────────────────────────────────────────────
function log(msg) { console.log(`\n✦ ${msg}`); }
function ok(msg) { console.log(`  ✓ ${msg}`); }
function fail(msg) { console.error(`  ✗ ${msg}`); }

async function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function uploadToCloudinary(imageUrl, folder, filename) {
  try {
    const buffer = await downloadBuffer(imageUrl);
    const form = new FormData();
    form.append('file', buffer, { filename: `${filename}.jpg`, contentType: 'image/jpeg' });
    form.append('upload_preset', CLOUDINARY_PRESET);
    form.append('folder', folder);
    form.append('public_id', filename);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: form });
    const data = await res.json();
    if (data.secure_url) {
      ok(`Uploaded → ${data.secure_url}`);
      return data.secure_url;
    }
    fail(`Cloudinary error: ${JSON.stringify(data)}`);
    return imageUrl; // fallback to original URL
  } catch (e) {
    fail(`Upload failed for ${filename}: ${e.message}`);
    return imageUrl; // fallback
  }
}

async function clearTable(table) {
  const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) fail(`Clear ${table}: ${error.message}`);
  else ok(`Cleared ${table}`);
}

// ─── IMAGE SOURCES ────────────────────────────────────────────
// High-quality Unsplash images by category
const IMAGE_SOURCES = {
  // Services (one hero image per parent category)
  services: {
    weddings:        'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=90',
    birthdays:       'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=90',
    anniversary:     'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=90',
    retirement:      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90',
    corporate:       'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=90',
    festivities:     'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=90',
    gatherings:      'https://images.unsplash.com/photo-1529543544282-ea4407407b2d?w=1200&q=90',
    mata_ki_chowki:  'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=1200&q=90',
    jaagran:         'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=1200&q=90',
    baby_shower:     'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200&q=90',
    house_warming:   'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=90',
  },

  // Gallery — best realistic Indian wedding/event photos
  gallery: [
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=90', caption: 'Grand wedding mandap décor', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=900&q=90', caption: 'Bridal mehendi ceremony', category: 'Mehendi' },
    { url: 'https://images.unsplash.com/photo-1604604557852-ba950f5fb872?w=900&q=90', caption: 'Vibrant haldi celebration', category: 'Haldi' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=90', caption: 'Sangeet night performance', category: 'Sangeet' },
    { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=90', caption: 'Elegant wedding reception', category: 'Reception' },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=90', caption: 'Wedding floral décor', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=90', caption: 'Wedding ceremony setup', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=90', caption: 'Corporate awards gala', category: 'Corporate' },
    { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=90', caption: 'Birthday celebration décor', category: 'Birthday' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=90', caption: 'Festival celebration night', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=900&q=90', caption: 'Anniversary dinner setup', category: 'Reception' },
    { url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=900&q=90', caption: 'Baby shower decoration', category: 'Birthday' },
    { url: 'https://images.unsplash.com/photo-1529543544282-ea4407407b2d?w=900&q=90', caption: 'Social gathering event', category: 'Corporate' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=90', caption: 'Griha pravesh ceremony', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=900&q=90', caption: 'Devotional night event', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1604604557852-ba950f5fb872?w=900&q=90', caption: 'Floral shower ceremony', category: 'Mehendi' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=90', caption: 'DJ night entertainment', category: 'Sangeet' },
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=90', caption: 'Wedding stage decoration', category: 'Reception' },
    { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=90', caption: 'Kids birthday party', category: 'Birthday' },
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=90', caption: 'Conference event management', category: 'Corporate' },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=90', caption: 'Varmala ceremony moments', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=900&q=90', caption: 'Mehendi art details', category: 'Mehendi' },
    { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=90', caption: 'Baraat procession', category: 'Weddings' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=90', caption: 'New Year gala party', category: 'Birthday' },
  ],

  // Testimonial couple images
  testimonials: [
    'https://images.unsplash.com/photo-1529932570760-12c87e96cdf1?w=400&q=90',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=90',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=90',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=90',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=90',
  ],
};

// ─── MAIN SEED ────────────────────────────────────────────────
async function seed() {
  console.log('\n══════════════════════════════════════════════');
  console.log('  AGARWAL EVENTS — DATABASE & CLOUDINARY SEED ');
  console.log('══════════════════════════════════════════════\n');

  // ── Step 1: Clear existing data ──
  log('Clearing existing data...');
  await clearTable('services');
  await clearTable('gallery');
  await clearTable('testimonials');
  await clearTable('faqs');
  await clearTable('packages');

  // ── Step 2: Upload service images to Cloudinary ──
  log('Uploading service images to Cloudinary...');
  const serviceImageUrls = {};
  for (const [key, url] of Object.entries(IMAGE_SOURCES.services)) {
    console.log(`  → Uploading ${key}...`);
    serviceImageUrls[key] = await uploadToCloudinary(url, 'agarwal-events/services', `service-${key}`);
    await sleep(500);
  }

  // ── Step 3: Insert services ──
  log('Inserting services...');
  const services = [
    { title: 'Weddings', slug: 'weddings', category: 'Weddings', description: 'From intimate ceremonies to grand celebrations, we plan and execute every wedding function with perfection — handling décor, catering, entertainment, and coordination end-to-end.', is_wedding: true, is_featured: true, cover_image_url: serviceImageUrls.weddings, sort_order: 1 },
    { title: 'Birthdays', slug: 'birthdays', category: 'Birthdays', description: 'From newborn celebrations to milestone adult birthdays — we create themed, fun-filled, and memorable birthday experiences for every age group.', is_wedding: false, is_featured: true, cover_image_url: serviceImageUrls.birthdays, sort_order: 2 },
    { title: 'Anniversary', slug: 'anniversary', category: 'Anniversary', description: 'Celebrating milestones of love — from romantic 1st anniversaries to grand Silver and Golden Jubilee celebrations, planned with elegance and heart.', is_wedding: false, is_featured: true, cover_image_url: serviceImageUrls.anniversary, sort_order: 3 },
    { title: 'Retirement Party', slug: 'retirement-party', category: 'Retirement Party', description: 'Honoring a lifetime of dedication with a memorable farewell celebration — from formal corporate farewells to intimate family gatherings.', is_wedding: false, is_featured: false, cover_image_url: serviceImageUrls.retirement, sort_order: 4 },
    { title: 'Corporate Events', slug: 'corporate-events', category: 'Corporate Events', description: 'Professional event management for conferences, product launches, team-building activities, award functions, and corporate parties — executed with precision.', is_wedding: false, is_featured: true, cover_image_url: serviceImageUrls.corporate, sort_order: 5 },
    { title: 'Festivities', slug: 'festivities', category: 'Festivities', description: "Celebrate festivals in grand style — from colorful Holi events and glamorous New Year's Eve parties to warm Christmas gatherings.", is_wedding: false, is_featured: false, cover_image_url: serviceImageUrls.festivities, sort_order: 6 },
    { title: 'Get Togethers', slug: 'get-togethers', category: 'Get Togethers', description: 'Simple yet special gatherings — whether at home, a restaurant, or outdoors — planned with warmth and care for quality time with loved ones.', is_wedding: false, is_featured: false, cover_image_url: serviceImageUrls.gatherings, sort_order: 7 },
    { title: 'Mata Ki Chowki', slug: 'mata-ki-chowki', category: 'Mata Ki Chowki', description: 'Sacred and devotional Mata Ki Chowki organized with traditional décor, bhajan mandali, and complete ritual arrangements.', is_wedding: false, is_featured: false, cover_image_url: serviceImageUrls.mata_ki_chowki, sort_order: 8 },
    { title: 'Jaagran', slug: 'jaagran', category: 'Jaagran', description: 'Overnight devotional Jaagran events with live bhajan singers, stage setup, religious décor, and complete hospitality arrangements.', is_wedding: false, is_featured: false, cover_image_url: serviceImageUrls.jaagran, sort_order: 9 },
    { title: 'Baby Showers', slug: 'baby-showers', category: 'Baby Showers', description: 'Beautiful and memorable baby shower celebrations with themed décor, fun games, delicious food, and heartfelt moments.', is_wedding: false, is_featured: false, cover_image_url: serviceImageUrls.baby_shower, sort_order: 10 },
    { title: 'House Warming (Griha Pravesh)', slug: 'house-warming', category: 'House Warming', description: 'Auspicious Griha Pravesh ceremonies with traditional pooja setup, beautiful entrance décor, and warm hospitality for your guests.', is_wedding: false, is_featured: false, cover_image_url: serviceImageUrls.house_warming, sort_order: 11 },
  ];
  const { error: servErr } = await supabase.from('services').insert(services);
  if (servErr) fail(`Services insert: ${servErr.message}`);
  else ok(`Inserted ${services.length} services`);

  // ── Step 4: Upload gallery images to Cloudinary ──
  log('Uploading gallery images to Cloudinary...');
  const galleryRows = [];
  for (let i = 0; i < IMAGE_SOURCES.gallery.length; i++) {
    const g = IMAGE_SOURCES.gallery[i];
    console.log(`  → Uploading gallery image ${i + 1}/${IMAGE_SOURCES.gallery.length}: ${g.caption}`);
    const uploadedUrl = await uploadToCloudinary(g.url, 'agarwal-events/gallery', `gallery-${String(i + 1).padStart(2, '0')}`);
    galleryRows.push({
      image_url: uploadedUrl,
      caption: g.caption,
      category: g.category,
      is_featured: i < 8,
      sort_order: i + 1,
    });
    await sleep(400);
  }

  // ── Step 5: Insert gallery ──
  log('Inserting gallery data...');
  const { error: galErr } = await supabase.from('gallery').insert(galleryRows);
  if (galErr) fail(`Gallery insert: ${galErr.message}`);
  else ok(`Inserted ${galleryRows.length} gallery images`);

  // ── Step 6: Upload testimonial images to Cloudinary ──
  log('Uploading testimonial images to Cloudinary...');
  const testImgUrls = [];
  for (let i = 0; i < IMAGE_SOURCES.testimonials.length; i++) {
    console.log(`  → Uploading testimonial image ${i + 1}...`);
    const url = await uploadToCloudinary(IMAGE_SOURCES.testimonials[i], 'agarwal-events/testimonials', `testimonial-${i + 1}`);
    testImgUrls.push(url);
    await sleep(400);
  }

  // ── Step 7: Insert testimonials ──
  log('Inserting testimonials...');
  const testimonials = [
    { client_name: 'Priya & Rahul Sharma', event_type: 'Wedding', review_text: 'Agarwal Events made our wedding absolutely magical. Every detail from the mandap décor to the vidai arrangements was perfect. The team was professional, creative, and incredibly supportive throughout. Truly a dream come true!', rating: 5, couple_image_url: testImgUrls[0], is_featured: true },
    { client_name: 'Neha & Amit Verma', event_type: 'Wedding Reception', review_text: 'The team went above and beyond for our reception. The décor was stunning, the food was excellent, and the coordination was flawless. Our guests are still talking about it months later!', rating: 5, couple_image_url: testImgUrls[1], is_featured: true },
    { client_name: 'Kavya & Rohan Mehta', event_type: 'Mehendi & Sangeet', review_text: 'A vibrant, joyful mehendi celebration followed by the most spectacular sangeet night — all thanks to the amazing planning by Agarwal Events. The stage design and entertainment were world-class.', rating: 5, couple_image_url: testImgUrls[2], is_featured: true },
    { client_name: 'Sunita & Rajesh Agarwal', event_type: '25th Anniversary', review_text: 'Our silver jubilee anniversary was organized with such elegance and thoughtfulness. Every small detail was taken care of. The entire family was overwhelmed with joy. Thank you so much!', rating: 5, couple_image_url: testImgUrls[3], is_featured: false },
    { client_name: 'Ananya & Vikram Singh', event_type: 'Destination Wedding', review_text: 'We had a destination wedding and were worried about coordination, but Agarwal Events handled everything seamlessly. The décor was breathtaking and the entire experience was stress-free.', rating: 5, couple_image_url: testImgUrls[4], is_featured: false },
    { client_name: 'Meera Reddy', event_type: 'Corporate Annual Gala', review_text: 'Excellent event management for our annual corporate gala. Everything was on schedule, the stage setup was impressive, and the catering coordination was top-notch. Highly recommended!', rating: 5, couple_image_url: testImgUrls[5], is_featured: false },
  ];
  const { error: testErr } = await supabase.from('testimonials').insert(testimonials);
  if (testErr) fail(`Testimonials insert: ${testErr.message}`);
  else ok(`Inserted ${testimonials.length} testimonials`);

  // ── Step 8: Insert FAQs ──
  log('Inserting FAQs...');
  const faqs = [
    { question: 'What services does Agarwal Events & Wedding Planners provide?', answer: 'We offer complete event planning and execution services including weddings (all pre and post-wedding functions), birthday parties, anniversaries, corporate events, religious events like Mata Ki Chowki and Jaagran, house warming ceremonies, baby showers, and social gatherings.', category: 'General', sort_order: 1 },
    { question: 'Do you provide end-to-end event planning?', answer: 'Yes, we handle everything from concept development, venue selection, décor design, catering coordination, entertainment, logistics, guest management, and complete on-ground execution.', category: 'General', sort_order: 2 },
    { question: 'Where are you located and which areas do you serve?', answer: 'We are based in Hyderabad and serve clients across Telangana and Pune. We also manage destination weddings and events across India.', category: 'General', sort_order: 3 },
    { question: 'How can I contact Agarwal Events?', answer: 'You can reach us at +91-9392561785 or +91-7416361785, email us at agarwalevents42@gmail.com, or message us on WhatsApp. You can also fill out the inquiry form on our website.', category: 'General', sort_order: 4 },
    { question: 'What wedding services do you offer?', answer: 'We provide planning and execution for all wedding functions including Bridal Shower, Bachelorette Party, Roka, Mehendi, Haldi, Phoolon Ki Holi, Sangeet, Engagement, Cocktail Party, Baraat, Shaadi, Varmala, Phera, Vidai, Reception, and more.', category: 'Wedding', sort_order: 5 },
    { question: 'Do you manage destination weddings?', answer: 'Yes, we specialize in destination weddings. We handle venue scouting, travel and accommodation arrangements, vendor coordination, guest management, and complete on-site execution at any destination.', category: 'Wedding', sort_order: 6 },
    { question: 'Can you work within a specific budget for a wedding?', answer: 'Absolutely. We customize every wedding plan based on your vision and budget. We are transparent about costs and work smart to maximize value without compromising on quality.', category: 'Wedding', sort_order: 7 },
    { question: 'Do you handle multicultural or inter-faith weddings?', answer: 'Yes, we have experience planning multicultural and inter-faith weddings, respecting and beautifully blending different traditions and rituals.', category: 'Wedding', sort_order: 8 },
    { question: 'Do you organize birthday parties for children?', answer: 'Yes, we specialize in themed birthday parties for all ages — from new-born naming ceremonies and kids\' cartoon-themed parties to glamorous teen and adult birthday celebrations.', category: 'Event Services', sort_order: 9 },
    { question: 'Do you handle corporate events?', answer: 'Yes, we manage conferences, product launches, team-building activities, award functions, and corporate parties with complete professionalism, including branding, AV setup, catering, and logistics.', category: 'Event Services', sort_order: 10 },
    { question: 'Do you organize religious events like Mata Ki Chowki and Jaagran?', answer: 'Yes, we organize devotional events including Mata Ki Chowki and Jaagran with proper priest arrangements, bhajan mandali, stage and lighting setup, sound systems, and catering.', category: 'Event Services', sort_order: 11 },
    { question: 'How early should we book your services?', answer: 'We recommend booking at least 2–6 months in advance for weddings and large-scale events. For smaller events, 4–6 weeks notice is usually sufficient, though earlier is always better for availability.', category: 'Booking & Process', sort_order: 12 },
    { question: 'What is the booking process?', answer: 'The process starts with a free consultation to understand your requirements. We then share a detailed proposal and quote. Once approved, a booking confirmation is done with an advance payment, and planning begins.', category: 'Booking & Process', sort_order: 13 },
    { question: 'Do you offer partial planning services or just full event management?', answer: 'We offer both full-service event planning and partial/event-day coordination services. If you\'ve done some planning yourself and just need execution support, we can help with that too.', category: 'Booking & Process', sort_order: 14 },
    { question: 'How do you charge for your services?', answer: 'Our charges depend on the scale of the event, the number of services required, event duration, and customization level. We provide a detailed, transparent quote after the initial consultation.', category: 'Cost & Payment', sort_order: 15 },
    { question: 'Do you provide packages or is everything custom-priced?', answer: 'We offer both customizable packages and fully bespoke pricing depending on the event. Our team will recommend the best approach based on your requirements and budget.', category: 'Cost & Payment', sort_order: 16 },
    { question: 'What are the payment terms?', answer: 'Typically, an advance payment is required to confirm the booking, with the remaining amount paid in agreed installments leading up to the event. The full balance is settled before or on the event day.', category: 'Cost & Payment', sort_order: 17 },
    { question: 'Will your team be present during the event?', answer: 'Yes, our experienced team is present on-site throughout the event to ensure smooth execution, manage vendors, handle any last-minute requirements, and make sure everything runs as planned.', category: 'Execution', sort_order: 18 },
    { question: 'How do you handle last-minute changes or emergencies?', answer: 'We always have contingency plans in place. Our on-site team is trained to handle last-minute changes and emergencies calmly and efficiently, ensuring the event goes on without disruption.', category: 'Execution', sort_order: 19 },
    { question: 'Can we choose our own vendors or must we use yours?', answer: 'You are welcome to bring your own preferred vendors. Alternatively, our trusted network of vendors — caterers, decorators, photographers, entertainers — are thoroughly vetted and reliable.', category: 'Additional', sort_order: 20 },
    { question: 'Do you provide décor and theme design services?', answer: 'Yes, theme conceptualization and décor design is one of our core strengths. From floral arrangements and mandap design to lighting, backdrop design, and entrance décor, we create stunning visual experiences.', category: 'Additional', sort_order: 21 },
    { question: 'Do you handle guest accommodation and travel arrangements?', answer: 'Yes, for large weddings and events we coordinate guest accommodation, airport transfers, and local transportation to ensure a seamless experience for all attendees.', category: 'Additional', sort_order: 22 },
  ];
  const { error: faqErr } = await supabase.from('faqs').insert(faqs);
  if (faqErr) fail(`FAQs insert: ${faqErr.message}`);
  else ok(`Inserted ${faqs.length} FAQs`);

  // ── Step 9: Done ──
  console.log('\n══════════════════════════════════════════════');
  console.log('  ✓ SEED COMPLETE — All data inserted!        ');
  console.log('══════════════════════════════════════════════\n');
  console.log('Summary:');
  console.log(`  • ${services.length} services with Cloudinary images`);
  console.log(`  • ${galleryRows.length} gallery photos with Cloudinary images`);
  console.log(`  • ${testimonials.length} testimonials with Cloudinary images`);
  console.log(`  • ${faqs.length} FAQs`);
  console.log('\nYour admin panel at /admin should now be fully populated.\n');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

seed().catch(console.error);
