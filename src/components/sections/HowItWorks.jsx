import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ClipboardList, CalendarDays, Users, PartyPopper } from 'lucide-react';
import { HOW_IT_WORKS } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';

const ICONS = [ClipboardList, CalendarDays, Users, PartyPopper];

export function HowItWorks() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <FadeInUp>
          <div className="text-center mb-14">
            <p className="heading-decorative mb-2">Simple Process</p>
            <h2 className="heading-primary mb-4">How It Works</h2>
            <div className="w-20 h-0.5 bg-gold-500 mx-auto" />
          </div>
        </FadeInUp>

        <div className="relative">
          <motion.div
            className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-beige-300"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ originX: 0 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <FadeInUp key={step.step} delay={i * 0.2}>
                  <div className="text-center relative">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-maroon-700 rounded-full flex items-center justify-center relative z-10"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                    >
                      <Icon className="w-7 h-7 text-gold-400" />
                    </motion.div>
                    <span className="font-cinzel text-xs text-gold-500 font-bold">
                      Step {step.step}
                    </span>
                    <h3 className="font-cormorant text-xl font-bold text-maroon-700 mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="font-lato text-sm text-neutral-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </FadeInUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
