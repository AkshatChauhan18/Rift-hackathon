import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { useAgent, Fix } from "@/store/agentStore";

const bugTypeColors: Record<string, string> = {
  "Syntax Error":     "text-danger border-danger/30 bg-danger/10",
  "Type Error":       "text-warning border-warning/30 bg-warning/10",
  "Logic Error":      "text-cyan border-cyan/30 bg-cyan/10",
  "Linting Issue":    "text-muted-foreground border-border bg-surface-3",
  "Import Error":     "text-success border-success/30 bg-success/10",
  "Integration Issue":"text-warning border-warning/30 bg-warning/10",
};

const StatusBadge = ({ status }: { status: Fix["status"] }) =>
  status === "Fixed" ? (
    <span className="flex items-center gap-1 font-mono text-xs font-semibold status-passed rounded-full px-2.5 py-0.5 whitespace-nowrap">
      <CheckCircle2 className="size-3" /> Fixed
    </span>
  ) : (
    <span className="flex items-center gap-1 font-mono text-xs font-semibold status-failed rounded-full px-2.5 py-0.5 whitespace-nowrap">
      <XCircle className="size-3" /> Failed
    </span>
  );

export const FixesTable = () => {
  const { result } = useAgent();
  if (!result) return null;

  const fixes = result.fixes;
  const fixedCount = fixes.filter((f) => f.status === "Fixed").length;

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 4</h2>
            <h3 className="font-mono text-2xl font-bold text-foreground">Fixes Applied</h3>
          </div>
          <div className="flex gap-3 font-mono text-xs">
            <span className="status-passed rounded-full px-3 py-1.5">
              {fixedCount} Fixed
            </span>
            <span className="status-failed rounded-full px-3 py-1.5">
              {fixes.length - fixedCount} Failed
            </span>
          </div>
        </div>

        <div className="card-base terminal-border overflow-hidden">
          {/* Terminal bar */}
          <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
            <div className="size-2.5 rounded-full bg-danger" />
            <div className="size-2.5 rounded-full bg-warning" />
            <div className="size-2.5 rounded-full bg-success" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">fixes-applied.log</span>
          </div>

          {/* Scrollable table */}
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-border bg-surface-2/50">
                  {["#", "File Name", "Bug Type", "Line", "Commit Message", "Status"].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {fixes.map((fix, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-surface-2/50"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</td>
                    <td className="px-4 py-3 font-mono text-xs text-cyan">{fix.file_name}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded border px-2 py-0.5 font-mono text-[10px] ${bugTypeColors[fix.bug_type] ?? "text-foreground"}`}>
                        {fix.bug_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{fix.line_number}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground max-w-[280px] truncate">
                      {fix.commit_message}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={fix.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {fixes.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-12 font-mono text-sm text-muted-foreground">
              <AlertTriangle className="size-8" />
              No fixes recorded
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
