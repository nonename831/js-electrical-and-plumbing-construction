import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Used at build time by scripts/prerender.mjs to bake the page into dist/index.html
export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
