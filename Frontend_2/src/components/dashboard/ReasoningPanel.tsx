import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReasoningEntry } from "@/types/dashboard";

interface ReasoningPanelProps {
  entries: ReasoningEntry[];
}

export default function ReasoningPanel({ entries }: ReasoningPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6 space-y-4"
    >
      <h2 className="section-title">Agent Reasoning</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {entries.map((entry, i) => (
          <AccordionItem key={i} value={`r-${i}`} className="border border-border/50 rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/30 text-sm">
              <div className="flex items-center gap-3 text-left">
                <span className="font-medium">{entry.issue}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    entry.confidence >= 90
                      ? "bg-success/15 text-success"
                      : entry.confidence >= 70
                      ? "bg-warning/15 text-warning"
                      : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {entry.confidence}%
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-sm space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Reasoning</p>
                <p>{entry.reasoning}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Alternatives Considered</p>
                <ul className="list-disc list-inside text-muted-foreground text-xs space-y-0.5">
                  {entry.alternatives.map((alt, j) => (
                    <li key={j}>{alt}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
