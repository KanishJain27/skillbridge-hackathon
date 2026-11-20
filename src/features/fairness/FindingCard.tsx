import { AlertTriangle, Check, Lightbulb } from "lucide-react";
import type { Finding } from "./types";
import { SeverityBadge } from "./ScoreGauge";

interface FindingCardProps {
  finding: Finding;
}

export function FindingCard({ finding }: FindingCardProps) {
  const { rule, matches } = finding;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-cardhover">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <AlertTriangle className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{rule.label}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {matches.map((m, i) => (
                <span
                  key={`${m.text}-${i}`}
                  className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-medium text-amber-900"
                >
                  “{m.text}”
                </span>
              ))}
            </div>
          </div>
        </div>
        <SeverityBadge severity={rule.severity} />
      </div>

      <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
              Why it may exclude
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
              {rule.why}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              More inclusive alternative
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
              {rule.suggestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChecklistSuggestionRow({
  title,
  detail,
  applied,
}: {
  title: string;
  detail: string;
  applied: boolean;
}) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          applied
            ? "bg-emerald-500 text-white"
            : "border border-slate-300 bg-white text-transparent"
        }`}
      >
        <Check className="h-3.5 w-3.5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{detail}</p>
      </div>
    </li>
  );
}
