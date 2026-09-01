import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Gift, Camera, ChevronDown, Stars, Coffee, Heart, Crown } from 'lucide-react';
import { InteractiveCake3D } from './InteractiveCake3D';
import { Card3DTilt } from './Card3DTilt';
import { audioEngine } from '../services/audioSynthesizer';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onOpenGift: () => void;
  onExploreGallery: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenGift,
  onExploreGallery
}) => {
  return (
    <section id="hero-section" className="min-h-[90vh] flex flex-col items-center justify-center text-center pt-6 pb-16 relative">
      
      {/* 3D Floating Parallax Badges in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-10 left-[8%] hidden lg:flex items-center gap-2 p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-xl shadow-[#D4AF37]/15 text-xs font-bold text-[#4A3B31]"
        >
          <span className="text-xl">🏆</span>
          <span>Sports Captain Era</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
          className="absolute top-20 right-[10%] hidden lg:flex items-center gap-2 p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-xl shadow-[#C98A8A]/15 text-xs font-bold text-[#4A3B31]"
        >
          <span className="text-xl">💅</span>
          <span>Drama Queen 100%</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-24 left-[12%] hidden lg:flex items-center gap-2 p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-xl text-xs font-bold text-[#4A3B31]"
        >
          <span className="text-xl">☕</span>
          <span>Comfort Bestie</span>
        </motion.div>
      </div>

      {/* Header Tag Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-[#D4AF37]/40 text-[#8A716A] text-xs sm:text-sm font-semibold mb-6 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '4s' }} />
        <span className="uppercase tracking-widest text-[11px] text-[#B5A48B]">Est. 2008</span>
        <span className="w-1 h-1 rounded-full bg-[#C98A8A]" />
        <span className="text-[#4A3B31] font-bold">Sweet Sixteen Tribute From Happy ✨</span>
      </motion.div>

      {/* Big Artistic 3D Display Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative max-w-5xl mx-auto"
      >
        <h1 className="font-serif-display italic font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#D4AF37] mb-4 leading-none select-none">
          Happy 16th Birthday,{' '}
          <span className="text-[#C98A8A] not-italic block sm:inline font-serif font-black underline decoration-[#D4AF37]/50 decoration-wavy underline-offset-8">
            OG! 👑✨
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="text-lg sm:text-2xl md:text-3xl text-[#7D6B5D] font-medium max-w-3xl mx-auto leading-relaxed mt-4"
      >
        To our favorite{' '}
        <span className="text-[#B78727] font-bold px-3 py-1 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 inline-block shadow-xs">
          Sports Captain 🏆
        </span>{' '}
        & ultimate{' '}
        <span className="text-[#C0392B] font-bold px-3 py-1 rounded-xl bg-[#F8D7DA] border border-[#C98A8A]/30 inline-block shadow-xs">
          Drama Queen 💅
        </span>
      </motion.p>

      {/* Primary Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-8"
      >
        <button
          id="hero-unwrap-gift-btn"
          onClick={() => {
            onOpenGift();
            audioEngine.playToastSound();
          }}
          className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C98A8A] to-[#E74C3C] text-white font-bold text-base shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/45 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Gift className="w-5 h-5 text-white animate-bounce" />
          <span>Unwrap Your Wish 🎁</span>
        </button>

        <button
          id="hero-view-gallery-btn"
          onClick={onExploreGallery}
          className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#4A3B31] font-bold text-base border border-[#D4AF37]/40 shadow-sm hover:border-[#D4AF37] transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <Camera className="w-4 h-4 text-[#C98A8A]" />
          <span>View 12 Moments 📸</span>
        </button>
      </motion.div>

      {/* Interactive 3D Birthday Cake Stage with Blowable Candles */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="w-full mt-12"
      >
        <InteractiveCake3D onWishMade={onOpenGift} />
      </motion.div>

      {/* Scroll to Explore CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={onExploreGallery}
        className="cursor-pointer mt-12 flex flex-col items-center gap-2 text-[#8A716A] hover:text-[#D4AF37] transition-colors select-none"
      >
        <span className="text-xs uppercase tracking-widest font-bold">Scroll To Explore The Vault</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
