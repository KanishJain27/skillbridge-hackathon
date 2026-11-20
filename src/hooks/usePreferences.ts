import { useCallback, useEffect, useState } from "react";
import type { UserPreferences } from "../types";

const STORAGE_KEY = "openpath:preferences";

export const defaultPreferences: UserPreferences = {
  fullName: "Jordan Rivera",
  role: "Career Seeker",
  notificationsEnabled: true,
  weeklyDigest: true,
  theme: "light",
  goalHoursPerWeek: 6,
};

export function usePreferences() {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setPreferences({ ...defaultPreferences, ...JSON.parse(raw) });
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const update = useCallback(
    (patch: Partial<UserPreferences>) => {
      setPreferences((prev) => {
        const next = { ...prev, ...patch };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  return { preferences, update, loaded };
}
