import { Gauge } from "lucide-react";
import { FeaturePlaceholder } from "../../components/FeaturePlaceholder";

export function SkillPath() {
  return (
    <div>
      <FeaturePlaceholder
        icon={<Gauge className="h-7 w-7" />}
        title="Skill Matching"
        description="Discover career opportunities, identify skill gaps, and get personalized learning recommendations."
        owner="Team Member 2 — Skill Matching"
        bulletPoints={[
          "Compare your skill profile against target roles.",
          "Surface personalized skill-gap recommendations.",
          "Map learning paths to close identified gaps.",
          "Recommend best-fit opportunities by match score.",
        ]}
        fileLocation="src/features/skills/SkillPath.tsx"
      />
    </div>
  );
}

