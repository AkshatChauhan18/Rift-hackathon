import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardData } from "@/types/dashboard";

interface JsonDownloadProps {
  data: DashboardData;
}

export default function JsonDownload({ data }: JsonDownloadProps) {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.branch_name}_results.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" className="gap-2" onClick={handleDownload}>
      <Download className="w-4 h-4" />
      Download Results JSON
    </Button>
  );
}
