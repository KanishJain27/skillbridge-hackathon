import {
  ArrowRight,
  Award,
  Briefcase,
  Compass,
  Gauge,
  GraduationCap,
  MapPin,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { ActivityItem, Course, Opportunity, UserPreferences } from "../types";
import {
  sampleActivity,
  sampleCourses,
  sampleOpportunities,
  sampleSkills,
} from "../data/sampleData";
import { ProgressBar, SectionHeader, StatCard } from "./ui";
import { CategoryRadar, LearningBarChart, RadialReadiness } from "./charts";

const activityIcon: Record<ActivityItem["type"], LucideIcon> = {
  skill: TrendingUp,
  course: GraduationCap,
  opportunity: Briefcase,
  achievement: Award,
};

export function Dashboard({ preferences }: { preferences: UserPreferences }) {
  const readiness = 74;
  const topSkills = [...sampleSkills].sort((a, b) => b.level - a.level).slice(0, 6);
  const recommendedCourses = sampleCourses
    .filter((c) => c.progress < 100)
    .slice(0, 3);
  const recommendedOpps = sampleOpportunities.slice(0, 3);
  const nextSteps = [
    "Complete the WCAG 2.2 in Practice course to unlock accessibility roles.",
    "Take the AWS Cloud Practitioner assessment to raise infrastructure readiness.",
    "Review 3 exclusionary language flags in the Inclusive Hiring tool.",
  ];

  const radarCategories = [
    { label: "Eng.", value: 80 },
    { label: "Data", value: 64 },
    { label: "Incl.", value: 64 },
    { label: "Cloud", value: 45 },
    { label: "Soft", value: 78 },
  ];

  return (
    <div className="space-y-6">
      <div className="card animate-fade-in overflow-hidden">
        <div className="relative bg-gradient-to-br from-brand-600 via-brand-600 to-accent-600 p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Sparkles className="h-4 w-4" /> Welcome to OpenPath
              </p>
              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Hello, {preferences.fullName.split(" ")[0]} 👋
              </h1>
              <p className="mt-2 max-w-xl text-sm text-white/85">
                You're <span className="font-semibold">{readiness}%</span> career-ready.
                Keep your momentum — finish your accessibility course to unlock
                three new inclusive roles this week.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="btn bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-white/90">
                  <Compass className="h-4 w-4" /> Explore matches
                </button>
                <button className="btn border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
                  <GraduationCap className="h-4 w-4" /> Resume learning
                </button>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <RadialReadiness value={readiness} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Gauge className="h-5 w-5" />}
          label="Career readiness"
          value={`${readiness}%`}
          sub="↑ 6% vs last week"
          accent="brand"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Skills identified"
          value={`${sampleSkills.length}`}
          sub="3 trending in your market"
          accent="accent"
        />
        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="Recommended roles"
          value={`${sampleOpportunities.length}`}
          sub="Avg. 82% match"
          accent="emerald"
        />
        <StatCard
          icon={<GraduationCap className="h-5 w-5" />}
          label="Courses in progress"
          value={`${recommendedCourses.length}`}
          sub="2.6h studied this week"
          accent="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card animate-fade-in p-5 lg:col-span-2">
          <SectionHeader
            title="Recommended next steps"
            subtitle="Guided actions to grow your readiness"
            action={
              <button className="btn-ghost text-sm text-brand-600">
                View all
              </button>
            }
          />
          <ul className="space-y-3">
            {nextSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {i + 1}
                </span>
                <p className="flex-1 text-sm text-slate-700">{step}</p>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs font-medium text-slate-500">Goal / week</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {preferences.goalHoursPerWeek}h
              </p>
              <ProgressBar className="mt-3" value={43} />
              <p className="mt-2 text-xs text-slate-500">2.6h completed</p>
            </div>
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs font-medium text-slate-500">Badges earned</p>
              <p className="mt-1 text-xl font-bold text-slate-900">5</p>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Award
                    key={i}
                    className="h-4 w-4 text-accent-500"
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 p-4">
              <p className="text-xs font-medium text-slate-500">Streak</p>
              <p className="mt-1 text-xl font-bold text-slate-900">12 days</p>
              <p className="mt-2 text-xs text-emerald-600">
                Keep it going!
              </p>
            </div>
          </div>
        </div>

        <div className="card animate-fade-in p-5">
          <SectionHeader title="Skill overview" subtitle="By category" />
          <CategoryRadar categories={radarCategories} />
          <div className="mt-4 space-y-2.5">
            {topSkills.slice(0, 4).map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{s.name}</span>
                  <span className="text-slate-500">{s.level}%</span>
                </div>
                <ProgressBar className="mt-1.5" value={s.level} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card animate-fade-in p-5 lg:col-span-2">
          <SectionHeader
            title="Recommended opportunities"
            subtitle="Based on your skills and goals"
            action={
              <button className="btn-ghost text-sm text-brand-600">
                View all
              </button>
            }
          />
          <div className="space-y-3">
            {recommendedOpps.map((o) => (
              <OpportunityRow key={o.id} opp={o} />
            ))}
          </div>
        </div>

        <div className="card animate-fade-in p-5">
          <SectionHeader title="Learning activity" subtitle="Past 7 days" />
          <LearningBarChart />
          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Continue learning
            </p>
            <div className="space-y-3">
              {recommendedCourses.map((c) => (
                <CourseRow key={c.id} course={c} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-fade-in p-5">
        <SectionHeader
          title="Recent activity"
          subtitle="Your latest progress and milestones"
        />
        <div className="space-y-2">
          {sampleActivity.map((a) => {
            const Icon = activityIcon[a.type];
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-50"
              >
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-500">{a.detail}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-slate-400">
                  {a.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OpportunityRow({ opp }: { opp: Opportunity }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 transition-shadow hover:shadow-cardhover sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Briefcase className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold text-slate-900">{opp.title}</p>
          <p className="text-sm text-slate-500">
            {opp.company} · {opp.salary}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3" />
              {opp.remote ? "Remote" : opp.location}
            </span>
            {opp.tags.slice(0, 3).map((t) => (
              <span key={t} className="badge bg-slate-100 text-slate-600">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="text-xs text-slate-500">Match</p>
          <p className="text-lg font-bold text-brand-600">{opp.match}%</p>
        </div>
        <button className="btn-outline text-xs">
          View <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function CourseRow({ course }: { course: Course }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
        <GraduationCap className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{course.title}</p>
        <p className="text-xs text-slate-500">
          {course.provider} · {course.durationHours}h
        </p>
        <ProgressBar className="mt-1.5" value={course.progress} />
      </div>
      <span className="text-xs font-medium text-slate-500">
        {course.progress}%
      </span>
    </div>
  );
}

