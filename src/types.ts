export type PageId =
  | "dashboard"
  | "skills"
  | "fairness"
  | "learning"
  | "settings";

export interface SkillItem {
  name: string;
  level: number; // 0-100
  category: string;
  trending: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  match: number; // 0-100
  tags: string[];
  salary: string;
  viewedAt?: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  category: string;
  progress: number; // 0-100
  durationHours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

export interface ActivityItem {
  id: string;
  type: "skill" | "course" | "opportunity" | "achievement";
  title: string;
  detail: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

export interface UserPreferences {
  fullName: string;
  role: string;
  notificationsEnabled: boolean;
  weeklyDigest: boolean;
  theme: "light" | "system";
  goalHoursPerWeek: number;
}
