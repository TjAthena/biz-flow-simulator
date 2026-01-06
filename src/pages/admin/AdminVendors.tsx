import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVendorService, mockProductService } from '@/lib/mockServices';
import { Vendor, Product } from '@/lib/types';
import { Search, Store } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [vendorsData, productsData] = await Promise.all([
      mockVendorService.getAll(),
      mockProductService.getAll(),
    ]);
    setVendors(vendorsData);
    setProducts(productsData);
    setLoading(false);
  };

  const getVendorProducts = (vendorId: string) => {
    return products.filter(p => p.vendorId === vendorId);
  };

  const filteredVendors = vendors.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Vendors</h1>
        <p className="page-description">Manage vendor accounts and products</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredVendors.map((vendor) => {
              const vendorProducts = getVendorProducts(vendor.id);
              const activeProducts = vendorProducts.filter(p => p.active).length;
              
              return (
                <Card key={vendor.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-vendor/10">
                        <Store className="h-6 w-6 text-vendor" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <p className="text-sm text-muted-foreground">{vendor.email}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Products: </span>
                            <span className="font-medium">{vendorProducts.length}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Active: </span>
                            <span className="font-medium text-success">{activeProducts}</span>
                          </div>
                          <span className={vendor.status === 'active' ? 'status-badge status-success' : 'status-badge status-error'}>
                            {vendor.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVendors;
