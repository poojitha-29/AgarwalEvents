import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ALL_SERVICES, MISSION_QUOTE } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';

const weddingService = ALL_SERVICES.find((s) => s.slug === 'weddings');
const FEATURED_FUNCTIONS = weddingService.subTypes.slice(0, 6);

const IMAGES = [
  'https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9',
  'https://plus.unsplash.com/premium_photo-1661759013744-4754d402459d',
  'https://images.unsplash.com/photo-1518370265276-f22b706aeac8',
  'https://images.unsplash.com/photo-1740511365551-3c8130ef2a62',
  'https://images.unsplash.com/photo-1610085927744-7217728267a6',
  'https://images.unsplash.com/photo-1708606811579-23b18fc48007',
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
