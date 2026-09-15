'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.hero-anim');
    elements?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.15}s`;
      el.classList.add('animate-fade-in');
    });
  }, []);

  // Animated particle canvas for festive sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }[] = [];
    const colors = ['#FFD700', '#C9A227', '#DC2626', '#FF6B35', '#FFA500', '#FF4500'];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.002;
        if (p.alpha <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.alpha = Math.random() * 0.7 + 0.2;
          p.vy = -Math.random() * 0.6 - 0.2;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToWheel = () => {
    document.getElementById('spin-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
      style={{ paddingTop: '80px', paddingBottom: '60px' }}
    >
      {/* === ANIMATED GRADIENT BACKGROUND === */}
      <div className="absolute inset-0 z-0" style={{ background: '#0D0D0D' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,20,20,0.55) 0%, transparent 70%)',
            animation: 'heroGlow1 6s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(201,162,39,0.25) 0%, transparent 65%)',
            animation: 'heroGlow2 8s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 80% 70%, rgba(220,38,38,0.20) 0%, transparent 60%)',
            animation: 'heroGlow3 7s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-1/2"
          style={{ background: 'linear-gradient(180deg, rgba(255,107,53,0.12) 0%, transparent 100%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* === DURGA DEITY SILHOUETTE === */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 520 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-2xl h-full object-contain"
          style={{ opacity: 0.13, filter: 'blur(0.5px)' }}
          preserveAspectRatio="xMidYMax meet"
        >
          <path d="M260 90 L230 55 L215 18 L260 48 L305 18 L290 55 Z" stroke="#C9A227" strokeWidth="2" fill="rgba(201,162,39,0.25)"/>
          <path d="M215 65 L185 32 L172 8 L210 38 L230 55" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M305 65 L335 32 L348 8 L310 38 L290 55" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <circle cx="260" cy="48" r="6" stroke="#FFD700" strokeWidth="1.5" fill="rgba(255,215,0,0.3)"/>
          <circle cx="215" cy="38" r="4" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.2)"/>
          <circle cx="305" cy="38" r="4" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.2)"/>
          <path d="M185 65 Q260 30 335 65" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M195 72 Q260 42 325 72" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.6"/>
          <ellipse cx="260" cy="155" rx="48" ry="58" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.06)"/>
          <ellipse cx="260" cy="135" rx="7" ry="4" stroke="#DC2626" strokeWidth="1.5" fill="rgba(220,38,38,0.4)"/>
          <circle cx="260" cy="135" r="2" fill="#DC2626"/>
          <path d="M238 148 Q248 142 258 148 Q248 154 238 148Z" stroke="#C9A227" strokeWidth="1" fill="rgba(201,162,39,0.3)"/>
          <path d="M262 148 Q272 142 282 148 Q272 154 262 148Z" stroke="#C9A227" strokeWidth="1" fill="rgba(201,162,39,0.3)"/>
          <path d="M255 158 Q260 165 265 158" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M248 172 Q260 180 272 172" stroke="#DC2626" strokeWidth="1.5" fill="none"/>
          <circle cx="212" cy="160" r="8" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <circle cx="308" cy="160" r="8" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M212 168 L212 185" stroke="#C9A227" strokeWidth="1"/>
          <path d="M308 168 L308 185" stroke="#C9A227" strokeWidth="1"/>
          <rect x="248" y="213" width="24" height="30" rx="4" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M210 240 Q260 260 310 240" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M215 248 Q260 270 305 248" stroke="#C9A227" strokeWidth="1" fill="none"/>
          {[220, 235, 250, 260, 270, 285, 300].map((x, i) => (
            <circle key={i} cx={x} cy={244} r="3" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.3)"/>
          ))}
          <path d="M210 270 L175 480 L260 510 L345 480 L310 270 Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.06)"/>
          <path d="M210 270 Q190 350 185 430" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M310 270 Q330 350 335 430" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M220 300 Q260 320 300 300" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M215 340 Q260 360 305 340" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M212 380 Q260 400 308 380" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M210 420 Q260 440 310 420" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M210 285 L140 240 L100 200" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M205 310 L125 280 L75 260" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M200 340 L130 330 L80 340" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M198 370 L140 390 L100 430" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M310 285 L380 240 L420 200" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M315 310 L395 280 L445 260" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M320 340 L390 330 L440 340" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M322 370 L380 390 L420 430" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <line x1="100" y1="200" x2="100" y2="140" stroke="#C9A227" strokeWidth="2"/>
          <path d="M100 140 C100 140 88 120 90 105 C94 115 100 118 100 118 C100 118 106 115 110 105 C112 120 100 140 100 140Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.2)"/>
          <path d="M75 260 L55 200 L60 195 L80 255Z" stroke="#C9A227" strokeWidth="1" fill="rgba(201,162,39,0.15)"/>
          <line x1="75" y1="260" x2="55" y2="200" stroke="#C9A227" strokeWidth="1.5"/>
          <circle cx="420" cy="200" r="16" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M420 184 C412 172 402 170 402 182 C402 192 412 196 420 200" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M420 184 C428 172 438 170 438 182 C438 192 428 196 420 200" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <circle cx="420" cy="200" r="5" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.3)"/>
          <circle cx="445" cy="260" r="14" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <circle cx="445" cy="260" r="6" stroke="#C9A227" strokeWidth="1" fill="none"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1={445 + 6 * Math.cos(angle * Math.PI / 180)}
              y1={260 + 6 * Math.sin(angle * Math.PI / 180)}
              x2={445 + 14 * Math.cos(angle * Math.PI / 180)}
              y2={260 + 14 * Math.sin(angle * Math.PI / 180)}
              stroke="#C9A227" strokeWidth="1"
            />
          ))}
          <path d="M175 480 L155 620 L260 650 L365 620 L345 480 Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.05)"/>
          <path d="M180 510 Q260 535 340 510" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M170 550 Q260 575 350 550" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M162 590 Q260 615 358 590" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <ellipse cx="260" cy="660" rx="100" ry="22" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.1)"/>
          <path d="M160 660 Q180 640 200 650 Q220 635 240 648 Q260 632 280 648 Q300 635 320 650 Q340 640 360 660" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <ellipse cx="260" cy="660" rx="80" ry="14" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.5"/>
          <circle cx="260" cy="145" r="90" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4 6"/>
          <circle cx="260" cy="145" r="100" stroke="#FFD700" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="2 8"/>
          <path d="M155 270 Q140 290 145 310 Q150 290 165 285" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M365 270 Q380 290 375 310 Q370 290 355 285" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
        </svg>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 60%, transparent 30%, #0D0D0D 85%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, #0D0D0D, transparent)' }} />
      </div>

      {/* Decorative SVG motifs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute top-24 left-4 opacity-15 w-16 h-24 md:w-24 md:h-36" viewBox="0 0 100 160" fill="none">
          <line x1="50" y1="40" x2="50" y2="155" stroke="#C9A227" strokeWidth="3"/>
          <path d="M50 40 C50 40 35 20 38 5 C42 15 50 18 50 18 C50 18 58 15 62 5 C65 20 50 40 50 40Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.2)"/>
          <line x1="35" y1="80" x2="65" y2="80" stroke="#C9A227" strokeWidth="2"/>
        </svg>
        <div className="absolute top-0 left-0 right-0 h-1 opacity-40"
          style={{ background: 'linear-gradient(90deg, transparent, #B91C1C 30%, #FFD700 50%, #B91C1C 70%, transparent)' }} />
      </div>

      {/* CSS keyframes */}
      <style>{`
        @keyframes heroGlow1 {
          0% { opacity: 0.5; transform: scale(1) translateY(0); }
          100% { opacity: 0.8; transform: scale(1.08) translateY(-20px); }
        }
        @keyframes heroGlow2 {
          0% { opacity: 0.2; transform: scale(1) translateX(0); }
          100% { opacity: 0.4; transform: scale(1.1) translateX(20px); }
        }
        @keyframes heroGlow3 {
          0% { opacity: 0.15; transform: scale(1); }
          100% { opacity: 0.35; transform: scale(1.12) translateX(-15px); }
        }
        @keyframes floatMachine {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
      `}</style>

      {/* Header bar */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 h-20 flex items-center justify-between border-b border-red-900/20 bg-background/80 backdrop-blur-md">
        <div className="beam-border-h" />
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-primary/30 bg-black/40 shrink-0">
            <Image
              src="/assets/images/IMG_2510-1789416699977.PNG"
              alt="Inkfinity Tattoos & Piercing Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight block leading-none">INKFINITY</span>
            <span className="text-muted-foreground text-xs tracking-widest uppercase">Tattoos & Piercing</span>
          </div>
        </div>
        <span className="hidden md:block text-xs text-muted-foreground italic" style={{ fontFamily: 'serif' }}>Real Art Lasts Forever</span>
      </header>

      {/* Hero content — two-column on md+ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

        {/* Left: Text content */}
        <div className="flex-1 text-center md:text-left">
          {/* Eyebrow */}
          <div className="hero-anim opacity-0 inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-red-600/60" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: '#DC2626' }}>Durga Puja 2026 Special</span>
            <div className="h-px w-12 bg-red-600/60" />
          </div>

          {/* Headline */}
          <div className="relative inline-block mb-2">
            <div className="absolute inset-0 -mx-4 -my-1 opacity-80 rounded" style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #991B1B 100%)', transform: 'skewX(-2deg)' }} />
            <h1 className="hero-anim opacity-0 hero-headline relative z-10 mb-0 uppercase" style={{ color: '#FFD700', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
              Durga Puja
            </h1>
          </div>
          <h1 className="hero-anim opacity-0 hero-headline shimmer-text mb-2 uppercase">Special</h1>
          <h1 className="hero-anim opacity-0 hero-headline text-foreground mb-6 uppercase">Offer</h1>

          {/* Sub tagline */}
          <div className="hero-anim opacity-0 flex items-center justify-center md:justify-start gap-3 mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-[0.3em]">Get Inked</span>
            <span className="text-red-600 text-xs">•</span>
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-[0.3em]">Celebrate the Festival</span>
            <div className="h-px w-8 bg-primary/40" />
          </div>

          {/* Description */}
          <p className="hero-anim opacity-0 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-10 font-light">
            Celebrate Durga Puja with <span className="text-accent font-semibold">exclusive tattoo discounts</span>. Spin the wheel, claim your offer, and get inked at Inkfinity this festive season!
          </p>

          {/* CTA */}
          <div className="hero-anim opacity-0 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button
              onClick={scrollToWheel}
              className="text-white font-display font-bold text-lg uppercase tracking-widest px-10 py-4 rounded-sm animate-pulse-gold transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #991B1B 100%)', boxShadow: '0 0 30px rgba(220,38,38,0.5)' }}
            >
              🎡 Spin to Win Your Discount
            </button>
          </div>

          {/* Scroll hint */}
          <div className="hero-anim opacity-0 mt-10 flex flex-col items-center md:items-start gap-2 animate-float">
            <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll to Spin</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom decorative rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent" />
    </section>
  );
}