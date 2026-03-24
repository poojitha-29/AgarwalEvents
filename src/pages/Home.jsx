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
        title="Dream Weddings & Events"
        description="Luxury wedding and event planners in Hyderabad with 500+ events. Weddings, mehendi, haldi, sangeet, corporate events and more."
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
