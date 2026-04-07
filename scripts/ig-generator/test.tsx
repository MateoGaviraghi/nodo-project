import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { renderToPng } from './renderer';
import { getTemplate } from './templates';
import { BRAND } from './config';
import type { SinglePostContent } from './types';

async function main() {
  console.log('🎨 Nodo IG Generator — Test v4');

  const outputDir = resolve(__dirname, '../../publicaciones-ig/output/test');
  await mkdir(outputDir, { recursive: true });

  const template = getTemplate('single-post');

  const content: SinglePostContent = {
    template: 'single-post',
    title: 'Algo nuevo\nestá llegando.',
    subtitle: 'El futuro no se espera. Se construye.',
    tag: 'PRÓXIMAMENTE',
  };

  // Feed 4:5
  const feedSize = BRAND.sizes.feedVertical;
  console.log(`  Feed ${feedSize.width}x${feedSize.height}...`);
  const feedPng = await renderToPng(template(content, feedSize), feedSize.width, feedSize.height);
  await writeFile(resolve(outputDir, 'v4-feed-algo-llegando-1080x1350.png'), feedPng);
  console.log(`  ✅ Feed done`);

  // Story 9:16
  const storySize = BRAND.sizes.story;
  console.log(`  Story ${storySize.width}x${storySize.height}...`);
  const storyPng = await renderToPng(template(content, storySize), storySize.width, storySize.height);
  await writeFile(resolve(outputDir, 'v4-story-algo-llegando-1080x1920.png'), storyPng);
  console.log(`  ✅ Story done`);

  console.log(`📁 ${outputDir}`);
}

main().catch(console.error);
