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
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
