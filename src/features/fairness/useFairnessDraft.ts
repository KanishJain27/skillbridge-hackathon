import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "openpath:fairness:draft";
const LAST_RESULT_KEY = "openpath:fairness:lastResult";

export interface PersistedLastResult {
  score: number;
  totalFlags: number;
  revised: string;
}

function loadString(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useFairnessDraft() {
  const [draft, setDraft] = useState<string>("");
  const [lastResult, setLastResult] = useState<PersistedLastResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedDraft = loadString(STORAGE_KEY);
    const savedResult = loadString(LAST_RESULT_KEY);
    if (savedDraft) setDraft(savedDraft);
    if (savedResult) {
      try {
        setLastResult(JSON.parse(savedResult));
      } catch {
        /* ignore */
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, draft);
    } catch {
      /* ignore */
    }
  }, [draft, loaded]);

  const persistResult = useCallback((result: PersistedLastResult) => {
    setLastResult(result);
    try {
      localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
    } catch {
      /* ignore */
    }
  }, []);

  const reset = useCallback(() => {
    setDraft("");
    setLastResult(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LAST_RESULT_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { draft, setDraft, lastResult, persistResult, reset, loaded };
}
