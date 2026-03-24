import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { SITE_NAME, CONTACT, LOCATIONS, ALL_SERVICES } from '../../lib/constants';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About Us' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/book', label: 'Book Now' },
];

export function Footer() {
  return (
    <footer className="bg-maroon-900 text-beige-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-cinzel font-bold text-xl mb-3">{SITE_NAME}</h3>
            <p className="font-vibes text-gold-400 text-xl mb-4">Making Your Dreams Come True</p>
            <p className="font-lato text-sm text-beige-300 leading-relaxed mb-6">
              Professional event and wedding planners crafting unforgettable celebrations across {LOCATIONS.join(', ')}.
            </p>
            <div className="flex gap-3">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-maroon-800 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-maroon-800 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-maroon-800 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-cormorant text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-lato text-sm text-beige-300 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-xl font-semibold mb-4">Event Types</h4>
            <ul className="space-y-2">
              {ALL_SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="font-lato text-sm text-beige-300 hover:text-gold-400 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-xl font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {CONTACT.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="font-lato text-sm text-beige-300 hover:text-gold-400 transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="font-lato text-sm text-beige-300 hover:text-gold-400 transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="font-lato text-sm text-beige-300">{LOCATIONS.join(' · ')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-maroon-800">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-lato text-xs text-beige-400">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="font-lato text-xs text-beige-400">Crafting Unforgettable Celebrations</p>
        </div>
      </div>
    </footer>
  );
}
