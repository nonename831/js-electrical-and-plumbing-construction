// Job photos come in three sizes (see public/assets/images):
//   <name>-sm.webp     short side 360px  (phone tiles)
//   <name>-thumb.webp  short side 600px  (desktop tiles)
//   <name>.webp        original          (featured tile, lightbox)
const BASE = `${import.meta.env.BASE_URL}assets/images`;

// Original dimensions, used to derive each variant's width for srcset
const ORIGINAL_SIZE: Record<string, [number, number]> = {
  'electrical-1': [1448, 1086],
  'electrical-2': [1448, 1086],
  'electrical-3': [1086, 1448],
  'electrical-4': [1448, 1086],
  'plumbing-1': [1086, 1448],
  'plumbing-2': [1086, 1448],
  'plumbing-3': [1216, 1294],
  'plumbing-4': [1216, 1293],
};

export const photoUrl = (name: string) => `${BASE}/${name}.webp`;

// srcset across the variants; pass includeOriginal for tiles that can be shown large
export function photoSrcSet(name: string, includeOriginal = false) {
  const [w, h] = ORIGINAL_SIZE[name];
  const widthAt = (shortSide: number) => Math.round((w * shortSide) / Math.min(w, h));
  const entries = [`${BASE}/${name}-sm.webp ${widthAt(360)}w`, `${BASE}/${name}-thumb.webp ${widthAt(600)}w`];
  if (includeOriginal) entries.push(`${photoUrl(name)} ${w}w`);
  return entries.join(', ');
}
