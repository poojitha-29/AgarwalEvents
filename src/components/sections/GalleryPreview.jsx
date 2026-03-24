import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { getFeaturedGallery } from '../../services/galleryService';
import { FadeInUp } from '../ui/FadeInUp';
import { Button } from '../ui/Button';

const FALLBACK = [
  { id: 'f1', image_url: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352924/agarwal-events/gallery/ticwict7iqbwwcoifkqx.jpg', caption: 'Wedding', category: 'Weddings' },
  { id: 'f2', image_url: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352922/agarwal-events/gallery/rt2vk750rg7hmwg7znty.jpg', caption: 'Mehendi', category: 'Mehendi' },
  { id: 'f3', image_url: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352918/agarwal-events/gallery/xid9sgi55cfcjphqw2ev.jpg', caption: 'Haldi', category: 'Haldi' },
  { id: 'f4', image_url: 'https://res.cloudinary.com/dbq4mjfk6/image/upload/v1774352921/agarwal-events/gallery/bm7kvfnzg9karoy4lqw8.jpg', caption: 'Haldi', category: 'Haldi' },]

export function GalleryPreview() {
  const [images, setImages] = useState(FALLBACK);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    getFeaturedGallery()
      .then((data) => { if (data.length) setImages(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-beige-100">
      <div className="container-custom">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className="font-vibes text-2xl text-gold-500 mb-2">Our Portfolio</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-maroon-700 mb-4">Event Gallery</h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl group"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img.image_url}
                  alt={img.caption || 'Event photo'}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button variant="outline-maroon">View Full Gallery</Button>
            </Link>
          </div>
        </FadeInUp>

        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={images.map((img) => ({ src: img.image_url, alt: img.caption }))}
        />
      </div>
    </section>
  );
}
