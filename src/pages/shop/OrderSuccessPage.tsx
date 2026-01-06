import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockOrderService, mockInvoiceService } from '@/lib/mockServices';
import { Order, Invoice } from '@/lib/types';
import { CheckCircle, Download, Copy, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (orderId) loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    const o = await mockOrderService.getById(orderId!);
    if (o) {
      setOrder(o);
      const inv = await mockInvoiceService.getByOrder(orderId!);
      setInvoice(inv || null);
    }
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const copyOrderId = () => { navigator.clipboard.writeText(orderId || ''); toast({ title: 'Order ID copied!' }); };

  if (!order) return <div className="container py-16 text-center">Loading...</div>;

  return (
    <div className="container py-8 max-w-2xl animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="text-muted-foreground">Your order has been confirmed</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-mono font-bold">{order.id}</p>
            </div>
            <Button variant="outline" size="sm" onClick={copyOrderId}><Copy className="h-4 w-4 mr-1" /> Copy</Button>
          </div>
          <div className="border-t pt-4 space-y-2">
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between">
                <span>{product.name} × {quantity}</span>
                <span>{formatCurrency(product.price * quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-bold"><span>Total (incl. tax)</span><span>{formatCurrency(order.total * 1.18)}</span></div>
          </div>
        </CardContent>
      </Card>

      {invoice && (
        <Card className="mb-6 border-dashed">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Invoice #{invoice.invoiceNumber}</p>
              <p className="text-sm text-muted-foreground">Demo Invoice – For Testing Only</p>
            </div>
            <Button variant="outline" onClick={() => toast({ title: 'Invoice downloaded (mock)' })}><Download className="h-4 w-4 mr-1" /> Download</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button asChild className="flex-1"><Link to="/track"><Truck className="h-4 w-4 mr-1" /> Track Order</Link></Button>
        <Button variant="outline" asChild className="flex-1"><Link to="/shop">Continue Shopping</Link></Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
