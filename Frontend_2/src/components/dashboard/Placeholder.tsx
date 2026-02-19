export default function Placeholder() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        <span className="text-2xl">🤖</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">Ready to Heal</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Enter a GitHub repository URL above and run the agent to automatically detect and fix CI/CD failures.
      </p>
    </div>
  );
}
