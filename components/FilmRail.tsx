export default function FilmRail({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`sprocket-rail pointer-events-none fixed top-0 z-50 hidden h-full w-7 md:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    />
  );
}
