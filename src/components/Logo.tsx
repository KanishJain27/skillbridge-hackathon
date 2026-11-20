import { Compass } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 shadow-sm">
        <Compass className="h-5 w-5 text-white" />
      </div>
      <div className="leading-tight">
        <p className="text-base font-bold tracking-tight text-slate-900">OpenPath</p>
        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          Inclusive Workforce
        </p>
      </div>
    </div>
  );
}
