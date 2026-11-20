import { CheckCircle2, Target } from "lucide-react";
import type { MatchResult } from "./useSkillMatcher";
import { ProgressBar, SectionHeader } from "../../components/ui";
import { RadialReadiness } from "../../components/charts";

interface MatchResultsProps {
  result: MatchResult;
}

export function MatchResults({ result }: MatchResultsProps) {
  if (!result.career) {
    return (
      <div className="card animate-fade-in flex h-full flex-col items-center justify-center p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Target className="h-6 w-6" />
        </span>
        <p className="mt-4 font-semibold text-slate-900">
          Select a career to see your match
        </p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Your match percentage, matching skills, and gaps will appear here.
        </p>
      </div>
    );
  }

  const { matchPercent, matched, career } = result;
  const readinessLabel =
    matchPercent >= 80
      ? "Ready to apply"
      : matchPercent >= 50
      ? "Almost there"
      : "Building foundations";

  return (
    <div className="space-y-6">
      <div className="card animate-fade-in p-5">
        <SectionHeader
          title="Career readiness"
          subtitle={`How your skills compare to ${career.title} requirements`}
        />
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <RadialReadiness value={matchPercent} />
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {readinessLabel}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Based on {matched.length} of {career.requiredSkills.length} core
                skills for {career.title}. Add or learn missing skills to raise
                your score.
              </p>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>Skill match</span>
                <span>{matchPercent}%</span>
              </div>
              <ProgressBar className="mt-1.5" value={matchPercent} />
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in p-5">
        <SectionHeader
          title="Matching skills"
          subtitle="You already have these"
        />
        {matched.length === 0 ? (
          <p className="text-sm text-slate-500">
            No matching skills yet — check the gap analysis below to get started.
          </p>
        ) : (
          <ul className="space-y-2">
            {matched.map((s) => (
              <li
                key={s.name}
                className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                    {s.why}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <GapAnalysis result={result} />
    </div>
  );
}

function GapAnalysis({ result }: { result: MatchResult }) {
  if (!result.career) return null;

  return (
    <div className="card animate-fade-in p-5">
      <SectionHeader
        title="Skill gap analysis"
        subtitle="What's missing and why each skill matters"
      />
      {result.missing.length === 0 ? (
        <p className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm font-medium text-emerald-700">
          No gaps — you have every core skill for this career. Time to apply!
        </p>
      ) : (
        <ul className="space-y-3">
          {result.missing.map((gap) => (
            <li
              key={gap.name}
              className="rounded-xl border border-amber-100 bg-amber-50/40 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">
                  {gap.name}
                </p>
                <span className="badge bg-amber-100 text-amber-700">
                  Missing
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {gap.why}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
