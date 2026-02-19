import { motion } from "framer-motion";
import { GitBranch, AlertTriangle, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { DashboardData } from "@/types/dashboard";

interface RunSummaryProps {
  data: DashboardData;
}

export default function RunSummary({ data }: RunSummaryProps) {
  const passed = data.status === "PASSED";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 space-y-4"
    >
      <h2 className="section-title">Run Summary</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <InfoItem label="Repository" value={data.repo_url} mono />
        <InfoItem label="Team" value={data.team_name} />
        <InfoItem label="Leader" value={data.leader_name} />
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Branch</p>
            <p className="text-sm font-mono font-medium">{data.branch_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <div>
            <p className="text-xs text-muted-foreground">Failures Detected</p>
            <p className="text-sm font-bold">{data.total_failures}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Execution Time</p>
            <p className="text-sm font-bold">{data.execution_time}</p>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
            passed ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
          }`}
        >
          {passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          CI/CD {data.status}
        </span>
      </div>
    </motion.div>
  );
}

function InfoItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-medium truncate ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
