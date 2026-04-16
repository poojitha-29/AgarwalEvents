import { Link } from 'react-router-dom';
import { ABOUT_TEXT } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';
import { Button } from '../ui/Button';

const IMAGES = [
  'https://images.unsplash.com/photo-1680491026542-a99730a0e235',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
];

export function AboutSnippet() {
  return (
    <section className="section-padding bg-beige-100">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <FadeInUp>
            <div>
              <p className="font-vibes text-2xl text-gold-500 mb-2">
                Our Story | Wedding Planner in Hyderabad
              </p>

              <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-maroon-700 mb-6">
                Crafting Unforgettable Celebrations in Hyderabad
              </h2>

              <p className="font-lato text-neutral-600 leading-relaxed mb-6">
                {ABOUT_TEXT} We are a leading <strong>wedding planner in Hyderabad</strong> and trusted <strong>event management company in Hyderabad</strong>, known for designing elegant weddings and seamless events. From <strong>luxury weddings</strong> and <strong>destination wedding planning</strong> to <strong>corporate events</strong> and <strong>birthday parties</strong>, we bring every celebration to life with creativity and precision.
              </p>

              <p className="font-lato text-neutral-600 leading-relaxed mb-6">
                Our expertise includes <strong>wedding decor</strong>, <strong>mandap decoration</strong>, <strong>mehendi</strong>, <strong>haldi</strong>, and <strong>sangeet ceremonies</strong>, along with engagement and reception planning. Whether it's a <strong>South Indian wedding</strong>, <strong>Telugu wedding</strong>, or a modern celebration, we ensure every detail is perfectly managed across Hyderabad.
              </p>

              <blockquote className="border-l-4 border-gold-500 pl-4 mb-8">
                <p className="font-vibes text-xl text-maroon-700">
                  &ldquo;Your vision is our passion — from intimate weddings to grand celebrations.&rdquo;
                </p>
              </blockquote>

              <Link
                to="/about"
                title="About Wedding Planner in Hyderabad | Event Management Company"
              >
                <Button variant="outline-maroon">Learn More</Button>
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="relative flex justify-center items-center h-[420px]">

              <img
                src={IMAGES[1]}
                alt="Mehendi and haldi ceremony decoration wedding planner Hyderabad"
                className="absolute w-64 h-80 object-cover rounded-2xl shadow-xl rotate-[-8deg] opacity-90"
              />

              <img
                src={IMAGES[0]}
                alt="Luxury wedding planner Hyderabad destination wedding decor mandap"
                className="relative w-72 h-[420px] object-cover rounded-2xl shadow-2xl rotate-[2deg] hover:rotate-0 transition duration-500"
              />

            </div>
          </FadeInUp>

        </div>
      </div>
    </section>
  );
}