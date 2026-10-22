import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TOAST_EVENT } from '../lib/toast';

const VISIBLE_MS = 2500;

export const Toast: React.FC = () => {
  // Text is kept after hiding so the pill fades out with its message, not empty
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), VISIBLE_MS);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="fixed inset-x-0 bottom-8 z-[70] flex justify-center px-4 pointer-events-none">
      <div
        className={`flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-2xl transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <CheckCircle2 size={18} className="text-brand-cyan" />
        {message}
      </div>
    </div>
  );
};
