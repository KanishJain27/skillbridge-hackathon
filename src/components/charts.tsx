import { weeklyLearningData } from "../data/sampleData";

export function LearningBarChart() {
  const max = Math.max(...weeklyLearningData.map((d) => d.hours));
  const total = weeklyLearningData
    .reduce((sum, d) => sum + d.hours, 0)
    .toFixed(1);
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-sm text-slate-500">Hours this week</p>
        <p className="text-xl font-bold text-slate-900">{total}h</p>
      </div>
      <div className="flex h-40 items-end justify-between gap-2">
        {weeklyLearningData.map((d) => {
          const h = (d.hours / max) * 100;
          return (
            <div
              key={d.day}
              className="group flex flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex w-full flex-1 items-end justify-center">
                <div
                  className="w-full max-w-[28px] origin-bottom rounded-t-md bg-gradient-to-t from-brand-500 to-accent-400 transition-all duration-300 group-hover:from-brand-600 group-hover:to-accent-500"
                  style={{ height: `${h}%` }}
                  title={`${d.hours}h`}
                />
              </div>
              <span className="text-xs font-medium text-slate-400">
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RadialReadiness({ value }: { value: number }) {
  const radius = 70;
  const stroke = 12;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
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
          stroke="url(#grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b6df5" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-900">{value}%</span>
        <span className="text-xs font-medium text-slate-400">Readiness</span>
      </div>
    </div>
  );
}

export function CategoryRadar({
  categories,
}: {
  categories: { label: string; value: number }[];
}) {
  const size = 220;
  const center = size / 2;
  const radius = 80;
  const points = categories.length;
  const angleStep = (Math.PI * 2) / points;

  const pointAt = (i: number, r: number) => {
    const a = -Math.PI / 2 + i * angleStep;
    return [center + r * Math.cos(a), center + r * Math.sin(a)];
  };

  const ring = (r: number) =>
    categories
      .map((_, i) => {
        const [x, y] = pointAt(i, r);
        return `${x},${y}`;
      })
      .join(" ");

  const dataPoly = categories
    .map((c, i) => {
      const [x, y] = pointAt(i, (c.value / 100) * radius);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={size} height={size} className="mx-auto">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={ring(radius * f)}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}
      {categories.map((_, i) => {
        const [x, y] = pointAt(i, radius);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={dataPoly}
        fill="rgba(59,109,245,0.18)"
        stroke="#3b6df5"
        strokeWidth="2"
      />
      {categories.map((c, i) => {
        const [x, y] = pointAt(i, (c.value / 100) * radius);
        return (
          <circle key={i} cx={x} cy={y} r="3" fill="#8b5cf6" />
        );
      })}
      {categories.map((c, i) => {
        const [x, y] = pointAt(i, radius + 16);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500 text-[9px] font-medium"
          >
            {c.label}
          </text>
        );
      })}
    </svg>
  );
}
