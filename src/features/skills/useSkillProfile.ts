import { useCallback, useEffect, useState } from "react";
import type { SkillProfileState, UserSkill } from "./types";

const STORAGE_KEY = "openpath:skill-profile";

const defaultState: SkillProfileState = {
  skills: [
    { id: "seed-1", name: "Excel", category: "Data" },
    { id: "seed-2", name: "HTML/CSS", category: "Engineering" },
    { id: "seed-3", name: "Communication", category: "Soft Skills" },
  ],
  selectedCareer: null,
  completedActivityIds: [],
};

function load(): SkillProfileState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...defaultState, ...JSON.parse(raw) };
    }
  } catch {
    /* ignore */
  }
  return defaultState;
}

export function useSkillProfile() {
  const [state, setState] = useState<SkillProfileState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const addSkill = useCallback((name: string, category: string) => {
    setState((prev) => {
      const exists = prev.skills.some(
        (s) => s.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) return prev;
      const skill: UserSkill = {
        id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: name.trim(),
        category: category as UserSkill["category"],
      };
      return { ...prev, skills: [...prev.skills, skill] };
    });
  }, []);

  const removeSkill = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  }, []);

  const selectCareer = useCallback((careerId: string | null) => {
    setState((prev) => ({
      ...prev,
      selectedCareer: careerId as SkillProfileState["selectedCareer"],
    }));
  }, []);

  const toggleActivity = useCallback((activityId: string) => {
    setState((prev) => {
      const done = prev.completedActivityIds.includes(activityId);
      return {
        ...prev,
        completedActivityIds: done
          ? prev.completedActivityIds.filter((id) => id !== activityId)
          : [...prev.completedActivityIds, activityId],
      };
    });
  }, []);

  const resetProfile = useCallback(() => {
    setState(defaultState);
  }, []);

  return {
    state,
    addSkill,
    removeSkill,
    selectCareer,
    toggleActivity,
    resetProfile,
  };
}
