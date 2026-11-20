import { Gauge, RotateCcw } from "lucide-react";
import { useSkillProfile } from "./useSkillProfile";
import { computeMatch } from "./useSkillMatcher";
import { careers } from "./careers";
import { SkillProfileSection } from "./SkillProfileSection";
import { CareerSelector } from "./CareerSelector";
import { MatchResults } from "./MatchResults";
import { RoadmapSection } from "./RoadmapSection";

const careersById = new Map(careers.map((c) => [c.id, c]));

export default function SkillPath() {
  const {
    state,
    addSkill,
    removeSkill,
    selectCareer,
    toggleActivity,
    resetProfile,
  } = useSkillProfile();

  const career =
    state.selectedCareer !== null
      ? (careersById.get(state.selectedCareer) ?? null)
      : null;

  const match = computeMatch(state.skills, career);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-bold text-slate-900">
            <Gauge className="h-7 w-7 text-brand-600" /> Skill Matching
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Map your skills to real careers, see your gaps, and follow a
            roadmap to close them.
          </p>
        </div>
        <button onClick={resetProfile} className="btn-outline text-xs">
          <RotateCcw className="h-3.5 w-3.5" /> Reset demo data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <SkillProfileSection
            skills={state.skills}
            onAdd={addSkill}
            onRemove={removeSkill}
          />
          <CareerSelector
            selected={state.selectedCareer}
            onSelect={selectCareer}
          />
        </div>

        <MatchResults result={match} />
      </div>

      <RoadmapSection
        gaps={match.missing}
        completedIds={state.completedActivityIds}
        onToggle={toggleActivity}
      />
    </div>
  );
}
