type Gtag = (...args: unknown[]) => void;

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (gtag) gtag('event', eventName, params);
}
