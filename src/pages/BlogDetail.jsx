import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowLeft, ArrowRight, Tag, Clock, Share2, Check } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { getBlogBySlug, getBlogs } from '../services/blogsService';

const SAMPLE_BLOGS = [
  {
    id: 'sample-1',
    title: 'How to Plan Your Dream Wedding in Hyderabad',
    slug: 'plan-dream-wedding-hyderabad',
    excerpt: 'From selecting the perfect venue to choosing the right décor, we guide you through every step of crafting an unforgettable wedding day in the City of Pearls.',
    cover_image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
    category: 'Weddings',
    published_at: '2025-12-15T00:00:00Z',
    content: `Planning a dream wedding in Hyderabad is an exciting journey filled with beautiful choices and meaningful decisions.

The City of Pearls offers an incredible backdrop for your special day — from majestic palace venues like Falaknuma Palace to lush garden settings and grand banquet halls that can accommodate hundreds of guests in style.

**Choosing Your Venue**

The venue sets the tone for your entire wedding. Consider factors like guest count, accessibility for your family, and the overall aesthetic you want to achieve. Hyderabad has venues ranging from royal heritage properties to contemporary luxury hotels.

**Selecting a Theme**

Whether you envision a traditional Telugu or Rajasthani wedding or a fusion celebration with modern touches, your theme should reflect your personalities as a couple. Our design team excels at creating immersive environments that transport guests into your story.

**The Décor**

Floral arrangements, lighting, and mandap design are the pillars of wedding décor. We source the finest seasonal flowers and work with skilled artisans to create centrepieces and backdrops that are truly Instagram-worthy.

**Catering & Menu**

Hyderabadi cuisine is world-renowned for a reason. We partner with the finest catering teams to offer menus that blend local specialities with pan-Indian favourites and international options to delight every palate.

**The Guest Experience**

From welcome gifts and accommodation coordination to transportation and entertainment, every touchpoint matters. Our team manages every detail so you can be fully present on your big day.

Start your wedding planning journey with us — your dream wedding is just a conversation away.`,
  }
];

function estimateReadTime(content) {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function renderContent(content) {
  if (!content) return null;
  return content.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return (
        <h3 key={i} className="font-cormorant text-2xl font-bold text-maroon-700 mt-8 mb-3">
          {para.replace(/\*\*/g, '')}
        </h3>
      );
    }
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="font-lato text-neutral-600 leading-relaxed mb-4">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j} className="text-maroon-700 font-semibold">
              {part.replace(/\*\*/g, '')}
            </strong>
          ) : (
            part
          )
        )}
      </p>
    );
  });
}

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Always check sample data first as reliable fallback
      const sampleMatch = SAMPLE_BLOGS.find((b) => b.slug === slug);

      try {
        const found = await getBlogBySlug(slug);
        if (found) {
          setBlog(found);
          try {
            const all = await getBlogs({ limit: 10 });
            setRelatedBlogs(all.filter((b) => b.slug !== slug).slice(0, 3));
          } catch {
            setRelatedBlogs(SAMPLE_BLOGS.filter((b) => b.slug !== slug).slice(0, 3));
          }
        } else if (sampleMatch) {
          setBlog(sampleMatch);
          setRelatedBlogs(SAMPLE_BLOGS.filter((b) => b.slug !== slug).slice(0, 3));
        } else {
          navigate('/blogs', { replace: true });
          return;
        }
      } catch {
        if (sampleMatch) {
          setBlog(sampleMatch);
          setRelatedBlogs(SAMPLE_BLOGS.filter((b) => b.slug !== slug).slice(0, 3));
        } else {
          navigate('/blogs', { replace: true });
          return;
        }
      }

      setLoading(false);
    }
    load();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-maroon-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <PageWrapper>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        url={`https://agarwalevents.com/blogs/${blog.slug}`}
      />

      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-maroon-700 via-gold-500 to-maroon-700 z-50"
        style={{ width }}
      />

      <div className="relative h-[65vh] min-h-[440px] overflow-hidden">
        <motion.img
          src={blog.cover_image_url}
          alt={blog.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-900/50 to-maroon-900/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-14 md:pb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="bg-gold-500 text-maroon-900 text-xs font-lato font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                {blog.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold text-beige-100 max-w-3xl leading-tight mb-5"
            >
              {blog.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center gap-5 text-beige-300"
            >
              <span className="flex items-center gap-2 font-lato text-sm">
                <Calendar className="w-4 h-4 text-gold-400" />
                {new Date(blog.published_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2 font-lato text-sm">
                <Clock className="w-4 h-4 text-gold-400" />
                {estimateReadTime(blog.content)} min read
              </span>
              <span className="flex items-center gap-2 font-lato text-sm">
                <Tag className="w-4 h-4 text-gold-400" />
                {blog.category}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-beige-50 py-12 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-between mb-10"
            >
              <Link
                to="/blogs"
                className="flex items-center gap-2 font-lato text-sm text-maroon-700 hover:text-gold-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Articles
              </Link>
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 font-lato text-sm text-neutral-500 hover:text-maroon-700 transition-colors border border-beige-300 rounded-lg px-3 py-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Share'}
              </motion.button>
            </motion.div>

            {blog.excerpt && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-cormorant text-xl md:text-2xl text-maroon-600 italic leading-relaxed mb-10 pl-5 border-l-4 border-gold-400"
              >
                {blog.excerpt}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="prose-custom"
            >
              {renderContent(blog.content)}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-14 pt-10 border-t border-beige-200"
            >
              <div className="bg-gradient-to-br from-maroon-700 to-maroon-900 rounded-2xl p-8 text-center">
                <p className="font-vibes text-2xl text-gold-300 mb-2">Ready to Celebrate?</p>
                <h3 className="font-cinzel text-xl font-bold text-beige-100 mb-3">
                  Let's Create Your Perfect Event
                </h3>
                <p className="font-lato text-beige-300 text-sm mb-6 max-w-md mx-auto">
                  Our team of expert planners is ready to turn your vision into an unforgettable reality.
                </p>
                <Link
                  to="/book"
                  className="inline-block font-lato font-bold text-sm px-8 py-3 bg-gold-500 text-maroon-900 rounded-xl hover:bg-gold-400 transition-colors"
                >
                  Book a Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {relatedBlogs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="font-vibes text-2xl text-gold-500 mb-2">Keep Reading</p>
              <h2 className="font-cormorant text-3xl font-bold text-maroon-700">Related Articles</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((b, i) => {
                const s = b.slug || b.id;
                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link to={`/blogs/${s}`} className="group block">
                      <motion.div
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-xl overflow-hidden shadow-md border border-beige-100"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={b.cover_image_url}
                            alt={b.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/50 to-transparent" />
                        </div>
                        <div className="p-5">
                          <span className="font-lato text-xs text-gold-600 font-bold uppercase tracking-wider">
                            {b.category}
                          </span>
                          <h4 className="font-cormorant text-lg font-bold text-maroon-700 mt-1.5 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
                            {b.title}
                          </h4>
                          <span className="flex items-center gap-1.5 font-lato text-xs font-bold text-maroon-600 group-hover:text-gold-600 transition-colors">
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
