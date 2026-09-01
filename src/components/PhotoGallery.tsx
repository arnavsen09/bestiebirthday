import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Sparkles, Heart, Maximize2, Trophy, Star, Smile } from 'lucide-react';
import { PhotoMemory } from '../types';
import { Card3DTilt } from './Card3DTilt';
import { audioEngine } from '../services/audioSynthesizer';

interface PhotoGalleryProps {
  photos: PhotoMemory[];
  onSelectPhoto: (p: PhotoMemory) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onSelectPhoto }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  return (
    <section id="gallery-section" className="space-y-10 scroll-mt-24">
      
      {/* Header & Filter Pill Dock */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D4AF37]/25">
        <div>
          <div className="flex items-center gap-2 text-[#C98A8A] text-xs font-bold tracking-widest uppercase mb-1.5">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>Memories & Moments</span>
          </div>
          <h2 className="font-serif-display italic text-3xl sm:text-5xl font-black text-[#4A3B31] tracking-tight">
            The Ojal Vault 📸✨
          </h2>
          <p className="text-[#7D6B5D] text-sm sm:text-base mt-2 max-w-xl">
            12 unforgettable snapshots capturing the Sports Captain dominance, the drama queen poses, and pure comfort friend energy.
          </p>
        </div>

        {/* Filter Category Glassmorphic Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm">
          {[
            { id: 'all', label: 'All Snaps', icon: '✨' },
            { id: 'captain', label: 'Captain Era', icon: '🏆' },
            { id: 'drama', label: 'Drama Queen', icon: '💅' },
            { id: 'classy', label: 'Classy Fits', icon: '👗' },
            { id: 'moments', label: 'Candid', icon: '🤍' }
          ].map(tab => (
            <button
              key={tab.id}
              id={`filter-btn-${tab.id}`}
              onClick={() => {
                setActiveCategory(tab.id);
                audioEngine.playHeartSound();
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C98A8A] text-white shadow-md shadow-[#D4AF37]/30 scale-105'
                  : 'text-[#7D6B5D] hover:text-[#4A3B31] hover:bg-white/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Glassmorphic Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
          >
            <Card3DTilt
              id={`photo-card-${photo.id}`}
              onClick={() => {
                onSelectPhoto(photo);
                audioEngine.playHeartSound();
              }}
              className="group rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-[#4A3B31]/6 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/15 transition-all duration-300 flex flex-col h-full"
            >
              {/* Photo Image Stage */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Soft gradient sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B31]/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* 3D Floating Tag Chip */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#4A3B31] border border-white/90 shadow-md flex items-center gap-1.5">
                    <span>{photo.icon}</span>
                    <span>{photo.tag}</span>
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#4A3B31] flex items-center justify-center text-xs shadow-md border border-white">
                    <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                  </span>
                </div>
              </div>

              {/* Card Caption Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white/70">
                <div>
                  <h3 className="font-serif-display italic font-bold text-lg text-[#4A3B31] group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#7D6B5D] leading-relaxed line-clamp-2 mt-1.5">
                    {photo.caption}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs font-semibold border-t border-[#FAF7F2]">
                  <span className="text-[#C98A8A] flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#E74C3C] fill-[#E74C3C]" />
                    <span>Memory #{photo.id}</span>
                  </span>
                  <span className="text-[#8A716A] text-[11px] group-hover:translate-x-0.5 transition-transform">
                    Tap to expand →
                  </span>
                </div>
              </div>
            </Card3DTilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
