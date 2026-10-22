import type React from 'react';
import { CONTACT_INFO } from '../siteData';
import { showToast } from './toast';

// Mouse-driven devices usually can't place a call from a tel: link.
const isDesktop = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// On desktop, copy the number instead of opening tel: (which typically does nothing);
// phones keep the normal tap-to-call behaviour.
export function copyPhoneOnDesktop(e: React.MouseEvent, text: { copied: string; fallback: string }) {
  if (!isDesktop()) return;
  e.preventDefault();
  const phone = CONTACT_INFO.phone;
  const fallback = () => showToast(`${text.fallback}${phone}`);
  if (!navigator.clipboard) return fallback();
  navigator.clipboard.writeText(phone).then(() => showToast(`${text.copied}${phone}`), fallback);
}
