import { useState } from "react";
import {
  Bell,
  Check,
  Menu,
  Search,
} from "lucide-react";
import type { Notification, UserPreferences } from "../types";
import { sampleNotifications, sampleOpportunities } from "../data/sampleData";

interface HeaderProps {
  preferences: UserPreferences;
  onOpenMobileNav: () => void;
}

export function Header({ preferences, onOpenMobileNav }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(sampleNotifications);
  const [profileOpen, setProfileOpen] = useState(false);

  const results = query.trim()
    ? sampleOpportunities.filter(
        (o) =>
          o.title.toLowerCase().includes(query.toLowerCase()) ||
          o.company.toLowerCase().includes(query.toLowerCase()) ||
          o.tags.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const unread = notifs.filter((n) => !n.read).length;
  const initials = preferences.fullName
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:px-6">
      <button
        className="btn-ghost p-2 lg:hidden"
        onClick={onOpenMobileNav}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search opportunities, skills, courses…"
          className="input pl-9"
        />
        {results.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-cardhover">
            {results.map((o) => (
              <button
                key={o.id}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left hover:bg-slate-50"
                onClick={() => setQuery("")}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{o.title}</p>
                  <p className="text-xs text-slate-500">
                    {o.company} · {o.location}
                  </p>
                </div>
                <span className="badge bg-brand-50 text-brand-600">
                  {o.match}% match
                </span>
              </button>
            ))}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-cardhover">
            No results for “{query}”.
          </div>
        )}
      </div>

      <div className="relative ml-auto">
        <button
          className="btn-ghost relative p-2"
          onClick={() => {
            setNotifOpen((v) => !v);
            setProfileOpen(false);
          }}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>
        {notifOpen && (
          <div className="absolute right-0 top-full z-30 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-cardhover">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">Notifications</p>
              <button
                className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline"
                onClick={markAllRead}
              >
                <Check className="h-3.5 w-3.5" /> Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifs.map((n) => (
                <div
                  key={n.id}
                  className={`flex gap-3 px-4 py-3 ${
                    n.read ? "" : "bg-brand-50/40"
                  } hover:bg-slate-50`}
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      n.read ? "bg-slate-300" : "bg-accent-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-500">{n.detail}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-2 rounded-full p-0.5 pr-2 hover:bg-slate-100"
          onClick={() => {
            setProfileOpen((v) => !v);
            setNotifOpen(false);
          }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-600 text-sm font-bold text-white">
            {initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold leading-tight text-slate-900">
              {preferences.fullName}
            </span>
            <span className="block text-xs leading-tight text-slate-500">
              {preferences.role}
            </span>
          </span>
        </button>
        {profileOpen && (
          <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-cardhover">
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-slate-900">
                {preferences.fullName}
              </p>
              <p className="text-xs text-slate-500">{preferences.role}</p>
            </div>
            <div className="my-1 h-px bg-slate-100" />
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              View profile
            </button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              Help &amp; support
            </button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
