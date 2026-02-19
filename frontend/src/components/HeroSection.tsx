import { Bot, Zap, GitBranch, CheckCircle, AlertTriangle, RefreshCw, Code2, Cpu } from "lucide-react";

const problems = [
  { icon: Code2,        label: "Syntax Errors",       desc: "Unclosed brackets, missing semicolons, typos that break compilation" },
  { icon: AlertTriangle,label: "Logic Errors",         desc: "Incorrect conditions, off-by-one bugs, wrong algorithmic behavior" },
  { icon: Cpu,          label: "Type Errors",          desc: "Mismatched types, null dereferences, invalid casts in typed languages" },
  { icon: CheckCircle,  label: "Linting Issues",       desc: "Style violations, unused imports, formatting inconsistencies" },
  { icon: GitBranch,    label: "Import Errors",        desc: "Missing modules, wrong paths, circular dependency chains" },
  { icon: RefreshCw,    label: "Integration Issues",   desc: "API contract mismatches, DB migration failures, service coupling" },
];

const steps = [
  { num: "01", label: "Accepts Repo URL",    desc: "Submit your GitHub repository link" },
  { num: "02", label: "Clones & Analyzes",   desc: "AI agent clones and scans your codebase" },
  { num: "03", label: "Runs Tests",          desc: "Executes full CI/CD test suite" },
  { num: "04", label: "Detects Bugs",        desc: "Identifies all failing tests and root causes" },
  { num: "05", label: "Applies AI Fixes",    desc: "LLM generates and commits targeted patches" },
  { num: "06", label: "Triggers CI/CD",      desc: "Pushes fix branch and re-runs pipeline" },
  { num: "07", label: "Validates & Repeats", desc: "Loops until all tests pass" },
];

export const HeroSection = () => (
  <section className="relative overflow-hidden px-4 py-20 md:py-28">
    {/* Background grid */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    />

    <div className="relative mx-auto max-w-6xl">
      {/* Badge */}
      <div className="mb-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs text-cyan">
          <span className="size-2 animate-pulse rounded-full bg-primary" />
          AI-POWERED DEVOPS AUTOMATION
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-6 text-center font-mono text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
        <span className="text-cyan">AUTONOMOUS</span>{" "}
        <span className="text-foreground">CI/CD</span>
        <br />
        <span className="text-foreground">HEALING</span>{" "}
        <span className="text-success">AGENT</span>
      </h1>

      <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
        Modern CI/CD pipelines fail constantly — syntax errors, type mismatches, linting violations, broken integrations.
        Developers spend <strong className="text-foreground">hours manually debugging</strong> each failure.
        This system eliminates that entirely.{" "}
        <strong className="text-cyan">An autonomous AI agent detects, fixes, and validates pipeline failures automatically</strong> —
        so your team ships faster without firefighting.
      </p>

      {/* Stats */}
      <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { value: "∞", label: "Self-Healing Loops" },
          { value: "< 2m", label: "Avg Fix Time" },
          { value: "6+", label: "Bug Types Handled" },
          { value: "100%", label: "Automated Pipeline" },
        ].map((s) => (
          <div key={s.label} className="card-base terminal-border p-4 text-center">
            <div className="mb-1 font-mono text-2xl font-bold text-cyan">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Problem types */}
      <div className="mb-16">
        <h2 className="mb-2 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Pipeline Failures We Handle
        </h2>
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <div key={p.label} className="card-base group flex gap-3 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-primary">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <p.icon className="size-4 text-cyan" />
              </div>
              <div>
                <div className="mb-1 font-mono text-sm font-semibold text-foreground">{p.label}</div>
                <div className="text-xs leading-relaxed text-muted-foreground">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div>
        <h2 className="mb-2 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          How the Self-Healing Agent Works
        </h2>
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-success/50 to-transparent" />
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-8 md:block" />
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-surface-2 font-mono text-sm font-bold text-cyan">
                  {step.num}
                </div>
                <div className="card-base flex-1 p-3 md:p-4">
                  <div className="font-mono text-sm font-semibold text-foreground">{step.label}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
