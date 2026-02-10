import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-heading font-bold">Ready to simplify your dashboard sharing?</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Join VizTec today and deliver polished, branded analytics experiences to your clients.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/register-admin">Register as Admin</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 text-caption text-muted-foreground pt-4 border-t">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="font-medium">VizTec</span>
        </div>
        <p>© {new Date().getFullYear()} VizTec. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
