import { Moon, Sun, Github, Activity } from "lucide-react";
import type { AgentStatus } from "@/types/dashboard";

interface HeaderProps {
  status: AgentStatus;
  isDark: boolean;
  onToggleTheme: () => void;
}

const statusLabel: Record<AgentStatus, string> = {
  idle: "Idle",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
};

const statusDotClass: Record<AgentStatus, string> = {
  idle: "status-dot-idle",
  running: "status-dot-running",
  passed: "status-dot-passed",
  failed: "status-dot-failed",
};

export default function Header({ status, isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="glass-card sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Activity className="w-6 h-6 text-primary" />
        <h1 className="text-lg font-bold tracking-tight">
          <span className="text-gradient-primary">AI CI/CD</span>{" "}
          <span className="text-foreground">Healing Agent</span>
        </h1>
        <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
          <span className={statusDotClass[status]} />
          {statusLabel[status]}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
          <span className="status-dot bg-success" />
          99.9% uptime
        </span>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="GitHub repository"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}
