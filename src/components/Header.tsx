'use client';
import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 h-20 flex items-center justify-between border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 shrink-0" style={{ mixBlendMode: 'screen' }}>
          <Image
            src="/assets/images/IMG_2510-1789418006598.PNG"
            alt="Inkfinity Tattoos & Piercing Logo"
            fill
            className="object-contain scale-125"
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
  );
}