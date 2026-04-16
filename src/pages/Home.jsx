import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { HeroSection } from '../components/sections/HeroSection';
import { StatsBar } from '../components/sections/StatsBar';
import { AboutSnippet } from '../components/sections/AboutSnippet';
import { WeddingShowcase } from '../components/sections/WeddingShowcase';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { HowItWorks } from '../components/sections/HowItWorks';
import { GalleryPreview } from '../components/sections/GalleryPreview';
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel';
import { ReelsSection } from '../components/sections/ReelsSection';
import { CTABanner } from '../components/sections/CTABanner';

export default function Home() {
  return (
    <PageWrapper>
      <SEO
        title="Best Wedding Planner in Hyderabad | Event Management Company"
        description="Best wedding planner in Hyderabad and top event management company offering luxury weddings, destination weddings, wedding decor, mehendi decoration, haldi ceremony, sangeet night, engagement and reception planning, corporate events, birthday party planning, baby shower, anniversary events, wedding venues and cultural weddings including Telugu, South Indian, Hindu, Muslim and Christian weddings."
      />
      <HeroSection />
      <StatsBar />
      <AboutSnippet />
      <WeddingShowcase />
      <ServicesGrid />
      <HowItWorks />
      <ReelsSection />
      <GalleryPreview />
      <TestimonialsCarousel />
      <CTABanner />
    </PageWrapper>
  );
}