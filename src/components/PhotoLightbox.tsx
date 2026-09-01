import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { X, Heart, ChevronLeft, ChevronRight, Upload, Sparkles } from 'lucide-react';
import { PhotoMemory } from '../types';
import { audioEngine } from '../services/audioSynthesizer';
import confetti from 'canvas-confetti';

interface PhotoLightboxProps {
  photo: PhotoMemory | null;
  allPhotos: PhotoMemory[];
  onClose: () => void;
  onSelectPhoto: (p: PhotoMemory) => void;
  onPhotoUploaded: (id: number, base64Url: string) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
  onPhotoUploaded
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex(p => p.id === photo.id);
  const prevPhoto = allPhotos[(currentIndex - 1 + allPhotos.length) % allPhotos.length];
  const nextPhoto = allPhotos[(currentIndex + 1) % allPhotos.length];

  const handleHeart = () => {
    audioEngine.playHeartSound();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onPhotoUploaded(photo.id, reader.result);
          audioEngine.playToastSound();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      id="lightbox-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#4A3B31]/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 select-none"
    >
      {/* Hidden File Input for Custom Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-3xl w-full rounded-3xl overflow-hidden bg-white/95 backdrop-blur-2xl border border-white shadow-2xl flex flex-col text-[#4A3B31]"
      >
        {/* Lightbox Top Header */}
        <div className="px-6 py-4 border-b border-[#FAF7F2] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs px-3 py-1 rounded-full bg-[#FADBD8] text-[#C0392B] font-bold border border-[#C98A8A]/30">
              {photo.tag}
            </span>
            <h4 className="font-serif-display italic font-bold text-[#4A3B31] text-lg">
              {photo.title}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            {/* Custom Photo Replace Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#7D6B5D] border border-[#D4AF37]/30 flex items-center gap-1.5 transition-colors shadow-xs"
              title="Replace with your own photo"
            >
              <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Set Real Photo</span>
            </button>

            {/* Close Button */}
            <button
              id="close-lightbox-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white text-[#4A3B31] hover:bg-[#FAF7F2] border border-[#D4AF37]/20 flex items-center justify-center transition-colors shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lightbox Main Image Stage */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[60vh] w-full bg-stone-900 flex items-center justify-center overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows */}
          <button
            onClick={() => onSelectPhoto(prevPhoto)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#4A3B31] backdrop-blur-md flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Previous Memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => onSelectPhoto(nextPhoto)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#4A3B31] backdrop-blur-md flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Next Memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox Caption & Reaction Bar */}
        <div className="p-6 bg-white space-y-4">
          <p className="text-sm sm:text-base text-[#5D4E43] leading-relaxed">
            {photo.caption}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[#FAF7F2]">
            <span className="text-xs text-[#8A716A] font-medium">
              Memory {currentIndex + 1} of {allPhotos.length}
            </span>

            <button
              onClick={handleHeart}
              className="px-5 py-2 rounded-full bg-[#FADBD8] hover:bg-[#f8d0cb] text-[#C0392B] text-xs font-bold border border-[#C98A8A]/30 flex items-center gap-2 transition-transform active:scale-95 shadow-xs"
            >
              <Heart className="w-4 h-4 fill-[#C0392B] text-[#C0392B]" />
              <span>Love This Snap 💖</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
