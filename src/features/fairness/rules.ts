import type {
  FairnessRule,
  Finding,
  ScanResult,
  Severity,
} from "./types";

export const fairnessRules: FairnessRule[] = [
  {
    id: "native-speaker",
    category: "language",
    severity: "high",
    label: "Native speaker requirement",
    patterns: [/native english speaker/i, /native speaker/i],
    why: "Asking for a 'native' speaker excludes fluent multilingual applicants and can amount to national-origin discrimination. Fluency and communication ability are what matter.",
    suggestion: "Ask for 'professional working proficiency in English' or 'strong written and verbal communication in English'.",
    rewrite: (o) =>
      o.replace(/native english speaker/gi, "professional English proficiency").replace(/native speaker/gi, "professional English proficiency"),
  },
  {
    id: "young-energetic",
    category: "age",
    severity: "high",
    label: "Age-coded language",
    patterns: [/young and energetic/i, /young and dynamic/i, /recent graduate/i, /digital native/i, /fresh talent/i],
    why: "Phrases like 'young and energetic' or 'digital native' signal an age preference and discourage experienced candidates and older workers.",
    suggestion: "Focus on motivation and capability, e.g. 'driven and collaborative'.",
    rewrite: (o) =>
      o
        .replace(/young and energetic/gi, "motivated and collaborative")
        .replace(/young and dynamic/gi, "motivated and collaborative")
        .replace(/recent graduate/gi, "early-career professional")
        .replace(/digital native/gi, "comfortable working in digital environments")
        .replace(/fresh talent/gi, "emerging professional"),
  },
  {
    id: "rockstar",
    category: "culture",
    severity: "medium",
    label: "Jargon / 'bro-culture' wording",
    patterns: [/\brockstar\b/i, /\bninja\b/i, /\bguru\b/i, /\bsuperhero\b/i, /\bwizard\b/i],
    why: "Terms like 'rockstar' or 'ninja' are informal, gendered in tone, and signal a specific subculture that can alienate qualified applicants.",
    suggestion: "Use clear role-based language, e.g. 'experienced engineer' or 'skilled specialist'.",
    rewrite: (o) =>
      o
        .replace(/\brockstar\b/gi, "experienced")
        .replace(/\bninja\b/gi, "skilled")
        .replace(/\bguru\b/gi, "specialist")
        .replace(/\bsuperhero\b/gi, "key contributor")
        .replace(/\bwizard\b/gi, "expert"),
  },
  {
    id: "he-she",
    category: "gendered",
    severity: "medium",
    label: "Gendered pronouns",
    patterns: [/\bhe\/she\b/i, /\bhe or she\b/i, /\bhis\/her\b/i, /\bhim\/her\b/i],
    why: "Binary pronoun pairs exclude non-binary applicants. The singular 'they' is inclusive and reads more naturally.",
    suggestion: "Use the singular 'they' / 'their' or rewrite to second person ('you will').",
    rewrite: (o) =>
      o
        .replace(/\bhe\/she\b/gi, "they")
        .replace(/\bhe or she\b/gi, "they")
        .replace(/\bhis\/her\b/gi, "their")
        .replace(/\bhim\/her\b/gi, "them"),
  },
  {
    id: "degree-required",
    category: "degree",
    severity: "medium",
    label: "Rigid degree requirement",
    patterns: [/bachelor'?s degree required/i, /4-year degree required/i, /master'?s degree required/i, /must have a degree/i],
    why: "A hard degree barrier excludes skilled candidates with non-traditional paths, bootcamp training, or equivalent experience.",
    suggestion: "Make the degree optional: 'Bachelor's degree or equivalent practical experience'.",
    rewrite: (o) =>
      o
        .replace(/bachelor'?s degree required/gi, "Bachelor's degree or equivalent practical experience")
        .replace(/4-year degree required/gi, "Degree or equivalent practical experience")
        .replace(/master'?s degree required/gi, "Master's degree or equivalent experience")
        .replace(/must have a degree/gi, "Degree or equivalent experience"),
  },
  {
    id: "ableist",
    category: "accessibility",
    severity: "medium",
    label: "Ableist phrasing",
    patterns: [/\bwalk and talk\b/i, /\bstand-up comedian\b/i, /\bable-bodied\b/i, /\bsee and be seen\b/i],
    why: "Metaphors rooted in physical ability can be exclusionary to disabled applicants and aren't necessary to describe the work.",
    suggestion: "Use neutral language describing the actual work style.",
    rewrite: (o) =>
      o
        .replace(/\bwalk and talk\b/gi, "collaborative discussion")
        .replace(/\bstand-up comedian\b/gi, "engaging presenter")
        .replace(/\bable-bodied\b/gi, "fully capable of the role's tasks")
        .replace(/\bsee and be seen\b/gi, "visible and collaborative"),
  },
];

const severityWeight: Record<Severity, number> = {
  high: 18,
  medium: 10,
  low: 5,
};

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findMatches(
  text: string,
  patterns: RegExp[]
): { text: string; index: number }[] {
  const out: { text: string; index: number }[] = [];
  for (const p of patterns) {
    const re = new RegExp(p.source, p.flags.includes("g") ? p.flags : `${p.flags}g`);
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      out.push({ text: m[0], index: m.index });
      if (m.index === re.lastIndex) re.lastIndex++;
    }
  }
  return out;
}

export function scanDescription(raw: string): ScanResult {
  const text = raw.trim();

  const findings: Finding[] = [];
  let penalty = 0;
  let revised = text;

  for (const rule of fairnessRules) {
    const matches = findMatches(text, rule.patterns);
    if (matches.length > 0) {
      findings.push({ rule, matches });
      penalty += severityWeight[rule.severity] * matches.length;
      for (let i = 0; i < matches.length; i++) {
        revised = rule.rewrite(revised);
      }
    }
  }

  const totalFlags = findings.reduce((s, f) => s + f.matches.length, 0);
  const score = Math.max(0, Math.min(100, 100 - penalty));

  return { findings, score, totalFlags, revisedDescription: revised };
}

export function highlightExclusions(
  text: string,
  findings: Finding[]
): string {
  let html = escapeRegex(text);
  const flagged = new Set<string>();
  for (const f of findings) {
    for (const m of f.matches) {
      flagged.add(m.text);
    }
  }
  for (const phrase of flagged) {
    const re = new RegExp(escapeRegex(phrase), "gi");
    html = html.replace(
      re,
      (match) =>
        `<mark class="rounded bg-amber-200/80 px-0.5 font-semibold text-amber-900">${match}</mark>`
    );
  }
  return html;
}
