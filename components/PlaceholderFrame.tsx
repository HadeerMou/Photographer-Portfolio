import Image from "next/image";

const TONES = {
  amber: "from-[#3a2a14] via-[#1c140a] to-[#0a0a09]",
  rust: "from-[#3a1710] via-[#1a0d09] to-[#0a0a09]",
  graphite: "from-[#26251f] via-[#161511] to-[#0a0a09]",
  paper: "from-[#2c2a22] via-[#17160f] to-[#0a0a09]",
};

export default function PlaceholderFrame({
  path,
  tone = "graphite",
  className = "",
  icon = "camera",
}: {
  path: string;
  tone?: keyof typeof TONES;
  className?: string;
  icon?: "camera" | "film" | "aperture";
}) {
  const imagePath = path.startsWith("/") ? path : null;
  const videoPath =
    imagePath && /\.(mov|mp4|webm)$/i.test(imagePath) ? imagePath : null;

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${TONES[tone]} ${className}`}
    >
      {videoPath && (
        <video
          src={videoPath}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {imagePath && !videoPath && (
        <Image
          src={imagePath}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      )}
      {/* light leak */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-1/4 -top-1/3 h-[140%] w-2/3 rotate-12 bg-safelight/10 blur-3xl ${imagePath ? "opacity-20" : ""}`}
      />
      {!imagePath && <Icon name={icon} />}
      {!imagePath && (
        <span className="absolute bottom-3 left-3 rounded-sm bg-ink/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-dim">
          drop image → {path}
        </span>
      )}
    </div>
  );
}

function Icon({ name }: { name: "camera" | "film" | "aperture" }) {
  const common = "h-8 w-8 text-paper/25";
  if (name === "film") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <rect
          x="2"
          y="4"
          width="20"
          height="16"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M2 8h20M2 16h20" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M6 4v4M6 16v4M10 4v4M10 16v4M14 4v4M14 16v4M18 4v4M18 16v4"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    );
  }
  if (name === "aperture") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M12 4.5 15 9M12 4.5 9 9M19.5 12 15 15M19.5 12 15 9M4.5 12 9 15M4.5 12 9 9M12 19.5 9 15M12 19.5 15 15"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common}>
      <path
        d="M4 8h2.6L8 6h8l1.4 2H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="14" r="3.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
