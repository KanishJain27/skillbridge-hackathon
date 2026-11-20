import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { LearningPage } from "./components/LearningPage";
import { SettingsPage } from "./components/SettingsPage";
import SkillPath from "./features/skills/SkillPath";
import JobFairnessChecker from "./features/fairness/JobFairnessChecker";
import { usePreferences } from "./hooks/usePreferences";
import type { PageId } from "./types";

export default function App() {
  const [page, setPage] = useState<PageId>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { preferences, update, loaded } = usePreferences();

  const navigate = (next: PageId) => {
    setPage(next);
    setMobileNavOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };

  useEffect(() => {
    document.title = `OpenPath — ${labelFor(page)}`;
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        current={page}
        onNavigate={navigate}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />
      <div className="lg:pl-72">
        <Header
          preferences={preferences}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {!loaded ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
            </div>
          ) : (
            <div key={page} className="animate-fade-in">
              {renderPage(page, preferences, update)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function renderPage(
  page: PageId,
  preferences: ReturnType<typeof usePreferences>["preferences"],
  update: ReturnType<typeof usePreferences>["update"]
) {
  switch (page) {
    case "dashboard":
      return <Dashboard preferences={preferences} />;
    case "skills":
      return <SkillPath />;
    case "fairness":
      return <JobFairnessChecker />;
    case "learning":
      return <LearningPage />;
    case "settings":
      return <SettingsPage preferences={preferences} onUpdate={update} />;
    default:
      return <Dashboard preferences={preferences} />;
  }
}

function labelFor(page: PageId): string {
  const labels: Record<PageId, string> = {
    dashboard: "Dashboard",
    skills: "Skill Matching",
    fairness: "Inclusive Hiring",
    learning: "My Learning",
    settings: "Settings",
  };
  return labels[page];
}
