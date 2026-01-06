import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockOrderService, mockDeliveryService } from '@/lib/mockServices';
import { Order, DeliveryPartner } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Search, Truck } from 'lucide-react';

const AdminDeliveries = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [ordersData, partnersData] = await Promise.all([
      mockOrderService.getAll(),
      mockDeliveryService.getAll(),
    ]);
    setOrders(ordersData);
    setPartners(partnersData);
    setLoading(false);
  };

  const handleAssign = async (orderId: string, partnerId: string) => {
    const partner = partners.find(p => p.id === partnerId);
    if (!partner) return;
    
    await mockOrderService.assignDeliveryPartner(orderId, partner.id, partner.name);
    await loadData();
    toast({ title: 'Delivery partner assigned' });
  };

  const handleUpdateStatus = async (orderId: string, status: Order['deliveryStatus']) => {
    await mockOrderService.updateDeliveryStatus(orderId, status);
    await loadData();
    toast({ title: 'Delivery status updated' });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      assigned: 'status-badge status-warning',
      in_transit: 'status-badge status-warning',
      delivered: 'status-badge status-success',
      delayed: 'status-badge status-error',
    };
    return <span className={styles[status] || 'status-badge status-pending'}>{status?.replace('_', ' ')}</span>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const ordersWithDelivery = orders.filter(o => o.paymentStatus === 'paid');
  const filteredOrders = ordersWithDelivery.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="page-title">Deliveries</h1>
        <p className="page-description">Assign and manage order deliveries</p>
      </div>

      {/* Delivery Partners Overview */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-delivery/10">
                  <Truck className="h-5 w-5 text-delivery" />
                </div>
                <div>
                  <p className="font-medium">{partner.name}</p>
                  <p className="text-sm text-muted-foreground">{partner.phone}</p>
                </div>
                <span className={`ml-auto ${partner.status === 'available' ? 'status-badge status-success' : 'status-badge status-pending'}`}>
                  {partner.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Delivery Partner</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-sm">{order.id}</td>
                    <td>{order.customerName}</td>
                    <td className="font-medium">{formatCurrency(order.total)}</td>
                    <td>
                      {order.deliveryPartnerId ? (
                        <span>{order.deliveryPartnerName}</span>
                      ) : (
                        <Select onValueChange={(value) => handleAssign(order.id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Assign..." />
                          </SelectTrigger>
                          <SelectContent>
                            {partners.map((p) => (
                              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                    <td>
                      {order.deliveryStatus ? getStatusBadge(order.deliveryStatus) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </td>
                    <td>
                      {order.deliveryPartnerId && order.deliveryStatus !== 'delivered' && (
                        <Select
                          value={order.deliveryStatus}
                          onValueChange={(value) => handleUpdateStatus(order.id, value as Order['deliveryStatus'])}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assigned">Assigned</SelectItem>
                            <SelectItem value="in_transit">In Transit</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="delayed">Delayed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDeliveries;
