import type { ReactNode } from "react";

const nodes = [
  [12, 18],
  [28, 42],
  [8, 70],
  [40, 78],
  [62, 24],
  [78, 58],
  [90, 16],
  [55, 88],
];

export function NetworkPanel({ children }: { children: ReactNode }) {
  return (
    <section className="relative hidden overflow-hidden bg-[#071422] text-white lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:px-14 lg:py-10">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="12" y1="18" x2="28" y2="42" stroke="#2f6f86" strokeWidth="0.25" />
        <line x1="28" y1="42" x2="8" y2="70" stroke="#2f6f86" strokeWidth="0.25" />
        <line x1="28" y1="42" x2="62" y2="24" stroke="#3d88a0" strokeWidth="0.25" />
        <line x1="62" y1="24" x2="90" y2="16" stroke="#3d88a0" strokeWidth="0.25" />
        <line x1="62" y1="24" x2="78" y2="58" stroke="#2f6f86" strokeWidth="0.25" />
        <line x1="8" y1="70" x2="40" y2="78" stroke="#2f6f86" strokeWidth="0.25" />
        <line x1="40" y1="78" x2="55" y2="88" stroke="#3d88a0" strokeWidth="0.25" />
        <line x1="78" y1="58" x2="40" y2="78" stroke="#24586c" strokeWidth="0.2" />
        {nodes.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="1.6" fill="#16384a" />
            <circle cx={x} cy={y} r="0.55" fill="#7fe3f0" />
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#123044]/70" />
      <div className="pointer-events-none absolute bottom-10 left-24 h-48 w-48 rounded-full bg-[#0d2838]/80" />
      <div className="relative">{children}</div>
    </section>
  );
}
