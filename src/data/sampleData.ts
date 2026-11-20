import type {
  ActivityItem,
  Course,
  Notification,
  Opportunity,
  SkillItem,
} from "../types";

export const sampleSkills: SkillItem[] = [
  { name: "TypeScript", level: 78, category: "Engineering", trending: true },
  { name: "React", level: 82, category: "Engineering", trending: true },
  { name: "Accessibility (WCAG)", level: 64, category: "Inclusive Design", trending: true },
  { name: "Data Analysis", level: 58, category: "Data", trending: false },
  { name: "SQL", level: 71, category: "Data", trending: false },
  { name: "Cloud (AWS)", level: 45, category: "Infrastructure", trending: true },
  { name: "Communication", level: 88, category: "Soft Skills", trending: false },
  { name: "Project Management", level: 67, category: "Soft Skills", trending: false },
];

export const sampleOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Frontend Engineer",
    company: "Northwind Labs",
    location: "Remote",
    remote: true,
    match: 92,
    tags: ["React", "TypeScript", "Accessibility"],
    salary: "$110k–$140k",
  },
  {
    id: "opp-2",
    title: "Inclusive UX Designer",
    company: "Civic Bridge",
    location: "Austin, TX",
    remote: true,
    match: 88,
    tags: ["Accessibility", "Figma", "Research"],
    salary: "$95k–$120k",
  },
  {
    id: "opp-3",
    title: "Data Analyst",
    company: "Greenfield Health",
    location: "Boston, MA",
    remote: false,
    match: 76,
    tags: ["SQL", "Python", "Tableau"],
    salary: "$85k–$105k",
  },
  {
    id: "opp-4",
    title: "Cloud Support Engineer",
    company: "Stackline",
    location: "Remote",
    remote: true,
    match: 71,
    tags: ["AWS", "Linux", "Networking"],
    salary: "$80k–$100k",
  },
  {
    id: "opp-5",
    title: "Product Manager (Accessibility)",
    company: "OpenGov",
    location: "Washington, DC",
    remote: false,
    match: 83,
    tags: ["WCAG", "Roadmapping", "Stakeholders"],
    salary: "$120k–$150k",
  },
];

export const sampleCourses: Course[] = [
  {
    id: "course-1",
    title: "WCAG 2.2 in Practice",
    provider: "Inclusive Tech",
    category: "Inclusive Design",
    progress: 64,
    durationHours: 8,
    difficulty: "Intermediate",
    rating: 4.8,
  },
  {
    id: "course-2",
    title: "AWS Certified Cloud Practitioner",
    provider: "Cloud Academy",
    category: "Infrastructure",
    progress: 32,
    durationHours: 24,
    difficulty: "Beginner",
    rating: 4.6,
  },
  {
    id: "course-3",
    title: "Advanced TypeScript Patterns",
    provider: "Frontend Masters",
    category: "Engineering",
    progress: 90,
    durationHours: 6,
    difficulty: "Advanced",
    rating: 4.9,
  },
  {
    id: "course-4",
    title: "Data Storytelling with Tableau",
    provider: "DataCamp",
    category: "Data",
    progress: 12,
    durationHours: 14,
    difficulty: "Beginner",
    rating: 4.4,
  },
];

export const sampleActivity: ActivityItem[] = [
  {
    id: "act-1",
    type: "skill",
    title: "Skill assessed: Accessibility (WCAG)",
    detail: "Level updated to 64% — up 8 points this month",
    timestamp: "2h ago",
  },
  {
    id: "act-2",
    type: "course",
    title: "Completed module: ARIA Landmarks",
    detail: "WCAG 2.2 in Practice · 64% complete",
    timestamp: "Yesterday",
  },
  {
    id: "act-3",
    type: "opportunity",
    title: "Saved opportunity: Inclusive UX Designer",
    detail: "Civic Bridge · 88% match",
    timestamp: "2 days ago",
  },
  {
    id: "act-4",
    type: "achievement",
    title: "Badge earned: Inclusive Design Advocate",
    detail: "Awarded for 3 accessibility courses completed",
    timestamp: "4 days ago",
  },
];

export const sampleNotifications: Notification[] = [
  {
    id: "n-1",
    title: "New opportunity matched",
    detail: "Inclusive UX Designer at Civic Bridge — 88% match",
    time: "1h ago",
    read: false,
  },
  {
    id: "n-2",
    title: "Course reminder",
    detail: "Pick up WCAG 2.2 in Practice where you left off",
    time: "5h ago",
    read: false,
  },
  {
    id: "n-3",
    title: "Weekly digest ready",
    detail: "Your career readiness report is available",
    time: "1d ago",
    read: true,
  },
];

export const weeklyLearningData = [
  { day: "Mon", hours: 1.2 },
  { day: "Tue", hours: 0.8 },
  { day: "Wed", hours: 2.1 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 0.5 },
  { day: "Sat", hours: 2.8 },
  { day: "Sun", hours: 1.6 },
];
