import { CircleCheck, Circle, Clock3, GraduationCap } from "lucide-react";
import type { RoadmapLevel } from "./types";
import type { MissingSkill } from "./useSkillMatcher";
import { ProgressBar, SectionHeader } from "../../components/ui";

interface RoadmapSectionProps {
  gaps: MissingSkill[];
  completedIds: string[];
  onToggle: (activityId: string) => void;
}

const levelStyles: Record<RoadmapLevel, string> = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-brand-50 text-brand-700",
  Advanced: "bg-accent-50 text-accent-700",
};

const levelOrder: Record<RoadmapLevel, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

export function RoadmapSection({
  gaps,
  completedIds,
  onToggle,
}: RoadmapSectionProps) {
  const allActivities = gaps.flatMap((g) => g.activities);
  const completed = allActivities.filter((a) =>
    completedIds.includes(a.id)
  ).length;
  const progress = allActivities.length
    ? Math.round((completed / allActivities.length) * 100)
    : 0;

  return (
    <div className="card animate-fade-in p-5">
      <SectionHeader
        title="Your learning roadmap"
        subtitle="Recommended activities to close your gaps — mark them done as you go."
      />

      {gaps.length === 0 ? (
        <p className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm font-medium text-emerald-700">
          No roadmap needed — select a career with gaps to get personalized
          learning activities.
        </p>
      ) : (
        <>
          <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <GraduationCap className="h-4 w-4 text-brand-600" /> Learning
                progress
              </p>
              <p className="text-sm font-bold text-slate-900">
                {completed} / {allActivities.length} done
              </p>
            </div>
            <ProgressBar className="mt-3" value={progress} />
          </div>

          <div className="space-y-6">
            {gaps.map((gap) => (
              <div key={gap.name}>
                <p className="mb-2 text-sm font-bold text-slate-900">
                  Close the gap: {gap.name}
                </p>
                <div className="space-y-2">
                  {[...gap.activities]
                    .sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
                    .map((a) => {
                      const done = completedIds.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => onToggle(a.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                            done
                              ? "border-emerald-200 bg-emerald-50/50"
                              : "border-slate-200 hover:border-brand-300 hover:bg-brand-50/30"
                          }`}
                        >
                          {done ? (
                            <CircleCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                          ) : (
                            <Circle className="h-5 w-5 shrink-0 text-slate-300" />
                          )}
                          <div className="flex-1">
                            <p
                              className={`text-sm font-semibold ${
                                done
                                  ? "text-slate-400 line-through"
                                  : "text-slate-900"
                              }`}
                            >
                              {a.title}
                            </p>
                            <p className="flex items-center gap-1.5 text-xs text-slate-500">
                              {a.provider}
                              <span className="flex items-center gap-0.5">
                                <Clock3 className="h-3 w-3" />
                                {a.durationHours}h
                              </span>
                            </p>
                          </div>
                          <span
                            className={`badge shrink-0 ${levelStyles[a.level]}`}
                          >
                            {a.level}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
