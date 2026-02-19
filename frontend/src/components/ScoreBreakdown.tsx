import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useAgent } from "@/store/agentStore";
import { Trophy } from "lucide-react";

const ScoreTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="card-base rounded-md border border-border px-3 py-2 font-mono text-xs">
      <div className="text-muted-foreground">{d.payload.name}</div>
      <div className="font-bold text-foreground">{d.value > 0 ? "+" : ""}{d.value} pts</div>
    </div>
  );
};

export const ScoreBreakdown = () => {
  const { result } = useAgent();
  if (!result) return null;

  const { base_score, speed_bonus, efficiency_penalty, final_score } = result.score;

  const chartData = [
    { name: "Base Score",          value: base_score,          fill: "hsl(188 100% 48%)" },
    { name: "Speed Bonus",         value: speed_bonus,         fill: "hsl(142 71% 45%)" },
    { name: "Efficiency Penalty",  value: efficiency_penalty,  fill: "hsl(0 78% 55%)" },
    { name: "Final Score",         value: final_score,         fill: "hsl(38 95% 55%)" },
  ];

  const progressPercent = Math.min((final_score / 130) * 100, 100);
  const grade =
    final_score >= 110 ? { label: "S+", color: "text-warning" } :
    final_score >= 100 ? { label: "A",  color: "text-success" } :
    final_score >= 80  ? { label: "B",  color: "text-cyan" } :
                         { label: "C",  color: "text-muted-foreground" };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 3</h2>
          <h3 className="font-mono text-2xl font-bold text-foreground">Score Breakdown</h3>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Score panel */}
          <div className="card-base terminal-border p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="size-5 text-warning" />
                <span className="font-mono text-sm font-semibold text-foreground">Performance Score</span>
              </div>
              <span className={`font-mono text-3xl font-bold ${grade.color}`}>{grade.label}</span>
            </div>

            {/* Score rows */}
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center justify-between rounded-md bg-surface-2 px-3 py-2">
                <span className="text-muted-foreground">Base Score</span>
                <span className="text-cyan">+{base_score}</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-surface-2 px-3 py-2">
                <span className="text-muted-foreground">Speed Bonus</span>
                <span className="text-success">+{speed_bonus}</span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-surface-2 px-3 py-2">
                <span className="text-muted-foreground">Efficiency Penalty</span>
                <span className="text-danger">{efficiency_penalty}</span>
              </div>
              <div className="mt-2 flex items-center justify-between rounded-md border border-primary/30 bg-primary/5 px-3 py-3">
                <span className="font-bold text-foreground">FINAL SCORE</span>
                <span className="text-xl font-bold text-warning">{final_score}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>Score Progress</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${progressPercent}%`,
                    background: "linear-gradient(90deg, hsl(188 100% 48%), hsl(38 95% 55%))",
                    boxShadow: "0 0 10px hsl(188 100% 48% / 0.5)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div className="card-base terminal-border p-6">
            <div className="mb-4 font-mono text-sm font-semibold text-foreground">Score Visualization</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(215 20% 55%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  axisLine={{ stroke: "hsl(220 25% 14%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(215 20% 55%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ScoreTooltip />} cursor={{ fill: "hsl(220 30% 12% / 0.5)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={64}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
