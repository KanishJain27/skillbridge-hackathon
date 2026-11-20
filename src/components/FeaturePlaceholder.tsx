import type { ReactNode } from "react";
import { ArrowRight, GitBranch, User } from "lucide-react";

interface FeaturePlaceholderProps {
  icon: ReactNode;
  title: string;
  description: string;
  owner: string;
  bulletPoints: string[];
  fileLocation: string;
}

export function FeaturePlaceholder({
  icon,
  title,
  description,
  owner,
  bulletPoints,
  fileLocation,
}: FeaturePlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="card animate-fade-in overflow-hidden">
        <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-brand-50/40 p-6 sm:p-10">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-card">
              {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {title} is coming soon
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              This module is being built independently by another teammate.
              The integration point is already wired into the navigation and
              app shell.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <User className="h-4 w-4 text-brand-600" /> Owner
            </p>
            <p className="mt-2 text-sm text-slate-600">{owner}</p>
          </div>
          <div className="rounded-xl border border-slate-100 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <GitBranch className="h-4 w-4 text-accent-600" /> Component
            </p>
            <p className="mt-2 font-mono text-xs text-slate-600">
              {fileLocation}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <p className="mb-3 text-sm font-semibold text-slate-900">
            Planned scope
          </p>
          <ul className="space-y-2">
            {bulletPoints.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
