import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { CONTACT } from '../../lib/constants';

export function WhatsAppButton() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.a
          href={CONTACT.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.a>
      </div>
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-neutral-800 text-white text-xs font-lato rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </div>
    </div>
  );
}
