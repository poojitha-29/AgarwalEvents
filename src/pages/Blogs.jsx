import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { getBlogs } from '../services/blogsService';

const SAMPLE_BLOGS = [
  {
    id: 'sample-1',
    title: 'How to Plan Your Dream Wedding in Hyderabad',
    slug: 'plan-dream-wedding-hyderabad',
    excerpt: 'From selecting the perfect venue to choosing the right décor, we guide you through every step of crafting an unforgettable wedding day in the City of Pearls.',
    cover_image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    category: 'Weddings',
    published_at: '2025-12-15T00:00:00Z',
    content: 'Planning a dream wedding in Hyderabad is an exciting journey...',
  },
  {
    id: 'sample-2',
    title: 'Corporate Event Trends to Watch in 2026',
    slug: 'corporate-event-trends-2026',
    excerpt: 'Discover the latest innovations shaping corporate gatherings — from hybrid formats and experiential activations to sustainable practices that impress clients and employees alike.',
    cover_image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Corporate',
    published_at: '2025-11-20T00:00:00Z',
    content: 'Corporate events have evolved dramatically...',
  },
  {
    id: 'sample-3',
    title: 'Birthday Party Ideas That Will Wow Your Guests',
    slug: 'birthday-party-ideas-wow-guests',
    excerpt: 'Whether you are celebrating a milestone birthday or a child\'s special day, these creative themes and decoration ideas will transform any birthday into a magical memory.',
    cover_image_url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    category: 'Birthdays',
    published_at: '2025-10-05T00:00:00Z',
    content: 'Birthday parties are a celebration of life...',
  },
  {
    id: 'sample-4',
    title: 'The Art of Floral Décor: Elevating Every Event',
    slug: 'art-of-floral-decor',
    excerpt: 'Flowers speak a language all their own. Learn how our expert florists use seasonal blooms, colour palettes, and arrangement techniques to create breathtaking event spaces.',
    cover_image_url: 'https://images.unsplash.com/photo-1487530811015-780c2fb4e2ac?w=800&q=80',
    category: 'Event Tips',
    published_at: '2025-09-18T00:00:00Z',
    content: 'Floral décor is the heartbeat of any great event...',
  },
  {
    id: 'sample-5',
    title: '10 Questions to Ask Your Wedding Planner',
    slug: '10-questions-wedding-planner',
    excerpt: 'Choosing the right wedding planner can make or break your big day. Here are the essential questions every couple should ask before signing on the dotted line.',
    cover_image_url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    category: 'Event Tips',
    published_at: '2025-08-30T00:00:00Z',
    content: 'Finding the perfect wedding planner takes research...',
  },
  {
    id: 'sample-6',
    title: 'Sangeet Night: Making It a Night to Remember',
    slug: 'sangeet-night-memorable',
    excerpt: 'The Sangeet is where the celebration truly begins. From choreographed performances to live music and lighting magic, here\'s how to create an electric atmosphere.',
    cover_image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    category: 'Weddings',
    published_at: '2025-07-12T00:00:00Z',
    content: 'Sangeet nights are a cherished part of South Asian weddings...',
  },
];

const CATEGORIES = ['All', 'Weddings', 'Corporate', 'Birthdays', 'Event Tips'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const BlogCard = memo(function BlogCard({ blog, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const slug = blog.slug || generateSlug(blog.title);

  return (
    <motion.div
      ref={ref}
      custom={index % 3}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <Link to={`/blogs/${slug}`} className="group block h-full">
        <motion.article
          whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(139, 0, 0, 0.14)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-2xl overflow-hidden shadow-md border border-beige-100 h-full flex flex-col"
        >
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={blog.cover_image_url}
              alt={blog.title}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.08 + 0.3 }}
              className="absolute top-4 left-4"
            >
              <span className="bg-gold-500 text-maroon-900 text-xs font-lato font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {blog.category}
              </span>
            </motion.div>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-3.5 h-3.5 text-gold-500" />
              <span className="font-lato text-xs text-neutral-400">
                {formatDate(blog.published_at)}
              </span>
            </div>

            <h3 className="font-cormorant text-xl font-bold text-maroon-700 mb-3 leading-snug group-hover:text-maroon-600 transition-colors line-clamp-2">
              {blog.title}
            </h3>

            <p className="font-lato text-sm text-neutral-500 leading-relaxed line-clamp-3 flex-1 mb-5">
              {blog.excerpt}
            </p>

            <motion.div
              className="flex items-center gap-2 font-lato text-sm font-bold text-maroon-700 group-hover:text-gold-600 transition-colors"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Read More <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
});

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden bg-maroon-900">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80"
          alt="Blog hero"
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/60 via-maroon-900/40 to-maroon-900/80" />

      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-lato font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Our Blog
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-beige-100 mb-6 leading-tight"
        >
          Stories, Tips &
          <br />
          <span className="text-gold-400">Event Inspiration</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-lato text-beige-300 text-lg max-w-2xl mx-auto mb-10"
        >
          Insights from our event planners, design ideas, real celebrations, and everything you need to make your next event extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-gold-400 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getBlogs({ limit: 50 });
        setBlogs(data.length ? data : SAMPLE_BLOGS);
      } catch {
        setBlogs(SAMPLE_BLOGS);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  const handleCategory = useCallback((cat) => setActiveCategory(cat), []);

  return (
    <PageWrapper>
      <SEO
        title="Blog — Event Planning Insights"
        description="Read expert tips on wedding planning, corporate events, birthday parties, and event design from Agarwal Events & Wedding Planners."
        url="https://agarwalevents.com/blogs"
      />

      <HeroSection />

      <section className="section-padding bg-beige-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => handleCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`font-lato text-sm font-semibold px-5 py-2 rounded-full border-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-maroon-700 border-maroon-700 text-beige-100 shadow-lg shadow-maroon-700/20'
                    : 'border-beige-300 text-neutral-600 hover:border-maroon-400 hover:text-maroon-700'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
                  <div className="h-56 bg-beige-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-beige-200 rounded w-1/3" />
                    <div className="h-5 bg-beige-200 rounded w-3/4" />
                    <div className="h-5 bg-beige-200 rounded w-1/2" />
                    <div className="h-3 bg-beige-200 rounded w-full" />
                    <div className="h-3 bg-beige-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-cormorant text-2xl text-neutral-400">No blogs in this category yet.</p>
            </div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
