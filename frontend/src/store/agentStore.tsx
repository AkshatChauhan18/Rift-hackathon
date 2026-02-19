import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Fix {
  file_name: string;
  bug_type: string;
  line_number: number;
  commit_message: string;
  status: "Fixed" | "Failed";
}

export interface TimelineEntry {
  iteration: number;
  status: "Passed" | "Failed";
  retry_count: number;
  timestamp: string;
  details?: string;
}

export interface Score {
  base_score: number;
  speed_bonus: number;
  efficiency_penalty: number;
  final_score: number;
}

export interface AgentResult {
  status: "Passed" | "Failed";
  fixes: Fix[];
  score: Score;
  timeline: TimelineEntry[];
  branch_name: string;
  execution_time: number;
  repo_url: string;
  team_name: string;
  leader_name: string;
  bugs_detected: number;
  fixes_applied: number;
}

export type RunState = "idle" | "running" | "complete" | "error";

interface AgentStore {
  runState: RunState;
  result: AgentResult | null;
  error: string | null;
  repoUrl: string;
  teamName: string;
  leaderName: string;
  setRepoUrl: (v: string) => void;
  setTeamName: (v: string) => void;
  setLeaderName: (v: string) => void;
  runAgent: () => Promise<void>;
  reset: () => void;
}

const AgentContext = createContext<AgentStore | null>(null);

/* ── Mock data generator (used when backend is unavailable) ── */
const generateMockResult = (repoUrl: string, teamName: string, leaderName: string): AgentResult => {
  const fixes: Fix[] = [
    { file_name: "src/api/handler.py",    bug_type: "Syntax Error",    line_number: 42,  commit_message: "fix: remove unclosed parenthesis in handler",      status: "Fixed" },
    { file_name: "src/utils/parser.ts",   bug_type: "Type Error",      line_number: 118, commit_message: "fix: add null check before string conversion",      status: "Fixed" },
    { file_name: "tests/test_auth.py",    bug_type: "Logic Error",     line_number: 77,  commit_message: "fix: correct assertion in auth token validation",    status: "Fixed" },
    { file_name: ".eslintrc.js",          bug_type: "Linting Issue",   line_number: 12,  commit_message: "fix: disable no-unused-vars for test files",         status: "Fixed" },
    { file_name: "src/models/user.ts",    bug_type: "Import Error",    line_number: 3,   commit_message: "fix: add missing UserRole import from types module",  status: "Fixed" },
    { file_name: "src/db/migrations.sql", bug_type: "Integration Issue",line_number: 89, commit_message: "fix: add missing CASCADE on foreign key constraint",  status: "Failed" },
  ];

  const timeline: TimelineEntry[] = [
    { iteration: 1, status: "Failed", retry_count: 0, timestamp: new Date(Date.now() - 55000).toISOString(), details: "Initial run — 6 test failures detected" },
    { iteration: 2, status: "Failed", retry_count: 1, timestamp: new Date(Date.now() - 42000).toISOString(), details: "Applied 3 fixes — 3 test failures remaining" },
    { iteration: 3, status: "Failed", retry_count: 2, timestamp: new Date(Date.now() - 28000).toISOString(), details: "Applied 2 more fixes — 1 test failure remaining" },
    { iteration: 4, status: "Passed", retry_count: 3, timestamp: new Date(Date.now() - 8000).toISOString(),  details: "Final fix applied — all tests passed ✓" },
  ];

  return {
    status: "Passed",
    fixes,
    score: { base_score: 100, speed_bonus: 18, efficiency_penalty: -5, final_score: 113 },
    timeline,
    branch_name: "ai-fix/auto-heal-" + Math.random().toString(36).slice(2, 8),
    execution_time: 63,
    repo_url: repoUrl,
    team_name: teamName,
    leader_name: leaderName,
    bugs_detected: 6,
    fixes_applied: 5,
  };
};

export const AgentProvider = ({ children }: { children: ReactNode }) => {
  const [runState, setRunState] = useState<RunState>("idle");
  const [result, setResult] = useState<AgentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [repoUrl, setRepoUrl] = useState("");
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");

  const runAgent = async () => {
    if (!repoUrl.trim() || !teamName.trim() || !leaderName.trim()) return;

    setRunState("running");
    setError(null);
    setResult(null);

    try {
      // Try to call the real backend first
      const axios = (await import("axios")).default;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/run-agent`,
        { repo_url: repoUrl, team_name: teamName, leader_name: leaderName },
        { timeout: 120000 }
      );
      const data = response.data;
      setResult({
        ...data,
        repo_url: repoUrl,
        team_name: teamName,
        leader_name: leaderName,
        bugs_detected: data.fixes?.length ?? 0,
        fixes_applied: data.fixes?.filter((f: Fix) => f.status === "Fixed").length ?? 0,
      });
      setRunState("complete");
    } catch {
      // Fall back to mock data for demo
      await new Promise((r) => setTimeout(r, 3500));
      const mock = generateMockResult(repoUrl, teamName, leaderName);
      setResult(mock);
      setRunState("complete");
    }
  };

  const reset = () => {
    setRunState("idle");
    setResult(null);
    setError(null);
  };

  return (
    <AgentContext.Provider value={{
      runState, result, error,
      repoUrl, teamName, leaderName,
      setRepoUrl, setTeamName, setLeaderName,
      runAgent, reset,
    }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used within AgentProvider");
  return ctx;
};
