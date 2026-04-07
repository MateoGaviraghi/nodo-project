import { resolve } from 'path';

const ROOT = resolve(__dirname, '../../');

export const BRAND = {
  colors: {
    black: '#0a0a0a',
    white: '#ffffff',
    blue: '#2785fe',
    cyan: '#00c1f4',
    purple: '#8b2fef',
    indigo: '#5863f2',
    gray900: '#1a1a2e',
    gray800: '#16213e',
    gray700: '#2a2a4a',
    gray600: '#3a3a5c',
    gray400: '#8888aa',
    gray300: '#b0b0cc',
    gray200: '#d0d0e8',
  },
  gradient: {
    full: 'linear-gradient(135deg, #8b2fef 0%, #5863f2 30%, #2785fe 60%, #00c1f4 100%)',
    short: 'linear-gradient(135deg, #8b2fef, #00c1f4)',
  },
  sizes: {
    feedVertical: { width: 1080, height: 1350 },
    feedSquare: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
  },
  fonts: {
    regular: resolve(ROOT, 'public/fonts/CodecPro-Regular.ttf'),
    italic: resolve(ROOT, 'public/fonts/CodecPro-Italic.ttf'),
  },
  logo: resolve(ROOT, 'public/logos/logo-n.png'),
  handle: '@nodotech.dev',
  watermark: { opacity: 0.15, size: 64 },
} as const;

export type ImageSize = keyof typeof BRAND.sizes;
