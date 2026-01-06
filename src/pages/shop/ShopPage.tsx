import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProductService } from '@/lib/mockServices';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Search, ShoppingCart, Filter } from 'lucide-react';

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await mockProductService.getActive();
    setProducts(data);
    setLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({ title: 'Added to cart', description: product.name });
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="container py-8"><div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4">{[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-muted rounded-lg" />)}</div></div>;
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="page-header"><h1 className="page-title">Software Shop</h1><p className="page-description">Enterprise software solutions</p></div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(cat)} className="capitalize">
              {cat}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <div className="aspect-video relative overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <CardContent className="p-4">
              <span className="status-badge status-pending text-xs">{product.category}</span>
              <h3 className="font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xl font-bold">{formatCurrency(product.price)}</p>
                <Button size="sm" onClick={() => handleAddToCart(product)}><ShoppingCart className="h-4 w-4 mr-1" /> Add</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
