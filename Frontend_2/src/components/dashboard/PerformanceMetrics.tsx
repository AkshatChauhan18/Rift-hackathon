import { motion } from "framer-motion";
import { Clock, RefreshCw, FileCode, GitCommit, Repeat } from "lucide-react";
import type { Metrics } from "@/types/dashboard";

interface PerformanceMetricsProps {
  metrics: Metrics;
}

const metricItems = [
  { key: "totalRuntime" as const, label: "Total Runtime", icon: Clock },
  { key: "iterations" as const, label: "Iterations", icon: Repeat },
  { key: "retryLimitUsed" as const, label: "Retries Used", icon: RefreshCw },
  { key: "filesModified" as const, label: "Files Modified", icon: FileCode },
  { key: "commitsMade" as const, label: "Commits Made", icon: GitCommit },
];

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
    >
      {metricItems.map(({ key, label, icon: Icon }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 + i * 0.05 }}
          className="metric-card"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium">{label}</span>
          </div>
          <p className="text-xl font-bold">{metrics[key]}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
