import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const root = process.cwd();
const publicImages = path.join(root, 'public', 'images');
const outputDir = path.join(publicImages, 'optimized');

const images = [
  ['olavinho-official-hero.png', [480, 768, 1200]],
  ['olavinho-official-speaking.png', [420, 720, 1000]],
  ['acre-map-highlight.png', [640, 960, 1400]],
  ['olavinho-supporter-profile.png', [320, 520, 720]],
  ['olavinho-share-card.png', [640, 960, 1200]],
  ['asfalto-portelinha.webp', [420, 720, 960]],
  ['acrelandia-drone.webp', [420, 720, 960]],
  ['ponte-cumaru.webp', [420, 720, 960]],
  ['agro-plantadeira.webp', [420, 720, 960]],
  ['feira-peixe.webp', [420, 720, 960]],
];

await mkdir(outputDir, { recursive: true });

await sharp({ create: { width: 1, height: 1, channels: 4, background: '#0000' } })
  .webp()
  .toFile(path.join(outputDir, '.keep.webp'));

for (const [file, widths] of images) {
  const source = path.join(publicImages, file);
  const parsed = path.parse(file);

  for (const width of widths) {
    const output = path.join(outputDir, `${parsed.name}-${width}.webp`);
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(output);
  }
}

console.log(`Optimized ${images.length} images into ${path.relative(root, outputDir)}`);
