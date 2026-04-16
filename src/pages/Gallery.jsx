import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { getOptimizedUrl } from '../lib/cloudinary'; 

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

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTab]);

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
      const filtered =
        debouncedTab === 'All'
          ? FALLBACK
          : FALLBACK.filter((f) => f.category === debouncedTab);

      setImages(filtered.slice(offset, offset + itemsPerPage));
      setTotalCount(filtered.length);
    }
  }, [debouncedTab, offset, itemsPerPage]);

  return (
    <PageWrapper>
      <SEO
        title="Event Gallery"
        description="Browse our portfolio of 500+ events."
        url="https://agarwalevents.com/gallery"
      />

      <section className="pt-28 pb-12 bg-maroon-700 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-beige-100 mb-3">
          Event Gallery
        </h1>
      </section>

      <section className="section-padding bg-beige-100">
        <div className="container-custom">

          {/* Tabs */}
          <FadeInUp>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {GALLERY_CATEGORIES.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full ${
                    activeTab === tab
                      ? 'bg-maroon-700 text-beige-100'
                      : 'bg-white text-maroon-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeInUp>

          {/* Skeleton */}
          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-44 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              
              {/* ❌ Removed AnimatePresence (performance fix) */}

              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={getOptimizedUrl(img.image_url, { width: 400 })} // ✅ optimized
                    alt={img.caption || 'Event photo'}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full ${
                    currentPage === i + 1
                      ? 'bg-maroon-700 text-white'
                      : 'bg-white text-maroon-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ✅ Optimized Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images.map((img) => ({
          src: getOptimizedUrl(img.image_url, { width: 800 }), // ✅ important
          alt: img.caption,
        }))}
      />
    </PageWrapper>
  );
}