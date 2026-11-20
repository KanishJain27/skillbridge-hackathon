import type { Career, LearningActivity, SkillCategory, UserSkill } from "./types";

export const skillCategories: SkillCategory[] = [
  "Engineering",
  "Data",
  "Business",
  "Design",
  "Soft Skills",
];

export const suggestedSkills: UserSkill[] = [
  { id: "sug-sql", name: "SQL", category: "Data" },
  { id: "sug-python", name: "Python", category: "Data" },
  { id: "sug-excel", name: "Excel", category: "Data" },
  { id: "sug-tableau", name: "Tableau", category: "Data" },
  { id: "sug-js", name: "JavaScript", category: "Engineering" },
  { id: "sug-ts", name: "TypeScript", category: "Engineering" },
  { id: "sug-react", name: "React", category: "Engineering" },
  { id: "sug-html", name: "HTML/CSS", category: "Engineering" },
  { id: "sug-git", name: "Git", category: "Engineering" },
  { id: "sug-testing", name: "Unit Testing", category: "Engineering" },
  { id: "sug-algorithms", name: "Data Structures", category: "Engineering" },
  { id: "sug-api", name: "REST APIs", category: "Engineering" },
  { id: "sug-comm", name: "Communication", category: "Soft Skills" },
  { id: "sug-stake", name: "Stakeholder Management", category: "Soft Skills" },
  { id: "sug-present", name: "Presentation Skills", category: "Soft Skills" },
  { id: "sug-req", name: "Requirements Gathering", category: "Business" },
  { id: "sug-process", name: "Process Mapping", category: "Business" },
  { id: "sug-agile", name: "Agile Basics", category: "Business" },
  { id: "sug-figma", name: "Figma", category: "Design" },
  { id: "sug-ux", name: "UX Research", category: "Design" },
];

export const careers: Career[] = [
  {
    id: "junior-data-analyst",
    title: "Junior Data Analyst",
    description:
      "Turn raw data into insights using queries, dashboards, and clear reporting.",
    icon: "BarChart3",
    requiredSkills: ["SQL", "Excel", "Data Visualization", "Python", "Communication"],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description:
      "Build responsive, accessible user interfaces for the web.",
    icon: "Layout",
    requiredSkills: ["HTML/CSS", "JavaScript", "React", "Git", "TypeScript"],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    description:
      "Design, build, and maintain reliable software systems end to end.",
    icon: "Code2",
    requiredSkills: ["Data Structures", "TypeScript", "Git", "Unit Testing", "REST APIs"],
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    description:
      "Bridge business needs and technical teams through clear requirements.",
    icon: "Briefcase",
    requiredSkills: ["Requirements Gathering", "Process Mapping", "Excel", "Stakeholder Management", "Communication"],
  },
];

export const learningCatalog: LearningActivity[] = [
  // SQL
  { id: "la-sql-1", skill: "SQL", title: "SQL Foundations: querying tables", provider: "OpenPath Library", durationHours: 4, level: "Beginner" },
  { id: "la-sql-2", skill: "SQL", title: "Joins, aggregations & subqueries", provider: "OpenPath Library", durationHours: 6, level: "Intermediate" },
  { id: "la-sql-3", skill: "SQL", title: "Query optimization workshop", provider: "OpenPath Library", durationHours: 8, level: "Advanced" },
  // Excel
  { id: "la-excel-1", skill: "Excel", title: "Spreadsheets essentials", provider: "OpenPath Library", durationHours: 3, level: "Beginner" },
  { id: "la-excel-2", skill: "Excel", title: "Pivot tables & lookup functions", provider: "OpenPath Library", durationHours: 5, level: "Intermediate" },
  // Data Visualization
  { id: "la-dviz-1", skill: "Data Visualization", title: "Chart choice & storytelling basics", provider: "OpenPath Library", durationHours: 3, level: "Beginner" },
  { id: "la-dviz-2", skill: "Data Visualization", title: "Building dashboards in Tableau", provider: "OpenPath Library", durationHours: 6, level: "Intermediate" },
  // Python
  { id: "la-py-1", skill: "Python", title: "Python for absolute beginners", provider: "OpenPath Library", durationHours: 6, level: "Beginner" },
  { id: "la-py-2", skill: "Python", title: "Pandas for data analysis", provider: "OpenPath Library", durationHours: 8, level: "Intermediate" },
  // HTML/CSS
  { id: "la-html-1", skill: "HTML/CSS", title: "Semantic HTML & modern CSS", provider: "OpenPath Library", durationHours: 5, level: "Beginner" },
  { id: "la-html-2", skill: "HTML/CSS", title: "Responsive layouts with Flexbox & Grid", provider: "OpenPath Library", durationHours: 6, level: "Intermediate" },
  // JavaScript
  { id: "la-js-1", skill: "JavaScript", title: "JavaScript fundamentals", provider: "OpenPath Library", durationHours: 6, level: "Beginner" },
  { id: "la-js-2", skill: "JavaScript", title: "DOM, events & async patterns", provider: "OpenPath Library", durationHours: 8, level: "Intermediate" },
  { id: "la-js-3", skill: "JavaScript", title: "Advanced closures & modules", provider: "OpenPath Library", durationHours: 7, level: "Advanced" },
  // React
  { id: "la-react-1", skill: "React", title: "React components & props", provider: "OpenPath Library", durationHours: 5, level: "Beginner" },
  { id: "la-react-2", skill: "React", title: "State, hooks & data fetching", provider: "OpenPath Library", durationHours: 8, level: "Intermediate" },
  // Git
  { id: "la-git-1", skill: "Git", title: "Version control basics", provider: "OpenPath Library", durationHours: 2, level: "Beginner" },
  { id: "la-git-2", skill: "Git", title: "Branching & collaboration workflows", provider: "OpenPath Library", durationHours: 4, level: "Intermediate" },
  // TypeScript
  { id: "la-ts-1", skill: "TypeScript", title: "TypeScript for JavaScript devs", provider: "OpenPath Library", durationHours: 4, level: "Beginner" },
  { id: "la-ts-2", skill: "TypeScript", title: "Generics & advanced types", provider: "OpenPath Library", durationHours: 7, level: "Advanced" },
  // Data Structures
  { id: "la-ds-1", skill: "Data Structures", title: "Arrays, maps & sets in practice", provider: "OpenPath Library", durationHours: 4, level: "Beginner" },
  { id: "la-ds-2", skill: "Data Structures", title: "Trees, graphs & Big-O thinking", provider: "OpenPath Library", durationHours: 9, level: "Advanced" },
  // Unit Testing
  { id: "la-test-1", skill: "Unit Testing", title: "Testing basics: what & why", provider: "OpenPath Library", durationHours: 3, level: "Beginner" },
  { id: "la-test-2", skill: "Unit Testing", title: "Writing testable code", provider: "OpenPath Library", durationHours: 6, level: "Intermediate" },
  // REST APIs
  { id: "la-api-1", skill: "REST APIs", title: "HTTP & REST concepts", provider: "OpenPath Library", durationHours: 3, level: "Beginner" },
  { id: "la-api-2", skill: "REST APIs", title: "Designing & consuming APIs", provider: "OpenPath Library", durationHours: 6, level: "Intermediate" },
  // Requirements Gathering
  { id: "la-req-1", skill: "Requirements Gathering", title: "Interviewing stakeholders", provider: "OpenPath Library", durationHours: 3, level: "Beginner" },
  { id: "la-req-2", skill: "Requirements Gathering", title: "Writing clear user stories", provider: "OpenPath Library", durationHours: 5, level: "Intermediate" },
  // Process Mapping
  { id: "la-proc-1", skill: "Process Mapping", title: "Intro to process flows", provider: "OpenPath Library", durationHours: 3, level: "Beginner" },
  { id: "la-proc-2", skill: "Process Mapping", title: "Bottleneck analysis workshop", provider: "OpenPath Library", durationHours: 5, level: "Intermediate" },
  // Stakeholder Management
  { id: "la-stake-1", skill: "Stakeholder Management", title: "Mapping your stakeholders", provider: "OpenPath Library", durationHours: 2, level: "Beginner" },
  { id: "la-stake-2", skill: "Stakeholder Management", title: "Handling competing priorities", provider: "OpenPath Library", durationHours: 4, level: "Intermediate" },
  // Communication
  { id: "la-comm-1", skill: "Communication", title: "Clear writing for technical teams", provider: "OpenPath Library", durationHours: 2, level: "Beginner" },
  { id: "la-comm-2", skill: "Communication", title: "Presenting insights with confidence", provider: "OpenPath Library", durationHours: 4, level: "Intermediate" },
];

export const skillWhyItMatters: Record<string, string> = {
  SQL: "Nearly every analyst role expects you to query databases directly — it's the #1 screened-for skill in job postings.",
  Excel: "Spreadsheets are still the everyday tool for quick analysis, reporting, and sharing results with non-technical teams.",
  "Data Visualization": "Insights only matter if others understand them — charts and dashboards are how your work gets seen.",
  Python: "Automates repetitive analysis and unlocks larger datasets than spreadsheets can handle.",
  "HTML/CSS": "The foundation of every web interface; interviews and take-home tasks start here.",
  JavaScript: "The language of the browser — essential to build any interactive frontend.",
  React: "The most in-demand frontend framework and a common requirement in modern job specs.",
  Git: "Every engineering team collaborates through version control; it's assumed, not taught, on the job.",
  TypeScript: "Increasingly the default in job postings; catches bugs before they ship.",
  "Data Structures": "Core interview topic and the basis for writing efficient, scalable code.",
  "Unit Testing": "Employers look for engineers who keep systems reliable as teams grow.",
  "REST APIs": "Modern applications are built on APIs — you'll consume and design them daily.",
  "Requirements Gathering": "The heart of the analyst role: turning vague needs into clear, buildable specs.",
  "Process Mapping": "Helps you spot inefficiencies and communicate how work actually flows.",
  "Stakeholder Management": "Analysts succeed by aligning people with different priorities.",
  Communication: "Whether writing reports or presenting findings, clear communication multiplies the value of your technical work.",
};
