import { Bell, Check, Save } from "lucide-react";
import { useState } from "react";
import type { UserPreferences } from "../types";
import { SectionHeader } from "./ui";

interface SettingsPageProps {
  preferences: UserPreferences;
  onUpdate: (patch: Partial<UserPreferences>) => void;
}

export function SettingsPage({ preferences, onUpdate }: SettingsPageProps) {
  const [draft, setDraft] = useState<UserPreferences>(preferences);
  const [saved, setSaved] = useState(false);

  const save = () => {
    onUpdate(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your profile and platform preferences.
        </p>
      </div>

      <div className="card animate-fade-in p-5">
        <SectionHeader
          title="Profile"
          subtitle="Shown across the platform"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              className="input"
              value={draft.fullName}
              onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Role
            </label>
            <input
              className="input"
              value={draft.role}
              onChange={(e) => setDraft({ ...draft, role: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="card animate-fade-in p-5">
        <SectionHeader title="Learning goals" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Weekly learning goal:{" "}
            <span className="font-bold text-brand-600">
              {draft.goalHoursPerWeek}h
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={draft.goalHoursPerWeek}
            onChange={(e) =>
              setDraft({ ...draft, goalHoursPerWeek: Number(e.target.value) })
            }
            className="w-full accent-brand-600"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>1h</span>
            <span>20h</span>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in p-5">
        <SectionHeader
          title="Notifications"
          subtitle="Control how OpenPath reaches you"
        />
        <div className="space-y-3">
          <ToggleRow
            icon={<Bell className="h-4 w-4" />}
            title="Push notifications"
            description="Receive in-app alerts for matches and reminders."
            checked={draft.notificationsEnabled}
            onChange={(v) => setDraft({ ...draft, notificationsEnabled: v })}
          />
          <ToggleRow
            icon={<Bell className="h-4 w-4" />}
            title="Weekly digest"
            description="A weekly summary of your readiness and progress."
            checked={draft.weeklyDigest}
            onChange={(v) => setDraft({ ...draft, weeklyDigest: v })}
          />
        </div>
      </div>

      <div className="card animate-fade-in p-5">
        <SectionHeader title="Appearance" />
        <div className="flex gap-3">
          {(["light", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setDraft({ ...draft, theme: t })}
              className={`flex-1 rounded-xl border p-4 text-left transition-all ${
                draft.theme === t
                  ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <p className="text-sm font-semibold capitalize text-slate-900">
                {t}
              </p>
              <p className="text-xs text-slate-500">
                {t === "light" ? "Always light theme" : "Follow system setting"}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={save} className="btn-primary">
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-brand-600" : "bg-slate-300"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
