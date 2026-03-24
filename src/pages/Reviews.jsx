import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { getTestimonials } from '../services/testimonialsService';
import { supabase } from '../lib/supabase';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SEO } from '../components/ui/SEO';
import { Button } from '../components/ui/Button';
import { CardSkeleton } from '../components/ui/Skeleton';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 justify-center md:justify-start">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-gold-400 text-gold-400' : 'text-beige-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    client_name: '',
    event_type: '',
    review_text: '',
    rating: 5,
  });

  // ✅ Fetch reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestimonials();
        setReviews(data || []);
      } catch (err) {
        console.error(err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Submit review
  const handleSubmit = async () => {
    if (!form.client_name || !form.review_text) {
      alert('Please fill required fields');
      return;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          client_name: form.client_name,
          event_type: form.event_type,
          review_text: form.review_text,
          rating: form.rating,
          is_featured: false,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      alert('Error saving review');
      return;
    }

    setReviews((prev) => [...data, ...prev]);

    setOpen(false);
    setForm({
      client_name: '',
      event_type: '',
      review_text: '',
      rating: 5,
    });
  };

  const featured = reviews.filter((r) => r.is_featured);
  const rest = reviews.filter((r) => !r.is_featured);

  const avgRating = reviews.length
    ? (
        reviews.reduce((a, b) => a + (b.rating || 5), 0) /
        reviews.length
      ).toFixed(1)
    : '5.0';

  return (
    <PageWrapper>
      <SEO title="Client Reviews" />

      {/* Header */}
      <section className="pt-28 pb-12 bg-maroon-700">
        <div className="container-custom text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-beige-100">
            What Our Clients Say
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-beige-200">
        <div className="container-custom flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-maroon-700">{avgRating}</p>
          <StarRating rating={Math.round(avgRating)} />
          <p className="text-sm text-gray-500 mt-1">
            {reviews.length} Reviews
          </p>
        </div>
      </section>

      {/* ✅ FIXED SECTION (NO BLANK EVER) */}
      <section className="section-padding bg-beige-100 min-h-[400px]">
        <div className="container-custom">

          {/* Loading */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-500">
              No reviews yet
            </p>
          ) : (
            <>
              {/* Featured */}
              {featured.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-cormorant text-2xl font-bold text-maroon-700 mb-6">
                    Featured Reviews
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {featured.map((r) => (
                      <div
                        key={r.id}
                        className="bg-white p-6 rounded-xl shadow-lg border border-gold-200 relative"
                      >
                        <Quote className="absolute top-4 right-4 w-10 h-10 text-gold-400/20" />
                        <p className="font-bold text-maroon-700 text-lg">
                          {r.client_name}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                          {r.event_type}
                        </p>
                        <StarRating rating={r.rating} />
                        <p className="text-sm mt-3 italic">
                          “{r.review_text}”
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Reviews */}
              <div>
                <h2 className="font-cormorant text-2xl font-bold text-maroon-700 mb-6">
                  All Reviews
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {rest.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white p-5 rounded-xl shadow relative"
                    >
                      <Quote className="absolute top-3 right-3 w-8 h-8 text-gold-400/15" />
                      <p className="font-bold text-maroon-700">
                        {r.client_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {r.event_type}
                      </p>
                      <StarRating rating={r.rating} />
                      <p className="text-sm mt-2 italic">
                        “{r.review_text}”
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Button */}
          <div className="text-center mt-10">
            <Button onClick={() => setOpen(true)}>
              Write a Review
            </Button>
          </div>

        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Write a Review
            </h2>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded mb-3"
              value={form.client_name}
              onChange={(e) =>
                setForm({ ...form, client_name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Event Type"
              className="w-full border p-2 rounded mb-3"
              value={form.event_type}
              onChange={(e) =>
                setForm({ ...form, event_type: e.target.value })
              }
            />

            <textarea
              placeholder="Your Review"
              className="w-full border p-2 rounded mb-3"
              rows={4}
              value={form.review_text}
              onChange={(e) =>
                setForm({ ...form, review_text: e.target.value })
              }
            />

            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  onClick={() => setForm({ ...form, rating: i })}
                  className={`cursor-pointer ${
                    i <= form.rating
                      ? 'text-gold-400 fill-gold-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)}>
                Cancel
              </button>
              <Button onClick={handleSubmit}>
                Submit
              </Button>
            </div>

          </div>
        </div>
      )}
    </PageWrapper>
  );
}