import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { LogEntry, LogLevel } from "@/types/dashboard";

interface LogViewerProps {
  logs: LogEntry[];
}

const levelFilters: LogLevel[] = ["info", "warning", "error"];

export default function LogViewer({ logs }: LogViewerProps) {
  const [filter, setFilter] = useState<LogLevel | "all">("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "all" ? logs : logs.filter((l) => l.level === filter);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [filtered]);

  const levelClass: Record<LogLevel, string> = {
    error: "log-error",
    warning: "log-warning",
    info: "log-info",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 pb-3 flex items-center justify-between">
        <h2 className="section-title">Execution Logs</h2>
        <div className="flex gap-1">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </FilterBtn>
          {levelFilters.map((l) => (
            <FilterBtn key={l} active={filter === l} onClick={() => setFilter(l)}>
              {l}
            </FilterBtn>
          ))}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto bg-secondary/30 border-t border-border/50 py-2"
      >
        {filtered.map((log, i) => (
          <div key={i} className={levelClass[log.level]}>
            <span className="text-muted-foreground/60 mr-3 select-none">{log.timestamp}</span>
            <span className="uppercase text-[10px] font-bold mr-2 opacity-60 w-12 inline-block">
              [{log.level}]
            </span>
            {log.message}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}
