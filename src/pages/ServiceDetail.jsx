import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, ArrowLeft, Phone } from 'lucide-react';
import { ALL_SERVICES, CONTACT } from '../lib/constants';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { FadeInUp } from '../components/ui/FadeInUp';
import { Button } from '../components/ui/Button';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [openIndex, setOpenIndex] = useState(null);

  const service = ALL_SERVICES.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <PageWrapper>
      <SEO
        title={service.name}
        description={service.description}
        url={`https://agarwalevents.com/services/${service.slug}`}
      />

      <section className="relative pt-28 pb-16 bg-maroon-700 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={service.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-lato text-sm text-beige-300 hover:text-gold-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-beige-100 mb-3">
            {service.name}
          </h1>
          <p className="font-lato text-beige-200 max-w-2xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom max-w-4xl">
          <FadeInUp>
            <div className="text-center mb-10">
              <p className="font-vibes text-2xl text-gold-500 mb-2">What We Offer</p>
              <h2 className="font-cormorant text-2xl md:text-3xl font-bold text-maroon-700">
                {service.name} — Services & Functions
              </h2>
              <p className="font-lato text-sm text-neutral-500 mt-2">
                Click on any function to see all services we provide for it.
              </p>
            </div>
          </FadeInUp>

          <div className="space-y-3">
            {service.subTypes.map((sub, i) => (
              <FadeInUp key={sub.name} delay={i * 0.03}>
                <div className="bg-white rounded-xl border border-beige-200 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-beige-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-maroon-700 text-beige-100 rounded-full flex items-center justify-center font-lato text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-cormorant text-lg font-bold text-maroon-700">
                        {sub.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-lato text-xs text-neutral-400 hidden sm:block">
                        {sub.services.length} services
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                          openIndex === i ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t border-beige-200 pt-4">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {sub.services.map((s) => (
                                <li key={s} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                                  <span className="font-lato text-sm text-neutral-600">{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInUp>
            ))}
          </div>

          {service.coreServices && service.coreServices.length > 0 && (
            <FadeInUp delay={0.1}>
              <div className="mt-10 bg-maroon-700 rounded-xl p-6 md:p-8">
                <h3 className="font-cormorant text-xl font-bold text-beige-100 mb-4">
                  Core Services (Applicable to All {service.name})
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {service.coreServices.map((cs) => (
                    <li key={cs} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="font-lato text-sm text-beige-200">{cs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          )}

          <FadeInUp delay={0.15}>
            <div className="mt-10 text-center bg-white rounded-xl p-8 shadow-md border border-beige-200">
              <p className="font-vibes text-xl text-gold-500 mb-2">Ready to Get Started?</p>
              <h3 className="font-cormorant text-2xl font-bold text-maroon-700 mb-4">
                Plan Your {service.name} With Us
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/book">
                  <Button>Book a Consultation</Button>
                </Link>
                <a href={`tel:${CONTACT.phones[0].replace(/[^+\d]/g, '')}`}>
                  <Button variant="outline-maroon">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </PageWrapper>
  );
}
