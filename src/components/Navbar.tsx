import React, { useState } from 'react';
import { Share2, Check, Heart, Sparkles } from 'lucide-react';
import { audioEngine } from '../services/audioSynthesizer';
import confetti from 'canvas-confetti';

interface NavbarProps {
  heartCount: number;
  onHeart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ heartCount, onHeart }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      audioEngine.playHeartSound();
      confetti({ particleCount: 35, spread: 50 });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="main-navbar" className="sticky top-0 z-40 backdrop-blur-2xl bg-[#FAF7F2]/80 border-b border-[#D4AF37]/20 px-4 sm:px-8 py-3.5 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand logo & title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B78727] flex items-center justify-center shadow-md shadow-[#D4AF37]/30 text-white font-bold text-sm">
            👑
          </div>
          <span className="font-serif-display italic font-bold text-lg tracking-wide text-[#4A3B31] flex items-center gap-2">
            Ojal's 16th{' '}
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FADBD8] text-[#C0392B] font-sans font-bold border border-[#C98A8A]/30">
              OG Edition
            </span>
          </span>
        </div>

        {/* Quick Nav & Action buttons */}
        <div className="flex items-center gap-3">
          {/* Quick Nav Anchors for desktop */}
          <div className="hidden md:flex items-center gap-1 text-xs font-semibold text-[#7D6B5D]">
            <button
              onClick={() => scrollTo('gallery-section')}
              className="px-3 py-1.5 rounded-full hover:bg-white hover:text-[#4A3B31] transition-colors"
            >
              Vault
            </button>
            <button
              onClick={() => scrollTo('letter-section')}
              className="px-3 py-1.5 rounded-full hover:bg-white hover:text-[#4A3B31] transition-colors"
            >
              Letter
            </button>
            <button
              onClick={() => scrollTo('sorry-section')}
              className="px-3 py-1.5 rounded-full hover:bg-white hover:text-[#4A3B31] transition-colors"
            >
              Miss You Note
            </button>
          </div>

          {/* Send Heart Pill Button */}
          <button
            onClick={() => {
              onHeart();
              audioEngine.playHeartSound();
              confetti({ particleCount: 25, spread: 45 });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FADBD8] hover:bg-[#f5c7c3] text-xs font-bold text-[#C0392B] border border-[#C98A8A]/30 shadow-xs transition-transform active:scale-95"
            title="Send Love"
          >
            <Heart className="w-3.5 h-3.5 fill-[#C0392B]" />
            <span>{heartCount}</span>
          </button>

          {/* Share Link Button */}
          <button
            id="share-link-nav-btn"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-semibold text-[#5D4E43] border border-[#D4AF37]/30 shadow-xs transition-colors"
            title="Copy link to share with Ojal"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#7D6B5D]" />}
            <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
