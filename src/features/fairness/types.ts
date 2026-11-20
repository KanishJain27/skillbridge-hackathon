export type Severity = "high" | "medium" | "low";

export type FindingCategory =
  | "language"
  | "age"
  | "culture"
  | "gendered"
  | "degree"
  | "accessibility";

export interface FairnessRule {
  id: string;
  category: FindingCategory;
  severity: Severity;
  label: string;
  patterns: RegExp[];
  why: string;
  suggestion: string;
  rewrite: (original: string) => string;
}

export interface Finding {
  rule: FairnessRule;
  matches: { text: string; index: number }[];
}

export interface ScanResult {
  findings: Finding[];
  score: number;
  totalFlags: number;
  revisedDescription: string;
}

export interface ChecklistSuggestion {
  id: string;
  title: string;
  detail: string;
  applied: boolean;
}
