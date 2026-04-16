export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-beige-200 text-maroon-700',
    gold: 'bg-gold-500/20 text-gold-500',
    maroon: 'bg-maroon-700 text-beige-100',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-lato font-bold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
