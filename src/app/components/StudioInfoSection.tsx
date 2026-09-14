'use client';
import React, { useEffect, useRef } from 'react';

const BADGES = [
  { icon: '🛡️', title: 'Professional Artists', desc: 'Trained & certified tattoo artists with years of experience' },
  { icon: '🧪', title: 'Sterile & Safe', desc: 'Hospital-grade sterilization, single-use needles only' },
  { icon: '💎', title: 'Premium Quality Ink', desc: 'International grade inks, vibrant and long-lasting' },
  { icon: '✏️', title: 'Custom Designs', desc: 'Bespoke artwork tailored to your vision and style' },
];

export default function StudioInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.info-anim').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
                (el as HTMLElement).style.opacity = '1';
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #120508 50%, #0D0D0D 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #B91C1C 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute top-0 right-1/4 w-48 h-48 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 info-anim opacity-0">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-red-600/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#DC2626' }}>Why Choose Us</span>
            <div className="h-px w-10 bg-red-600/50" />
          </div>
          <h2 className="section-headline text-foreground uppercase mb-3">
            Studio <span className="shimmer-text">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Where art meets precision. Every tattoo is a masterpiece crafted with care — this Durga Puja, celebrate with ink.
          </p>
        </div>

        {/* Badges grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {BADGES.map((badge, i) => (
            <div
              key={i}
              className="info-anim opacity-0 badge-card rounded-lg p-5 flex items-start gap-4 hover:border-primary/40 transition-all group"
            >
              <div className="text-3xl shrink-0 group-hover:scale-110 transition-transform">{badge.icon}</div>
              <div>
                <h3 className="font-display font-bold text-foreground text-base uppercase tracking-wide mb-1">{badge.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact + Location card */}
        <div
          className="info-anim opacity-0 grunge-border rounded-lg overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(180,20,20,0.08) 0%, rgba(15,15,15,0.98) 100%)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Location */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-900/20 border border-red-700/30 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-foreground uppercase tracking-wide">Our Location</h3>
              </div>
              <div className="space-y-1 pl-1">
                <p className="text-accent font-bold text-lg font-display uppercase tracking-wide">Batala Tiniali</p>
                <p className="text-muted-foreground text-sm">Neha Shiv Mandir</p>
                <p className="text-muted-foreground text-sm">Raja Complex, Batala Tiniali</p>
                <p className="text-muted-foreground text-xs mt-2 uppercase tracking-wider">Assam, India</p>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-foreground uppercase tracking-wide">Contact Us</h3>
              </div>
              <div className="space-y-3">
                <a
                  href="tel:+918638036936"
                  className="flex items-center gap-2 text-accent font-bold text-xl hover:text-primary transition-colors"
                >
                  8638036936
                </a>
                <a
                  href="https://wa.me/918638036936"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-3 px-5 rounded-sm font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90 w-full justify-center"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="info-anim opacity-0 text-center mt-10">
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {['Tattoos', 'Piercing', 'Art', 'Passion'].map((item, i) => (
              <React.Fragment key={item}>
                <span className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.3em]">{item}</span>
                {i < 3 && <span className="text-red-700/40 text-xs">|</span>}
              </React.Fragment>
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-3 italic" style={{ fontFamily: 'serif' }}>
            🙏 New Tattoo, New Stories — Celebrate Durga Puja with Inkfinity
          </p>
        </div>
      </div>
    </section>
  );
}