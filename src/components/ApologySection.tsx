import React from 'react';
import { motion } from 'motion/react';
import { PartyPopper, Heart, Sparkles, Stars, Coffee } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { audioEngine } from '../services/audioSynthesizer';
import confetti from 'canvas-confetti';

interface ApologySectionProps {
  toastCount: number;
  onToast: () => void;
  onHug: () => void;
}

export const ApologySection: React.FC<ApologySectionProps> = ({
  toastCount,
  onToast,
  onHug
}) => {
  const handleToastClick = () => {
    onToast();
    audioEngine.playToastSound();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.75 },
        colors: ['#D4AF37', '#FAD7A0', '#C98A8A', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }
  };

  const handleHugClick = () => {
    onHug();
    audioEngine.playHeartSound();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#E74C3C', '#F8D7DA', '#D4AF37']
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="sorry-section" className="space-y-12 scroll-mt-24 pb-16">
      
      {/* 3D Glassmorphic Midnight Slate Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <Card3DTilt
          maxTilt={8}
          className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#2C3E50] via-[#1a252f] to-[#121921] text-white space-y-6 shadow-2xl border border-white/20 relative overflow-hidden"
        >
          {/* Ambient Slate Rim Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D4AF37]/20 via-[#AED6F1]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-[#AED6F1] font-semibold border border-white/10 backdrop-blur-md">
                <span>😭 A Sincere Missed-You Note</span>
              </div>
              <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#FAD7A0] leading-snug">
                I'm so sorry I couldn't be there to celebrate with you in person today! 😭
              </h3>
              <p className="text-base sm:text-lg text-[#AED6F1] font-medium italic opacity-95">
                (mummy nahi aane de rahi thi 😭)
              </p>
              <p className="text-stone-300 text-xs sm:text-sm max-w-lg leading-relaxed pt-1">
                Even though I'm stuck at home, I made sure you still get your full digital tribute with every single ounce of celebration and love you deserve! 👑
              </p>
            </div>

            {/* Giant 3D Interactive Heart Hug Button */}
            <button
              id="virtual-hug-btn"
              onClick={handleHugClick}
              className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-gradient-to-br from-[#E74C3C] to-[#C0392B] border-4 border-white/40 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl shadow-rose-500/40 hover:scale-110 active:scale-95 transition-all duration-300 select-none animate-pulse-glow"
              title="Send a Big Virtual Hug"
            >
              ❤️
            </button>
          </div>

          {/* Interactive Birthday Toast Button & Festive Mood Badge */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <button
              id="birthday-toast-btn"
              onClick={handleToastClick}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FAD7A0] to-[#D4AF37] hover:brightness-110 text-[#2C3E50] font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <PartyPopper className="w-4 h-4 text-[#2C3E50]" />
              <span>Pop Birthday Toast 🥂 ({toastCount})</span>
            </button>

            {/* Aesthetic Tag Strip */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-[#FAD7A0]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sweet 16 Royalty</span>
            </div>
          </div>
        </Card3DTilt>
      </motion.div>

      {/* Clean Sweet Footer For Ojal */}
      <footer className="text-center pt-8 border-t border-[#D4AF37]/20 space-y-4 max-w-xl mx-auto text-[#7D6B5D] text-xs sm:text-sm">
        <div className="flex items-center justify-center gap-2 text-[#C98A8A] font-bold text-sm sm:text-base">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Happy 16th Birthday, Ojal The Great (OG)!</span>
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        </div>

        <p className="text-[#8A716A] leading-relaxed">
          Crafted with endless love, laughter, and appreciation for my best friend Ojal by Happy ✨
        </p>

        <div className="pt-2 text-xs text-[#B5A48B] font-semibold flex flex-wrap items-center justify-center gap-3">
          <span>👑 Sports Captain 2026</span>
          <span>•</span>
          <span>💅 Drama Queen Supreme</span>
          <span>•</span>
          <span>☕ Comfort Bestie Forever</span>
        </div>
      </footer>

    </section>
  );
};
