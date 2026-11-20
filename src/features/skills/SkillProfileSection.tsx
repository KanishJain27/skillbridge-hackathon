import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { SkillCategory, UserSkill } from "./types";
import { skillCategories, suggestedSkills } from "./careers";
import { SectionHeader } from "../../components/ui";

interface SkillProfileSectionProps {
  skills: UserSkill[];
  onAdd: (name: string, category: string) => void;
  onRemove: (id: string) => void;
}

const categoryBadgeStyles: Record<SkillCategory, string> = {
  Engineering: "bg-brand-50 text-brand-700",
  Data: "bg-emerald-50 text-emerald-700",
  Business: "bg-amber-50 text-amber-700",
  Design: "bg-accent-50 text-accent-700",
  "Soft Skills": "bg-rose-50 text-rose-700",
};

export function SkillProfileSection({
  skills,
  onAdd,
  onRemove,
}: SkillProfileSectionProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Engineering");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const submit = () => {
    if (!name.trim()) return;
    onAdd(name, category);
    setName("");
  };

  const addSuggested = (s: UserSkill) => {
    onAdd(s.name, s.category);
    setShowSuggestions(false);
  };

  const suggestions = suggestedSkills.filter(
    (s) => !skills.some((u) => u.name.toLowerCase() === s.name.toLowerCase())
  );

  const grouped = skillCategories.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="card animate-fade-in p-5">
      <SectionHeader
        title="Your skill profile"
        subtitle="Add the skills you already have — they power your career match."
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="e.g. SQL, React, Communication…"
          className="input flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as SkillCategory)}
          className="input sm:w-44"
        >
          {skillCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button onClick={submit} className="btn-primary shrink-0">
          <Plus className="h-4 w-4" /> Add skill
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowSuggestions((v) => !v)}
            className="text-xs font-semibold text-brand-600 hover:underline"
          >
            {showSuggestions ? "Hide suggestions" : `Suggest skills for me (${suggestions.length})`}
          </button>
          {showSuggestions && (
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.slice(0, 10).map((s) => (
                <button
                  key={s.id}
                  onClick={() => addSuggested(s)}
                  className="badge border border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600"
                >
                  <Plus className="h-3 w-3" /> {s.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-5 space-y-4">
        {grouped.map(
          ({ category, items }) =>
            items.length > 0 && (
              <div key={category}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s.id}
                      className={`badge py-1.5 text-sm ${categoryBadgeStyles[s.category]}`}
                    >
                      {s.name}
                      <button
                        onClick={() => onRemove(s.id)}
                        className="ml-1 rounded-full p-0.5 hover:bg-black/10"
                        aria-label={`Remove ${s.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )
        )}
        {skills.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            No skills yet. Add a few above to see your career match.
          </p>
        )}
      </div>
    </div>
  );
}
