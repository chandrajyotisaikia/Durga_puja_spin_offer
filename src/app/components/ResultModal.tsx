'use client';
import React from 'react';
import type { WheelSegment } from './SpinWheelSection';

interface ResultModalProps {
  segment: WheelSegment;
  userName: string;
  onClose: () => void;
}

export default function ResultModal({ segment, userName, onClose }: ResultModalProps) {
  const whatsappMessage = encodeURIComponent(
    `🙏 Jai Maa Durga! I just spun the Inkfinity Durga Puja wheel and won: ${segment.isMega ? 'MEGA OFFER - TATTOO FREE' : segment.label + ' OFF on Tattoo'}. My name is ${userName}. I'd like to book a session this festive season!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div
        className="relative max-w-sm w-full rounded-lg overflow-hidden animate-scale-in"
        style={{
          background: 'linear-gradient(135deg, #141414 0%, #1A0808 100%)',
          border: `2px solid ${segment.color}`,
          boxShadow: `0 0 40px ${segment.color}40, 0 20px 60px rgba(0,0,0,0.8)`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10 w-8 h-8 flex items-center justify-center"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Top colored band */}
        <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${segment.color}, ${segment.isMega ? '#FFD700' : segment.color}DD)` }} />

        <div className="p-6 md:p-8 text-center">
          {/* Trophy/star icon */}
          <div className="text-5xl mb-4">{segment.isMega ? '🏆' : '🎉'}</div>

          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
            🙏 Jai Maa Durga, {userName}!
          </p>

          <h2
            className="font-display font-black text-foreground uppercase mb-1"
            style={{ fontSize: 'clamp(1.8rem, 8vw, 3rem)', lineHeight: 1, color: segment.isMega ? '#FFD700' : segment.color }}
          >
            {segment.isMega ? 'TATTOO FREE' : `${segment.label} OFF`}
          </h2>

          {segment.isMega ? (
            <div className="mt-2 mb-4">
              <span
                className="inline-block px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest text-primary-foreground"
                style={{ background: segment.color }}
              >
                MEGA OFFER
              </span>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm mb-4">on your next tattoo session this Durga Puja</p>
          )}

          {segment.isMega && (
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed border border-primary/20 rounded p-3 bg-primary/5">
              * Free tattoo subject to availability and studio discretion. Valid on select designs. Please contact us to confirm your Durga Puja booking.
            </p>
          )}

          {/* Divider */}
          <div className="h-px w-full my-4" style={{ background: `linear-gradient(90deg, transparent, ${segment.color}60, transparent)` }} />

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            <a
              href={`https://wa.me/918638036936?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-sm font-bold text-sm uppercase tracking-wider text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book via WhatsApp
            </a>
            <a
              href="tel:+918638036936"
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-sm font-semibold text-sm uppercase tracking-wider border border-primary/40 text-primary hover:border-primary transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              Call: 8638036936
            </a>
            <button
              onClick={onClose}
              className="text-muted-foreground text-xs hover:text-foreground transition-colors py-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}