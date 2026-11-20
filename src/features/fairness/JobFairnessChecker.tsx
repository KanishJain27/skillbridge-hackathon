import { ShieldCheck } from "lucide-react";
import { FeaturePlaceholder } from "../../components/FeaturePlaceholder";

export function JobFairnessChecker() {
  return (
    <FeaturePlaceholder
      icon={<ShieldCheck className="h-7 w-7" />}
      title="Inclusive Hiring"
      description="Analyze job descriptions for exclusionary language and improve inclusive hiring practices."
      owner="Team Member 3 — Inclusive Hiring"
      bulletPoints={[
        "Paste a job description to scan for biased or exclusionary language.",
        "Receive actionable suggestions to make postings more inclusive.",
        "Score postings on an inclusiveness index.",
        "Track improvements across your hiring pipeline.",
      ]}
      fileLocation="src/features/fairness/JobFairnessChecker.tsx"
    />
  );
}
