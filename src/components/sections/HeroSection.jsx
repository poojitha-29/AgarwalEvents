import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

// ✅ Optimized images (reduced size)
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1741206444919-26a9e8f04cc5?q=60&w=1200',
  'https://images.unsplash.com/photo-1735052712464-9d24b69be5f5?q=60&w=1200',
  'https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=60&w=1200',
];

function RosePetal({ index }) {
  const style = useMemo(() => ({
    left: `${Math.random() * 100}%`,
  }), []);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: ['0vh', '100vh'],
        opacity: [0, 0.9, 0.9, 0],
        rotate: [0, 360],
        x: [0, 20, -20, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 3,
        repeat: Infinity,
        delay: index * 0.5,
        ease: 'linear',
      }}
    >
      <div className="w-3 h-4 bg-gradient-to-br from-rose-400 to-red-600 rounded-full blur-[0.5px]" />
    </motion.div>
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 200]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">

      {/* ✅ Optimized Crossfade Images */}
      {HERO_IMAGES.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt="wedding"
          loading={i === index ? "eager" : "lazy"} // ✅ important
          className="absolute inset-0 w-full h-[120%] object-cover"
          style={{ y: bgY }}
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1.15 : 1.1,
          }}
          transition={{ duration: 1.2 }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      {/* Blur */}
      <div className="absolute inset-0 backdrop-blur-[2px] z-[1]" />

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-maroon-900/90 to-transparent z-10" />

      {/* ✅ Reduced petals (performance fix) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <RosePetal key={i} index={i} />
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div>

          <p className="font-vibes text-3xl md:text-5xl text-gold-400 mb-4 drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
            Making Your Dreams Come True
          </p>

          <h1 className="font-cinzel font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-wider mb-4 uppercase drop-shadow-[0_6px_25px_rgba(0,0,0,0.9)]">
            Agarwal Events &<br />Wedding Planners
          </h1>

          <p className="font-cormorant text-xl md:text-2xl text-white/90 mb-2 drop-shadow">
            Luxury Wedding & Event Planning
          </p>

          <p className="font-lato text-sm md:text-base text-white/70 tracking-widest mb-8">
            Serving All over India
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services">
              <Button variant="primary" size="lg">
                Explore Services
              </Button>
            </Link>

            <Link to="/book">
              <Button variant="secondary" size="lg">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll icon */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
    </section>
  );
}