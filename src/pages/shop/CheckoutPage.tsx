import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrderService, mockInvoiceService, mockPaymentService } from '@/lib/mockServices';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user, setDemoUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: user?.name || 'Demo Customer', email: user?.email || 'customer@demo.com' });

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const grandTotal = total * 1.18;

  const handlePayment = async () => {
    if (items.length === 0) return;
    setProcessing(true);
    
    // Ensure customer role
    if (!user || user.role !== 'customer') {
      setDemoUser('customer');
    }
    
    // Simulate payment
    const payment = await mockPaymentService.processPayment(grandTotal);
    
    if (payment.success) {
      // Create order
      const order = await mockOrderService.create('customer-1', customerInfo.name, customerInfo.email, items);
      // Create invoice
      await mockInvoiceService.create(order);
      clearCart();
      toast({ title: 'Payment Successful!', description: `Order ${order.id} created` });
      navigate(`/order/${order.id}`);
    } else {
      toast({ title: 'Payment Failed', variant: 'destructive' });
    }
    setProcessing(false);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container py-8 max-w-2xl animate-fade-in">
      <h1 className="page-title mb-6">Checkout</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Customer Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Name</Label><Input value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} /></div>
              <div className="space-y-2"><Label>Email</Label><Input value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between py-2 border-b last:border-0">
                <span>{product.name} × {quantity}</span>
                <span>{formatCurrency(product.price * quantity)}</span>
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(total)}</span></div>
              <div className="flex justify-between"><span>Tax (18%)</span><span>{formatCurrency(total * 0.18)}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>{formatCurrency(grandTotal)}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed">
          <CardContent className="p-6 text-center">
            <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">Mock Payment Gateway (Razorpay Simulation)</p>
            <Button size="lg" className="w-full" onClick={handlePayment} disabled={processing}>
              {processing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : <>Pay {formatCurrency(grandTotal)} (Mock)</>}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Demo only – no real payment</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
