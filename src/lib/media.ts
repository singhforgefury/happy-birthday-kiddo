/**
 * Auto-discovery of media that lives in `public/`.
 *
 * Photos:  public/memories/photos/*   (any order, any names — 16 expected)
 * Music:   public/music/playlist/*    (any order, any names)
 *
 * We only read the *keys* of import.meta.glob (never import the modules), so
 * files in `public/` are served as-is by Vite and nothing is re-bundled.
 * If a folder is still empty, we fall back to predictable numbered names so
 * dropping files in later works without touching code.
 */

const IMAGE_GLOB = import.meta.glob(
  "/public/memories/photos/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
);

const AUDIO_GLOB = import.meta.glob("/public/music/playlist/*.{mp3,MP3,m4a,M4A,wav,WAV,ogg,OGG}");

/** Natural sort so photo-2 comes before photo-10. */
const natural = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const toPublicUrl = (key: string) => key.replace(/^\/public/, "");

export const PHOTO_COUNT = 16;

const discoveredPhotos = Object.keys(IMAGE_GLOB).sort(natural).map(toPublicUrl);

export const photoUrls: string[] =
  discoveredPhotos.length > 0
    ? discoveredPhotos
    : Array.from(
        { length: PHOTO_COUNT },
        (_, i) => `/memories/photos/photo-${String(i + 1).padStart(2, "0")}.jpg`,
      );

const discoveredAudio = Object.keys(AUDIO_GLOB).sort(natural).map(toPublicUrl);

/** Fallback filenames — kebab-case of each song title. */
const fallbackAudio = [
  "yeh-fitoor-mera",
  "whered-all-the-time-go",
  "just-the-two-of-us",
  "forever",
  "love-me-not",
  "kids",
].map((n) => `/music/playlist/${n}.mp3`);

export const audioUrls: string[] = discoveredAudio.length > 0 ? discoveredAudio : fallbackAudio;

/** Pretty title from a filename, used when a track has no metadata entry. */
export function titleFromUrl(url: string): string {
  const base = url.split("/").pop() ?? url;
  return base
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^\d+[\s._-]+/, "")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Loose match so "01 - Yeh Fitoor Mera.mp3" finds its metadata. */
export function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
