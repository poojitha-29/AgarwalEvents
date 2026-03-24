import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/layout/WhatsAppButton';
import { PageSpinner } from './components/ui/Spinner';
import { ProtectedRoute } from './admin/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Reviews = lazy(() => import('./pages/Reviews'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const BookNow = lazy(() => import('./pages/BookNow'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const AdminServices = lazy(() => import('./admin/AdminServices'));
const AdminGallery = lazy(() => import('./admin/AdminGallery'));
const AdminPackages = lazy(() => import('./admin/AdminPackages'));
const AdminTestimonials = lazy(() => import('./admin/AdminTestimonials'));
const AdminFaqs = lazy(() => import('./admin/AdminFaqs'));
const AdminInquiries = lazy(() => import('./admin/AdminInquiries'));

function PublicLayout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) return children;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#8B0000',
            color: '#F5F0E8',
            fontFamily: 'Lato, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#D4AF37', secondary: '#F5F0E8' },
          },
          error: {
            iconTheme: { primary: '#F5F0E8', secondary: '#8B0000' },
          },
        }}
      />

      <Suspense fallback={<PageSpinner />}>
        <PublicLayout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<BookNow />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="packages" element={<AdminPackages />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="faqs" element={<AdminFaqs />} />
                <Route path="inquiries" element={<AdminInquiries />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </PublicLayout>
      </Suspense>
    </>
  );
}
