// Fire-and-forget toast: any component can call showToast(); <Toast /> in App renders it.
export const TOAST_EVENT = 'app:toast';

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}
