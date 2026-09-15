import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t py-8 px-6" style={{ borderColor: 'rgba(180,20,20,0.15)' }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12 shrink-0" style={{ mixBlendMode: 'screen' }}>
            <Image
              src="/assets/images/IMG_2510-1789418006598.PNG"
              alt="Inkfinity Logo"
              fill
              className="object-contain scale-125"
            />
          </div>
          <div>
            <span className="font-display font-bold text-sm text-foreground tracking-tight block leading-none">INKFINITY</span>
            <span className="text-muted-foreground text-xs tracking-widest uppercase">Tattoos & Piercing</span>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-muted-foreground text-xs">© 2026 Chandrajyoti Saikia</p>
          <p className="text-xs mt-0.5" style={{ color: '#C9A227', fontFamily: 'serif', fontStyle: 'italic' }}>🙏 Jai Maa Durga</p>
        </div>
      </div>
    </footer>
  );
}