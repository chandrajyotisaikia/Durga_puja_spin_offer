import React from 'react';
import AppLogo from '@/components/ui/AppLogo';


export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 h-20 flex items-center justify-between border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <AppLogo size={36} />
        <div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight block leading-none">INKFINITY</span>
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Tattoos & Piercing</span>
        </div>
      </div>
      <a
        href="https://wa.me/918638036936"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-accent transition-colors"
      >
        Book Now
      </a>
    </header>
  );
}