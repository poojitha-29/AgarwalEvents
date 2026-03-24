import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ALL_SERVICES } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';
import { Button } from '../ui/Button';

export function ServicesGrid() {
  return (
    <section className="section-padding bg-beige-100">
      <div className="container-custom">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className="font-vibes text-2xl text-gold-500 mb-2">What We Offer</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-maroon-700 mb-4">
              Our Services
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </div>
        </FadeInUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALL_SERVICES.map((service, i) => (
            <FadeInUp key={service.slug} delay={i * 0.05}>
              <Link to={`/services/${service.slug}`}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(139, 0, 0, 0.1)' }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm h-full"
                >
                  <div className="relative h-32 md:h-36 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/50 to-transparent" />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-cormorant text-base font-bold text-maroon-700">
                      {service.name}
                    </h3>
                    <span className="font-lato text-[10px] text-neutral-400">
                      {service.subTypes.length} types <ArrowRight className="w-3 h-3 inline" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp delay={0.3}>
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline-maroon">View All Services</Button>
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
