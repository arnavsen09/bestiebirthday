export interface PhotoMemory {
  id: number;
  title: string;
  category: 'captain' | 'drama' | 'classy' | 'moments';
  caption: string;
  tag: string;
  dateStr?: string;
  icon: string;
  imageUrl: string;
  fallbackGradient: string;
}

export type MusicTrackId = 'kdrama' | 'birthday' | 'starlight';

export interface MusicTrack {
  id: MusicTrackId;
  title: string;
  subtitle: string;
  emoji: string;
  description: string;
}
