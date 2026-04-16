import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ALL_SERVICES } from '../lib/constants';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { FadeInUp } from '../components/ui/FadeInUp';

export default function Services() {
  return (
    <PageWrapper>
      <SEO
        title="Our Services"
        description="Complete event planning services — weddings, birthdays, anniversaries, corporate events, religious ceremonies, and more in Hyderabad and Pune."
        url="https://agarwalevents.com/services"
      />

      <section className="pt-28 pb-12 bg-maroon-700">
        <div className="container-custom text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-beige-100 mb-3">
            Our Services
          </h1>
          <p className="font-lato text-sm text-beige-300">
            Home / <span className="text-gold-400">Services</span>
          </p>
        </div>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-12">
              <p className="font-vibes text-2xl text-gold-500 mb-2">What We Offer</p>
              <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-maroon-700 mb-4">
                Events We Plan & Execute
              </h2>
              <p className="font-lato text-neutral-500 max-w-xl mx-auto">
                From grand weddings to intimate gatherings, we bring creativity, precision, and personal care to every celebration.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SERVICES.map((service, i) => (
              <FadeInUp key={service.slug} delay={i * 0.06}>
                <Link to={`/services/${service.slug}`}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(139, 0, 0, 0.12)' }}
                    className={`group bg-white rounded-xl overflow-hidden shadow-md h-full ${
                      service.slug === 'weddings' ? 'ring-2 ring-gold-400/40' : ''
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-cormorant text-xl font-bold text-beige-100">
                          {service.name}
                        </h3>
                      </div>
                      {service.slug === 'weddings' && (
                        <div className="absolute top-3 right-3 bg-gold-500 text-maroon-900 text-[10px] font-lato font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                          ★ Signature
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-lato text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-lato text-xs text-neutral-400">
                          {service.subTypes.length} {service.subTypes.length === 1 ? 'service' : 'service types'}
                        </span>
                        <span className="flex items-center gap-1 font-lato text-sm font-bold text-maroon-700 group-hover:text-gold-500 transition-colors">
                          View Details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
