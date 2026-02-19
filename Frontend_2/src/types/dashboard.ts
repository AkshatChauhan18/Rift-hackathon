export type AgentStatus = "idle" | "running" | "passed" | "failed";

export type BugType = "LINTING" | "SYNTAX" | "LOGIC" | "TYPE_ERROR" | "IMPORT" | "INDENTATION";

export type LogLevel = "error" | "info" | "warning";

export interface Fix {
  file: string;
  bugType: BugType;
  lineNumber: number;
  commitMessage: string;
  status: "fixed" | "failed";
  originalError: string;
  fixExplanation: string;
  beforeCode: string;
  afterCode: string;
}

export interface TimelineEntry {
  iteration: number;
  timestamp: string;
  status: "passed" | "failed";
  testsPassed: number;
  testsFailed: number;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
}

export interface ReasoningEntry {
  issue: string;
  reasoning: string;
  confidence: number;
  alternatives: string[];
}

export interface Metrics {
  totalRuntime: string;
  iterations: number;
  retryLimitUsed: number;
  filesModified: number;
  commitsMade: number;
}

export interface ScoreBreakdown {
  baseScore: number;
  speedBonus: number;
  efficiencyPenalty: number;
  finalScore: number;
}

export interface DashboardData {
  repo_url: string;
  team_name: string;
  leader_name: string;
  branch_name: string;
  total_failures: number;
  status: "PASSED" | "FAILED";
  execution_time: string;
  score: ScoreBreakdown;
  fixes: Fix[];
  timeline: TimelineEntry[];
  logs: LogEntry[];
  reasoning: ReasoningEntry[];
  metrics: Metrics;
}
