import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileBarChart } from "lucide-react";

const AdminDashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-heading font-bold">Welcome back!</h1>
      <p className="text-body text-muted-foreground">Manage your customers and reports from here.</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
      <Link to="/admin/customers">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6 flex flex-col items-center gap-3">
            <Users className="h-10 w-10 text-primary" />
            <h2 className="font-semibold text-title">Manage Customers</h2>
            <p className="text-caption text-muted-foreground text-center">Create, edit, and manage your client accounts.</p>
          </CardContent>
        </Card>
      </Link>
      <Link to="/admin/reports">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6 flex flex-col items-center gap-3">
            <FileBarChart className="h-10 w-10 text-primary" />
            <h2 className="font-semibold text-title">Manage Reports</h2>
            <p className="text-caption text-muted-foreground text-center">Add dashboards and assign them to customers.</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  </div>
);

export default AdminDashboard;
