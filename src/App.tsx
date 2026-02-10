import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RegisterAdmin from "./pages/RegisterAdmin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCustomers from "./pages/admin/Customers";
import AdminReports from "./pages/admin/Reports";
import CustomerLayout from "./components/CustomerLayout";
import CustomerDashboard from "./pages/customer/Dashboard";
import ReportViewer from "./pages/customer/ReportViewer";
import ChangePassword from "./pages/customer/ChangePassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="reports/:id" element={<ReportViewer />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
