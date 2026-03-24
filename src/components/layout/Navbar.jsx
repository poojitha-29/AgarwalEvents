import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE_NAME } from '../../lib/constants';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const solidBg = scrolled || !isHome;

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: solidBg ? '#800000' : 'rgba(139, 0, 0, 0)',
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-cinzel font-bold text-lg md:text-xl text-beige-100 tracking-wider">
            {SITE_NAME}
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-lato text-sm font-medium transition-colors relative pb-1 ${
                  location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))
                    ? 'text-gold-400'
                    : 'text-beige-100 hover:text-gold-400'
                }`}
              >
                {link.label}
                {(location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to))) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              to="/book"
              className="font-lato font-bold text-sm px-6 py-2.5 bg-beige-200 text-maroon-900 rounded-lg hover:bg-beige-300 transition-colors"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-beige-100 p-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-maroon-700 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-maroon-600">
                <span className="font-cinzel font-bold text-beige-100 text-sm">
                  {SITE_NAME}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-beige-100 p-1"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col p-5 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`font-lato text-base py-3 px-4 rounded-lg transition-colors ${
                      location.pathname === link.to
                        ? 'bg-maroon-800 text-gold-400'
                        : 'text-beige-100 hover:bg-maroon-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/book"
                  className="mt-4 font-lato font-bold text-center py-3 px-4 bg-gold-500 text-maroon-900 rounded-lg hover:bg-gold-400 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
