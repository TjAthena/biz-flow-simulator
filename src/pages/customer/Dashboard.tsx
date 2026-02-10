import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart } from "lucide-react";

const demoReports = [
  { id: "1", name: "Sales Dashboard Q4", description: "Quarterly sales performance overview" },
  { id: "2", name: "Marketing Analytics", description: "Campaign performance and channel metrics" },
  { id: "3", name: "Financial Summary", description: "Revenue, expenses, and profitability" },
];

const CustomerDashboard = () => (
  <div className="space-y-6 max-w-4xl">
    <div>
      <h1 className="text-heading font-bold">My Reports</h1>
      <p className="text-body text-muted-foreground">Access the dashboards assigned to you.</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {demoReports.map((r) => (
        <Card key={r.id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6 space-y-3">
            <FileBarChart className="h-8 w-8 text-primary" />
            <h3 className="font-semibold text-title">{r.name}</h3>
            <p className="text-caption text-muted-foreground">{r.description}</p>
            <Button size="sm" asChild className="w-full">
              <Link to={`/customer/reports/${r.id}`}>View Report</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      {demoReports.length === 0 && (
        <p className="text-muted-foreground col-span-full text-center py-12">No reports assigned yet.</p>
      )}
    </div>
  </div>
);

export default CustomerDashboard;
