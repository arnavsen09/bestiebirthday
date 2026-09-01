import React from 'react';
import { motion } from 'motion/react';
import { Heart, Crown, Sparkles, Send } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { audioEngine } from '../services/audioSynthesizer';
import confetti from 'canvas-confetti';

interface HeartfeltLetterProps {
  heartCount: number;
  onSendHeart: () => void;
}

export const HeartfeltLetter: React.FC<HeartfeltLetterProps> = ({
  heartCount,
  onSendHeart
}) => {
  const handleHeartClick = () => {
    onSendHeart();
    audioEngine.playHeartSound();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#C98A8A', '#F8D7DA', '#E74C3C', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section id="letter-section" className="space-y-8 scroll-mt-24">
      
      {/* Section Sub-heading */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FADBD8] text-[#C0392B] text-xs font-bold uppercase tracking-wider border border-[#C98A8A]/30 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-[#C0392B] text-[#C0392B] animate-pulse" />
          <span>A Note From Happy</span>
        </div>
        <h2 className="font-serif-display italic text-3xl sm:text-5xl font-black text-[#4A3B31] tracking-tight">
          To My Favorite Human 💌
        </h2>
        <p className="text-[#7D6B5D] text-sm sm:text-base">
          A genuine letter for Ojal The Great on stepping into year 16.
        </p>
      </div>

      {/* Letter Card with 3D Glassmorphic Canvas & Warm Aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <Card3DTilt
          maxTilt={6}
          className="rounded-3xl p-6 sm:p-10 md:p-12 bg-white/80 backdrop-blur-2xl border border-white shadow-2xl shadow-[#4A3B31]/10 overflow-hidden relative"
        >
          {/* Ambient Corner Lighting */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#F8D7DA]/40 via-[#FBEEE6]/30 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#D4AF37]/20 via-[#FAF7F2] to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Letter Decorative Header */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#D4AF37]/30 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B78727] flex items-center justify-center text-white shadow-lg shadow-[#D4AF37]/30 border border-white/60">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-display italic font-bold text-2xl text-[#4A3B31]">
                  Ojal (OG)
                </h3>
                <p className="text-xs text-[#8A716A] font-medium">
                  School Sports Captain • Sweet Sixteen Edition
                </p>
              </div>
            </div>

            {/* 3D Wax Seal Badge */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FAD7A0] to-[#B78727] border-2 border-white flex items-center justify-center text-white font-serif-display italic font-black text-sm shadow-xl rotate-12 select-none">
              16th ✨
            </div>
          </div>

          {/* LETTER BODY CONTENT */}
          <div className="relative z-10 space-y-6 text-[#5D4E43] font-sans text-base sm:text-lg leading-relaxed sm:leading-loose">
            <p className="font-serif-display italic text-2xl sm:text-3xl font-black text-[#C98A8A]">
              "Happy 16th Birthday, Ojal! 💖
            </p>

            <p className="text-[#5D4E43] font-normal leading-relaxed">
              I honestly don't know where to start, but I just want to take a second to tell you how much you truly mean to me. Watching you step up as our school's Sports Captain this year has been amazing—you've got this effortless boss-girl confidence mixed with that calm K-drama lead energy, and you manage to lead everyone while still being the most genuine, funny person in the room.
            </p>

            <p className="text-[#5D4E43] font-normal leading-relaxed">
              You’re smart, classy, a little dramatic (okay, maybe a lot dramatic in the best way possible 🕸✨), and somehow always know how to match my vibe. Talking to you always feels easy, safe, and fun—like a comfort scene in a show I’d rewatch again and again. You’re genuinely one of my absolute favorite human beings, OG (Ojal The Great).
            </p>

            <p className="text-[#5D4E43] font-normal leading-relaxed">
              Thank you for all the laughs, the late-night talks, and for always putting up with me. You're stuck with me forever, whether you like it or not 🤍💅☕️💫"
            </p>

            {/* Letter Signoff */}
            <div className="pt-8 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B78727] flex items-center justify-center text-white font-serif-display italic font-black text-2xl shadow-lg border border-white">
                  H
                </div>
                <div>
                  <p className="text-xs text-[#8A716A] uppercase tracking-wider font-bold">
                    With Endless Love,
                  </p>
                  <p className="font-handwriting text-3xl sm:text-4xl text-[#D4AF37] font-bold">
                    Happy ✨
                  </p>
                </div>
              </div>

              {/* Interactive Heart Button */}
              <button
                id="send-letter-love-btn"
                onClick={handleHeartClick}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FADBD8] to-[#F8D7DA] hover:from-[#f7cbcf] hover:to-[#f3c2c6] text-[#C0392B] border border-[#C98A8A]/30 text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all active:scale-95 shadow-md"
              >
                <Heart className="w-4 h-4 fill-[#C0392B] text-[#C0392B] animate-bounce" />
                <span>Send Endless Love ({heartCount})</span>
              </button>
            </div>
          </div>
        </Card3DTilt>
      </motion.div>
    </section>
  );
};
