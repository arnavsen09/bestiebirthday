import { PhotoMemory } from '../types';

export const INITIAL_PHOTOS: PhotoMemory[] = [
  {
    id: 1,
    title: 'The Sweet 16 Glow ✨',
    category: 'moments',
    caption: 'Turning 16 with absolute grace, golden balloons, the biggest smile, and unmatched birthday royalty energy.',
    tag: 'Birthday Queen 🎂',
    icon: '👑',
    imageUrl: '/788848812_2416345365555472_7721861095257279622_n.jpg',
    fallbackGradient: 'from-[#FAF7F2] via-[#F8D7DA] to-[#FBEEE6]'
  },
  {
    id: 2,
    title: 'Classy & Fur Coat Glam 💅',
    category: 'classy',
    caption: 'Effortless luxury and elegance. Straight out of a high-fashion winter magazine or K-drama lead scene.',
    tag: 'Vogue Energy ✨',
    icon: '✨',
    imageUrl: '/789059880_1410912957811813_5921867381542849543_n.jpg',
    fallbackGradient: 'from-[#FBEEE6] via-[#E8DAEF] to-[#FAF7F2]'
  },
  {
    id: 3,
    title: 'Cafe Date & Flower In Hair 🌸',
    category: 'moments',
    caption: 'That signature radiant smile and peace sign at the cafe. Peak comfort scene vibes every single time.',
    tag: 'Aesthetic Cutie ☕',
    icon: '🌸',
    imageUrl: '/789579934_1999577650762591_8111196695435609308_n.jpg',
    fallbackGradient: 'from-[#FAF7F2] via-[#F8D7DA] to-[#E8DAEF]'
  },
  {
    id: 4,
    title: 'Clay Mask & Orange Headband 🧖‍♀️',
    category: 'drama',
    caption: 'Skincare game is unmatched! Never missing an opportunity for the funniest, most iconic snap ever.',
    tag: 'Spa Day Slay 🍊',
    icon: '🧖‍♀️',
    imageUrl: '/789651631_1723302498759852_2369532744256232318_n.jpg',
    fallbackGradient: 'from-[#FBEEE6] via-[#FAF7F2] to-[#F8D7DA]'
  },
  {
    id: 5,
    title: 'Blushing Drama Queen Pose 💖',
    category: 'drama',
    caption: 'Hands on cheeks, mehendi, and the prettiest red fit. The ultimate drama queen ruling her spotlight.',
    tag: 'Drama Queen 💅',
    icon: '💖',
    imageUrl: '/790879568_1463615212485365_7584763074947777706_n.jpg',
    fallbackGradient: 'from-[#F8D7DA] via-[#FAF7F2] to-[#FBEEE6]'
  },
  {
    id: 6,
    title: 'Heart Belt & Dark Shades 😎',
    category: 'classy',
    caption: 'Red lace top, gold heart chain belt, and black sunglasses in the mirror. Pure main character aura.',
    tag: 'Main Character 🕶️',
    icon: '🕶️',
    imageUrl: '/790930371_1827845721843987_4531847512061236170_n.jpg',
    fallbackGradient: 'from-[#E8DAEF] via-[#FBEEE6] to-[#FAF7F2]'
  },
  {
    id: 7,
    title: 'The Paparazzi Treatment 📸',
    category: 'moments',
    caption: 'Every single phone in the room pointed at birthday royalty. You naturally light up every room you enter.',
    tag: 'Celebrity Moment 🌟',
    icon: '📸',
    imageUrl: '/792046011_1508303297984957_9191274023674169288_n.jpg',
    fallbackGradient: 'from-[#FAF7F2] via-[#F8D7DA] to-[#FBEEE6]'
  },
  {
    id: 8,
    title: 'Birthday Cake & Candle Wish 🕯️',
    category: 'moments',
    caption: 'Making the official 16th birthday wish. May all your dreams come true this year and beyond!',
    tag: 'Wish Time 🎂',
    icon: '🕯️',
    imageUrl: '/792518232_1430598008971298_7878569385550026103_n.jpg',
    fallbackGradient: 'from-[#FBEEE6] via-[#FAF7F2] to-[#E8DAEF]'
  },
  {
    id: 9,
    title: 'Sports Captain & Lotus Trophy 🏆',
    category: 'captain',
    caption: 'Draped in the shawl like a royal cape, proudly holding the gold trophy. School captain dominance!',
    tag: 'Sports Captain 🏅',
    icon: '🏆',
    imageUrl: '/793350735_1990264701675524_6736053622916721941_n.jpg',
    fallbackGradient: 'from-[#FAF7F2] via-[#FBEEE6] to-[#F8D7DA]'
  },
  {
    id: 10,
    title: 'The Legendary Spider-Girl 🕸️',
    category: 'drama',
    caption: 'Half-face Spider-Girl face paint! A little dramatic in the absolute best and coolest way possible (🕸✨).',
    tag: 'Spider-Girl 🕷️',
    icon: '🕸️',
    imageUrl: '/6104918552818161010.jpg',
    fallbackGradient: 'from-[#F8D7DA] via-[#FAF7F2] to-[#E8DAEF]'
  },
  {
    id: 11,
    title: 'Cozy Shawl & Blanket Candid 🧣',
    category: 'moments',
    caption: 'Bundled up in warmth, looking super innocent and comfortable. The definition of a comfort bestie.',
    tag: 'Cozy Vibes ☕',
    icon: '🧣',
    imageUrl: '/6104918552818161011.jpg',
    fallbackGradient: 'from-[#FBEEE6] via-[#FAF7F2] to-[#FBEEE6]'
  },
  {
    id: 12,
    title: 'Aesthetic Mud Mask Glow 💆‍♀️',
    category: 'drama',
    caption: 'Candid skincare ritual with childhood photos in the background. Always 100% genuine and hilarious.',
    tag: 'Iconic Glow ✨',
    icon: '💆‍♀️',
    imageUrl: '/0e55cc5f-d4a8-4dd1-bf20-f8cc552b3d26.png',
    fallbackGradient: 'from-[#E8DAEF] via-[#F8D7DA] to-[#FAF7F2]'
  }
];

const LOCAL_STORAGE_KEY = 'ojal_16th_custom_photos_v2';

export function getSavedPhotos(): PhotoMemory[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const customPhotos: Record<number, string> = JSON.parse(data);
      return INITIAL_PHOTOS.map(p => {
        if (customPhotos[p.id]) {
          return { ...p, imageUrl: customPhotos[p.id] };
        }
        return p;
      });
    }
  } catch {
    // fallback
  }
  return INITIAL_PHOTOS;
}

export function saveCustomPhoto(id: number, base64Url: string) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const map: Record<number, string> = raw ? JSON.parse(raw) : {};
    map[id] = base64Url;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // quota safe fallback
  }
}

export function resetAllPhotos() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // safe fallback
  }
}
