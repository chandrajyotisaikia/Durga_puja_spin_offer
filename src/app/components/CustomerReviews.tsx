import React from 'react';

const REVIEWS = [
  {
    name: 'Priya S.',
    location: 'Guwahati',
    rating: 5,
    text: 'Absolutely loved my experience at Inkfinity! The artist was incredibly skilled and the studio was spotlessly clean. My custom mandala tattoo turned out even better than I imagined. Will definitely be back!',
    design: 'Mandala Sleeve',
  },
  {
    name: 'Rahul D.',
    location: 'Jorhat',
    rating: 5,
    text: 'Got my first tattoo here during Durga Puja and the discount was a great bonus. The team made me feel so comfortable throughout the process. Professional, hygienic, and the ink quality is top-notch. Highly recommend!',
    design: 'Geometric Wolf',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < count ? '#FFD700' : 'none'}
          stroke={i < count ? '#FFD700' : 'rgba(201,162,39,0.3)'}
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="relative py-16 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0f0305 50%, #0D0D0D 100%)' }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#C9A227' }}>What Our Clients Say</span>
            <div className="h-px w-10 bg-primary/40" />
          </div>
          <h2 className="section-headline text-foreground uppercase mb-2">
            Customer <span className="shimmer-text">Reviews</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <StarRating count={5} />
            <span className="text-muted-foreground text-sm font-medium">5.0 · Trusted by 200+ clients</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="relative rounded-lg p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(201,162,39,0.05) 0%, rgba(20,20,20,0.95) 100%)',
                border: '1px solid rgba(201,162,39,0.15)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-5 text-5xl font-serif leading-none pointer-events-none select-none"
                style={{ color: 'rgba(201,162,39,0.12)' }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <StarRating count={review.rating} />

              {/* Review text */}
              <p className="text-muted-foreground text-sm leading-relaxed mt-3 mb-4 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(90deg, rgba(201,162,39,0.3), transparent)' }} />

              {/* Reviewer info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: 'linear-gradient(135deg, #B91C1C, #DC2626)', color: '#FFD700' }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold leading-none">{review.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{review.location}</p>
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2 py-1 rounded-sm"
                  style={{ background: 'rgba(201,162,39,0.1)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.2)' }}
                >
                  {review.design}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.3))' }} />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Verified client reviews</span>
          </div>
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, rgba(201,162,39,0.3), transparent)' }} />
        </div>
      </div>
    </section>
  );
}
