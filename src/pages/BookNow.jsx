import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { submitInquiry } from '../services/inquiriesService';
import { EVENT_TYPES, BUDGET_RANGES, GUEST_COUNT_OPTIONS } from '../lib/constants';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { FadeInUp } from '../components/ui/FadeInUp';
import { Button } from '../components/ui/Button';

export default function BookNow() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
  
    try {
      // ✅ 1. Save to DB (your existing logic)
      await submitInquiry({ ...data, source: 'book_now' });
  
      // ✅ 2. Create WhatsApp message
      const message = `
  New Inquiry from Website:
  
  👤 Name: ${data.name}
  📧 Email: ${data.email}
  📱 Phone: ${data.phone}
  🎉 Event: ${data.event_type}
  📅 Date: ${data.event_date}
  👥 Guests: ${data.guest_count || '-'}
  💰 Budget: ${data.budget_range || '-'}
  📍 Venue: ${data.venue_preference || '-'}
  
  📝 Notes:
  ${data.special_requests || '-'}
      `;
  
      const encodedMessage = encodeURIComponent(message);
  
      // ✅ 3. Open WhatsApp
      window.open(
        `https://wa.me/919392561785?text=${encodedMessage}`,
        '_blank'
      );
  
      // ✅ 4. Show success UI
      setSubmitted(true);
  
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <SEO
        title="Book a Consultation"
        description="Book your free consultation with Agarwal Events & Wedding Planners today."
        url="https://agarwalevents.com/book"
      />

      <section className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-beige-100 via-beige-50 to-beige-200 flex items-center">
        <div className="container-custom w-full">
          <FadeInUp>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <p className="font-vibes text-2xl md:text-3xl text-gold-500 mb-2">
                  Begin Your Journey
                </p>
                <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-maroon-700 mb-2">
                  Book a Consultation
                </h1>
                <p className="font-lato text-neutral-500">
                  Tell us about your dream event and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl p-8 md:p-12 shadow-xl border border-beige-200 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="font-cormorant text-2xl font-bold text-maroon-700 mb-3">
                      Thank You!
                    </h2>
                    <p className="font-lato text-neutral-600 mb-6">
                      We&apos;ve received your consultation request. Our team will contact you within 24 hours to discuss your dream event.
                    </p>
                    <Link to="/">
                      <Button>Back to Home</Button>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-xl p-6 md:p-8 shadow-xl border-2 border-beige-200 relative"
                  >
                    <div className="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-maroon-700 via-gold-500 to-maroon-700 rounded-t-xl" />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Full Name *</label>
                          <input
                            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors"
                            placeholder="Your full name"
                          />
                          {errors.name && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.name.message}</p>}
                        </div>

                        <div>
                          <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Email *</label>
                          <input
                            type="email"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                            })}
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors"
                            placeholder="your@email.com"
                          />
                          {errors.email && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Phone *</label>
                          <input
                            {...register('phone', {
                              required: 'Phone is required',
                              pattern: { value: /^[+]?[0-9]{10,13}$/, message: 'Invalid phone number' },
                            })}
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors"
                            placeholder="+91XXXXXXXXXX"
                          />
                          {errors.phone && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.phone.message}</p>}
                        </div>

                        <div>
                          <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Event Type *</label>
                          <select
                            {...register('event_type', { required: 'Please select an event type' })}
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors bg-white"
                          >
                            <option value="">Select event type</option>
                            {EVENT_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                          {errors.event_type && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.event_type.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Event Date *</label>
                          <input
                            type="date"
                            {...register('event_date', { required: 'Event date is required' })}
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors"
                          />
                          {errors.event_date && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.event_date.message}</p>}
                        </div>

                        <div>
                          <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Guest Count</label>
                          <select
                            {...register('guest_count')}
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors bg-white"
                          >
                            <option value="">Select</option>
                            {GUEST_COUNT_OPTIONS.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Budget Range</label>
                          <select
                            {...register('budget_range')}
                            className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors bg-white"
                          >
                            <option value="">Select</option>
                            {BUDGET_RANGES.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Venue Preference</label>
                        <input
                          {...register('venue_preference')}
                          className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors"
                          placeholder="Any preferred venue or location?"
                        />
                      </div>

                      <div>
                        <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Special Requests</label>
                        <textarea
                          {...register('special_requests')}
                          rows={4}
                          className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors resize-none"
                          placeholder="Tell us about your vision, theme preferences, or any special requirements..."
                        />
                      </div>

                      <Button type="submit" loading={submitting} disabled={submitting} size="lg" className="w-full">
                        Book Consultation
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInUp>
        </div>
      </section>
    </PageWrapper>
  );
}
