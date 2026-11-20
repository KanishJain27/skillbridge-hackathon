import { useMemo, useState } from "react";
import {
  AlertTriangle,
  FileSearch,
  Info,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { scanDescription, highlightExclusions } from "./rules";
import { sampleJobDescription } from "./sampleData";
import { useFairnessDraft, type PersistedLastResult } from "./useFairnessDraft";
import { ScoreGauge } from "./ScoreGauge";
import { FindingCard, ChecklistSuggestionRow } from "./FindingCard";
import { RevisedDescriptionCard } from "./RevisedDescriptionCard";
import { SectionHeader, StatCard } from "../../components/ui";
import type { ChecklistSuggestion, ScanResult } from "./types";

export default function JobFairnessChecker() {
  const { draft, setDraft, lastResult, persistResult, reset, loaded } =
    useFairnessDraft();
  const [result, setResult] = useState<ScanResult | null>(null);

  const activeResult = result ?? (lastResult ? toScanResult(lastResult) : null);

  const scan = () => {
    if (!draft.trim()) return;
    const res = scanDescription(draft);
    setResult(res);
    persistResult({
      score: res.score,
      totalFlags: res.totalFlags,
      revised: res.revisedDescription,
    });
  };

  const loadSample = () => {
    setDraft(sampleJobDescription);
    setResult(null);
  };

  const handleReset = () => {
    reset();
    setResult(null);
  };

  const checklist = useMemo<ChecklistSuggestion[]>(() => {
    if (!activeResult) return [];
    const appliedCategories = new Set(
      // We don't have findings on restored results, so derive from text
      (result?.findings ?? []).map((f) => f.rule.category)
    );
    const has = (cat: string) => appliedCategories.has(cat as never);
    return [
      {
        id: "skills-based",
        title: "Lead with skills, not credentials",
        detail:
          "Replace hard degree gates with 'degree or equivalent practical experience' so skilled non-traditional applicants aren't screened out.",
        applied: has("degree"),
      },
      {
        id: "neutral-tone",
        title: "Use neutral, role-focused tone",
        detail:
          "Swap jargon like 'rockstar' or 'ninja' for clear descriptions of the work and impact.",
        applied: has("culture"),
      },
      {
        id: "inclusive-pronouns",
        title: "Use inclusive pronouns",
        detail:
          "Use the singular 'they' or second person ('you will') instead of binary pronoun pairs.",
        applied: has("gendered"),
      },
      {
        id: "accessible-language",
        title: "Avoid ableist metaphors",
        detail:
          "Describe the actual work style instead of metaphors rooted in physical ability.",
        applied: has("accessibility"),
      },
      {
        id: "flexible-workplace",
        title: "Signal an accessible, flexible workplace",
        detail:
          "Mention flexible hours, remote options, and accommodation availability to widen your applicant pool.",
        applied: false,
      },
    ];
  }, [activeResult, result]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
            <ShieldCheck className="h-7 w-7 text-brand-600" /> Inclusive Hiring
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Scan a job description for exclusionary wording and get an
            inclusive rewrite.
          </p>
        </div>
      </div>

      <div className="card animate-fade-in flex items-start gap-3 border-brand-100 bg-brand-50/40 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <p className="text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-900">
            Preliminary wording review.
          </span>{" "}
          This tool uses transparent rule-based checks to flag potentially
          exclusionary language. It is not a legal compliance assessment or a
          complete AI bias audit.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card animate-fade-in p-5 lg:col-span-2">
          <SectionHeader
            title="Job description"
            subtitle="Paste a role description to analyze."
          />
          <label htmlFor="jd-textarea" className="sr-only">
            Job description
          </label>
          <textarea
            id="jd-textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Paste your job description here…"
            className="input min-h-[260px] resize-y leading-relaxed"
            spellCheck
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-slate-400">
              {draft.trim() ? `${draft.trim().length} characters` : "Empty"}
              {loaded && draft ? " · draft saved automatically" : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={loadSample}
                className="btn-outline text-xs"
                type="button"
              >
                <Sparkles className="h-3.5 w-3.5" /> Load sample
              </button>
              <button
                onClick={handleReset}
                className="btn-ghost text-xs"
                type="button"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                onClick={scan}
                disabled={!draft.trim()}
                className="btn-primary text-xs"
                type="button"
              >
                <ScanLine className="h-3.5 w-3.5" /> Scan description
              </button>
            </div>
          </div>
        </div>

        <div className="card animate-fade-in flex flex-col p-5">
          <SectionHeader title="Inclusive language score" />
          {activeResult ? (
            <>
              <ScoreGauge score={activeResult.score} />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 p-3 text-center">
                  <p className="text-xs font-medium text-slate-500">Flags</p>
                  <p className="mt-1 text-xl font-bold text-amber-600">
                    {activeResult.totalFlags}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 p-3 text-center">
                  <p className="text-xs font-medium text-slate-500">Categories</p>
                  <p className="mt-1 text-xl font-bold text-brand-600">
                    {activeResult.findings.length}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <FileSearch className="h-6 w-6" />
              </span>
              <p className="mt-3 text-sm font-medium text-slate-500">
                Scan a description to see its score.
              </p>
            </div>
          )}
        </div>
      </div>

      {!activeResult && (
        <div className="card animate-fade-in flex flex-col items-center justify-center p-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <ScanLine className="h-6 w-6" />
          </span>
          <p className="mt-4 font-semibold text-slate-900">
            Ready when you are
          </p>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Paste a job description (or load the sample) and hit{" "}
            <span className="font-semibold">Scan description</span> to review it
            for inclusive language.
          </p>
        </div>
      )}

      {activeResult && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={<ShieldCheck className="h-5 w-5" />}
              label="Inclusive language score"
              value={`${activeResult.score}/100`}
              sub={
                activeResult.score >= 80
                  ? "Inclusive"
                  : activeResult.score >= 50
                  ? "Needs review"
                  : "At risk"
              }
              accent={
                activeResult.score >= 80
                  ? "emerald"
                  : activeResult.score >= 50
                  ? "amber"
                  : "brand"
              }
            />
            <StatCard
              icon={<AlertTriangle className="h-5 w-5" />}
              label="Potential issues flagged"
              value={`${activeResult.totalFlags}`}
              sub={`Across ${activeResult.findings.length} categories`}
              accent="amber"
            />
            <StatCard
              icon={<ScanLine className="h-5 w-5" />}
              label="Rules applied"
              value="6"
              sub="Transparent, rule-based checks"
              accent="brand"
            />
          </div>

          {result && result.findings.length > 0 && (
            <div className="card animate-fade-in p-5">
              <SectionHeader
                title="Analyzed description"
                subtitle="Flagged wording is highlighted below."
              />
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <p
                  className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html: highlightExclusions(draft, result.findings),
                  }}
                />
              </div>
            </div>
          )}

          {result && result.findings.length === 0 ? (
            <div className="card animate-fade-in flex items-center gap-3 border-emerald-100 bg-emerald-50/40 p-5">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900">
                  No exclusionary wording detected
                </p>
                <p className="text-sm text-slate-600">
                  Based on the current rule set. Keep using clear, skills-based,
                  inclusive language.
                </p>
              </div>
            </div>
          ) : (
            <div className="card animate-fade-in p-5">
              <SectionHeader
                title="Findings"
                subtitle="Each flag explains why it may exclude applicants and offers a better alternative."
                action={
                  activeResult.findings.length > 0 ? (
                    <span className="hidden text-xs font-medium text-slate-400 sm:block">
                      {activeResult.findings.length} categories ·{" "}
                      {activeResult.totalFlags} flags
                    </span>
                  ) : undefined
                }
              />
              <div className="space-y-3">
                {activeResult.findings.map((f) => (
                  <FindingCard key={f.rule.id} finding={f} />
                ))}
              </div>
            </div>
          )}

          <div className="card animate-fade-in p-5">
            <SectionHeader
              title="Improvement suggestions"
              subtitle="Best practices for inclusive, skills-based hiring posts."
            />
            <ul className="space-y-2.5">
              {checklist.map((item) => (
                <ChecklistSuggestionRow
                  key={item.id}
                  title={item.title}
                  detail={item.detail}
                  applied={item.applied}
                />
              ))}
            </ul>
          </div>

          <RevisedDescriptionCard revised={activeResult.revisedDescription} />
        </>
      )}
    </div>
  );
}

function toScanResult(last: PersistedLastResult): ScanResult | null {
  if (!last) return null;
  return {
    findings: [],
    score: last.score,
    totalFlags: last.totalFlags,
    revisedDescription: last.revised,
  };
}
