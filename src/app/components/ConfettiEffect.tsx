'use client';
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: 'square' | 'circle' | 'rect';
}

const COLORS = ['#FFD700', '#C9A227', '#DC2626', '#22C55E', '#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B', '#14B8A6'];

export default function ConfettiEffect() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const generated: ConfettiPiece[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 10,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 1.5,
      shape: (['square', 'circle', 'rect'] as const)[Math.floor(Math.random() * 3)],
    }));
    setPieces(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: piece.shape === 'rect' ? piece.size * 2 : piece.size,
            height: piece.size,
            borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'rect' ? '2px' : '2px',
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}