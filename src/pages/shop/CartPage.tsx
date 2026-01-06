import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Browse our products and add items to your cart</p>
        <Button asChild><Link to="/shop">Continue Shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="page-title mb-6">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <Card key={product.id}>
              <CardContent className="p-4 flex gap-4">
                <img src={product.image} alt={product.name} className="h-20 w-20 rounded-md object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.vendorName}</p>
                  <p className="font-bold mt-1">{formatCurrency(product.price)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}><Minus className="h-3 w-3" /></Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus className="h-3 w-3" /></Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeFromCart(product.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="h-fit">
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(total)}</span></div>
            <div className="flex justify-between"><span>Tax (18% GST)</span><span>{formatCurrency(total * 0.18)}</span></div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(total * 1.18)}</span></div>
            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
