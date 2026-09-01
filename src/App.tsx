import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhotoGallery } from './components/PhotoGallery';
import { HeartfeltLetter } from './components/HeartfeltLetter';
import { ApologySection } from './components/ApologySection';
import { PhotoLightbox } from './components/PhotoLightbox';
import { GiftBoxModal } from './components/GiftBoxModal';
import { MusicPlayerDock } from './components/MusicPlayerDock';
import { PhotoMemory } from './types';
import { getSavedPhotos, saveCustomPhoto } from './data/photos';

export default function App() {
  // Scroll progress spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // App States
  const [photos, setPhotos] = useState<PhotoMemory[]>(getSavedPhotos());
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(116);
  const [toastCount, setToastCount] = useState<number>(16);

  const handlePhotoUploaded = (id: number, base64Url: string) => {
    saveCustomPhoto(id, base64Url);
    setPhotos(prev =>
      prev.map(p => (p.id === id ? { ...p, imageUrl: base64Url } : p))
    );
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto(prev => (prev ? { ...prev, imageUrl: base64Url } : null));
    }
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="birthday-app-root"
      className="min-h-screen bg-[#FAF7F2] text-[#4A3B31] selection:bg-[#F8D7DA] selection:text-[#4A3B31] relative overflow-x-hidden font-sans"
    >
      {/* Top Scroll Progress Indicator */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#C98A8A] to-[#E74C3C] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating 3D Ambient Glowing Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] bg-[#F8D7DA] rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-1/3 -left-36 w-[32rem] h-[32rem] bg-[#E8DAEF] rounded-full blur-[140px] opacity-60" />
        <div className="absolute bottom-1/4 -right-24 w-[30rem] h-[30rem] bg-[#FBEEE6] rounded-full blur-[120px] opacity-70" />
        <div className="absolute -bottom-32 left-1/4 w-[34rem] h-[34rem] bg-[#FADBD8] rounded-full blur-[140px] opacity-60" />

        {/* Subtle 3D Depth Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4a3b3106_1px,transparent_1px),linear-gradient(to_bottom,#4a3b3106_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Glassmorphic Top Navbar */}
      <Navbar
        heartCount={heartCount}
        onHeart={() => setHeartCount(prev => prev + 1)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-24 sm:space-y-36">
        
        {/* Section 1: Hero with 3D Cake & Candle Wish */}
        <HeroSection
          onOpenGift={() => setIsGiftModalOpen(true)}
          onExploreGallery={scrollToGallery}
        />

        {/* Section 2: Photo Vault Gallery with 3D Tilt */}
        <PhotoGallery
          photos={photos}
          onSelectPhoto={photo => setSelectedPhoto(photo)}
        />

        {/* Section 3: The Deep Personal Letter from Happy */}
        <HeartfeltLetter
          heartCount={heartCount}
          onSendHeart={() => setHeartCount(prev => prev + 1)}
        />

        {/* Section 4: Sorry Note & Celebration Footer */}
        <ApologySection
          toastCount={toastCount}
          onToast={() => setToastCount(prev => prev + 1)}
          onHug={() => setHeartCount(prev => prev + 1)}
        />
      </main>

      {/* Full-Screen 3D Glassmorphic Photo Lightbox */}
      <PhotoLightbox
        photo={selectedPhoto}
        allPhotos={photos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={p => setSelectedPhoto(p)}
        onPhotoUploaded={handlePhotoUploaded}
      />

      {/* 3D Interactive Gift Box Surprise Modal */}
      <GiftBoxModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />

      {/* Glassmorphic Multi-Track Music Player Dock */}
      <MusicPlayerDock />
    </div>
  );
}
