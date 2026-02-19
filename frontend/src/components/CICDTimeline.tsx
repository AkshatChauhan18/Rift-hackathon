import { CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";
import { useAgent, TimelineEntry } from "@/store/agentStore";

const formatTs = (ts: string) => {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
};

const TimelineItem = ({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) => {
  const isPassed = entry.status === "Passed";
  return (
    <div className="relative flex gap-4">
      {/* Connector */}
      {!isLast && (
        <div
          className="absolute left-5 top-10 h-full w-px"
          style={{ background: "linear-gradient(to bottom, hsl(var(--border)), transparent)" }}
        />
      )}

      {/* Icon */}
      <div
        className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 ${
          isPassed
            ? "border-success/50 bg-success/10 shadow-success"
            : "border-danger/50 bg-danger/10 shadow-danger"
        }`}
      >
        {isPassed
          ? <CheckCircle2 className="size-5 text-success" />
          : <XCircle className="size-5 text-danger" />}
      </div>

      {/* Content */}
      <div className="card-base mb-4 flex-1 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-foreground">
              Iteration {entry.iteration}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                isPassed ? "status-passed" : "status-failed"
              }`}
            >
              {entry.status.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <RefreshCw className="size-3" />
              Retry #{entry.retry_count}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatTs(entry.timestamp)}
            </span>
          </div>
        </div>
        {entry.details && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">{entry.details}</p>
        )}
      </div>
    </div>
  );
};

export const CICDTimeline = () => {
  const { result } = useAgent();
  if (!result) return null;

  const timeline = result.timeline;

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 5</h2>
          <h3 className="font-mono text-2xl font-bold text-foreground">CI/CD Timeline</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Full iteration log — each agent loop with pass/fail status and retry count
          </p>
        </div>

        <div className="relative">
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.iteration} entry={entry} isLast={i === timeline.length - 1} />
          ))}
        </div>

        {/* Final result banner */}
        {timeline.length > 0 && (
          <div
            className={`mt-4 flex items-center gap-3 rounded-lg border px-4 py-3 font-mono text-sm ${
              result.status === "Passed" ? "status-passed" : "status-failed"
            }`}
          >
            {result.status === "Passed"
              ? <CheckCircle2 className="size-5" />
              : <XCircle className="size-5" />}
            <span className="font-bold">
              Pipeline {result.status} after {timeline.length} iteration{timeline.length !== 1 ? "s" : ""}
              {" "}— Total time: {result.execution_time}s
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
