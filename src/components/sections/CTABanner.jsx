import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { CONTACT } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';
import { Button } from '../ui/Button';

export function CTABanner() {
  return (
    <section className="py-20 bg-maroon-700">
      <div className="container-custom text-center">
        <FadeInUp>
          <p className="font-vibes text-2xl md:text-3xl text-gold-400 mb-3">
            Let&apos;s Create Magic Together
          </p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-bold text-beige-100 mb-8">
            Ready to Plan Your Dream Event?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book">
              <Button variant="secondary" size="lg">Book a Consultation</Button>
            </Link>
            <a href={`tel:${CONTACT.phones[0].replace(/[^+\d]/g, '')}`}>
              <Button variant="outline" size="lg">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
