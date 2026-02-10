import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, LayoutDashboard, Users, FileBarChart, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2 text-primary font-semibold text-title">
            <BarChart3 className="h-5 w-5" />
            VizTec
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-body font-medium transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-card flex items-center justify-between px-6">
          <span className="text-body text-muted-foreground">Admin Panel</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-body">
              <User className="h-4 w-4 text-muted-foreground" />
              Admin
            </span>
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
