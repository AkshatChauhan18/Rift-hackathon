import { GitBranch, Bug, Wrench, Clock, CheckCircle2, XCircle, Link } from "lucide-react";
import { useAgent } from "@/store/agentStore";

const StatCard = ({
  icon: Icon, label, value, sub, color = "cyan",
}: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color?: string;
}) => (
  <div className="card-base terminal-border p-4 md:p-5">
    <div className="mb-3 flex items-center gap-2">
      <div className={`flex size-8 items-center justify-center rounded-md bg-${color}/10`}>
        <Icon className={`size-4 text-${color}`} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
    <div className="font-mono text-xl font-bold text-foreground md:text-2xl">{value}</div>
    {sub && <div className="mt-0.5 font-mono text-xs text-muted-foreground">{sub}</div>}
  </div>
);

export const RunSummary = () => {
  const { result } = useAgent();
  if (!result) return null;

  const isPassed = result.status === "Passed";

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 2</h2>
            <h3 className="font-mono text-2xl font-bold text-foreground">Run Summary</h3>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-sm font-bold ${
              isPassed ? "status-passed" : "status-failed"
            }`}
          >
            {isPassed ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
            CI/CD {result.status.toUpperCase()}
          </div>
        </div>

        {/* Repo info bar */}
        <div className="card-base mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 font-mono text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Link className="size-3 text-cyan" />
            <span className="text-foreground truncate max-w-[280px]">{result.repo_url}</span>
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            Team: <span className="text-foreground">{result.team_name}</span>
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            Leader: <span className="text-foreground">{result.leader_name}</span>
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <div className="xl:col-span-2">
            <StatCard
              icon={GitBranch}
              label="Branch Created"
              value={result.branch_name}
              color="cyan"
            />
          </div>
          <StatCard icon={Bug}         label="Bugs Detected"  value={result.bugs_detected}  sub="total issues found"      color="danger"   />
          <StatCard icon={Wrench}      label="Fixes Applied"  value={result.fixes_applied}   sub="patches committed"       color="success"  />
          <StatCard icon={Clock}       label="Execution Time" value={`${result.execution_time}s`} sub="total agent runtime" color="warning"  />
          <StatCard
            icon={isPassed ? CheckCircle2 : XCircle}
            label="Pipeline Status"
            value={result.status}
            sub="final CI/CD result"
            color={isPassed ? "success" : "danger"}
          />
        </div>
      </div>
    </section>
  );
};
