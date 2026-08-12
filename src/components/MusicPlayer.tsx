import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { songs } from "@/data/content";

const fmt = (t: number) => {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

type RepeatMode = "off" | "all" | "one";

type MusicPlayerProps = {
  active: boolean;
  chapter?: number;
};

export function MusicPlayer({
  active,
  chapter = 0,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const chapterSongs = [0, 1, 2, 3, 4];
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("all");
  const [blocked, setBlocked] = useState(false);
  // If the audio file itself can't load, never show the play overlay.
  const [audioBroken, setAudioBroken] = useState(false);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    void el.play().then(
      () => {
        setPlaying(true);
        setBlocked(false);
      },
      () => {
        setPlaying(false);
        const el2 = audioRef.current;
        if (!el2 || el2.error) setAudioBroken(true);
        else setBlocked(true);
      },
    );
  }, []);

  // Begin playback once the journey starts (never before).
  useEffect(() => {
    if (!active) return;
    const el = audioRef.current;
    if (el) el.volume = volume;
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = volume;
  }, [volume]);

  // Browsers allow audio after the first genuine gesture — take it quietly.
  useEffect(() => {
    if (!blocked) return;
    const retry = () => play();
    window.addEventListener("pointerdown", retry, { once: true });
    window.addEventListener("keydown", retry, { once: true });
    return () => {
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
    };
  }, [blocked, play]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      play();
    }
  };

  const go = useCallback(
    (next: number) => {
      const n = (next + songs.length) % songs.length;
      setIndex(n);
      setProgress(0);
      requestAnimationFrame(play);
    },
    [play],
  );
useEffect(() => {
  const target = chapterSongs[Math.min(chapter, chapterSongs.length - 1)] ?? 0;

  if (target !== index) {
    go(target);
  }
}, [chapter, index, go]);
  const advance = useCallback(
    (dir: number, auto = false) => {
      if (auto && repeat === "one") {
        const el = audioRef.current;
        if (el) {
          el.currentTime = 0;
          play();
        }
        return;
      }
      if (shuffle && songs.length > 1) {
        let n = index;
        while (n === index) n = Math.floor(Math.random() * songs.length);
        go(n);
        return;
      }
      if (auto && repeat === "off" && index === songs.length - 1) {
        setPlaying(false);
        return;
      }
      go(index + dir);
    },
    [go, index, play, repeat, shuffle],
  );

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const track = useMemo(() => songs[index], [index]);

  if (!active || !track) return null;

  return (
    <>
      {blocked && !audioBroken && (
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="fixed bottom-32 left-1/2 z-50 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 sm:bottom-36 sm:left-6 sm:translate-x-0"
        >
          <div className="glass rounded-[1.5rem] px-6 py-6 text-center">
            <p className="font-sans text-[0.5rem] tracking-[0.36em] text-gold/70 uppercase">
              One small thing
            </p>
            <h3 className="font-display mt-3 text-xl text-cream">This story has a soundtrack</h3>
            <p className="font-serif mt-2 text-sm text-muted-foreground italic">
              Your browser wants your permission before the music begins.
            </p>
            <button
              onClick={play}
              className="glass glass-hover mt-5 cursor-pointer rounded-full px-7 py-3 text-[0.6rem] tracking-[0.28em] text-cream uppercase"
            >
              Play the music
            </button>
            <button
              onClick={() => setBlocked(false)}
              className="font-sans mt-4 block w-full cursor-pointer text-[0.5rem] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:text-cream"
            >
              Continue in silence
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-1/2 z-40 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 sm:left-6 sm:translate-x-0"
      >
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onCanPlay={() => setAudioBroken(false)}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => advance(1, true)}
          onError={() => {
            setPlaying(false);
            setAudioBroken(true);
            setBlocked(false);
          }}
        />

        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glass mb-2 max-h-[55svh] overflow-y-auto rounded-2xl p-2"
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
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-300 hover:bg-glow/[0.06] ${
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
              aria-expanded={open}
              className="shrink-0 cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:text-gold"
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

          <div className="flex items-center justify-between">
            <span className="font-sans w-8 text-[0.6rem] text-muted-foreground">
              {fmt(progress)}
            </span>

            <div className="flex items-center gap-0.5">
              <IconBtn
                label="Shuffle"
                active={shuffle}
                onClick={() => setShuffle((v) => !v)}
                path="M17 3l4 4-4 4V8.5h-1.6c-1 0-1.7.4-2.4 1.3l-1 1.3-1.3-1.6.9-1.1C12.7 6.6 14 6 15.4 6H17V3zM3 6h2.6c1.7 0 3.1.8 4.2 2.3l4 5.4c.6.9 1.4 1.3 2.4 1.3H17V12l4 4-4 4v-3h-1.6c-1.7 0-3.1-.8-4.2-2.3l-4-5.4C6.6 8.4 5.9 8 5 8H3V6zm0 10h2.6c.6 0 1.1-.1 1.6-.4l1.3 1.7c-.9.5-1.9.7-3 .7H3v-2z"
              />
              <button
                onClick={() => advance(-1)}
                aria-label="Previous"
                className="cursor-pointer rounded-full p-2 text-cream/70 transition-colors hover:text-rose-soft"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
                </svg>
              </button>
              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="cursor-pointer rounded-full bg-gradient-to-br from-primary to-rose-soft p-2.5 text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.66_0.212_0.5/0.9)] transition-transform hover:scale-105"
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
                onClick={() => advance(1)}
                aria-label="Next"
                className="cursor-pointer rounded-full p-2 text-cream/70 transition-colors hover:text-rose-soft"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 5h2v14h-2zM4 5l11 7-11 7z" />
                </svg>
              </button>
              <IconBtn
                label={`Repeat ${repeat}`}
                active={repeat !== "off"}
                onClick={() => setRepeat((r) => (r === "all" ? "one" : r === "one" ? "off" : "all"))}
                path="M7 7h10v2.5L21 6l-4-3.5V5H5v6h2V7zm10 10H7v-2.5L3 18l4 3.5V19h12v-6h-2v4z"
                badge={repeat === "one" ? "1" : undefined}
              />
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
                className="h-1 w-12 cursor-pointer appearance-none rounded-full bg-glow/15 accent-rose-soft"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function IconBtn({
  label,
  active,
  onClick,
  path,
  badge,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  path: string;
  badge?: string | undefined;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`relative cursor-pointer rounded-full p-2 transition-colors ${
        active ? "text-gold" : "text-muted-foreground hover:text-cream"
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
      {badge && (
        <span className="font-sans absolute right-0.5 bottom-0.5 text-[0.4rem] text-gold">
          {badge}
        </span>
      )}
      {active && (
        <span
          aria-hidden
          className="absolute bottom-0.5 left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-gold"
        />
      )}
    </button>
  );
}

/** Circular album-art placeholder — a softly spinning vinyl of gold and rose. */
function Disc({ index, spinning, size }: { index: number; spinning: boolean; size: number }) {
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
