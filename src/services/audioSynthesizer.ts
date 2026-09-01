import { MusicTrack, MusicTrackId } from '../types';

export const TRACKS: MusicTrack[] = [
  {
    id: 'kdrama',
    title: 'K-Drama Serenade',
    subtitle: 'Warm Electric Piano & Strings',
    emoji: '🎹',
    description: 'A cozy, cinematic comfort theme tailored for the drama queen.'
  },
  {
    id: 'birthday',
    title: 'Sweet 16 Music Box',
    subtitle: 'Glockenspiel & Celeste',
    emoji: '✨',
    description: 'A delicate music-box acoustic birthday melody.'
  },
  {
    id: 'starlight',
    title: 'Starlight Reverie',
    subtitle: 'Dreamy Harp & Ambient Chimes',
    emoji: '🌙',
    description: 'Ethereal celestial chords full of warmth and love.'
  }
];

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrack: MusicTrackId = 'kdrama';
  private timer: number | null = null;
  private step: number = 0;
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getCurrentTrack(): MusicTrackId {
    return this.currentTrack;
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.5, gainFactor: number = 0.15, attack: number = 0.02) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const actualGain = gainFactor * this.volume;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(actualGain, ctx.currentTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  // Chime sound for heart clicks
  public playHeartSound() {
    const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.4, 0.12), i * 60);
    });
  }

  // Champagne toast sound
  public playToastSound() {
    const freqs = [587.33, 739.99, 880.00, 1046.50];
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'triangle', 0.6, 0.15, 0.01), i * 50);
    });
  }

  // Candle blow sound
  public playCandleBlowSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      // Soft air noise burst
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(ctx.currentTime);

      // Followed by celebratory chime
      setTimeout(() => {
        [659.25, 783.99, 1046.50, 1318.51].forEach((f, idx) => {
          setTimeout(() => this.playTone(f, 'sine', 0.8, 0.14), idx * 80);
        });
      }, 250);
    } catch {
      // Audio fallback
    }
  }

  // Music loop step generator
  private tick() {
    if (!this.isPlaying) return;

    if (this.currentTrack === 'kdrama') {
      // Warm K-Drama chord arpeggio progression (Fmaj7 - G - Em7 - Am)
      const chordChains = [
        // Chord 1: Fmaj7 (F, A, C, E)
        { bass: 174.61, arps: [349.23, 440.00, 523.25, 659.25], mel: 659.25 },
        { bass: 174.61, arps: [523.25, 440.00, 349.23, 440.00], mel: 523.25 },
        // Chord 2: G (G, B, D, G)
        { bass: 196.00, arps: [392.00, 493.88, 587.33, 783.99], mel: 587.33 },
        { bass: 196.00, arps: [587.33, 493.88, 392.00, 493.88], mel: 493.88 },
        // Chord 3: Em7 (E, G, B, D)
        { bass: 164.81, arps: [329.63, 392.00, 493.88, 587.33], mel: 659.25 },
        { bass: 164.81, arps: [493.88, 392.00, 329.63, 392.00], mel: 587.33 },
        // Chord 4: Am7 (A, C, E, G)
        { bass: 220.00, arps: [440.00, 523.25, 659.25, 783.99], mel: 880.00 },
        { bass: 220.00, arps: [659.25, 523.25, 440.00, 523.25], mel: 783.99 }
      ];

      const current = chordChains[this.step % chordChains.length];
      
      // Play soft bass
      this.playTone(current.bass, 'triangle', 1.2, 0.12, 0.05);
      
      // Play arpeggio
      current.arps.forEach((f, i) => {
        setTimeout(() => {
          if (this.isPlaying) this.playTone(f, 'sine', 0.7, 0.08, 0.03);
        }, i * 140);
      });

      // Play lead note
      this.playTone(current.mel, 'sine', 1.1, 0.12, 0.04);
      this.step++;
    } else if (this.currentTrack === 'birthday') {
      // Sweet 16 Music Box (Happy Birthday melodic line with celeste harmony)
      const birthdayNotes = [
        { mel: 261.63, bass: 130.81, len: 0.4 }, // Hap-
        { mel: 261.63, bass: 130.81, len: 0.4 }, // py
        { mel: 293.66, bass: 146.83, len: 0.8 }, // Birth-
        { mel: 261.63, bass: 130.81, len: 0.8 }, // day
        { mel: 349.23, bass: 174.61, len: 0.8 }, // to
        { mel: 329.63, bass: 164.81, len: 1.4 }, // you
        
        { mel: 261.63, bass: 130.81, len: 0.4 }, // Hap-
        { mel: 261.63, bass: 130.81, len: 0.4 }, // py
        { mel: 293.66, bass: 146.83, len: 0.8 }, // Birth-
        { mel: 261.63, bass: 130.81, len: 0.8 }, // day
        { mel: 392.00, bass: 196.00, len: 0.8 }, // to
        { mel: 349.23, bass: 174.61, len: 1.4 }, // you

        { mel: 261.63, bass: 130.81, len: 0.4 }, // Hap-
        { mel: 261.63, bass: 130.81, len: 0.4 }, // py
        { mel: 523.25, bass: 261.63, len: 0.8 }, // Birth-
        { mel: 440.00, bass: 220.00, len: 0.8 }, // day
        { mel: 349.23, bass: 174.61, len: 0.8 }, // dear
        { mel: 329.63, bass: 164.81, len: 0.8 }, // O-
        { mel: 293.66, bass: 146.83, len: 1.4 }, // jal

        { mel: 466.16, bass: 233.08, len: 0.4 }, // Hap-
        { mel: 466.16, bass: 233.08, len: 0.4 }, // py
        { mel: 440.00, bass: 220.00, len: 0.8 }, // Birth-
        { mel: 349.23, bass: 174.61, len: 0.8 }, // day
        { mel: 392.00, bass: 196.00, len: 0.8 }, // to
        { mel: 349.23, bass: 174.61, len: 1.6 }  // you!
      ];

      const item = birthdayNotes[this.step % birthdayNotes.length];
      this.playTone(item.mel, 'triangle', item.len, 0.16, 0.01);
      this.playTone(item.bass, 'sine', item.len * 1.2, 0.1, 0.03);
      this.step++;
    } else {
      // Starlight Reverie (Lush pentatonic celestial harp loop)
      const starlightNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 880.00, 783.99];
      const baseFreq = starlightNotes[this.step % starlightNotes.length];
      
      this.playTone(baseFreq, 'sine', 1.0, 0.14, 0.04);
      this.playTone(baseFreq * 0.5, 'triangle', 1.4, 0.08, 0.08);
      
      setTimeout(() => {
        if (this.isPlaying) this.playTone(baseFreq * 1.5, 'sine', 0.6, 0.06, 0.02);
      }, 200);

      this.step++;
    }
  }

  public play(trackId?: MusicTrackId) {
    if (trackId) {
      this.currentTrack = trackId;
      this.step = 0;
    }
    this.isPlaying = true;
    this.initContext();

    if (this.timer) {
      window.clearInterval(this.timer);
    }

    const interval = this.currentTrack === 'birthday' ? 620 : this.currentTrack === 'kdrama' ? 680 : 540;
    this.tick();
    this.timer = window.setInterval(() => this.tick(), interval);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  public toggle(trackId?: MusicTrackId): boolean {
    if (this.isPlaying) {
      if (trackId && trackId !== this.currentTrack) {
        this.play(trackId);
        return true;
      }
      this.pause();
      return false;
    } else {
      this.play(trackId || this.currentTrack);
      return true;
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack
    };
  }
}

export const audioEngine = new AudioEngine();
