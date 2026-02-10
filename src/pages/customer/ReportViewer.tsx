import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const demoReports: Record<string, { name: string; url: string }> = {
  "1": { name: "Sales Dashboard Q4", url: "https://app.powerbi.com/view?r=example1" },
  "2": { name: "Marketing Analytics", url: "https://app.powerbi.com/view?r=example2" },
  "3": { name: "Financial Summary", url: "https://app.powerbi.com/view?r=example3" },
};

const ReportViewer = () => {
  const { id } = useParams<{ id: string }>();
  const report = id ? demoReports[id] : null;

  if (!report) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-title font-semibold">Report not found</p>
        <Button variant="outline" asChild>
          <Link to="/customer/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/customer/dashboard"><ArrowLeft className="h-4 w-4 mr-1" />Back</Link>
        </Button>
        <h1 className="text-title font-semibold">{report.name}</h1>
      </div>
      <div className="border rounded-lg overflow-hidden bg-card" style={{ height: "calc(100vh - 160px)" }}>
        <iframe
          src={report.url}
          title={report.name}
          className="w-full h-full border-0"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  );
};

export default ReportViewer;
