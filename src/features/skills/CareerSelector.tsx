import { BarChart3, Briefcase, Check, Code2, Layout } from "lucide-react";
import type { Career, CareerId } from "./types";
import { careers } from "./careers";
import { SectionHeader } from "../../components/ui";

const careerIcons: Record<string, typeof BarChart3> = {
  BarChart3,
  Layout,
  Code2,
  Briefcase,
};

interface CareerSelectorProps {
  selected: CareerId | null;
  onSelect: (id: CareerId | null) => void;
}

export function CareerSelector({ selected, onSelect }: CareerSelectorProps) {
  return (
    <div className="card animate-fade-in p-5">
      <SectionHeader
        title="Choose a target career"
        subtitle="We'll match your skills against what employers look for."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {careers.map((career: Career) => {
          const Icon = careerIcons[career.icon] ?? Briefcase;
          const active = selected === career.id;
          return (
            <button
              key={career.id}
              onClick={() => onSelect(active ? null : career.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                active
                  ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-100"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                {active && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <p className="mt-3 font-semibold text-slate-900">{career.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {career.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
