import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ALL_SERVICES, MISSION_QUOTE } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';

const weddingService = ALL_SERVICES.find((s) => s.slug === 'weddings');
const FEATURED_FUNCTIONS = weddingService.subTypes.slice(0, 6);

const IMAGES = [
  'https://plus.unsplash.com/premium_photo-1661862397518-8e50332b6e97',
  'https://images.unsplash.com/photo-1639078007551-b14a57d62c8d',
  'https://plus.unsplash.com/premium_photo-1670524465634-93cf255ffa8b',
  'https://images.unsplash.com/photo-1758939560877-53fa3590a582',
  'https://images.unsplash.com/photo-1702205453855-48dbef2a16d5',
  'https://images.unsplash.com/photo-1595407753234-0882f1e77954',
];

export function WeddingShowcase() {
  return (
    <section className="section-padding bg-beige-200">
      <div className="container-custom">
        <FadeInUp>
          <div className="text-center mb-12">
            <p className="font-vibes text-2xl md:text-3xl text-gold-500 mb-2">Dream Weddings, Perfectly Planned</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-maroon-700 mb-4">
              Every detail, every moment, flawlessly executed
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </div>
        </FadeInUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURED_FUNCTIONS.map((fn, i) => (
            <FadeInUp key={fn.name} delay={i * 0.08}>
              <Link to="/services/weddings">
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(139, 0, 0, 0.12)' }}
                  className={`group relative rounded-xl overflow-hidden shadow-md ${
                    i < 2 ? 'h-52 md:h-64' : 'h-40 md:h-48'
                  }`}
                >
                  <img
                    src={IMAGES[i]}
                    alt={fn.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/75 via-transparent to-transparent" />

                  {i === 0 && (
                    <div className="absolute top-3 right-3 bg-gold-500 text-maroon-900 text-[10px] font-lato font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3" /> Signature
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-cormorant text-lg font-bold text-beige-100">
                      {fn.name}
                    </h3>
                    <p className="font-lato text-[11px] text-beige-200/80 mt-0.5">
                      {fn.services.length} services included
                    </p>
                  </div>
                </motion.div>
              </Link>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={0.3}>
          <div className="text-center mt-6">
            <Link to="/services/weddings" className="font-lato text-sm font-bold text-maroon-700 hover:text-gold-500 transition-colors">
              View all {weddingService.subTypes.length} wedding functions →
            </Link>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="mt-12 bg-maroon-700 rounded-xl p-8 md:p-10 text-center">
            <p className="font-vibes text-2xl text-gold-400 mb-3">Our Promise</p>
            <p className="font-cormorant text-lg text-beige-100 max-w-3xl mx-auto leading-relaxed italic">
              &ldquo;{MISSION_QUOTE.split('.')[0]}.&rdquo;
            </p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
