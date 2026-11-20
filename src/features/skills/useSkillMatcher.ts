import type { Career, LearningActivity, UserSkill } from "./types";
import { learningCatalog, skillWhyItMatters } from "./careers";

export interface MatchedSkill {
  name: string;
  why: string;
}

export interface MissingSkill {
  name: string;
  why: string;
  activities: LearningActivity[];
}

export interface MatchResult {
  matchPercent: number;
  matched: MatchedSkill[];
  missing: MissingSkill[];
  career: Career | null;
}

/**
 * Transparent demo logic:
 * match% = (required skills the user already has / total required skills) * 100
 */
export function computeMatch(
  userSkills: UserSkill[],
  career: Career | null
): MatchResult {
  if (!career) {
    return { matchPercent: 0, matched: [], missing: [], career: null };
  }

  const userNames = new Set(userSkills.map((s) => s.name.toLowerCase()));

  const matched: MatchedSkill[] = [];
  const missing: MissingSkill[] = [];

  for (const required of career.requiredSkills) {
    const why =
      skillWhyItMatters[required] ??
      `This is a core skill employers expect for ${career.title} roles.`;

    if (userNames.has(required.toLowerCase())) {
      matched.push({ name: required, why });
    } else {
      missing.push({
        name: required,
        why,
        activities: learningCatalog.filter(
          (a) => a.skill.toLowerCase() === required.toLowerCase()
        ),
      });
    }
  }

  const matchPercent = career.requiredSkills.length
    ? Math.round((matched.length / career.requiredSkills.length) * 100)
    : 0;

  return { matchPercent, matched, missing, career };
}
