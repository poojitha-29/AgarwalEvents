import { motion } from 'framer-motion';
import ChatBot from './ChatBot';

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0.8, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      <ChatBot /> 
    </motion.div>
  );
}
