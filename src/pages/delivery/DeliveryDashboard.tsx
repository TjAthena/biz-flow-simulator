import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrderService, mockStatsService } from '@/lib/mockServices';
import { Order } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Truck, Package, CheckCircle, Clock } from 'lucide-react';

const DeliveryDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ assignedDeliveries: 0, completedDeliveries: 0, inTransit: 0 });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    const [ordersData, statsData] = await Promise.all([
      mockOrderService.getByDeliveryPartner(user!.id),
      mockStatsService.getDeliveryStats(user!.id),
    ]);
    setOrders(ordersData);
    setStats(statsData);
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId: string, status: Order['deliveryStatus'], remarks?: string) => {
    await mockOrderService.updateDeliveryStatus(orderId, status, remarks);
    await loadData();
    toast({ title: 'Status updated' });
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  if (loading) return <div className="container py-8"><div className="animate-pulse h-64 bg-muted rounded-lg" /></div>;

  return (
    <div className="container py-8 animate-fade-in">
      <div className="page-header"><h1 className="page-title">Delivery Dashboard</h1><p className="page-description">Welcome, {user?.name}</p></div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="metric-card"><div className="flex items-center gap-3"><div className="p-2 rounded-md bg-delivery/10"><Truck className="h-5 w-5 text-delivery" /></div><div><p className="metric-label">Assigned</p><p className="text-2xl font-bold">{stats.assignedDeliveries}</p></div></div></Card>
        <Card className="metric-card"><div className="flex items-center gap-3"><div className="p-2 rounded-md bg-warning/10"><Clock className="h-5 w-5 text-warning" /></div><div><p className="metric-label">In Transit</p><p className="text-2xl font-bold">{stats.inTransit}</p></div></div></Card>
        <Card className="metric-card"><div className="flex items-center gap-3"><div className="p-2 rounded-md bg-success/10"><CheckCircle className="h-5 w-5 text-success" /></div><div><p className="metric-label">Completed</p><p className="text-2xl font-bold">{stats.completedDeliveries}</p></div></div></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Your Deliveries</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div><p className="font-mono font-medium">{order.id}</p><p className="text-sm text-muted-foreground">{order.customerName}</p></div>
                  <span className={`status-badge ${order.deliveryStatus === 'delivered' ? 'status-success' : order.deliveryStatus === 'delayed' ? 'status-error' : 'status-warning'}`}>{order.deliveryStatus?.replace('_', ' ')}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-3">{order.items.map(i => i.product.name).join(', ')}</div>
                {order.deliveryStatus !== 'delivered' && (
                  <div className="flex gap-2">
                    <Select onValueChange={(v) => handleStatusUpdate(order.id, v as Order['deliveryStatus'])}>
                      <SelectTrigger className="w-40"><SelectValue placeholder="Update status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="delayed">Delayed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {orders.length === 0 && <p className="text-center text-muted-foreground py-8">No deliveries assigned yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryDashboard;
