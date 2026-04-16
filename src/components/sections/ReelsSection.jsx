import { Play } from 'lucide-react';
import { INSTAGRAM_REELS, CONTACT } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';

export function ReelsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeInUp>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-vibes text-xl text-gold-500 mb-1">Follow Our Journey</p>
              <h2 className="font-cormorant text-2xl md:text-3xl font-bold text-maroon-700">
                Instagram Reels
              </h2>
            </div>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-lato text-sm font-bold text-maroon-700 hover:text-gold-500 transition-colors hidden sm:block"
            >
              {CONTACT.instagramHandle} →
            </a>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {INSTAGRAM_REELS.map((reel) => (
              <a
                key={reel.id}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none w-[170px] snap-start rounded-xl overflow-hidden relative group"
                style={{ aspectRatio: '9/16' }}
              >
                <div className="w-full h-full relative">
                  <img
                    src={reel.img}
                    alt={reel.headline}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:bg-gold-500 group-hover:scale-110 transition-all">
                    <Play className="w-4 h-4 text-maroon-700 ml-0.5" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-lato text-xs text-white/90 font-medium leading-tight">
                      {reel.headline}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
