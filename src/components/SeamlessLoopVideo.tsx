import React, { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_CROSSFADE_SEC = 0.45;

type SeamlessLoopVideoProps = {
  src: string;
  className?: string;
  crossfadeSec?: number;
  ariaLabel?: string;
};

function configureVideoElement(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.preload = "auto";
  video.loop = false;
  video.controls = false;
  video.disablePictureInPicture = true;
}

export default function SeamlessLoopVideo({
  src,
  className = "",
  crossfadeSec = DEFAULT_CROSSFADE_SEC,
  ariaLabel = "Animación de blindaje cibernético en bucle",
}: SeamlessLoopVideoProps) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeSlotRef = useRef<"a" | "b">("a");
  const swappingRef = useRef(false);
  const durationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [frontIsA, setFrontIsA] = useState(true);

  const getActiveVideo = useCallback(() => {
    return activeSlotRef.current === "a" ? videoARef.current : videoBRef.current;
  }, []);

  const getInactiveVideo = useCallback(() => {
    return activeSlotRef.current === "a" ? videoBRef.current : videoARef.current;
  }, []);

  const beginCrossfade = useCallback(async () => {
    if (swappingRef.current) return;

    const outgoing = getActiveVideo();
    const incoming = getInactiveVideo();
    if (!outgoing || !incoming || !durationRef.current) return;

    swappingRef.current = true;

    try {
      incoming.currentTime = 0;
      await incoming.play();
    } catch {
      swappingRef.current = false;
      return;
    }

    const nextFrontIsA = activeSlotRef.current === "b";
    setFrontIsA(nextFrontIsA);
    activeSlotRef.current = activeSlotRef.current === "a" ? "b" : "a";

    window.setTimeout(() => {
      outgoing.pause();
      outgoing.currentTime = 0;
      swappingRef.current = false;
    }, crossfadeSec * 1000);
  }, [crossfadeSec, getActiveVideo, getInactiveVideo]);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    configureVideoElement(videoA);
    configureVideoElement(videoB);
    videoA.src = src;
    videoB.src = src;

    const syncDuration = () => {
      const d = videoA.duration;
      if (Number.isFinite(d) && d > 0) {
        durationRef.current = d;
      }
    };

    const tick = () => {
      const active = getActiveVideo();
      const duration = durationRef.current;

      if (
        active &&
        duration > 0 &&
        !swappingRef.current &&
        active.currentTime >= duration - crossfadeSec
      ) {
        void beginCrossfade();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const startPlayback = () => {
      syncDuration();
      activeSlotRef.current = "a";
      setFrontIsA(true);
      videoA.currentTime = 0;
      void videoA.play().catch(() => {});
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    videoA.addEventListener("loadedmetadata", syncDuration);
    videoA.addEventListener("canplay", startPlayback, { once: true });

    return () => {
      videoA.removeEventListener("loadedmetadata", syncDuration);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      videoA.pause();
      videoB.pause();
    };
  }, [src, crossfadeSec, beginCrossfade, getActiveVideo]);

  const transitionStyle = {
    transition: `opacity ${crossfadeSec}s ease-in-out`,
  };

  return (
    <div
      className={`relative w-full max-w-[420px] aspect-square mx-auto overflow-hidden rounded-2xl border border-amber-500/25 bg-black/80 shadow-[0_0_45px_rgba(212,175,55,0.18)] ${className}`}
      aria-label={ariaLabel}
      role="img"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.12),transparent_65%)]" />
      <video
        ref={videoARef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          ...transitionStyle,
          opacity: frontIsA ? 1 : 0,
          zIndex: frontIsA ? 2 : 1,
        }}
        aria-hidden={!frontIsA}
      />
      <video
        ref={videoBRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          ...transitionStyle,
          opacity: frontIsA ? 0 : 1,
          zIndex: frontIsA ? 1 : 2,
        }}
        aria-hidden={frontIsA}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-amber-500/10 rounded-2xl" />
    </div>
  );
}
