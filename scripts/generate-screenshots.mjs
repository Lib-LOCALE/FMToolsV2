// Régénère les captures d'écran localisées (Accueil + Rapports) de la nouvelle UI.
//
// Prérequis : `npm run build` puis servir le dossier `build/` (SPA statique).
//   python3 -m http.server 4173 --directory build &
//   node scripts/generate-screenshots.mjs
//
// Variables d'env :
//   BASE_URL  (défaut http://127.0.0.1:4173)
//   CHROME_PATH (optionnel : chemin d'un binaire Chromium système)
//
// Conçu pour tourner en CI (runners GitHub) où Chromium est dispo via
// `npx playwright install chromium`. Les langues correspondent à celles
// référencées par les README.

import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const out = new URL('../screenshots/', import.meta.url).pathname;
const W = 1600;
const H = 1000;

// code appli -> locale BCP47 (navigator.language)
const langs = {
  en: 'en-US', fr: 'fr-FR', de: 'de-DE', es: 'es-ES', it: 'it-IT',
  pt: 'pt-PT', pl: 'pl-PL', nl: 'nl-NL', el: 'el-GR', sv: 'sv-SE',
  da: 'da-DK', zh: 'zh-CN', ko: 'ko-KR',
};

const launchOpts = {
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
};
if (process.env.CHROME_PATH) launchOpts.executablePath = process.env.CHROME_PATH;

const browser = await chromium.launch(launchOpts);

for (const [code, locale] of Object.entries(langs)) {
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
    locale,
  });
  await ctx.addInitScript((c) => {
    try { localStorage.setItem('fmtools-lang', c); } catch {}
  }, code);
  const page = await ctx.newPage();

  // Accueil
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=FMTOOLS', { timeout: 20000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}home_${code}.png` });

  // Rapports (navigation client-side)
  await page.click('a[href="/reports"]');
  await page.waitForSelector('text=MODULE 03', { timeout: 20000 });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}reports_${code}.png` });

  await ctx.close();
  console.log('OK', code);
}

await browser.close();
console.log('DONE');
