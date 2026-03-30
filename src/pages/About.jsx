import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Palette, Target, Layers, PiggyBank, Handshake, Users } from 'lucide-react';
import { ABOUT_TEXT, MISSION_QUOTE, STATS, WHY_CHOOSE_US, LOCATIONS } from '../lib/constants';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { FadeInUp } from '../components/ui/FadeInUp';

const WHY_ICONS = [Palette, Target, Layers, PiggyBank, Handshake, Users];

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80',
  left: 'https://plus.unsplash.com/premium_photo-1682092597591-81f59c80d9ec?q=80',
  right: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
  bottom: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80',
};

const MILESTONES = [
  { year: '2022', title: 'Founded', desc: 'Started our journey crafting celebrations in Hyderabad.' },
  { year: '2023', title: '100+ Events', desc: 'Reached our first major milestone.' },
  { year: '2025', title: 'Expanded to Pune', desc: 'Opened operations across Pune.' },
  { year: '2026', title: 'Growing Strong', desc: 'delivering excellence.' },
];

export default function About() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <PageWrapper>
      <SEO title="About Us" description="4+ years of crafting unforgettable weddings and events. Learn about Agarwal Events & Wedding Planners." url="https://agarwalevents.com/about" />

      <section className="relative pt-28 pb-20 bg-maroon-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.hero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-beige-100 mb-3">About Us</h1>
          <p className="font-lato text-sm text-beige-300">Home / <span className="text-gold-400">About</span></p>
        </div>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInUp>
              <div>
                <p className="font-vibes text-2xl text-gold-500 mb-2">Our Story</p>
                <h2 className="font-cormorant text-3xl font-bold text-maroon-700 mb-6">Crafting Celebrations Since 2022</h2>
                <p className="font-lato text-neutral-600 leading-relaxed mb-6">{ABOUT_TEXT}</p>
                <p className="font-lato text-neutral-600 leading-relaxed">
                  From intimate home gatherings to grand destination weddings, we bring the same level of dedication, creativity, and precision to every event.
                </p>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="relative">
                <img src={IMAGES.left} alt="Wedding" className="w-60 h-72 rounded-xl shadow-xl object-cover" loading="lazy" />
                <img src={IMAGES.right} alt="Décor" className="absolute top-12 left-36 w-48 h-60 rounded-xl shadow-xl border-4 border-beige-100 object-cover" loading="lazy" />
                <img src={IMAGES.bottom} alt="Reception" className="absolute -bottom-6 left-16 w-40 h-52 rounded-xl shadow-xl border-4 border-beige-100 object-cover" loading="lazy" />
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      <section className="py-16 bg-maroon-700">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-vibes text-3xl text-gold-400 mb-4">Our Mission</p>
              <p className="font-cormorant text-xl md:text-2xl text-beige-100 leading-relaxed italic">&ldquo;{MISSION_QUOTE}&rdquo;</p>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-12">
              <p className="font-vibes text-2xl text-gold-500 mb-2">Our Journey</p>
              <h2 className="font-cormorant text-3xl font-bold text-maroon-700">Company Milestones</h2>
            </div>
          </FadeInUp>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-beige-300 hidden md:block" />
            {MILESTONES.map((m, i) => (
              <FadeInUp key={m.year} delay={i * 0.1}>
                <div className={`flex items-center gap-8 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="font-cinzel text-sm text-gold-500 font-bold">{m.year}</span>
                    <h3 className="font-cormorant text-xl font-bold text-maroon-700">{m.title}</h3>
                    <p className="font-lato text-sm text-neutral-500">{m.desc}</p>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-maroon-700 rounded-full border-4 border-beige-100 shadow shrink-0 relative z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-12">
              <p className="font-vibes text-2xl text-gold-500 mb-2">Our Strengths</p>
              <h2 className="font-cormorant text-3xl font-bold text-maroon-700">Why Choose Us</h2>
            </div>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <FadeInUp key={item.title} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -6 }} className="bg-white rounded-xl p-6 shadow-md text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-maroon-700 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold-400" />
                    </div>
                    <h3 className="font-cormorant text-xl font-bold text-maroon-700 mb-2">{item.title}</h3>
                    <p className="font-lato text-sm text-neutral-500 leading-relaxed">{item.description}</p>
                  </motion.div>
                </FadeInUp>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="bg-maroon-700 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-cinzel text-3xl md:text-4xl font-bold text-gold-400">
                  {statsInView ? <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} /> : `0${stat.suffix}`}
                </p>
                <p className="font-lato text-sm text-beige-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-beige-100">
        <div className="container-custom text-center">
          <FadeInUp>
            <p className="font-vibes text-2xl text-gold-500 mb-2">Where We Serve</p>
            <h2 className="font-cormorant text-3xl font-bold text-maroon-700 mb-4">Our Locations</h2>
            <p className="font-lato text-lg text-neutral-600">
              Serving <span className="font-bold text-maroon-700">{LOCATIONS.join(' · ')}</span>
            </p>
          </FadeInUp>
        </div>
      </section>
    </PageWrapper>
  );
}
