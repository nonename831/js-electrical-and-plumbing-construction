import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

window.history.scrollRestoration = 'manual';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The production build prerenders the page into #root (scripts/prerender.mjs);
// the dev server serves an empty #root.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
