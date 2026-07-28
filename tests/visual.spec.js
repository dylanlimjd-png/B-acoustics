// @ts-check
const { test, expect } = require('@playwright/test');

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'service-office-acoustics', path: '/services/office-acoustics-singapore.html' },
  { name: 'service-party-wall', path: '/services/party-wall-soundproofing-singapore.html' },
  { name: 'service-industrial-noise', path: '/services/industrial-noise-compliance-singapore.html' },
  { name: 'blog-office-cost', path: '/blog/office-soundproofing-cost-singapore.html' },
  { name: 'blog-stc-vs-nrc', path: '/blog/stc-vs-nrc-explained.html' },
  { name: 'blog-hdb-vs-condo', path: '/blog/hdb-vs-condo-soundproofing-singapore.html' },
  { name: 'blog-nea-boundary-noise', path: '/blog/nea-boundary-noise-limits-singapore.html' },
];

for (const { name, path } of PAGES) {
  test(`${name} matches visual baseline`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // index.html sets html{scroll-behavior:smooth}, which animates the
    // scroll steps Chromium uses to stitch a full-page screenshot together —
    // that can catch two consecutive captures mid-transition. Force instant
    // scrolling for the capture only; doesn't touch the live site's behavior.
    await page.addStyleTag({ content: 'html{scroll-behavior:auto !important;}' });
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
