import { GraduationCap, Plus, Search } from "lucide-react";
import { useState } from "react";
import { sampleCourses } from "../data/sampleData";
import { ProgressBar, SectionHeader, StatCard } from "./ui";
import { LearningBarChart } from "./charts";

export function LearningPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const categories = ["All", ...new Set(sampleCourses.map((c) => c.category))];
  const filtered = sampleCourses.filter((c) => {
    const matchesCat = filter === "All" || c.category === filter;
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const inProgress = sampleCourses.filter((c) => c.progress < 100).length;
  const completed = sampleCourses.filter((c) => c.progress === 100).length;
  const avgProgress = Math.round(
    sampleCourses.reduce((s, c) => s + c.progress, 0) / sampleCourses.length
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Learning</h1>
        <p className="text-sm text-slate-500">
          Track your courses and reach your weekly learning goal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={<GraduationCap className="h-5 w-5" />}
          label="Courses in progress"
          value={`${inProgress}`}
          accent="brand"
        />
        <StatCard
          icon={<GraduationCap className="h-5 w-5" />}
          label="Completed"
          value={`${completed}`}
          accent="emerald"
        />
        <StatCard
          icon={<GraduationCap className="h-5 w-5" />}
          label="Avg. progress"
          value={`${avgProgress}%`}
          accent="accent"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card animate-fade-in p-5 lg:col-span-2">
          <SectionHeader
            title="Your courses"
            action={
              <button className="btn-primary text-xs">
                <Plus className="h-4 w-4" /> Add course
              </button>
            }
          />
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses…"
                className="input pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`badge px-3 py-1.5 text-xs font-semibold transition-colors ${
                    filter === c
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-100 p-4 transition-shadow hover:shadow-cardhover"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{c.title}</p>
                    <p className="text-xs text-slate-500">
                      {c.provider} · {c.category} · {c.durationHours}h ·{" "}
                      {c.difficulty}
                    </p>
                  </div>
                  <span className="badge bg-amber-50 text-amber-700">
                    ★ {c.rating}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar value={c.progress} />
                  <span className="w-10 text-right text-xs font-medium text-slate-500">
                    {c.progress}%
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="btn-primary text-xs">
                    {c.progress === 100 ? "Review" : "Continue"}
                  </button>
                  <button className="btn-outline text-xs">Details</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">
                No courses match your search.
              </p>
            )}
          </div>
        </div>

        <div className="card animate-fade-in p-5">
          <SectionHeader title="Weekly activity" />
          <LearningBarChart />
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">
              Recommended for you
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Based on your skill gaps in Cloud and Data Analysis.
            </p>
            <button className="btn-outline mt-3 w-full text-xs">
              Browse recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
