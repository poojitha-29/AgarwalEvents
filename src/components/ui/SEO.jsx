import { Helmet } from 'react-helmet-async';

export function SEO({ title, description, image, url }) {
  const siteName = 'Agarwal Events & Wedding Planners';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  const defaultDesc =
    'Best wedding planner in Hyderabad and leading event management company offering luxury weddings, destination weddings, corporate events, birthday parties, wedding decor, mehendi, haldi, sangeet, engagement and reception planning across Hyderabad, Telangana and Pune.';

  const defaultImage =
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80';

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description || defaultDesc} />

      <meta
        name="keywords"
        content="
        wedding planner in Hyderabad,
        best wedding planner in Hyderabad,
        wedding planner near me Hyderabad,
        top wedding planners in Hyderabad,
        wedding organizer Hyderabad,
        wedding planning company Hyderabad,
        wedding planners Hyderabad prices,
        destination wedding planner Hyderabad,
        luxury wedding planner Hyderabad,
        outdoor wedding planner Hyderabad,
        royal theme wedding planner Hyderabad,
        intimate wedding planner Hyderabad,
        Telugu wedding planner Hyderabad,
        South Indian wedding planner Hyderabad,
        Hindu wedding planner Hyderabad,
        event management company in Hyderabad,
        best event management company Hyderabad,
        corporate event planner Hyderabad,
        corporate event management company Hyderabad,
        event organizer Hyderabad,
        corporate event organizer Hyderabad,
        product launch event planner Hyderabad,
        conference organizer Hyderabad,
        seminar organizer Hyderabad,
        annual day event planner Hyderabad,
        corporate gala event Hyderabad,
        award night organizer Hyderabad,
        team building event organizer Hyderabad,
        office party organizer Hyderabad,
        birthday party planner Hyderabad,
        birthday party organizer Hyderabad,
        kids birthday party planner Hyderabad,
        theme birthday party Hyderabad,
        surprise birthday planner Hyderabad,
        baby shower organizer Hyderabad,
        naming ceremony organizer Hyderabad,
        engagement party planner Hyderabad,
        reception party organizer Hyderabad,
        anniversary party planner Hyderabad,
        mehendi decoration Hyderabad,
        mehendi organizer Hyderabad,
        haldi ceremony decoration Hyderabad,
        haldi ceremony planner Hyderabad,
        sangeet night organizer Hyderabad,
        wedding decorator Hyderabad,
        wedding decor Hyderabad,
        wedding stage decoration Hyderabad,
        floral wedding decoration Hyderabad,
        wedding lighting Hyderabad,
        wedding venues in Hyderabad,
        outdoor wedding venues Hyderabad,
        luxury wedding venues Hyderabad,
        wedding halls Hyderabad,
        event planner near me,
        wedding planner near me
        "
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