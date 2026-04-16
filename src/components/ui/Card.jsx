import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(139, 0, 0, 0.12)' } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl overflow-hidden shadow-md ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
