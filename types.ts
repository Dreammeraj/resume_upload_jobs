export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // e.g., "Full-time", "Contract"
  workMode: string; // e.g., "Remote", "Hybrid", "On-site"
  salary: string;
  matchScore: number;
  matchReason: string;
  postedAt: string;
}

export interface ResumeAnalysis {
  candidateName: string;
  professionalSummary: string;
  extractedSkills: string[];
  recommendedJobs: Job[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
