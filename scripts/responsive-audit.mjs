import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const root = process.cwd();
const outDir = path.join(root, 'audits', 'responsive-20260901');

const viewports = [
  { name: 'celular-pequeno', width: 360, height: 780 },
  { name: 'celular-grande', width: 430, height: 932 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'notebook', width: 1366, height: 768 },
  { name: 'desktop-largo', width: 1920, height: 1080 },
];

const sections = ['inicio', 'apoie', 'resultados', 'publicos', 'mapa', 'foto-apoiador', 'contato'];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: chromePath });
const report = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });

  const baseMetrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  for (const section of sections) {
    await page.evaluate((id) => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }, section);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(outDir, `${viewport.name}-${section}.png`), fullPage: false });
  }

  const issues = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const selector = [
      'header',
      'section',
      'footer',
      '.hero h1',
      '.portrait-frame',
      '.portrait-badge',
      '.map-copy',
      '.acre-map-image',
      '.floating-actions',
      '.editor-dock',
      '.case-card',
      '.audience-grid article',
      '.supporter-frame-card',
      '.site-footer',
    ].join(',');

    return Array.from(document.querySelectorAll(selector)).flatMap((element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      const visible = style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 1 && rect.height > 1;
      if (!visible) return [];

      const problems = [];
      if (rect.left < -2) problems.push(`sai ${Math.round(Math.abs(rect.left))}px pela esquerda`);
      if (rect.right > viewportWidth + 2) problems.push(`sai ${Math.round(rect.right - viewportWidth)}px pela direita`);
      if (rect.height > viewportHeight * 1.45 && element.matches('.hero, .map-panel')) problems.push('altura excessiva no viewport');
      if (!problems.length) return [];

      return [{
        element: element.className || element.tagName.toLowerCase(),
        problems,
        rect: {
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
      }];
    });
  });

  report.push({
    viewport: viewport.name,
    size: `${viewport.width}x${viewport.height}`,
    horizontalOverflow: baseMetrics.scrollWidth - baseMetrics.viewport,
    issues,
  });

  await page.close();
}

await browser.close();

console.log(JSON.stringify(report, null, 2));
