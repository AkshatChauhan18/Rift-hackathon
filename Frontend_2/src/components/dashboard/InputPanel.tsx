import { useState } from "react";
import { Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AgentStatus } from "@/types/dashboard";

interface InputPanelProps {
  formValues: { repoUrl: string; teamName: string; leaderName: string };
  onChangeForm: (vals: { repoUrl: string; teamName: string; leaderName: string }) => void;
  onRun: () => void;
  status: AgentStatus;
}

export default function InputPanel({ formValues, onChangeForm, onRun, status }: InputPanelProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formValues.repoUrl) e.repoUrl = "Repository URL is required";
    else if (!/^https?:\/\/.+/.test(formValues.repoUrl)) e.repoUrl = "Enter a valid URL";
    if (!formValues.teamName.trim()) e.teamName = "Team name is required";
    if (!formValues.leaderName.trim()) e.leaderName = "Leader name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onRun();
  };

  const isRunning = status === "running";

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <h2 className="section-title">Run Configuration</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5 sm:col-span-3">
          <Label htmlFor="repo" className="text-xs font-medium text-muted-foreground">GitHub Repository URL</Label>
          <Input
            id="repo"
            placeholder="https://github.com/org/repo"
            value={formValues.repoUrl}
            onChange={(e) => onChangeForm({ ...formValues, repoUrl: e.target.value })}
            className="bg-secondary/50 border-border/50 focus:border-primary"
          />
          {errors.repoUrl && <p className="text-xs text-destructive">{errors.repoUrl}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="team" className="text-xs font-medium text-muted-foreground">Team Name</Label>
          <Input
            id="team"
            placeholder="CodeHealers"
            value={formValues.teamName}
            onChange={(e) => onChangeForm({ ...formValues, teamName: e.target.value })}
            className="bg-secondary/50 border-border/50 focus:border-primary"
          />
          {errors.teamName && <p className="text-xs text-destructive">{errors.teamName}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="leader" className="text-xs font-medium text-muted-foreground">Team Leader</Label>
          <Input
            id="leader"
            placeholder="Sarah_Chen"
            value={formValues.leaderName}
            onChange={(e) => onChangeForm({ ...formValues, leaderName: e.target.value })}
            className="bg-secondary/50 border-border/50 focus:border-primary"
          />
          {errors.leaderName && <p className="text-xs text-destructive">{errors.leaderName}</p>}
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={isRunning} className="w-full gap-2">
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Agent
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
