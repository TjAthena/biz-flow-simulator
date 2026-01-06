import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import AppShell from "@/components/layout/AppShell";

// Pages
import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminVendors from "@/pages/admin/AdminVendors";
import AdminDeliveries from "@/pages/admin/AdminDeliveries";
import AdminCareers from "@/pages/admin/AdminCareers";
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import VendorProducts from "@/pages/vendor/VendorProducts";
import DeliveryDashboard from "@/pages/delivery/DeliveryDashboard";
import ShopPage from "@/pages/shop/ShopPage";
import CartPage from "@/pages/shop/CartPage";
import CheckoutPage from "@/pages/shop/CheckoutPage";
import OrderSuccessPage from "@/pages/shop/OrderSuccessPage";
import TrackOrderPage from "@/pages/TrackOrderPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppShell>
              <Routes>
                <Route path="/" element={<Navigate to="/shop" replace />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/vendors" element={<AdminVendors />} />
                <Route path="/admin/deliveries" element={<AdminDeliveries />} />
                <Route path="/admin/careers" element={<AdminCareers />} />
                
                {/* Vendor Routes */}
                <Route path="/vendor" element={<VendorDashboard />} />
                <Route path="/vendor/products" element={<VendorProducts />} />
                
                {/* Delivery Routes */}
                <Route path="/delivery" element={<DeliveryDashboard />} />
                <Route path="/delivery/orders" element={<DeliveryDashboard />} />
                
                {/* Customer/Shop Routes */}
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/:orderId" element={<OrderSuccessPage />} />
                <Route path="/orders" element={<ShopPage />} />
                
                {/* Public */}
                <Route path="/track" element={<TrackOrderPage />} />
                <Route path="/careers" element={<AdminCareers />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppShell>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
