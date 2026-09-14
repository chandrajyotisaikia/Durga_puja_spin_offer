import React from 'react';
import AppLogo from '@/components/ui/AppLogo';


export default function Footer() {
  return (
    <footer className="border-t py-8 px-6" style={{ borderColor: 'rgba(180,20,20,0.15)' }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <div>
            <span className="font-display font-bold text-sm text-foreground tracking-tight block leading-none">INKFINITY</span>
            <span className="text-muted-foreground text-xs tracking-widest uppercase">Tattoos & Piercing</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium">
          <a href="tel:+918638036936" className="hover:text-primary transition-colors">8638036936</a>
          <span className="text-border">·</span>
          <a
            href="https://wa.me/918638036936"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            WhatsApp
          </a>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">Batala Tiniali, Assam</span>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-muted-foreground text-xs">© 2025 Inkfinity Tattoos & Piercing</p>
          <p className="text-xs mt-0.5" style={{ color: '#C9A227', fontFamily: 'serif', fontStyle: 'italic' }}>🙏 Jai Maa Durga</p>
        </div>
      </div>
    </footer>
  );
}