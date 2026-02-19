import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { ScoreBreakdown as ScoreBreakdownType } from "@/types/dashboard";

interface ScoreBreakdownProps {
  score: ScoreBreakdownType;
}

export default function ScoreBreakdown({ score }: ScoreBreakdownProps) {
  const chartData = [
    { name: "Base", value: score.baseScore, color: "hsl(187, 80%, 45%)" },
    { name: "Speed Bonus", value: Math.abs(score.speedBonus), color: "hsl(152, 60%, 42%)" },
    { name: "Penalty", value: Math.abs(score.efficiencyPenalty), color: "hsl(0, 72%, 51%)" },
  ];

  const pct = Math.min(score.finalScore, 120);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-6 space-y-4"
    >
      <h2 className="section-title">Score Breakdown</h2>
      <div className="flex items-center gap-8">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gradient-primary">{score.finalScore}</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <ScoreRow label="Base Score" value={score.baseScore} positive />
          <ScoreRow label="Speed Bonus" value={score.speedBonus} positive />
          <ScoreRow label="Efficiency Penalty" value={score.efficiencyPenalty} positive={false} />
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Final Score</span>
              <span className="text-lg font-bold text-gradient-primary">{score.finalScore}</span>
            </div>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(pct / 120) * 100}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-success"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScoreRow({ label, value, positive }: { label: string; value: number; positive: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={positive ? "text-success" : "text-destructive"}>
        {value > 0 && positive ? "+" : ""}
        {value}
      </span>
    </div>
  );
}
