import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      <div className="relative">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-medium">Agent analyzing repository…</p>
        <p className="text-xs text-muted-foreground">Running CI/CD pipeline and detecting failures</p>
      </div>
    </motion.div>
  );
}
