import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFaqsByCategory } from '../services/faqsService';
import { FAQ_CATEGORIES, SEED_FAQS } from '../lib/constants';
import { useDebounce } from '../hooks/useDebounce';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { FadeInUp } from '../components/ui/FadeInUp';
import { Button } from '../components/ui/Button';

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('All');
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const debouncedTab = useDebounce(activeTab, 300);

  useEffect(() => {
    setLoading(true);
    getFaqsByCategory(debouncedTab)
      .then((data) => {
        if (data.length) {
          setFaqs(data);
        } else {
          setFaqs(
            debouncedTab === 'All'
              ? SEED_FAQS
              : SEED_FAQS.filter((f) => f.category === debouncedTab)
          );
        }
      })
      .catch(() => {
        setFaqs(
          debouncedTab === 'All'
            ? SEED_FAQS
            : SEED_FAQS.filter((f) => f.category === debouncedTab)
        );
      })
      .finally(() => setLoading(false));
  }, [debouncedTab]);

  return (
    <PageWrapper>
      <SEO
        title="FAQs"
        description="Frequently asked questions about our wedding and event planning services, booking process, and pricing."
        url="https://agarwalevents.com/faq"
      />

      <section className="pt-28 pb-12 bg-maroon-700">
        <div className="container-custom text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-beige-100 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="font-lato text-sm text-beige-300">
            Home / <span className="text-gold-400">FAQ</span>
          </p>
        </div>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom max-w-3xl">
          <FadeInUp>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {FAQ_CATEGORIES.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setOpenFaq(null);
                  }}
                  className={`font-lato text-sm px-4 py-2 rounded-full transition-all ${
                    activeTab === tab
                      ? 'bg-maroon-700 text-beige-100'
                      : 'bg-white text-maroon-700 hover:bg-maroon-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeInUp>

          <div className="space-y-3">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="h-5 bg-beige-200 rounded w-3/4" />
                  </div>
                ))
              : faqs.map((faq, i) => (
                  <FadeInUp key={faq.id || i} delay={i * 0.05}>
                    <div className="border border-beige-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left font-lato font-medium text-maroon-700 hover:bg-beige-50 transition-colors"
                      >
                        <span className="pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                            openFaq === i ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 font-lato text-sm text-neutral-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeInUp>
                ))}
          </div>

          <FadeInUp delay={0.2}>
            <div className="text-center mt-16 bg-white rounded-xl p-8 shadow-md">
              <h3 className="heading-secondary mb-4">Still Have Questions?</h3>
              <p className="font-lato text-neutral-500 mb-6">
                We&apos;re here to help. Reach out to us for any additional information.
              </p>
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </PageWrapper>
  );
}
