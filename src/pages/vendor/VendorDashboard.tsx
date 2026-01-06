import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { mockStatsService, mockProductService } from '@/lib/mockServices';
import { Product } from '@/lib/types';
import { Package, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalProducts: 0, activeProducts: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    const [statsData, productsData] = await Promise.all([
      mockStatsService.getVendorStats(user!.id),
      mockProductService.getByVendor(user!.id),
    ]);
    setStats(statsData);
    setProducts(productsData);
    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-muted rounded-lg" />
            <div className="h-24 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Vendor Dashboard</h1>
        <p className="page-description">Welcome back, {user?.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-vendor/10">
              <Package className="h-5 w-5 text-vendor" />
            </div>
            <div>
              <p className="metric-label">Total Products</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="metric-label">Active</p>
              <p className="text-2xl font-bold">{stats.activeProducts}</p>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-destructive/10">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="metric-label">Inactive</p>
              <p className="text-2xl font-bold">{stats.totalProducts - stats.activeProducts}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Products List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Products</CardTitle>
          <Button asChild>
            <Link to="/vendor/products">Manage Products</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(product.price)}</p>
                  <span className={product.active ? 'status-badge status-success' : 'status-badge status-error'}>
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No products yet. Add your first product!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboard;
