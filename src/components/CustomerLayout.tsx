import { Link, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, LogOut, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-14 border-b bg-card flex items-center justify-between px-6">
        <Link to="/customer/dashboard" className="flex items-center gap-2 text-primary font-semibold text-title">
          <BarChart3 className="h-5 w-5" />
          VizTec
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/customer/change-password">
              <KeyRound className="h-4 w-4 mr-1" />
              Change Password
            </Link>
          </Button>
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
  );
};

export default CustomerLayout;
