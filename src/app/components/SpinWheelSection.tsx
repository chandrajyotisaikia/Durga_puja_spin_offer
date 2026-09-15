'use client';
import React, { useState, useRef, useCallback } from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import SpinWheel from './SpinWheel';
import ResultModal from './ResultModal';
import ConfettiEffect from './ConfettiEffect';

export type WheelSegment = {
  label: string;
  sublabel: string;
  color: string;
  textColor: string;
  probability: number;
  isMega?: boolean;
};

export const WHEEL_SEGMENTS: WheelSegment[] = [
  { label: '15%', sublabel: 'OFF ON TATTOO', color: '#DC2626', textColor: '#FFFFFF', probability: 17.8 },
  { label: '10%', sublabel: 'OFF ON TATTOO', color: '#F59E0B', textColor: '#FFFFFF', probability: 10 },
  { label: 'MEGA\nOFFER', sublabel: 'TATTOO FREE', color: '#FFD700', textColor: '#0D0D0D', probability: 1, isMega: true },
  { label: '20%', sublabel: 'OFF ON TATTOO', color: '#22C55E', textColor: '#FFFFFF', probability: 8.9 },
  { label: '30%', sublabel: 'OFF ON TATTOO', color: '#14B8A6', textColor: '#FFFFFF', probability: 17.8 },
  { label: '40%', sublabel: 'OFF ON TATTOO', color: '#3B82F6', textColor: '#FFFFFF', probability: 17.8 },
  { label: '50%', sublabel: 'OFF ON TATTOO', color: '#8B5CF6', textColor: '#FFFFFF', probability: 17.8 },
  { label: '10%', sublabel: 'OFF ON TATTOO', color: '#EC4899', textColor: '#FFFFFF', probability: 8.9 },
];

/** Decorative static wheel preview (CSS-only, no canvas) */
function WheelTeaser() {
  const segments = WHEEL_SEGMENTS;
  const count = segments.length;
  const angle = 360 / count;

  return (
    <div className="relative flex justify-center items-center mb-10 overflow-hidden" style={{ height: '140px' }}>
      {/* Blurred wheel peek */}
      <div
        className="relative rounded-full shrink-0"
        style={{
          width: '260px',
          height: '260px',
          transform: 'translateY(80px)',
          filter: 'blur(3px)',
          opacity: 0.75,
        }}
      >
        {/* Conic gradient wheel */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(${segments.map((seg, i) => `${seg.color} ${i * angle}deg ${(i + 1) * angle}deg`).join(', ')})`,
            boxShadow: '0 0 40px rgba(201,162,39,0.4), 0 0 80px rgba(220,38,38,0.2)',
          }}
        />
        {/* Gold ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '4px solid rgba(201,162,39,0.7)', boxSizing: 'border-box' }}
        />
        {/* Center circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: '52px', height: '52px', background: '#0D0D0D', border: '3px solid #C9A227' }}
        />
      </div>

      {/* Gradient fade overlay — bottom fade to hide lower half */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.0) 0%, rgba(13,13,13,0.0) 30%, rgba(13,13,13,0.85) 70%, rgba(13,13,13,1) 100%)' }}
      />

      {/* Teaser label */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-px w-8 bg-primary/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: '#C9A227' }}>Your Discount Awaits</span>
          <div className="h-px w-8 bg-primary/40" />
        </div>
        <p className="text-muted-foreground text-xs text-center">Enter your details below to unlock the wheel 👇</p>
      </div>
    </div>
  );
}

export default function SpinWheelSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userName, setUserName] = useState('');
  const [wonSegment, setWonSegment] = useState<WheelSegment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [megaOverride, setMegaOverride] = useState(false);
  const doubleClickCount = useRef(0);
  const doubleClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFormSubmit = (name: string) => {
    setUserName(name);
    setIsUnlocked(true);
  };

  const handleSecretDoubleClick = useCallback(() => {
    doubleClickCount.current += 1;
    if (doubleClickTimer.current) clearTimeout(doubleClickTimer.current);
    doubleClickTimer.current = setTimeout(() => {
      doubleClickCount.current = 0;
    }, 400);
    if (doubleClickCount.current >= 2) {
      setMegaOverride(true);
      doubleClickCount.current = 0;
    }
  }, []);

  const handleSpinComplete = (segment: WheelSegment) => {
    setWonSegment(segment);
    setMegaOverride(false);
    if (segment.isMega) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setTimeout(() => setShowModal(true), 400);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWonSegment(null);
  };

  return (
    <section
      id="spin-section"
      className="relative py-16 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #120508 50%, #0D0D0D 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #C9A227 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #B91C1C 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #B91C1C 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-red-600/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#DC2626' }}>Durga Puja Festival Offer</span>
            <div className="h-px w-10 bg-red-600/50" />
          </div>
          <h2 className="section-headline text-foreground uppercase mb-3">
            Spin & <span className="shimmer-text">Win</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            {isUnlocked
              ? `Welcome, ${userName}! 🙏 Spin the wheel to reveal your exclusive Durga Puja discount.`
              : 'Enter your details to unlock the spin wheel and claim your festive discount.'}
          </p>
        </div>

        {/* Lead form or wheel */}
        {!isUnlocked ? (
          <>
            {/* Wheel teaser peek */}
            <WheelTeaser />
            <LeadCaptureForm onSubmit={handleFormSubmit} />
          </>
        ) : (
          <SpinWheel
            segments={WHEEL_SEGMENTS}
            onSpinComplete={handleSpinComplete}
            megaOverride={megaOverride}
          />
        )}

        {/* T&C */}
        <p className="text-center text-muted-foreground text-xs mt-6 max-w-md mx-auto leading-relaxed">
          * MEGA OFFER (Free Tattoo) is subject to availability and studio discretion. Valid on select designs only. One spin per customer. Offer valid during Durga Puja 2026 festival period only.
        </p>
      </div>

      {/* Hidden secret double-click zone */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 cursor-default select-none"
        style={{ opacity: 0 }}
        onClick={handleSecretDoubleClick}
        aria-hidden="true"
      />

      {/* Result Modal */}
      {showModal && wonSegment && (
        <ResultModal
          segment={wonSegment}
          userName={userName}
          onClose={handleCloseModal}
        />
      )}

      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}
    </section>
  );
}