import { Bot, Github, Zap } from "lucide-react";

export const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-md border border-primary/30 bg-primary/10 shadow-primary">
          <Bot className="size-4 text-cyan" />
        </div>
        <div>
          <div className="font-mono text-sm font-bold leading-none text-foreground">CI/CD Healing Agent</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Autonomous DevOps</div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="hidden items-center gap-1.5 font-mono text-xs text-success md:flex">
          <span className="size-2 animate-pulse rounded-full bg-success" />
          AGENT READY
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
        >
          <Github className="size-3.5" />
          GitHub
        </a>
        <span className="flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 font-mono text-[10px] font-bold text-warning">
          <Zap className="size-3" />
          v1.0
        </span>
      </div>
    </div>
  </nav>
);
