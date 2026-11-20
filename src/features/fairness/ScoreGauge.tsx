import type { Severity } from "./types";

interface ScoreGaugeProps {
  score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const radius = 70;
  const stroke = 12;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  const tone =
    score >= 80
      ? { ring: "#10b981", label: "Inclusive", text: "text-emerald-600", sub: "text-emerald-600" }
      : score >= 50
      ? { ring: "#f59e0b", label: "Needs review", text: "text-amber-600", sub: "text-amber-600" }
      : { ring: "#ef4444", label: "At risk", text: "text-rose-600", sub: "text-rose-600" };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <svg width="170" height="170" className="-rotate-90">
          <circle
            cx="85"
            cy="85"
            r={radius}
            fill="none"
            stroke="#eef2f7"
            strokeWidth={stroke}
          />
          <circle
            cx="85"
            cy="85"
            r={radius}
            fill="none"
            stroke={tone.ring}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-slate-900">{score}</span>
          <span className="text-xs font-medium text-slate-400">/ 100</span>
        </div>
      </div>
      <span className={`mt-2 text-sm font-semibold ${tone.sub}`}>
        {tone.label}
      </span>
    </div>
  );
}

const severityStyles: Record<Severity, { badge: string; dot: string; label: string }> = {
  high: {
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    label: "High",
  },
  medium: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    label: "Medium",
  },
  low: {
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
    label: "Low",
  },
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  const s = severityStyles[severity];
  return (
    <span className={`badge border ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
