import { useState } from "react";
import { Github, Play, Loader2, User, Users, AlertCircle, RotateCcw } from "lucide-react";
import { useAgent } from "@/store/agentStore";

export const InputSection = () => {
  const { repoUrl, teamName, leaderName, setRepoUrl, setTeamName, setLeaderName, runAgent, runState, reset } = useAgent();
  const [touched, setTouched] = useState({ repoUrl: false, teamName: false, leaderName: false });

  const isRunning = runState === "running";
  const isComplete = runState === "complete";

  const urlValid = repoUrl.trim().startsWith("http") && repoUrl.includes("github.com");
  const canSubmit = repoUrl.trim() && teamName.trim() && leaderName.trim();

  const handleRun = () => {
    setTouched({ repoUrl: true, teamName: true, leaderName: true });
    if (canSubmit) runAgent();
  };

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 1</h2>
          <h3 className="font-mono text-2xl font-bold text-foreground">Launch the Agent</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Provide your GitHub repository and team information to start autonomous CI/CD healing.
          </p>
        </div>

        <div className="card-base terminal-border p-6 md:p-8">
          {/* Terminal bar */}
          <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
            <div className="size-3 rounded-full bg-danger" />
            <div className="size-3 rounded-full bg-warning" />
            <div className="size-3 rounded-full bg-success" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">agent-runner ~ input</span>
            {isRunning && (
              <span className="ml-auto flex items-center gap-1.5 font-mono text-xs text-warning">
                <span className="size-2 animate-pulse rounded-full bg-warning" />
                RUNNING
              </span>
            )}
            {isComplete && (
              <span className="ml-auto flex items-center gap-1.5 font-mono text-xs text-success">
                <span className="size-2 rounded-full bg-success" />
                COMPLETE
              </span>
            )}
          </div>

          <div className="space-y-5">
            {/* Repo URL */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Github className="size-3.5" />
                GITHUB REPOSITORY URL <span className="text-danger">*</span>
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, repoUrl: true }))}
                disabled={isRunning}
                placeholder="https://github.com/username/repository"
                className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/60 focus:outline-none focus:shadow-primary disabled:opacity-50"
              />
              {touched.repoUrl && repoUrl && !urlValid && (
                <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-danger">
                  <AlertCircle className="size-3" /> Must be a valid GitHub URL
                </p>
              )}
            </div>

            {/* Team Name & Leader */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Users className="size-3.5" />
                  TEAM NAME <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, teamName: true }))}
                  disabled={isRunning}
                  placeholder="e.g. DevOps Alpha"
                  maxLength={60}
                  className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/60 focus:outline-none focus:shadow-primary disabled:opacity-50"
                />
                {touched.teamName && !teamName.trim() && (
                  <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-danger">
                    <AlertCircle className="size-3" /> Required
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <User className="size-3.5" />
                  TEAM LEADER <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, leaderName: true }))}
                  disabled={isRunning}
                  placeholder="e.g. Jane Doe"
                  maxLength={60}
                  className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/60 focus:outline-none focus:shadow-primary disabled:opacity-50"
                />
                {touched.leaderName && !leaderName.trim() && (
                  <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-danger">
                    <AlertCircle className="size-3" /> Required
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground shadow-primary transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    AGENT RUNNING...
                  </>
                ) : (
                  <>
                    <Play className="size-4" />
                    RUN AGENT
                  </>
                )}
              </button>

              {isComplete && (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-4 py-3 font-mono text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </button>
              )}
            </div>

            {/* API note */}
            <p className="font-mono text-[10px] text-muted-foreground/60">
              Sends POST /run-agent → {`{ repo_url, team_name, leader_name }`} · Falls back to demo data if backend unavailable
            </p>
          </div>
        </div>

        {/* Loading state */}
        {isRunning && (
          <div className="mt-6 card-base terminal-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">AGENT ACTIVITY LOG</span>
              <Loader2 className="size-3.5 animate-spin text-primary" />
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { text: "$ Connecting to GitHub repository...", color: "text-cyan" },
                { text: "$ Cloning codebase...", color: "text-foreground" },
                { text: "$ Running test suite...", color: "text-foreground" },
                { text: "$ Analyzing failures with LLM...", color: "text-warning" },
                { text: "$ Generating patches...", color: "text-warning animate-pulse" },
              ].map((line, i) => (
                <div key={i} className={line.color} style={{ animationDelay: `${i * 0.5}s` }}>
                  {line.text}
                  {i === 4 && <span className="animate-blink">_</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
