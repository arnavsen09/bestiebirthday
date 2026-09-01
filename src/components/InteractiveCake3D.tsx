import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Heart, Cake } from 'lucide-react';
import { audioEngine } from '../services/audioSynthesizer';

interface InteractiveCake3DProps {
  onWishMade?: () => void;
}

export const InteractiveCake3D: React.FC<InteractiveCake3DProps> = ({ onWishMade }) => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [wishesCount, setWishesCount] = useState<number>(0);

  const handleBlowCandles = () => {
    if (candlesBlown) {
      // Re-light candles
      setCandlesBlown(false);
      audioEngine.playHeartSound();
      return;
    }

    setCandlesBlown(true);
    setWishesCount(prev => prev + 1);
    audioEngine.playCandleBlowSound();

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#C98A8A', '#F8D7DA', '#FFD700', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }

    if (onWishMade) {
      setTimeout(() => onWishMade(), 1200);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-2xl shadow-[#4A3B31]/8 max-w-xl mx-auto overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#F8D7DA]/30 via-transparent to-[#D4AF37]/10" />

      {/* Header Tag */}
      <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#D4AF37]/30 text-xs font-bold text-[#8A716A] mb-6 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Make a 16th Birthday Wish</span>
      </div>

      {/* 3D Birthday Cake Stage */}
      <div className="relative w-64 h-56 flex flex-col items-center justify-end pb-4 select-none">
        
        {/* Floating Candles Row */}
        <div className="flex items-end justify-center gap-2.5 z-20 -mb-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              <AnimatePresence>
                {!candlesBlown ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.15, 0.95, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    transition={{ repeat: Infinity, duration: 1.2 + (i * 0.1), ease: 'easeInOut' }}
                    className="w-3.5 h-5 rounded-full bg-gradient-to-t from-[#E67E22] via-[#F1C40F] to-white shadow-[0_0_12px_#F39C12] -mb-1 animate-candle-flame"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -16 }}
                    transition={{ duration: 1.2 }}
                    className="w-1.5 h-3 rounded-full bg-stone-400/60 blur-[1px] -mb-1"
                  />
                )}
              </AnimatePresence>

              {/* Candle Stick */}
              <div className="w-2.5 h-9 rounded-t-sm bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37] border border-amber-300/60 shadow-sm" />
            </div>
          ))}
        </div>

        {/* Cake Top Tier */}
        <div className="w-36 h-12 rounded-2xl bg-gradient-to-b from-[#FADBD8] to-[#F5B7B1] border-2 border-white/80 shadow-md flex items-center justify-center relative z-10">
          <div className="flex gap-1.5 items-center">
            <span className="text-xs font-serif-display font-black text-[#8A716A]">16</span>
            <Heart className="w-3 h-3 text-[#E74C3C] fill-[#E74C3C]" />
          </div>
          {/* Frosting Drips */}
          <div className="absolute -bottom-2 inset-x-2 flex justify-around">
            <div className="w-3 h-3 rounded-full bg-[#FAF7F2] shadow-xs" />
            <div className="w-2.5 h-3.5 rounded-full bg-[#FAF7F2] shadow-xs" />
            <div className="w-3 h-3 rounded-full bg-[#FAF7F2] shadow-xs" />
            <div className="w-2.5 h-3 rounded-full bg-[#FAF7F2] shadow-xs" />
          </div>
        </div>

        {/* Cake Bottom Tier */}
        <div className="w-52 h-16 rounded-2xl bg-gradient-to-b from-[#FAF7F2] via-[#FDF2E9] to-[#F6DDCC] border-2 border-white shadow-lg flex items-center justify-center relative -mt-2">
          <div className="text-[11px] font-serif-display italic font-bold text-[#D4AF37] tracking-wider">
            HAPPY BIRTHDAY OJAL 👑
          </div>
        </div>

        {/* Golden Cake Stand */}
        <div className="w-60 h-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FAD7A0] to-[#B78727] shadow-xl border border-amber-200" />
        <div className="w-24 h-3 bg-gradient-to-b from-[#B78727] to-[#7D6608] rounded-b-md shadow-md" />
      </div>

      {/* Interactive Action Button */}
      <div className="mt-4 text-center space-y-3 z-10">
        <button
          id="blow-candles-btn"
          onClick={handleBlowCandles}
          className={`px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2.5 shadow-lg active:scale-95 ${
            candlesBlown
              ? 'bg-[#FAF7F2] hover:bg-white text-[#4A3B31] border border-[#D4AF37]/50 shadow-amber-500/10'
              : 'bg-gradient-to-r from-[#D4AF37] via-[#C98A8A] to-[#E74C3C] text-white shadow-[#D4AF37]/30 hover:scale-105'
          }`}
        >
          {candlesBlown ? (
            <>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Light Candles Again ✨</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 text-amber-200 animate-pulse" />
              <span>Blow Out 16 Candles 🎂</span>
            </>
          )}
        </button>

        <p className="text-xs text-[#8A716A] font-medium">
          {candlesBlown
            ? `🎉 Wish Made! May all your dreams come true, Ojal! (${wishesCount} ${wishesCount === 1 ? 'wish' : 'wishes'})`
            : 'Click to blow the candles, make your wish, and celebrate!'}
        </p>
      </div>
    </div>
  );
};
