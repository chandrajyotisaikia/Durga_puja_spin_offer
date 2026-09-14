'use client';
import React, { useEffect, useRef } from 'react';
import AppLogo from '@/components/ui/AppLogo';

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

    // Seed particles
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
        {/* Deep animated gradient layers */}
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
        {/* Saffron sweep at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2"
          style={{
            background: 'linear-gradient(180deg, rgba(255,107,53,0.12) 0%, transparent 100%)',
          }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* === DURGA DEITY SILHOUETTE (full-height, centered behind content) === */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 520 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-2xl h-full object-contain"
          style={{ opacity: 0.13, filter: 'blur(0.5px)' }}
          preserveAspectRatio="xMidYMax meet"
        >
          {/* === MUKUT / CROWN === */}
          <path d="M260 90 L230 55 L215 18 L260 48 L305 18 L290 55 Z" stroke="#C9A227" strokeWidth="2" fill="rgba(201,162,39,0.25)"/>
          <path d="M215 65 L185 32 L172 8 L210 38 L230 55" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M305 65 L335 32 L348 8 L310 38 L290 55" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          {/* Crown jewels */}
          <circle cx="260" cy="48" r="6" stroke="#FFD700" strokeWidth="1.5" fill="rgba(255,215,0,0.3)"/>
          <circle cx="215" cy="38" r="4" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.2)"/>
          <circle cx="305" cy="38" r="4" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.2)"/>
          {/* Crown arch */}
          <path d="M185 65 Q260 30 335 65" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M195 72 Q260 42 325 72" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.6"/>

          {/* === FACE === */}
          <ellipse cx="260" cy="155" rx="48" ry="58" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.06)"/>
          {/* Third eye */}
          <ellipse cx="260" cy="135" rx="7" ry="4" stroke="#DC2626" strokeWidth="1.5" fill="rgba(220,38,38,0.4)"/>
          <circle cx="260" cy="135" r="2" fill="#DC2626"/>
          {/* Eyes */}
          <path d="M238 148 Q248 142 258 148 Q248 154 238 148Z" stroke="#C9A227" strokeWidth="1" fill="rgba(201,162,39,0.3)"/>
          <path d="M262 148 Q272 142 282 148 Q272 154 262 148Z" stroke="#C9A227" strokeWidth="1" fill="rgba(201,162,39,0.3)"/>
          {/* Nose */}
          <path d="M255 158 Q260 165 265 158" stroke="#C9A227" strokeWidth="1" fill="none"/>
          {/* Lips */}
          <path d="M248 172 Q260 180 272 172" stroke="#DC2626" strokeWidth="1.5" fill="none"/>
          {/* Earrings */}
          <circle cx="212" cy="160" r="8" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <circle cx="308" cy="160" r="8" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M212 168 L212 185" stroke="#C9A227" strokeWidth="1"/>
          <path d="M308 168 L308 185" stroke="#C9A227" strokeWidth="1"/>

          {/* === NECK & NECKLACE === */}
          <rect x="248" y="213" width="24" height="30" rx="4" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M210 240 Q260 260 310 240" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M215 248 Q260 270 305 248" stroke="#C9A227" strokeWidth="1" fill="none"/>
          {/* Necklace gems */}
          {[220, 235, 250, 260, 270, 285, 300].map((x, i) => (
            <circle key={i} cx={x} cy={244} r="3" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.3)"/>
          ))}

          {/* === TORSO / SAREE === */}
          <path d="M210 270 L175 480 L260 510 L345 480 L310 270 Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.06)"/>
          {/* Saree drape lines */}
          <path d="M210 270 Q190 350 185 430" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M310 270 Q330 350 335 430" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.5"/>
          <path d="M220 300 Q260 320 300 300" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M215 340 Q260 360 305 340" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M212 380 Q260 400 308 380" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M210 420 Q260 440 310 420" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>

          {/* === 8 ARMS (4 per side) === */}
          {/* Left arms */}
          <path d="M210 285 L140 240 L100 200" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M205 310 L125 280 L75 260" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M200 340 L130 330 L80 340" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M198 370 L140 390 L100 430" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          {/* Right arms */}
          <path d="M310 285 L380 240 L420 200" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M315 310 L395 280 L445 260" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M320 340 L390 330 L440 340" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M322 370 L380 390 L420 430" stroke="#C9A227" strokeWidth="1.5" fill="none"/>

          {/* === WEAPONS & ITEMS IN HANDS === */}
          {/* Trishul - top left hand */}
          <line x1="100" y1="200" x2="100" y2="140" stroke="#C9A227" strokeWidth="2"/>
          <path d="M100 140 C100 140 88 120 90 105 C94 115 100 118 100 118 C100 118 106 115 110 105 C112 120 100 140 100 140Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.2)"/>
          <path d="M82 155 C82 155 70 138 72 125 C76 134 82 136 82 136" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M118 155 C118 155 130 138 128 125 C124 134 118 136 118 136" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <line x1="88" y1="175" x2="112" y2="175" stroke="#C9A227" strokeWidth="1.5"/>

          {/* Sword - second left */}
          <path d="M75 260 L55 200 L60 195 L80 255Z" stroke="#C9A227" strokeWidth="1" fill="rgba(201,162,39,0.15)"/>
          <line x1="75" y1="260" x2="55" y2="200" stroke="#C9A227" strokeWidth="1.5"/>

          {/* Lotus - top right hand */}
          <circle cx="420" cy="200" r="16" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M420 184 C412 172 402 170 402 182 C402 192 412 196 420 200" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M420 184 C428 172 438 170 438 182 C438 192 428 196 420 200" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M404 200 C396 192 394 182 404 180 C410 188 414 194 420 200" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <path d="M436 200 C444 192 446 182 436 180 C430 188 426 194 420 200" stroke="#C9A227" strokeWidth="1" fill="none"/>
          <circle cx="420" cy="200" r="5" stroke="#FFD700" strokeWidth="1" fill="rgba(255,215,0,0.3)"/>

          {/* Chakra - second right */}
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

          {/* === LOWER BODY / SKIRT === */}
          <path d="M175 480 L155 620 L260 650 L365 620 L345 480 Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.05)"/>
          <path d="M180 510 Q260 535 340 510" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M170 550 Q260 575 350 550" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M162 590 Q260 615 358 590" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>

          {/* === LOTUS PEDESTAL === */}
          <ellipse cx="260" cy="660" rx="100" ry="22" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.1)"/>
          <path d="M160 660 Q180 640 200 650 Q220 635 240 648 Q260 632 280 648 Q300 635 320 650 Q340 640 360 660" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <ellipse cx="260" cy="660" rx="80" ry="14" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.5"/>

          {/* === HALO / PRABHAMANDAL === */}
          <circle cx="260" cy="145" r="90" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4 6"/>
          <circle cx="260" cy="145" r="100" stroke="#FFD700" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="2 8"/>

          {/* === DECORATIVE BORDER PATTERNS === */}
          <path d="M155 270 Q140 290 145 310 Q150 290 165 285" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M365 270 Q380 290 375 310 Q370 290 355 285" stroke="#C9A227" strokeWidth="1" fill="none" opacity="0.4"/>
        </svg>

        {/* Fade edges so silhouette blends into background */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 60%, transparent 30%, #0D0D0D 85%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, #0D0D0D, transparent)' }} />
      </div>

      {/* Decorative SVG motifs (corners) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Trishul - top left */}
        <svg className="absolute top-24 left-4 opacity-15 w-16 h-24 md:w-24 md:h-36" viewBox="0 0 100 160" fill="none">
          <line x1="50" y1="40" x2="50" y2="155" stroke="#C9A227" strokeWidth="3"/>
          <path d="M50 40 C50 40 35 20 38 5 C42 15 50 18 50 18 C50 18 58 15 62 5 C65 20 50 40 50 40Z" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.2)"/>
          <path d="M30 55 C30 55 20 40 22 28 C26 36 33 38 33 38" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M70 55 C70 55 80 40 78 28 C74 36 67 38 67 38" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <line x1="35" y1="80" x2="65" y2="80" stroke="#C9A227" strokeWidth="2"/>
        </svg>
        {/* Lotus - top right */}
        <svg className="absolute top-20 right-4 opacity-15 w-20 h-20 md:w-32 md:h-32" viewBox="0 0 200 200" fill="none">
          <path d="M100 160 C80 130 60 110 60 80 C60 60 80 50 100 60 C120 50 140 60 140 80 C140 110 120 130 100 160Z" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M100 160 C70 140 40 130 30 100 C40 90 60 95 80 110" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M100 160 C130 140 160 130 170 100 C160 90 140 95 120 110" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <circle cx="100" cy="100" r="12" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
        </svg>
        {/* Diya - bottom left */}
        <svg className="absolute bottom-24 left-4 opacity-15 w-16 h-16 md:w-24 md:h-24" viewBox="0 0 120 120" fill="none">
          <ellipse cx="60" cy="80" rx="35" ry="15" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M25 80 C25 65 35 55 60 55 C85 55 95 65 95 80" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M60 55 L60 30" stroke="#C9A227" strokeWidth="1.5"/>
          <path d="M55 30 C55 20 60 10 60 10 C60 10 65 20 65 30" stroke="#FFD700" strokeWidth="1.5" fill="none"/>
        </svg>
        {/* Lotus - bottom right */}
        <svg className="absolute bottom-20 right-4 opacity-15 w-18 h-18 md:w-28 md:h-28" viewBox="0 0 150 150" fill="none">
          <path d="M75 120 C55 95 40 80 40 60 C40 45 55 38 75 45 C95 38 110 45 110 60 C110 80 95 95 75 120Z" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M75 120 C50 105 25 100 18 75 C28 65 45 70 60 82" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <path d="M75 120 C100 105 125 100 132 75 C122 65 105 70 90 82" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
          <circle cx="75" cy="75" r="10" stroke="#C9A227" strokeWidth="1.5" fill="none"/>
        </svg>
        {/* Top decorative rule */}
        <div className="absolute top-0 left-0 right-0 h-1 opacity-40"
          style={{ background: 'linear-gradient(90deg, transparent, #B91C1C 30%, #FFD700 50%, #B91C1C 70%, transparent)' }} />
      </div>

      {/* CSS keyframes for animated gradients */}
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
      `}</style>

      {/* Header bar */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 h-20 flex items-center justify-between border-b border-red-900/20 bg-background/80 backdrop-blur-md">
        <div className="beam-border-h" />
        <div className="flex items-center gap-3">
          <AppLogo size={36} />
          <div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight block leading-none">INKFINITY</span>
            <span className="text-muted-foreground text-xs tracking-widest uppercase">Tattoos & Piercing</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-xs text-muted-foreground italic" style={{ fontFamily: 'serif' }}>Real Art Lasts Forever</span>
          <a
            href="https://wa.me/918638036936"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Book Now
          </a>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="hero-anim opacity-0 inline-flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-red-600/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: '#DC2626' }}>Durga Puja 2025 Special</span>
          <div className="h-px w-12 bg-red-600/60" />
        </div>

        {/* Red brush stroke background for headline */}
        <div className="relative inline-block mb-2">
          <div className="absolute inset-0 -mx-4 -my-1 opacity-80 rounded" style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #991B1B 100%)', transform: 'skewX(-2deg)' }} />
          <h1 className="hero-anim opacity-0 hero-headline relative z-10 mb-0 uppercase" style={{ color: '#FFD700', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
            Durga Puja
          </h1>
        </div>

        <h1 className="hero-anim opacity-0 hero-headline shimmer-text mb-2 uppercase">
          Special
        </h1>
        <h1 className="hero-anim opacity-0 hero-headline text-foreground mb-6 uppercase">
          Offer
        </h1>

        {/* Sub tagline */}
        <div className="hero-anim opacity-0 flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-8 bg-primary/40" />
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-[0.3em]">Get Inked</span>
          <span className="text-red-600 text-xs">•</span>
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-[0.3em]">Celebrate the Festival</span>
          <div className="h-px w-8 bg-primary/40" />
        </div>

        {/* Description */}
        <p className="hero-anim opacity-0 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light">
          Celebrate Durga Puja with <span className="text-accent font-semibold">exclusive tattoo discounts</span>. Spin the wheel, claim your offer, and get inked at Inkfinity this festive season!
        </p>

        {/* Feature badges */}
        <div className="hero-anim opacity-0 flex flex-wrap items-center justify-center gap-3 mb-8">
          {[
            { icon: '🛡️', text: 'Professional Artists' },
            { icon: '💉', text: 'Sterile & Safe' },
            { icon: '💎', text: 'Premium Quality Ink' },
            { icon: '✏️', text: 'Custom Designs' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <span className="text-sm">{badge.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hero-anim opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToWheel}
            className="text-white font-display font-bold text-lg uppercase tracking-widest px-10 py-4 rounded-sm animate-pulse-gold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #991B1B 100%)', boxShadow: '0 0 30px rgba(220,38,38,0.5)' }}
          >
            🎡 Spin to Win Your Discount
          </button>
          <a
            href="https://wa.me/918638036936"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-primary/40 text-primary hover:border-primary hover:text-accent transition-all px-8 py-4 rounded-sm text-sm font-semibold uppercase tracking-wider"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
        </div>

        {/* Scroll hint */}
        <div className="hero-anim opacity-0 mt-12 flex flex-col items-center gap-2 animate-float">
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll to Spin</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Bottom decorative rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent" />
    </section>
  );
}