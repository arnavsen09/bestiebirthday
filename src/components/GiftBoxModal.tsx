import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Gift, Sparkles, Heart, Crown, Stars } from 'lucide-react';
import { audioEngine } from '../services/audioSynthesizer';

interface GiftBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftBoxModal: React.FC<GiftBoxModalProps> = ({ isOpen, onClose }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleOpenGift = () => {
    setIsOpened(true);
    audioEngine.playToastSound();
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#C98A8A', '#F8D7DA', '#FFD700', '#FFFFFF', '#E74C3C']
      });
    } catch {
      // safe fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="gift-box-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#4A3B31]/75 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-lg w-full rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-2xl border-2 border-[#D4AF37]/40 shadow-2xl text-center space-y-6 text-[#4A3B31] overflow-hidden"
      >
        {/* Close Button */}
        <button
          id="close-gift-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#F8D7DA] text-[#4A3B31] flex items-center justify-center transition-colors border border-[#D4AF37]/20 shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#F8D7DA]/40 via-transparent to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* UNOPENED 3D GIFT BOX STATE */
            <motion.div
              key="closed-gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="py-6 space-y-6 flex flex-col items-center"
            >
              <div className="relative group cursor-pointer" onClick={handleOpenGift}>
                {/* 3D Gift Box Visual */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, -2, 2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#D4AF37] via-[#F5B041] to-[#B78727] shadow-2xl shadow-[#D4AF37]/40 border-2 border-white flex items-center justify-center relative overflow-hidden"
                >
                  {/* Ribbon cross */}
                  <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-[#F8D7DA] to-[#FADBD8] border-x border-white/60 shadow-xs" />
                  <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-[#F8D7DA] to-[#FADBD8] border-y border-white/60 shadow-xs" />
                  
                  {/* Ribbon Bow */}
                  <div className="w-10 h-10 rounded-full bg-white/90 border border-[#D4AF37] flex items-center justify-center text-xl shadow-md z-10">
                    🎀
                  </div>
                </motion.div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FADBD8] text-[#C0392B] border border-[#C98A8A]/30 inline-block shadow-xs">
                  Surprise for Ojal 🎁
                </span>
                <h3 className="font-serif-display italic font-black text-2xl sm:text-3xl text-[#4A3B31]">
                  A Special Sweet 16 Delivery
                </h3>
                <p className="text-xs sm:text-sm text-[#7D6B5D] max-w-xs mx-auto">
                  Click the box to unwrap your secret birthday gift card from Happy!
                </p>
              </div>

              <button
                id="open-gift-box-btn"
                onClick={handleOpenGift}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C98A8A] to-[#E74C3C] text-white font-bold text-sm shadow-xl shadow-[#D4AF37]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Tap to Unwrap 🎁</span>
              </button>
            </motion.div>
          ) : (
            /* OPENED SECRET WISH CARD STATE */
            <motion.div
              key="opened-gift"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-2 space-y-5"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FAD7A0] flex items-center justify-center text-3xl shadow-lg border-2 border-white">
                👑
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FADBD8] text-[#C0392B] border border-[#C98A8A]/30 inline-block shadow-xs">
                  Sweet 16 VIP Pass ✨
                </span>
                <h3 className="font-serif-display italic font-black text-2xl sm:text-3xl text-[#4A3B31]">
                  Official Queen Of 16 👑
                </h3>
              </div>

              {/* Secret Gift Certificate Card */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-inner space-y-3 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/20 text-xs font-bold text-[#8A716A]">
                  <span>VOUCHER: #OG-16TH-BDAY</span>
                  <span className="text-[#C0392B]">UNLIMITED VALIDITY</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-[#5D4E43]">
                  <p className="flex items-center gap-2">
                    <span className="text-amber-500">☕</span>
                    <span><strong>100x Cafe Dates & Treat Pass:</strong> Redeemed anytime with Happy.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-rose-500">💅</span>
                    <span><strong>Drama Queen Immunity:</strong> Full permission to be 1000% dramatic 24/7.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-emerald-600">🏆</span>
                    <span><strong>Eternal Sports Captain Crown:</strong> Always winning in life and friendships.</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    audioEngine.playHeartSound();
                    confetti({ particleCount: 50, spread: 60 });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#c5a12f] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Claim Gift Certificate 🤍</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
