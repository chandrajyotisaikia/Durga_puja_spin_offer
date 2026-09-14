'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { WheelSegment } from './SpinWheelSection';

interface SpinWheelProps {
  segments: WheelSegment[];
  onSpinComplete: (segment: WheelSegment) => void;
  megaOverride: boolean;
}

function getWeightedRandomIndex(segments: WheelSegment[]): number {
  const total = segments.reduce((sum, s) => sum + s.probability, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < segments.length; i++) {
    rand -= segments[i].probability;
    if (rand <= 0) return i;
  }
  return segments.length - 1;
}

function getMegaIndex(segments: WheelSegment[]): number {
  return segments.findIndex(s => s.isMega);
}

function createAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playSpinTickSound(audioCtx: AudioContext, time: number) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.setValueAtTime(800, time);
  osc.frequency.exponentialRampToValueAtTime(400, time + 0.05);
  gain.gain.setValueAtTime(0.15, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  osc.start(time);
  osc.stop(time + 0.05);
}

function playWinSound(audioCtx: AudioContext, isMega: boolean) {
  const now = audioCtx.currentTime;
  if (isMega) {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.3, now + i * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.4);
    });
    const bell = audioCtx.createOscillator();
    const bellGain = audioCtx.createGain();
    bell.connect(bellGain);
    bellGain.connect(audioCtx.destination);
    bell.type = 'sine';
    bell.frequency.setValueAtTime(1760, now + 0.6);
    bellGain.gain.setValueAtTime(0.4, now + 0.6);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    bell.start(now + 0.6);
    bell.stop(now + 1.8);
  } else {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.25, now + i * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }
}

/** Draw a minimal tattoo machine icon on canvas at (cx, cy) with given radius */
function drawTattooMachineIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const s = r * 0.55; // scale factor
  ctx.save();
  ctx.translate(cx, cy);

  // Body
  ctx.beginPath();
  ctx.roundRect(-s * 0.55, -s * 0.9, s * 1.1, s * 1.4, s * 0.15);
  ctx.fillStyle = '#1a1a1a';
  ctx.fill();
  ctx.strokeStyle = '#C9A227';
  ctx.lineWidth = s * 0.08;
  ctx.stroke();

  // Coil lines
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.roundRect(-s * 0.42, -s * 0.55 + i * s * 0.22, s * 0.84, s * 0.14, s * 0.05);
    ctx.fillStyle = 'rgba(201,162,39,0.35)';
    ctx.fill();
  }

  // Top cap
  ctx.beginPath();
  ctx.roundRect(-s * 0.65, -s * 1.05, s * 1.3, s * 0.2, s * 0.08);
  ctx.fillStyle = '#2a2a2a';
  ctx.fill();
  ctx.strokeStyle = '#C9A227';
  ctx.lineWidth = s * 0.06;
  ctx.stroke();

  // Needle
  ctx.beginPath();
  ctx.moveTo(-s * 0.06, s * 0.5);
  ctx.lineTo(-s * 0.06, s * 1.1);
  ctx.lineTo(0, s * 1.35);
  ctx.lineTo(s * 0.06, s * 1.1);
  ctx.lineTo(s * 0.06, s * 0.5);
  ctx.closePath();
  ctx.fillStyle = '#C9A227';
  ctx.fill();

  // LED dot
  ctx.beginPath();
  ctx.arc(0, -s * 0.72, s * 0.1, 0, Math.PI * 2);
  ctx.fillStyle = '#DC2626';
  ctx.shadowBlur = s * 0.3;
  ctx.shadowColor = '#DC2626';
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
}

export default function SpinWheel({ segments, onSpinComplete, megaOverride }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const currentRotation = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastTickAngle = useRef(0);

  const segmentAngle = 360 / segments.length;

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const drawWheel = useCallback((ctx: CanvasRenderingContext2D, rot: number) => {
    const size = ctx.canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 8;

    ctx.clearRect(0, 0, size, size);

    // Outer gold ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
    const goldGrad = ctx.createLinearGradient(0, 0, size, size);
    goldGrad.addColorStop(0, '#C9A227');
    goldGrad.addColorStop(0.5, '#FFD700');
    goldGrad.addColorStop(1, '#C9A227');
    ctx.fillStyle = goldGrad;
    ctx.fill();

    // Segments
    segments.forEach((seg, i) => {
      const startAngle = ((i * segmentAngle + rot - 90) * Math.PI) / 180;
      const endAngle = (((i + 1) * segmentAngle + rot - 90) * Math.PI) / 180;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();

      // Segment border
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + (segmentAngle * Math.PI) / 360);

      const textRadius = radius * 0.62;
      ctx.translate(textRadius, 0);
      ctx.rotate(Math.PI / 2);

      ctx.fillStyle = seg.textColor;
      ctx.textAlign = 'center';

      if (seg.isMega) {
        // Professional multi-line MEGA OFFER TATTOO FREE layout
        const fontSize = size * 0.038;
        ctx.font = `bold ${fontSize}px serif`;
        ctx.fillStyle = seg.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw each line with proper spacing
        const lineH = fontSize * 1.25;
        ctx.fillText('MEGA', 0, -lineH * 1.5);
        ctx.fillText('OFFER', 0, -lineH * 0.4);

        // Thin separator line
        ctx.strokeStyle = seg.textColor;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(-size * 0.06, lineH * 0.25);
        ctx.lineTo(size * 0.06, lineH * 0.25);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.font = `bold ${fontSize * 0.85}px sans-serif`;
        ctx.fillStyle = '#1a0000';
        ctx.fillText('TATTOO', 0, lineH * 0.85);
        ctx.fillText('FREE', 0, lineH * 1.85);
        ctx.textBaseline = 'alphabetic';
      } else {
        ctx.font = `900 ${size * 0.075}px serif`;
        ctx.fillText(seg.label, 0, -size * 0.01);
        ctx.font = `600 ${size * 0.028}px sans-serif`;
        ctx.fillText('OFF', 0, size * 0.04);
        ctx.font = `500 ${size * 0.022}px sans-serif`;
        ctx.fillText('ON TATTOO', 0, size * 0.07);
      }

      ctx.restore();
    });

    // Center circle
    const centerRadius = radius * 0.22;
    ctx.beginPath();
    ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0D0D0D';
    ctx.fill();
    ctx.strokeStyle = '#C9A227';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw tattoo machine icon in center
    drawTattooMachineIcon(ctx, cx, cy, centerRadius);

    // Inner gold ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.28, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201,162,39,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [segments, segmentAngle]);

  const handleSpin = useCallback(() => {
    if (isSpinning || hasSpun) return;

    // Resume audio context on user gesture
    const audioCtx = getAudioCtx();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const targetIndex = megaOverride ? getMegaIndex(segments) : getWeightedRandomIndex(segments);
    const targetSegment = segments[targetIndex];

    const targetSegmentCenter = targetIndex * segmentAngle + segmentAngle / 2;
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const targetAngle = extraSpins * 360 + (360 - targetSegmentCenter);
    const finalRotation = currentRotation.current + targetAngle;

    setIsSpinning(true);
    lastTickAngle.current = currentRotation.current;

    const startTime = performance.now();
    const duration = 5000 + Math.random() * 2000;
    const startRotation = currentRotation.current;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const currentRot = startRotation + (finalRotation - startRotation) * easedProgress;

      currentRotation.current = currentRot;
      setRotation(currentRot);

      // Play tick sound as wheel passes each segment boundary
      const angleDiff = currentRot - lastTickAngle.current;
      if (angleDiff >= segmentAngle) {
        lastTickAngle.current = currentRot;
        if (audioCtx && progress < 0.9) {
          playSpinTickSound(audioCtx, audioCtx.currentTime);
        }
      }

      if (ctx) drawWheel(ctx, currentRot % 360);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        currentRotation.current = finalRotation % 360;
        setIsSpinning(false);
        setHasSpun(true);
        // Play win sound
        if (audioCtx) {
          playWinSound(audioCtx, targetSegment.isMega ?? false);
        }
        onSpinComplete(targetSegment);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, hasSpun, megaOverride, segments, segmentAngle, drawWheel, onSpinComplete, getAudioCtx]);

  // Initial draw
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) drawWheel(ctx, 0);
  }, [drawWheel]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // suppress unused warning
  void rotation;

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 flex flex-col items-center">
          <div className="w-0 h-0" style={{ borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '28px solid #FFD700', filter: 'drop-shadow(0 2px 8px rgba(255,215,0,0.6))' }} />
        </div>

        {/* Wheel canvas */}
        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          className="wheel-shadow rounded-full"
          style={{ maxWidth: '90vw', maxHeight: '90vw' }}
        />

        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: '0 0 40px rgba(201,162,39,0.3), 0 0 80px rgba(201,162,39,0.15)', borderRadius: '50%' }}
        />
      </div>

      {/* Spin button */}
      {!hasSpun ? (
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`font-display font-bold text-xl uppercase tracking-widest px-14 py-5 rounded-sm text-white transition-all ${isSpinning ? 'opacity-70 cursor-not-allowed' : 'animate-spin-pulse'}`}
          style={{
            background: isSpinning ? '#4B5563' : 'linear-gradient(135deg, #B91C1C 0%, #DC2626 50%, #991B1B 100%)',
            boxShadow: isSpinning ? 'none' : '0 0 30px rgba(220,38,38,0.5)',
          }}
        >
          {isSpinning ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
              </svg>
              Spinning...
            </span>
          ) : (
            '🎡 SPIN NOW'
          )}
        </button>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Spin complete! Check your result above. 🙏</p>
        </div>
      )}

      {/* Segment legend */}
      <div className="grid grid-cols-4 gap-2 mt-2 max-w-sm w-full">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-muted-foreground truncate">{seg.isMega ? 'FREE' : seg.label + ' OFF'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}