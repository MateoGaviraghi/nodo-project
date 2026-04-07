import satori from 'satori';
import sharp from 'sharp';
import { loadFonts } from './fonts';

export async function renderToPng(
  element: React.ReactNode,
  width: number,
  height: number
): Promise<Buffer> {
  const fonts = await loadFonts();

  const svg = await satori(element as React.ReactElement, {
    width,
    height,
    fonts,
  });

  return sharp(Buffer.from(svg)).png({ quality: 100 }).toBuffer();
}
