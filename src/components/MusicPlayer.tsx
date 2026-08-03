import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { songs } from "@/data/content";

const fmt = (t: number) => {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

export function MusicPlayer({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);

  // Begin playback once the journey starts (never before).
  useEffect(() => {
    if (!active) return;
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
    void el.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = volume;
  }, [volume]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    }
  };

  const go = (next: number) => {
    const n = (next + songs.length) % songs.length;
    setIndex(n);
    setProgress(0);
    requestAnimationFrame(() => {
      const el = audioRef.current;
      if (!el) return;
      void el.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    });
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  if (!active) return null;
  const track = songs[index]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-1/2 z-40 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 sm:left-6 sm:translate-x-0"
    >
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => go(index + 1)}
      />

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass mb-2 overflow-hidden rounded-2xl p-2"
        >
          <p className="font-sans px-3 pt-1 pb-2 text-[0.55rem] tracking-[0.32em] text-gold/70 uppercase">
            Our Playlist
          </p>
          <ul>
            {songs.map((s, i) => {
              const newChapter = songs[i - 1]?.chapter !== s.chapter;
              return (
                <li key={s.src}>
                  {newChapter && (
                    <p className="font-serif mt-2 px-3 pb-1 text-[0.8rem] text-cream/55 italic">
                      {s.emoji} {s.chapter}
                    </p>
                  )}
                  <button
                    onClick={() => go(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-300 hover:bg-glow/[0.06] ${
                      i === index ? "bg-glow/[0.05] text-rose-soft" : "text-muted-foreground"
                    }`}
                  >
                    <Disc index={i} spinning={i === index && playing} size={30} />
                    <span className="min-w-0 flex-1">
                      <span className="font-serif block truncate text-sm">{s.title}</span>
                      <span className="font-sans block truncate text-[0.58rem] tracking-[0.18em] text-muted-foreground/80 uppercase">
                        {s.artist}
                      </span>
                    </span>
                    {i === index && (
                      <span aria-hidden className="flex items-end gap-[2px]">
                        {[0, 1, 2].map((b) => (
                          <span
                            key={b}
                            className="w-[2px] rounded-full bg-rose-soft"
                            style={{
                              height: playing ? 10 : 4,
                              animation: playing
                                ? `float-soft ${0.9 + b * 0.25}s ease-in-out infinite`
                                : undefined,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

      <div className="glass rounded-2xl px-4 py-3.5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <Disc index={index} spinning={playing} size={40} />
          <div className="min-w-0">
            <p className="font-serif truncate text-sm text-cream">{track.title}</p>
            <p className="font-sans truncate text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              {track.emoji} {track.artist}
            </p>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Playlist"
            className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h12v2H3zM3 11h12v2H3zM3 16h8v2H3zM17 5l5 3-5 3z" />
            </svg>
          </button>
        </div>

        <div
          onClick={seek}
          className="group mt-3 cursor-pointer py-2"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
        >
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-glow/12">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-[width] duration-200"
              style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="font-sans w-8 text-[0.6rem] text-muted-foreground">{fmt(progress)}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous"
              className="rounded-full p-2 text-cream/70 transition-colors hover:text-rose-soft"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
              </svg>
            </button>
            <button
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className="rounded-full bg-gradient-to-br from-primary to-rose-soft p-2.5 text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.66_0.212_0.5/0.9)] transition-transform hover:scale-105"
            >
              {playing ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4l13 8-13 8z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next"
              className="rounded-full p-2 text-cream/70 transition-colors hover:text-rose-soft"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 5h2v14h-2zM4 5l11 7-11 7z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0 text-muted-foreground"
            >
              <path d="M4 9h3l5-4v14l-5-4H4z" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              aria-label="Volume"
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 w-14 cursor-pointer appearance-none rounded-full bg-glow/15 accent-rose-soft"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Circular album-art placeholder — a softly spinning vinyl of gold and rose. */
function Disc({
  index,
  spinning,
  size,
}: {
  index: number;
  spinning: boolean;
  size: number;
}) {
  const hues = [0.5, 40, 88, 320, 200];
  const h = hues[index % hues.length];
  return (
    <span
      aria-hidden
      className="relative block shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(from ${index * 60}deg, oklch(0.66 0.212 ${h} / 0.9), oklch(0.85 0.148 88 / 0.85), oklch(0.77 0.135 2 / 0.9), oklch(0.66 0.212 ${h} / 0.9))`,
        boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.18), 0 6px 18px -8px oklch(0 0 0 / 0.8)",
        animation: spinning ? "disc-spin 9s linear infinite" : undefined,
      }}
    >
      <span
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: size * 0.28,
          height: size * 0.28,
          transform: "translate(-50%, -50%)",
          background: "oklch(0.11 0.028 268)",
          boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.2)",
        }}
      />
    </span>
  );
}
