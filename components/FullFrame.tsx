"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import PlaceholderFrame, { THUMB_SIZES } from "./PlaceholderFrame";

const isVideo = (path: string) => /\.(mov|mp4|webm)$/i.test(path);

// Warm the browser cache so the lightbox opens instantly. The originals are
// already web-sized, so they are served as-is rather than re-encoded.
export function preloadFullFrame(path: string) {
  if (!path.startsWith("/") || isVideo(path)) return;
  const img = new window.Image();
  img.src = path;
}

// Uncropped version for lightboxes: the media keeps its own aspect ratio and
// scales down to fit the viewport.
export default function FullFrame({
  path,
  tone = "graphite",
  alt = "",
}: {
  path: string;
  tone?: ComponentProps<typeof PlaceholderFrame>["tone"];
  alt?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [ratio, setRatio] = useState(3 / 2);
  const mediaClass = "mx-auto block h-auto max-h-[80vh] w-auto max-w-full";

  if (!path.startsWith("/")) {
    return (
      <div className="aspect-4/5 w-full md:aspect-3/2">
        <PlaceholderFrame path={path} tone={tone} icon="film" />
      </div>
    );
  }

  if (isVideo(path)) {
    // Opened by a click, so browsers allow it to autoplay with sound.
    return <video src={path} autoPlay controls loop playsInline className={mediaClass} />;
  }

  // The grid thumbnail (same src + sizes, so it comes from the browser cache)
  // shows instantly at the photo's real proportions; the full-resolution
  // original fades in over it once downloaded.
  return (
    <div
      className="relative mx-auto"
      style={{ aspectRatio: ratio, width: `min(100%, calc(80vh * ${ratio}))` }}
    >
      <Image
        src={path}
        alt=""
        aria-hidden
        fill
        sizes={THUMB_SIZES}
        loading="eager"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setRatio(img.naturalWidth / img.naturalHeight);
          }
        }}
        className="object-contain"
      />
      <Image
        src={path}
        alt={alt}
        fill
        unoptimized
        loading="eager"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        className={`object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
