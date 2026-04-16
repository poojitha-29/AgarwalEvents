import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { getFeaturedTestimonials } from '../../services/testimonialsService';
import { FadeInUp } from '../ui/FadeInUp';

const FALLBACK = [
  { id: 't1', client_name: 'Priya & Rahul', event_type: 'Wedding', review_text: 'Agarwal Events made our wedding absolutely magical. Every detail was perfect, from the mandap décor to the vidai arrangements. Truly a dream come true!', rating: 5 },
  { id: 't2', client_name: 'Neha & Amit', event_type: 'Reception', review_text: 'The team went above and beyond for our reception. The décor, food, and coordination were all flawless. Our guests are still talking about it!', rating: 5 },
  { id: 't3', client_name: 'Ananya & Vikram', event_type: 'Sangeet', review_text: 'Our sangeet night was the highlight of our wedding celebrations. The stage, lights, and entertainment were spectacular. Thank you, Agarwal Events!', rating: 5 },
];

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState(FALLBACK);

  useEffect(() => {
    getFeaturedTestimonials()
      .then((data) => { if (data.length) setTestimonials(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-beige-200">
      <div className="container-custom">
        <FadeInUp>
          <div className="text-center mb-10">
            <p className="font-vibes text-2xl text-gold-500 mb-2">Client Love</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-maroon-700 mb-4">What Our Clients Say</h2>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={testimonials.length > 1}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-white rounded-xl p-6 shadow-md relative h-full">
                  <Quote className="absolute top-4 right-4 w-10 h-10 text-gold-400/15" />
                  <div className="mb-3">
                    <p className="font-cormorant text-lg font-bold text-maroon-700">{t.client_name}</p>
                    <p className="font-lato text-xs text-neutral-500">{t.event_type}</p>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < (t.rating || 5) ? 'fill-gold-400 text-gold-400' : 'text-beige-300'}`} />
                    ))}
                  </div>
                  <p className="font-lato text-sm text-neutral-600 leading-relaxed italic">
                    &ldquo;{t.review_text}&rdquo;
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeInUp>
      </div>
    </section>
  );
}
