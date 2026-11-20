export type SkillCategory =
  | "Engineering"
  | "Data"
  | "Business"
  | "Design"
  | "Soft Skills";

export interface UserSkill {
  id: string;
  name: string;
  category: SkillCategory;
}

export type CareerId =
  | "junior-data-analyst"
  | "frontend-developer"
  | "software-engineer"
  | "business-analyst";

export interface Career {
  id: CareerId;
  title: string;
  description: string;
  icon: string;
  requiredSkills: string[];
}

export type RoadmapLevel = "Beginner" | "Intermediate" | "Advanced";

export interface LearningActivity {
  id: string;
  skill: string;
  title: string;
  provider: string;
  durationHours: number;
  level: RoadmapLevel;
}

export interface SkillProfileState {
  skills: UserSkill[];
  selectedCareer: CareerId | null;
  completedActivityIds: string[];
}
