'use client';
import React, { useState } from 'react';

interface LeadCaptureFormProps {
  onSubmit: (name: string) => void;
}

export default function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; agreed?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; phone?: string; agreed?: string } = {};
    if (!name.trim() || name.trim().length < 2) newErrors.name = 'Please enter your full name';
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim())) newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!agreed) newErrors.agreed = 'You must agree to the terms to claim your discount';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);

    // ── Supabase lead capture (wire up here) ──────────────────────────────
    // Example:
    // const { error } = await supabase.from('leads').insert([{
    //   name: name.trim(),
    //   phone: `+91${phone.trim()}`,
    //   agreed_to_terms: true,
    //   created_at: new Date().toISOString(),
    // }]);
    // if (error) console.error('Supabase insert error:', error);
    // ─────────────────────────────────────────────────────────────────────

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(name.trim());
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto animate-scale-in">
      <div className="grunge-border rounded-lg p-6 md:p-8" style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.06) 0%, rgba(20,20,20,0.95) 100%)' }}>
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center animate-pulse-gold">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <h3 className="font-display font-bold text-xl text-foreground text-center mb-2 uppercase tracking-wide">
          Unlock Your Spin
        </h3>
        <p className="text-muted-foreground text-sm text-center mb-6">
          Enter your details to spin the wheel and win exclusive tattoo discounts
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
              placeholder="Your full name"
              className="input-field w-full px-4 py-3 rounded-sm text-sm"
              autoComplete="name"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Phone Number *
            </label>
            <div className="flex gap-2">
              <div className="input-field px-3 py-3 rounded-sm text-sm text-muted-foreground flex items-center shrink-0">
                🇮🇳 +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={e => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setErrors(prev => ({ ...prev, phone: undefined })); }}
                placeholder="10-digit mobile number"
                className="input-field flex-1 px-4 py-3 rounded-sm text-sm"
                autoComplete="tel"
                maxLength={10}
              />
            </div>
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* T&C Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => { setAgreed(e.target.checked); setErrors(prev => ({ ...prev, agreed: undefined })); }}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: agreed ? '#C9A227' : errors.agreed ? '#DC2626' : 'rgba(201,162,39,0.4)',
                    background: agreed ? 'rgba(201,162,39,0.15)' : 'transparent',
                  }}
                >
                  {agreed && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to the{' '}
                <span className="text-primary underline underline-offset-2 cursor-pointer">terms and conditions</span>
                {' '}and{' '}
                <span className="text-primary underline underline-offset-2 cursor-pointer">privacy policy</span>
                {' '}to claim my discount. I consent to being contacted by Inkfinity Tattoos & Piercing regarding this offer.
              </span>
            </label>
            {errors.agreed && <p className="text-red-400 text-xs mt-1.5 ml-8">{errors.agreed}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cta-button w-full text-primary-foreground font-display font-bold text-base uppercase tracking-widest py-4 rounded-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                </svg>
                Unlocking...
              </span>
            ) : (
              '🎰 Unlock & Spin the Wheel'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}