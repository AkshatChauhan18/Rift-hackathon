import Header from "@/components/dashboard/Header";
import InputPanel from "@/components/dashboard/InputPanel";
import RunSummary from "@/components/dashboard/RunSummary";
import ScoreBreakdown from "@/components/dashboard/ScoreBreakdown";
import FixesTable from "@/components/dashboard/FixesTable";
import Timeline from "@/components/dashboard/Timeline";
import LogViewer from "@/components/dashboard/LogViewer";
import ReasoningPanel from "@/components/dashboard/ReasoningPanel";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
import JsonDownload from "@/components/dashboard/JsonDownload";
import LoadingState from "@/components/dashboard/LoadingState";
import Placeholder from "@/components/dashboard/Placeholder";
import { useDashboard } from "@/hooks/useDashboard";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { agentStatus, data, formValues, setFormValues, runAgent } = useDashboard();
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Header status={agentStatus} isDark={isDark} onToggleTheme={toggle} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <InputPanel
          formValues={formValues}
          onChangeForm={setFormValues}
          onRun={runAgent}
          status={agentStatus}
        />

        {agentStatus === "running" && <LoadingState />}

        {agentStatus === "idle" && !data && <Placeholder />}

        {data && (
          <div className="space-y-6">
            <RunSummary data={data} />

            <div className="grid gap-6 lg:grid-cols-2">
              <ScoreBreakdown score={data.score} />
              <Timeline entries={data.timeline} />
            </div>

            <PerformanceMetrics metrics={data.metrics} />
            <FixesTable fixes={data.fixes} />
            <LogViewer logs={data.logs} />
            <ReasoningPanel entries={data.reasoning} />

            <div className="flex justify-end">
              <JsonDownload data={data} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
