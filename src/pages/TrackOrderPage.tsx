import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockOrderService } from '@/lib/mockServices';
import { Order } from '@/lib/types';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async () => {
    setSearched(true);
    const o = await mockOrderService.getById(orderId);
    setOrder(o || null);
  };

  const getStatusStep = (status?: string) => {
    const steps = ['assigned', 'in_transit', 'delivered'];
    return steps.indexOf(status || '') + 1;
  };

  return (
    <div className="container py-8 max-w-xl animate-fade-in">
      <div className="page-header text-center"><h1 className="page-title">Track Your Order</h1><p className="page-description">Enter your order ID to check delivery status</p></div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input placeholder="Enter Order ID (e.g., ORD-00000001)" value={orderId} onChange={e => setOrderId(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleTrack()} />
            <Button onClick={handleTrack}><Search className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>

      {searched && !order && <Card><CardContent className="p-8 text-center text-muted-foreground">Order not found. Please check the ID.</CardContent></Card>}

      {order && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{order.id}</span>
              <span className={order.status === 'delivered' ? 'status-badge status-success' : 'status-badge status-warning'}>{order.status}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Customer: {order.customerName}</p>
              <p className="text-sm text-muted-foreground">Items: {order.items.map(i => i.product.name).join(', ')}</p>
            </div>

            {order.deliveryStatus && (
              <div className="space-y-4">
                <h4 className="font-medium">Delivery Progress</h4>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
                  {[
                    { status: 'assigned', icon: Package, label: 'Order Assigned' },
                    { status: 'in_transit', icon: Truck, label: 'In Transit' },
                    { status: 'delivered', icon: CheckCircle, label: 'Delivered' },
                  ].map((step, idx) => {
                    const isActive = getStatusStep(order.deliveryStatus) > idx;
                    const isCurrent = order.deliveryStatus === step.status;
                    return (
                      <div key={step.status} className="relative flex items-center gap-4 pb-4">
                        <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                          <step.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={`font-medium ${isActive ? '' : 'text-muted-foreground'}`}>{step.label}</p>
                          {isCurrent && order.deliveryPartnerName && <p className="text-sm text-muted-foreground">Partner: {order.deliveryPartnerName}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {order.deliveryRemarks && <div className="bg-muted p-3 rounded-md"><p className="text-sm"><strong>Remarks:</strong> {order.deliveryRemarks}</p></div>}
                <p className="text-xs text-muted-foreground">Last updated: {order.updatedAt}</p>
              </div>
            )}
            {!order.deliveryStatus && <p className="text-muted-foreground">Delivery not yet assigned.</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackOrderPage;
