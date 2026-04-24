import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { renderToPng } from './renderer';
import { BRAND } from './config';

async function main() {
  console.log('🎨 Gradient line export');

  const outputDir = resolve(__dirname, '../../publicaciones-ig/output/assets');
  await mkdir(outputDir, { recursive: true });

  // High res gradient line — 2000x40px
  const element = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 2000,
      height: 40,
      background: 'transparent',
    }}>
      <div style={{
        display: 'flex',
        width: 2000,
        height: 6,
        background: 'linear-gradient(90deg, transparent 5%, #8b2fef 20%, #5863f2 35%, #2785fe 50%, #00c1f4 65%, #5863f2 80%, transparent 95%)',
        borderRadius: 3,
      }} />
    </div>
  );

  const png = await renderToPng(element, 2000, 40);
  await writeFile(resolve(outputDir, 'gradient-line-2000px.png'), png);
  console.log('  ✅ gradient-line-2000px.png');

  // Card size — 400x10px
  const cardLine = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 400,
      height: 10,
      background: 'transparent',
    }}>
      <div style={{
        display: 'flex',
        width: 400,
        height: 4,
        background: 'linear-gradient(90deg, transparent 5%, #8b2fef 20%, #5863f2 35%, #2785fe 50%, #00c1f4 65%, #5863f2 80%, transparent 95%)',
        borderRadius: 2,
      }} />
    </div>
  );

  const cardPng = await renderToPng(cardLine, 400, 10);
  await writeFile(resolve(outputDir, 'gradient-line-400px.png'), cardPng);
  console.log('  ✅ gradient-line-400px.png');

  console.log(`📁 ${outputDir}`);
}

main().catch(console.error);
