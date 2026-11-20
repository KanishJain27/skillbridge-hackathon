import {
  Compass,
  Gauge,
  GraduationCap,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import type { PageId } from "../types";
import { Logo } from "./Logo";

interface SidebarProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems: { id: PageId; label: string; icon: typeof Compass; hint?: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: Compass },
  { id: "skills", label: "Skill Matching", icon: Gauge },
  { id: "fairness", label: "Inclusive Hiring", icon: ShieldCheck },
  { id: "learning", label: "My Learning", icon: GraduationCap },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <button
            className="btn-ghost -mr-2 p-2 lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    active ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {item.hint && (
                  <span className="badge bg-slate-100 text-slate-500">
                    {item.hint}
                  </span>
                )}
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 p-4 text-white">
          <p className="text-sm font-semibold">OpenPath Premium</p>
          <p className="mt-1 text-xs text-white/80">
            Unlock unlimited career matches and inclusive hiring audits.
          </p>
          <button className="mt-3 w-full rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-white/25">
            Explore plans
          </button>
        </div>
      </aside>
    </>
  );
}
