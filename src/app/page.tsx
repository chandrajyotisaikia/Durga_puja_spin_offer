import React from 'react';
import HeroSection from './components/HeroSection';
import SpinWheelSection from './components/SpinWheelSection';
import StudioInfoSection from './components/StudioInfoSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <HeroSection />
      <SpinWheelSection />
      <StudioInfoSection />
      <Footer />
    </main>
  );
}