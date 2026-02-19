import { useState, useCallback } from "react";
import type { DashboardData, AgentStatus } from "@/types/dashboard";

const MOCK_DATA: DashboardData = {
  repo_url: "https://github.com/acme-corp/payment-service",
  team_name: "CodeHealers",
  leader_name: "Sarah_Chen",
  branch_name: "CodeHealers_Sarah_Chen_AI_Fix",
  total_failures: 7,
  status: "PASSED",
  execution_time: "2m 34s",
  score: {
    baseScore: 100,
    speedBonus: 15,
    efficiencyPenalty: -8,
    finalScore: 107,
  },
  fixes: [
    {
      file: "src/api/payments.ts",
      bugType: "TYPE_ERROR",
      lineNumber: 42,
      commitMessage: "fix: resolve type mismatch in payment handler",
      status: "fixed",
      originalError: "Type 'string' is not assignable to type 'number'",
      fixExplanation: "Changed parseFloat to ensure numeric type for amount field",
      beforeCode: "const amount: number = req.body.amount;",
      afterCode: "const amount: number = parseFloat(req.body.amount);",
    },
    {
      file: "src/utils/validator.ts",
      bugType: "LOGIC",
      lineNumber: 18,
      commitMessage: "fix: correct boundary check in validator",
      status: "fixed",
      originalError: "Off-by-one error in range validation",
      fixExplanation: "Changed < to <= for inclusive upper bound check",
      beforeCode: "if (value < max) return true;",
      afterCode: "if (value <= max) return true;",
    },
    {
      file: "src/index.ts",
      bugType: "IMPORT",
      lineNumber: 3,
      commitMessage: "fix: correct missing import for Logger",
      status: "fixed",
      originalError: "Cannot find module './logger'",
      fixExplanation: "Fixed import path to use correct relative path",
      beforeCode: "import { Logger } from './logger';",
      afterCode: "import { Logger } from './utils/logger';",
    },
    {
      file: "src/config/env.ts",
      bugType: "SYNTAX",
      lineNumber: 12,
      commitMessage: "fix: remove extra comma in object literal",
      status: "fixed",
      originalError: "Unexpected token ','",
      fixExplanation: "Removed trailing comma after last property",
      beforeCode: "const config = { port: 3000, host: 'localhost', };",
      afterCode: "const config = { port: 3000, host: 'localhost' };",
    },
    {
      file: "src/middleware/auth.ts",
      bugType: "LINTING",
      lineNumber: 27,
      commitMessage: "fix: use const instead of let for non-reassigned variable",
      status: "fixed",
      originalError: "'token' is never reassigned. Use 'const' instead",
      fixExplanation: "Changed let to const since variable is never reassigned",
      beforeCode: "let token = req.headers.authorization;",
      afterCode: "const token = req.headers.authorization;",
    },
    {
      file: "src/services/db.ts",
      bugType: "INDENTATION",
      lineNumber: 55,
      commitMessage: "fix: normalize indentation to 2 spaces",
      status: "fixed",
      originalError: "Mixed tabs and spaces",
      fixExplanation: "Normalized all indentation to use 2-space convention",
      beforeCode: "\t\tawait db.connect();",
      afterCode: "    await db.connect();",
    },
    {
      file: "src/routes/webhook.ts",
      bugType: "LOGIC",
      lineNumber: 91,
      commitMessage: "fix: add null check for webhook payload",
      status: "failed",
      originalError: "Cannot read property 'event' of undefined",
      fixExplanation: "Added optional chaining but underlying schema mismatch persists",
      beforeCode: "const event = payload.event;",
      afterCode: "const event = payload?.event;",
    },
  ],
  timeline: [
    { iteration: 1, timestamp: "14:32:01", status: "failed", testsPassed: 18, testsFailed: 7 },
    { iteration: 2, timestamp: "14:32:45", status: "failed", testsPassed: 22, testsFailed: 3 },
    { iteration: 3, timestamp: "14:33:20", status: "failed", testsPassed: 24, testsFailed: 1 },
    { iteration: 4, timestamp: "14:34:02", status: "passed", testsPassed: 25, testsFailed: 0 },
  ],
  logs: [
    { timestamp: "14:32:00", level: "info", message: "Agent initialized. Cloning repository..." },
    { timestamp: "14:32:01", level: "info", message: "Running initial CI/CD pipeline..." },
    { timestamp: "14:32:05", level: "error", message: "CI FAILED — 7 test failures detected" },
    { timestamp: "14:32:06", level: "info", message: "Analyzing failure patterns..." },
    { timestamp: "14:32:10", level: "warning", message: "Multiple bug types detected: TYPE_ERROR, LOGIC, IMPORT" },
    { timestamp: "14:32:12", level: "info", message: "Applying fix 1/7: src/api/payments.ts (TYPE_ERROR)" },
    { timestamp: "14:32:18", level: "info", message: "Applying fix 2/7: src/utils/validator.ts (LOGIC)" },
    { timestamp: "14:32:22", level: "info", message: "Applying fix 3/7: src/index.ts (IMPORT)" },
    { timestamp: "14:32:28", level: "info", message: "Applying fix 4/7: src/config/env.ts (SYNTAX)" },
    { timestamp: "14:32:33", level: "info", message: "Applying fix 5/7: src/middleware/auth.ts (LINTING)" },
    { timestamp: "14:32:38", level: "info", message: "Applying fix 6/7: src/services/db.ts (INDENTATION)" },
    { timestamp: "14:32:42", level: "warning", message: "Fix 7/7 applied but test still failing for webhook.ts" },
    { timestamp: "14:32:45", level: "info", message: "Iteration 2 complete — 3 failures remaining" },
    { timestamp: "14:33:20", level: "info", message: "Iteration 3 complete — 1 failure remaining" },
    { timestamp: "14:34:00", level: "info", message: "Iteration 4 — all tests passing" },
    { timestamp: "14:34:02", level: "info", message: "CI/CD pipeline PASSED ✓" },
    { timestamp: "14:34:03", level: "info", message: "Branch CodeHealers_Sarah_Chen_AI_Fix pushed successfully" },
  ],
  reasoning: [
    {
      issue: "Type mismatch in payment handler",
      reasoning: "HTTP request bodies are always strings. The amount field needs explicit numeric conversion to match the declared type.",
      confidence: 97,
      alternatives: ["Use parseInt instead", "Add Zod schema validation at middleware level"],
    },
    {
      issue: "Off-by-one error in range validation",
      reasoning: "The specification states the upper bound should be inclusive, but the comparison used strict less-than.",
      confidence: 92,
      alternatives: ["Add separate boundary method", "Use a range library"],
    },
    {
      issue: "Webhook null reference",
      reasoning: "The webhook payload can be undefined when events are replayed. Optional chaining prevents the crash but the root cause is a schema mismatch.",
      confidence: 64,
      alternatives: ["Add payload validation middleware", "Implement retry with schema detection"],
    },
  ],
  metrics: {
    totalRuntime: "2m 34s",
    iterations: 4,
    retryLimitUsed: 4,
    filesModified: 7,
    commitsMade: 9,
  },
};

export function useDashboard() {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [data, setData] = useState<DashboardData | null>(null);
  const [formValues, setFormValues] = useState({
    repoUrl: "",
    teamName: "",
    leaderName: "",
  });

  const runAgent = useCallback(() => {
    setAgentStatus("running");
    setData(null);

    // Simulate agent execution
    setTimeout(() => {
      const teamSlug = formValues.teamName.replace(/\s+/g, "_");
      const leaderSlug = formValues.leaderName.replace(/\s+/g, "_");
      setData({
        ...MOCK_DATA,
        repo_url: formValues.repoUrl,
        team_name: formValues.teamName,
        leader_name: formValues.leaderName,
        branch_name: `${teamSlug}_${leaderSlug}_AI_Fix`,
      });
      setAgentStatus("passed");
    }, 4000);
  }, [formValues]);

  return {
    agentStatus,
    data,
    formValues,
    setFormValues,
    runAgent,
  };
}
