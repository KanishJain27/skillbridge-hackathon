import type { ReactNode } from "react";

export function ProgressBar({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const color =
    v >= 75 ? "bg-emerald-500" : v >= 50 ? "bg-brand-500" : "bg-amber-500";
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div
        className={`h-full rounded-full ${color} transition-all duration-700`}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
  sub,
  accent = "brand",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent?: "brand" | "accent" | "emerald" | "amber";
}) {
  const accents: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    accent: "bg-accent-50 text-accent-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <div className="card animate-fade-in p-5 transition-shadow hover:shadow-cardhover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accents[accent]}`}>
          {icon}
        </div>
      </div>
      {sub && <p className="mt-3 text-xs font-medium text-slate-500">{sub}</p>}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
