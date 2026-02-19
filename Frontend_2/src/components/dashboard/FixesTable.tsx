import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import type { Fix } from "@/types/dashboard";

interface FixesTableProps {
  fixes: Fix[];
}

export default function FixesTable({ fixes }: FixesTableProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-6 pb-3">
        <h2 className="section-title">Fixes Applied</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs">
              <th className="text-left px-6 py-2 font-medium">File</th>
              <th className="text-left px-4 py-2 font-medium">Bug Type</th>
              <th className="text-left px-4 py-2 font-medium">Line</th>
              <th className="text-left px-4 py-2 font-medium hidden md:table-cell">Commit Message</th>
              <th className="text-left px-4 py-2 font-medium">Status</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {fixes.map((fix, i) => (
              <FixRow
                key={i}
                fix={fix}
                isExpanded={expanded === i}
                onToggle={() => setExpanded(expanded === i ? null : i)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function FixRow({ fix, isExpanded, onToggle }: { fix: Fix; isExpanded: boolean; onToggle: () => void }) {
  const isFixed = fix.status === "fixed";

  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-border/50 hover:bg-secondary/30 cursor-pointer transition-colors"
      >
        <td className="px-6 py-3 font-mono text-xs">{fix.file}</td>
        <td className="px-4 py-3">
          <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
            {fix.bugType}
          </span>
        </td>
        <td className="px-4 py-3 font-mono text-xs">{fix.lineNumber}</td>
        <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell truncate max-w-[200px]">
          {fix.commitMessage}
        </td>
        <td className="px-4 py-3">
          {isFixed ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
              <CheckCircle2 className="w-3.5 h-3.5" /> Fixed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive">
              <XCircle className="w-3.5 h-3.5" /> Failed
            </span>
          )}
        </td>
        <td className="px-2 py-3">
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={6} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-secondary/20 space-y-3 text-xs">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Original Error</p>
                    <p className="font-mono text-destructive">{fix.originalError}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Fix Explanation</p>
                    <p>{fix.fixExplanation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-destructive/70 mb-1">Before</p>
                      <pre className="font-mono bg-destructive/5 border border-destructive/10 rounded p-2 overflow-x-auto">
                        {fix.beforeCode}
                      </pre>
                    </div>
                    <div>
                      <p className="font-medium text-success/70 mb-1">After</p>
                      <pre className="font-mono bg-success/5 border border-success/10 rounded p-2 overflow-x-auto">
                        {fix.afterCode}
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}
