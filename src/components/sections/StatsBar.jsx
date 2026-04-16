import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { STATS } from '../../lib/constants';
import { FadeInUp } from '../ui/FadeInUp';

export function StatsBar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="bg-maroon-700 py-12">
      <div className="container-custom">
        <FadeInUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-cinzel text-3xl md:text-4xl font-bold text-gold-400">
                  {inView ? (
                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </p>
                <p className="font-lato text-sm text-beige-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
