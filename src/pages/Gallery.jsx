import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { getGallery } from '../services/galleryService';
import { GALLERY_CATEGORIES } from '../lib/constants';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { FadeInUp } from '../components/ui/FadeInUp';
import { Skeleton } from '../components/ui/Skeleton';

const FALLBACK = [
  { id: 'f1', image_url: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352924/agarwal-events/gallery/ticwict7iqbwwcoifkqx.jpg', caption: 'Wedding', category: 'Weddings' },
  { id: 'f2', image_url: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352922/agarwal-events/gallery/rt2vk750rg7hmwg7znty.jpg', caption: 'Mehendi', category: 'Mehendi' },
  { id: 'f3', image_url: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352918/agarwal-events/gallery/xid9sgi55cfcjphqw2ev.jpg', caption: 'Haldi', category: 'Haldi' },
  
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [images, setImages] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const debouncedTab = useDebounce(activeTab, 300);
  const { currentPage, setCurrentPage, totalPages, offset, itemsPerPage } = usePagination(totalCount, 12);

  useEffect(() => { setCurrentPage(1); }, [debouncedTab]);

  useEffect(() => {
    setLoading(true);
    const category = debouncedTab === 'All' ? undefined : debouncedTab;
    getGallery({ category, offset, limit: itemsPerPage })
      .then(({ data, count }) => {
        if (data.length) {
          setImages(data);
          setTotalCount(count);
        } else {
          useFallback();
        }
      })
      .catch(() => useFallback())
      .finally(() => setLoading(false));

    function useFallback() {
      const filtered = debouncedTab === 'All' ? FALLBACK : FALLBACK.filter((f) => f.category === debouncedTab);
      setImages(filtered.slice(offset, offset + itemsPerPage));
      setTotalCount(filtered.length);
    }
  }, [debouncedTab, offset, itemsPerPage]);

  return (
    <PageWrapper>
      <SEO
        title="Event Gallery"
        description="Browse our portfolio of 500+ events — weddings, mehendi, haldi, receptions, corporate events and celebrations."
        url="https://agarwalevents.com/gallery"
      />

      <section className="pt-28 pb-12 bg-maroon-700">
        <div className="container-custom text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-beige-100 mb-3">Event Gallery</h1>
          <p className="font-lato text-sm text-beige-300">Home / <span className="text-gold-400">Gallery</span></p>
        </div>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom">
          <FadeInUp>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {GALLERY_CATEGORIES.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-lato text-sm px-5 py-2 rounded-full transition-all ${
                    activeTab === tab ? 'bg-maroon-700 text-beige-100' : 'bg-white text-maroon-700 hover:bg-maroon-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeInUp>

          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className={`w-full break-inside-avoid rounded-xl ${i % 3 === 0 ? 'h-56' : 'h-44'}`} />
              ))}
            </div>
          ) : (
            <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              <AnimatePresence mode="popLayout">
                {images.map((img, i) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="break-inside-avoid overflow-hidden rounded-xl cursor-pointer group shadow-sm"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={img.image_url}
                      alt={img.caption || 'Event photo'}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-lato text-sm font-bold transition-colors ${
                    currentPage === i + 1 ? 'bg-maroon-700 text-beige-100' : 'bg-white text-maroon-700 hover:bg-maroon-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images.map((img) => ({ src: img.image_url, alt: img.caption }))}
      />
    </PageWrapper>
  );
}
