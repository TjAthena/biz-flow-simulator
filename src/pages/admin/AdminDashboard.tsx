import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockStatsService, mockOrderService, mockProductService } from '@/lib/mockServices';
import { Order, Product } from '@/lib/types';
import { Package, Users, FileText, Truck, DollarSign, Clock, ArrowRight, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalVendors: 0,
    totalOrders: 0,
    totalDeliveries: 0,
    revenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [statsData, orders, prods] = await Promise.all([
        mockStatsService.getAdminStats(),
        mockOrderService.getAll(),
        mockProductService.getAll(),
      ]);
      setStats(statsData);
      setRecentOrders(orders.slice(0, 5));
      setProducts(prods);
      setLoading(false);
    };
    loadData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'status-badge status-pending',
      confirmed: 'status-badge status-warning',
      processing: 'status-badge status-warning',
      shipped: 'status-badge status-success',
      delivered: 'status-badge status-success',
      cancelled: 'status-badge status-error',
    };
    return <span className={styles[status] || 'status-badge status-pending'}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-description">Overview of your enterprise platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="metric-label">Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-vendor/10">
              <Users className="h-5 w-5 text-vendor" />
            </div>
            <div>
              <p className="metric-label">Vendors</p>
              <p className="text-2xl font-bold">{stats.totalVendors}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-customer/10">
              <FileText className="h-5 w-5 text-customer" />
            </div>
            <div>
              <p className="metric-label">Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-delivery/10">
              <Truck className="h-5 w-5 text-delivery" />
            </div>
            <div>
              <p className="metric-label">Delivered</p>
              <p className="text-2xl font-bold">{stats.totalDeliveries}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-success/10">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="metric-label">Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.revenue)}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="metric-label">Pending</p>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/orders">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(order.total)}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Products Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Products Overview</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/products">
                Manage <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.vendorName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(product.price)}</p>
                    <span className={product.active ? 'status-badge status-success' : 'status-badge status-error'}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/admin/products">
                <Package className="mr-2 h-4 w-4" /> Manage Products
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/orders">
                <FileText className="mr-2 h-4 w-4" /> View Orders
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/vendors">
                <Users className="mr-2 h-4 w-4" /> Manage Vendors
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/deliveries">
                <Truck className="mr-2 h-4 w-4" /> Assign Deliveries
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/careers">
                <TrendingUp className="mr-2 h-4 w-4" /> Manage Careers
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
