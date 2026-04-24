import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { renderToPng } from './renderer';
import { renderBusinessCardFront, renderBusinessCardBack, CARD_SIZE } from './templates/business-card';

async function main() {
  console.log('🎨 Nodo — Business Card Generator');

  const outputDir = resolve(__dirname, '../../publicaciones-ig/output/tarjetas');
  await mkdir(outputDir, { recursive: true });

  // FRENTE
  console.log('  Frente...');
  const front = renderBusinessCardFront();
  const frontPng = await renderToPng(front, CARD_SIZE.width, CARD_SIZE.height);
  await writeFile(resolve(outputDir, 'frente.png'), frontPng);
  console.log('  ✅ frente.png');

  // DORSO
  console.log('  Dorso...');
  const back = renderBusinessCardBack();
  const backPng = await renderToPng(back, CARD_SIZE.width, CARD_SIZE.height);
  await writeFile(resolve(outputDir, 'dorso.png'), backPng);
  console.log('  ✅ dorso.png');

  console.log(`\n📁 ${outputDir}`);
}

main().catch(console.error);
