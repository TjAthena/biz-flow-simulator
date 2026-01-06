import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { mockOrderService, mockDeliveryService, mockInvoiceService } from '@/lib/mockServices';
import { Order, DeliveryPartner, Invoice } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Search, FileText, Truck, Eye, Download } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState('');
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
    setDeliveryPartners(partnersData);
    setLoading(false);
  };

  const handleAssignDelivery = async () => {
    if (!selectedOrder || !selectedPartnerId) return;
    
    const partner = deliveryPartners.find(p => p.id === selectedPartnerId);
    if (!partner) return;

    await mockOrderService.assignDeliveryPartner(selectedOrder.id, partner.id, partner.name);
    await loadData();
    setAssignDialogOpen(false);
    setSelectedOrder(null);
    setSelectedPartnerId('');
    toast({ title: 'Delivery partner assigned' });
  };

  const handleViewInvoice = async (order: Order) => {
    let invoice = await mockInvoiceService.getByOrder(order.id);
    if (!invoice) {
      invoice = await mockInvoiceService.create(order);
    }
    setSelectedInvoice(invoice);
    setInvoiceDialogOpen(true);
  };

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
      paid: 'status-badge status-success',
      failed: 'status-badge status-error',
      refunded: 'status-badge status-pending',
    };
    return <span className={styles[status] || 'status-badge status-pending'}>{status}</span>;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <h1 className="page-title">Orders</h1>
        <p className="page-description">View and manage all orders</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-sm">{order.id}</td>
                    <td>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td>{order.items.length} item(s)</td>
                    <td className="font-medium">{formatCurrency(order.total)}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{getStatusBadge(order.paymentStatus)}</td>
                    <td>
                      {order.deliveryPartnerName ? (
                        <div>
                          <p className="text-sm">{order.deliveryPartnerName}</p>
                          {order.deliveryStatus && getStatusBadge(order.deliveryStatus)}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not assigned</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewInvoice(order)}
                          title="View Invoice"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        {!order.deliveryPartnerId && order.paymentStatus === 'paid' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedOrder(order);
                              setAssignDialogOpen(true);
                            }}
                            title="Assign Delivery"
                          >
                            <Truck className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Delivery Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Delivery Partner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Assign a delivery partner to order <strong>{selectedOrder?.id}</strong>
            </p>
            <Select value={selectedPartnerId} onValueChange={setSelectedPartnerId}>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery partner" />
              </SelectTrigger>
              <SelectContent>
                {deliveryPartners.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id}>
                    <div className="flex items-center gap-2">
                      <span>{partner.name}</span>
                      <span className={`text-xs ${partner.status === 'available' ? 'text-success' : 'text-muted-foreground'}`}>
                        ({partner.status})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignDelivery} disabled={!selectedPartnerId}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog open={invoiceDialogOpen} onOpenChange={setInvoiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="invoice-container border-0 p-0">
              <div className="flex justify-between items-start mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-xl font-bold">INVOICE</h2>
                  <p className="text-muted-foreground text-sm mt-1">Demo Invoice – For Testing Only</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{selectedInvoice.invoiceNumber}</p>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.createdAt}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Bill To:</p>
                  <p className="font-medium">{selectedInvoice.customerName}</p>
                  <p className="text-sm">{selectedInvoice.customerEmail}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Order ID:</p>
                  <p className="font-mono text-sm">{selectedInvoice.orderId}</p>
                </div>
              </div>

              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-muted-foreground font-medium">Item</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Qty</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Price</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2">{item.name}</td>
                      <td className="py-2 text-center">{item.quantity}</td>
                      <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                      <td className="py-2 text-right">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right space-y-1">
                <p className="text-sm">Subtotal: {formatCurrency(selectedInvoice.subtotal)}</p>
                <p className="text-sm">Tax (18% GST): {formatCurrency(selectedInvoice.tax)}</p>
                <p className="text-lg font-bold">Total: {formatCurrency(selectedInvoice.total)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setInvoiceDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => toast({ title: 'Invoice downloaded (mock)' })}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
