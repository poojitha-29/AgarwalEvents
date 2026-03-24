import { Helmet } from 'react-helmet-async';

export function SEO({ title, description, image, url }) {
  const siteName = 'Agarwal Events & Wedding Planners';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc =
    'Professional wedding and event planners in Hyderabad, Telangana and Pune. Weddings, birthdays, corporate events, religious ceremonies and more.';
  const defaultImage =
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta
        name="keywords"
        content="wedding planner Hyderabad, event planner Telangana, wedding planning Pune, Agarwal Events"
      />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || 'https://agarwalevents.com'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      <link rel="canonical" href={url || 'https://agarwalevents.com'} />
    </Helmet>
  );
}
