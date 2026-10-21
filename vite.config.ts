import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { SITE_URL, SEO_TEXT, buildJsonLd, buildMetaTags } from './src/siteData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Injects the default-language (zh) SEO tags into index.html and emits
// sitemap.xml with the build date, both generated from src/siteData.ts.
const seoPlugin = (): Plugin => ({
  name: 'seo',
  transformIndexHtml(html) {
    const seo = SEO_TEXT.zh;
    const meta = buildMetaTags('zh')
      .map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`)
      .join('\n    ');
    const jsonLd = JSON.stringify(buildJsonLd('zh'), null, 2).replace(/</g, '\\u003c');
    return html
      .replace('<html lang="">', `<html lang="${seo.htmlLang}">`)
      .replace('<!--seo-tags-->', [
        `<title>${escapeHtml(seo.title)}</title>`,
        meta,
        `<link rel="canonical" href="${SITE_URL}" />`,
        `<link rel="sitemap" type="application/xml" href="${SITE_URL}sitemap.xml" />`,
        `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
      ].join('\n    '));
  },
  generateBundle() {
    const today = new Date().toISOString().slice(0, 10);
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
    });
  },
});

export default defineConfig({
  // base 配置：将应用部署到 GitHub Pages 时使用子路径
  base: '/js-electrical-and-plumbing-construction/',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), seoPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
