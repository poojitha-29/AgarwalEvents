import { Link } from 'react-router-dom';
import { ABOUT_TEXT } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';
import { Button } from '../ui/Button';

const IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
];

export function AboutSnippet() {
  return (
    <section className="section-padding bg-beige-100">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <FadeInUp>
            <div>
              <p className="font-vibes text-2xl text-gold-500 mb-2">Our Story</p>

              <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-maroon-700 mb-6">
                Crafting Unforgettable Celebrations
              </h2>

              <p className="font-lato text-neutral-600 leading-relaxed mb-6">
                {ABOUT_TEXT}
              </p>

              <blockquote className="border-l-4 border-gold-500 pl-4 mb-8">
                <p className="font-vibes text-xl text-maroon-700">
                  &ldquo;Your vision is our passion, and your special day is our promise.&rdquo;
                </p>
              </blockquote>

              <Link to="/about">
                <Button variant="outline-maroon">Learn More</Button>
              </Link>
            </div>
          </FadeInUp>

          {/* ✅ Premium layered cards */}
          <FadeInUp delay={0.2}>
            <div className="relative flex justify-center items-center h-[420px]">

              {/* back card */}
              <img
                src={IMAGES[1]}
                alt="Wedding moment"
                className="absolute w-64 h-80 object-cover rounded-2xl shadow-xl rotate-[-8deg] opacity-90"
              />

              {/* front main card */}
              <img
                src={IMAGES[0]}
                alt="Luxury wedding"
                className="relative w-72 h-[420px] object-cover rounded-2xl shadow-2xl rotate-[2deg] hover:rotate-0 transition duration-500"
              />

            </div>
          </FadeInUp>

        </div>
      </div>
    </section>
  );
}