import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { submitInquiry } from '../services/inquiriesService';
import { CONTACT, LOCATIONS, EVENT_TYPES, BUDGET_RANGES, GUEST_COUNT_OPTIONS } from '../lib/constants';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { FadeInUp } from '../components/ui/FadeInUp';
import { Button } from '../components/ui/Button';

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await submitInquiry({ ...data, source: 'contact' });
      toast.success('Your inquiry has been submitted! We will contact you within 24 hours.');
      reset();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <SEO
        title="Contact Us"
        description="Get in touch with Agarwal Events & Wedding Planners. Call +91-9392561785 or email agarwalevents42@gmail.com."
        url="https://agarwalevents.com/contact"
      />

      <section className="pt-28 pb-12 bg-maroon-700">
        <div className="container-custom text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-beige-100 mb-3">
            Contact Us
          </h1>
          <p className="font-lato text-sm text-beige-300">
            Home / <span className="text-gold-400">Contact</span>
          </p>
        </div>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <FadeInUp>
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
                  <h2 className="heading-secondary mb-6">Send Us a Message</h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Name *</label>
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
                      <label className="font-lato text-sm font-medium text-neutral-700 block mb-1">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Too short' } })}
                        rows={4}
                        className="w-full px-4 py-3 border border-beige-300 rounded-lg font-lato text-sm focus:outline-none focus:border-maroon-700 transition-colors resize-none"
                        placeholder="Tell us about your event..."
                      />
                      {errors.message && <p className="text-maroon-600 text-xs mt-1 font-lato">{errors.message.message}</p>}
                    </div>

                    <Button type="submit" loading={submitting} disabled={submitting} className="w-full md:w-auto">
                      Send Inquiry
                    </Button>
                  </form>
                </div>
              </FadeInUp>
            </div>

            <div className="lg:col-span-2">
              <FadeInUp delay={0.2}>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="font-cormorant text-xl font-bold text-maroon-700 mb-4">
                      Get in Touch
                    </h3>

                    <div className="space-y-4">
                      {CONTACT.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                          className="flex items-center gap-3 font-lato text-sm text-neutral-600 hover:text-maroon-700 transition-colors"
                        >
                          <Phone className="w-4 h-4 text-maroon-700 shrink-0" />
                          {phone}
                        </a>
                      ))}

                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="flex items-center gap-3 font-lato text-sm text-neutral-600 hover:text-maroon-700 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-maroon-700 shrink-0" />
                        {CONTACT.email}
                      </a>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" />
                        <span className="font-lato text-sm text-neutral-600">
                          {LOCATIONS.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-beige-200">
                      <p className="font-lato text-xs text-neutral-500 mb-3 uppercase tracking-wider font-bold">
                        WhatsApp
                      </p>
                      {CONTACT.whatsapp.map((num) => (
                        <a
                          key={num}
                          href={`https://wa.me/${num}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-lato text-sm text-green-600 hover:text-green-700 transition-colors mb-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          +{num.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}
                        </a>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-beige-200">
                      <p className="font-lato text-xs text-neutral-500 mb-3 uppercase tracking-wider font-bold">
                        Follow Us
                      </p>
                      <div className="flex gap-3">
                        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-beige-100 flex items-center justify-center text-maroon-700 hover:bg-maroon-700 hover:text-beige-100 transition-colors">
                          <Instagram className="w-4 h-4" />
                        </a>
                        <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-beige-100 flex items-center justify-center text-maroon-700 hover:bg-maroon-700 hover:text-beige-100 transition-colors">
                          <Facebook className="w-4 h-4" />
                        </a>
                        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-beige-100 flex items-center justify-center text-maroon-700 hover:bg-maroon-700 hover:text-beige-100 transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden shadow-md h-64">
                  <iframe
  src="https://www.google.com/maps?q=17.473812103271484,78.42449188232422&z=17&output=embed"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
/>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
