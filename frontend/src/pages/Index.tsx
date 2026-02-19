import { AgentProvider, useAgent } from "@/store/agentStore";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { InputSection } from "@/components/InputSection";
import { RunSummary } from "@/components/RunSummary";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { FixesTable } from "@/components/FixesTable";
import { CICDTimeline } from "@/components/CICDTimeline";
import { EvaluationCriteria } from "@/components/EvaluationCriteria";
import { Bot } from "lucide-react";

const DashboardContent = () => {
  const { runState } = useAgent();
  const showResults = runState === "complete";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <HeroSection />

        {/* Divider */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-mono text-xs text-muted-foreground">AGENT CONTROL</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <InputSection />

        {showResults && (
          <>
            {/* Results divider */}
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <span className="flex items-center gap-2 font-mono text-xs text-cyan">
                  <Bot className="size-3.5" />
                  AGENT RESULTS
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>
            </div>

            <RunSummary />
            <ScoreBreakdown />
            <FixesTable />
            <CICDTimeline />
          </>
        )}

        {/* Divider */}
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-mono text-xs text-muted-foreground">EVALUATION</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>

        <EvaluationCriteria />
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-6">
        <div className="mx-auto max-w-6xl text-center font-mono text-xs text-muted-foreground">
          <span className="text-cyan">Autonomous CI/CD Healing Agent</span> — AI-powered DevOps automation dashboard
          <br />
          <span className="text-muted-foreground/50">Self-healing pipelines · Zero manual intervention · Production-ready</span>
        </div>
      </footer>
    </div>
  );
};

const Index = () => (
  <AgentProvider>
    <DashboardContent />
  </AgentProvider>
);

export default Index;
