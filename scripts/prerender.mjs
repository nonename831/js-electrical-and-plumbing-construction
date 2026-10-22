// Bakes the rendered app into dist/index.html so the first paint doesn't wait for JS.
// Run after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const html = readFileSync(htmlPath, 'utf-8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

writeFileSync(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`));
rmSync(ssrDir, { recursive: true, force: true });
console.log('prerender: wrote dist/index.html');
