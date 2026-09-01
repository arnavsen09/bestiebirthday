import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, SkipForward, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audioEngine, TRACKS } from '../services/audioSynthesizer';
import { MusicTrackId } from '../types';

export const MusicPlayerDock: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackId, setCurrentTrackId] = useState<MusicTrackId>('kdrama');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const currentTrack = TRACKS.find(t => t.id === currentTrackId) || TRACKS[0];

  const togglePlay = (trackId?: MusicTrackId) => {
    const target = trackId || currentTrackId;
    const playing = audioEngine.toggle(target);
    setIsPlaying(playing);
    if (trackId) {
      setCurrentTrackId(trackId);
    }
  };

  const nextTrack = () => {
    const currentIndex = TRACKS.findIndex(t => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % TRACKS.length;
    const nextTrackItem = TRACKS[nextIndex];
    setCurrentTrackId(nextTrackItem.id);
    audioEngine.play(nextTrackItem.id);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      
      {/* Expanded Track Selector Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="w-72 sm:w-80 rounded-3xl p-4 bg-white/85 backdrop-blur-2xl border border-white/90 shadow-2xl shadow-[#4A3B31]/15 text-[#4A3B31] space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-serif-display italic font-bold text-sm">Acoustic Soundtrack</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FADBD8] text-[#C0392B] font-bold">
                Sweet 16
              </span>
            </div>

            {/* Track choices */}
            <div className="space-y-1.5">
              {TRACKS.map(track => {
                const isActive = currentTrackId === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => togglePlay(track.id)}
                    className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all duration-200 ${
                      isActive && isPlaying
                        ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#4A3B31]'
                        : 'hover:bg-[#FAF7F2] text-[#7D6B5D] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{track.emoji}</span>
                      <div>
                        <p className={`text-xs font-bold ${isActive ? 'text-[#D4AF37]' : 'text-[#4A3B31]'}`}>
                          {track.title}
                        </p>
                        <p className="text-[10px] text-[#8A716A] line-clamp-1">{track.subtitle}</p>
                      </div>
                    </div>

                    {isActive && isPlaying ? (
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-4 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <Play className="w-3.5 h-3.5 text-[#8A716A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glassmorphic Dock Pill */}
      <motion.div
        layout
        className="flex items-center gap-2.5 p-2 pr-3.5 rounded-full bg-white/85 backdrop-blur-2xl border border-white/90 shadow-xl shadow-[#4A3B31]/10 text-[#4A3B31]"
      >
        {/* Play/Pause Button */}
        <button
          id="music-dock-play-btn"
          onClick={() => togglePlay()}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#C98A8A] text-white shadow-md shadow-[#D4AF37]/30 scale-105'
              : 'bg-[#FAF7F2] hover:bg-white text-[#4A3B31] border border-[#D4AF37]/30'
          }`}
          title={isPlaying ? 'Pause Melody' : 'Play Melody'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-[#4A3B31] ml-0.5" />}
        </button>

        {/* Track Title & Visualizer Click to expand */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#4A3B31] flex items-center gap-1">
              {currentTrack.emoji} {currentTrack.title}
            </span>
            <span className="text-[9px] text-[#8A716A]">
              {isPlaying ? 'Playing acoustic melody' : 'Tap to play music'}
            </span>
          </div>

          {/* Animated Waveform Equalizer */}
          {isPlaying && (
            <div className="flex items-center gap-0.5 px-1 py-1">
              <span className="w-1 h-3 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-5 bg-[#C98A8A] rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
              <span className="w-1 h-4 bg-[#E74C3C] rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
              <span className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '360ms' }} />
            </div>
          )}
        </button>

        {/* Next Track Button */}
        <button
          onClick={nextTrack}
          className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-white flex items-center justify-center text-[#7D6B5D] hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/20"
          title="Next Track"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};
