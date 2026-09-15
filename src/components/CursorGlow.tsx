'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: -50, y: -50 });
  const currentRef = useRef({ x: -50, y: -50 });

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Smooth lerp animation loop
    const animate = () => {
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.08;
      el.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Desktop: track mouse
    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    // Mobile: track touch
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        posRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    // Mobile fallback: track scroll midpoint
    const onScroll = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      posRef.current = { x: centerX, y: centerY };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Init to center on mobile
    posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(180,30,30,0.12) 40%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none',
        willChange: 'transform',
        filter: 'blur(40px)',
        mixBlendMode: 'screen',
      }}
    />
  );
}
