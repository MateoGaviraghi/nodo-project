import { readFile } from 'fs/promises';
import { BRAND } from './config';

interface FontConfig {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: 'normal' | 'italic';
}

let cache: FontConfig[] | null = null;

export async function loadFonts(): Promise<FontConfig[]> {
  if (cache) return cache;

  const [regular, italic] = await Promise.all([
    readFile(BRAND.fonts.regular),
    readFile(BRAND.fonts.italic),
  ]);

  cache = [
    { name: 'Codec Pro', data: regular.buffer as ArrayBuffer, weight: 400, style: 'normal' },
    { name: 'Codec Pro', data: italic.buffer as ArrayBuffer, weight: 400, style: 'italic' },
  ];

  return cache;
}
