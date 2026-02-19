import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Award } from "lucide-react";

const criteria = [
  { label: "Test Case Accuracy", points: 40, subject: "Tests",        color: "text-cyan",    pct: 40 },
  { label: "Dashboard Quality",  points: 25, subject: "Dashboard",    color: "text-success",  pct: 25 },
  { label: "Agent Architecture", points: 20, subject: "Architecture", color: "text-warning",  pct: 20 },
  { label: "Documentation",      points: 10, subject: "Docs",         color: "text-primary",  pct: 10 },
  { label: "Video Presentation", points: 5,  subject: "Video",        color: "text-accent",   pct: 5 },
];

const radarData = criteria.map((c) => ({ subject: c.subject, points: c.points }));

const CriteriaTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card-base rounded-md border border-border px-3 py-2 font-mono text-xs">
      <div className="text-muted-foreground">{payload[0].payload.subject}</div>
      <div className="font-bold text-foreground">{payload[0].value} pts</div>
    </div>
  );
};

export const EvaluationCriteria = () => (
  <section className="px-4 py-16">
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-3 flex justify-center">
          <Award className="size-8 text-warning" />
        </div>
        <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Evaluation</h2>
        <h3 className="font-mono text-2xl font-bold text-foreground">Scoring Criteria</h3>
        <p className="mt-2 text-sm text-muted-foreground">100 total points across 5 evaluation dimensions</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Criteria cards */}
        <div className="space-y-3">
          {criteria.map((c, i) => (
            <div key={c.label} className="card-base terminal-border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-md bg-surface-3 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-sm font-semibold text-foreground">{c.label}</span>
                </div>
                <span className={`font-mono text-lg font-bold ${c.color}`}>{c.points} pts</span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${c.pct}%`,
                    background:
                      i === 0 ? "hsl(var(--cyan-glow))" :
                      i === 1 ? "hsl(var(--success))" :
                      i === 2 ? "hsl(var(--warning))" :
                      i === 3 ? "hsl(var(--primary))" :
                               "hsl(var(--accent))",
                  }}
                />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>0</span>
                <span>{c.pct}% of total</span>
                <span>100</span>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-foreground">TOTAL</span>
              <span className="text-2xl font-bold text-warning">100 pts</span>
            </div>
          </div>
        </div>

        {/* Radar chart */}
        <div className="card-base terminal-border p-6">
          <div className="mb-4 font-mono text-sm font-semibold text-foreground">Distribution Overview</div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220 25% 14%)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "hsl(215 20% 55%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
              />
              <Radar
                name="Points"
                dataKey="points"
                stroke="hsl(188 100% 48%)"
                fill="hsl(188 100% 48%)"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Tooltip content={<CriteriaTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </section>
);
