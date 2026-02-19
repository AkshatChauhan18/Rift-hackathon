import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { TimelineEntry } from "@/types/dashboard";

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6 space-y-4"
    >
      <h2 className="section-title">CI/CD Timeline</h2>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

        <div className="space-y-4">
          {entries.map((entry, i) => {
            const passed = entry.status === "passed";
            return (
              <motion.div
                key={entry.iteration}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
                className="relative flex items-start gap-4"
              >
                <div
                  className={`absolute left-[-13px] mt-1 w-5 h-5 rounded-full flex items-center justify-center ${
                    passed ? "bg-success/20" : "bg-destructive/20"
                  }`}
                >
                  {passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-destructive" />
                  )}
                </div>
                <div className="flex-1 ml-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Iteration {entry.iteration}</span>
                    <span className="text-xs text-muted-foreground font-mono">{entry.timestamp}</span>
                    <span
                      className={`ml-auto px-2 py-0.5 rounded text-xs font-medium ${
                        passed ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {entry.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {entry.testsPassed} passed · {entry.testsFailed} failed
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
