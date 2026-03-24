import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-maroon-700 text-beige-100 hover:bg-maroon-800 shadow-lg',
  secondary: 'bg-beige-200 text-maroon-900 hover:bg-beige-300',
  outline: 'border-2 border-beige-100 text-beige-100 hover:bg-beige-100/10',
  'outline-maroon': 'border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-beige-100',
  ghost: 'text-maroon-700 hover:bg-maroon-50',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      disabled={disabled || loading}
      className={`
        font-lato font-bold rounded-lg transition-colors duration-300
        inline-flex items-center justify-center gap-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
