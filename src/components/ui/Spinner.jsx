export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="w-full h-full border-4 border-beige-300 border-t-maroon-700 rounded-full animate-spin" />
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="min-h-screen bg-beige-100 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 font-lato text-maroon-700">Loading...</p>
      </div>
    </div>
  );
}
