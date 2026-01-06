import { Product, Order, Invoice, Vendor, DeliveryPartner, Job, User, CartItem } from './types';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);
const generateInvoiceNumber = () => `INV-${Date.now().toString().slice(-8)}`;
const generateOrderId = () => `ORD-${Date.now().toString().slice(-8)}`;

// Mock Users
export const mockUsers: User[] = [
  { id: 'admin-1', email: 'admin@demo.com', name: 'Admin User', role: 'admin' },
  { id: 'vendor-1', email: 'vendor@demo.com', name: 'TechSoft Inc.', role: 'vendor' },
  { id: 'vendor-2', email: 'vendor2@demo.com', name: 'CloudApps Co.', role: 'vendor' },
  { id: 'delivery-1', email: 'delivery@demo.com', name: 'John Driver', role: 'delivery' },
  { id: 'delivery-2', email: 'delivery2@demo.com', name: 'Mike Runner', role: 'delivery' },
  { id: 'customer-1', email: 'customer@demo.com', name: 'Jane Customer', role: 'customer' },
];

// Mock Products
let mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Enterprise CRM Suite',
    description: 'Complete customer relationship management solution with analytics, automation, and integrations.',
    price: 29999,
    category: 'CRM',
    vendorId: 'vendor-1',
    vendorName: 'TechSoft Inc.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    active: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'prod-2',
    name: 'Cloud ERP System',
    description: 'Integrated enterprise resource planning with finance, HR, and supply chain modules.',
    price: 49999,
    category: 'ERP',
    vendorId: 'vendor-1',
    vendorName: 'TechSoft Inc.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    active: true,
    createdAt: '2024-01-20',
  },
  {
    id: 'prod-3',
    name: 'Security Suite Pro',
    description: 'Enterprise-grade cybersecurity solution with threat detection and response.',
    price: 19999,
    category: 'Security',
    vendorId: 'vendor-2',
    vendorName: 'CloudApps Co.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    active: true,
    createdAt: '2024-02-01',
  },
  {
    id: 'prod-4',
    name: 'Analytics Dashboard',
    description: 'Real-time business intelligence and data visualization platform.',
    price: 14999,
    category: 'Analytics',
    vendorId: 'vendor-2',
    vendorName: 'CloudApps Co.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    active: true,
    createdAt: '2024-02-10',
  },
  {
    id: 'prod-5',
    name: 'Project Management Tool',
    description: 'Collaborative project management with Gantt charts, sprints, and team collaboration.',
    price: 9999,
    category: 'Productivity',
    vendorId: 'vendor-1',
    vendorName: 'TechSoft Inc.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop',
    active: true,
    createdAt: '2024-02-15',
  },
  {
    id: 'prod-6',
    name: 'HR Management System',
    description: 'Complete human resources solution with payroll, attendance, and performance tracking.',
    price: 24999,
    category: 'HR',
    vendorId: 'vendor-2',
    vendorName: 'CloudApps Co.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
    active: false,
    createdAt: '2024-02-20',
  },
];

// Mock Vendors
let mockVendors: Vendor[] = [
  { id: 'vendor-1', name: 'TechSoft Inc.', email: 'vendor@demo.com', company: 'TechSoft Inc.', productsCount: 3, status: 'active' },
  { id: 'vendor-2', name: 'CloudApps Co.', email: 'vendor2@demo.com', company: 'CloudApps Co.', productsCount: 3, status: 'active' },
];

// Mock Delivery Partners
let mockDeliveryPartners: DeliveryPartner[] = [
  { id: 'delivery-1', name: 'John Driver', email: 'delivery@demo.com', phone: '+1 555-0101', status: 'available', deliveriesCount: 45 },
  { id: 'delivery-2', name: 'Mike Runner', email: 'delivery2@demo.com', phone: '+1 555-0102', status: 'available', deliveriesCount: 32 },
];

// Mock Orders
let mockOrders: Order[] = [
  {
    id: 'ORD-00000001',
    customerId: 'customer-1',
    customerName: 'Jane Customer',
    customerEmail: 'customer@demo.com',
    items: [{ product: mockProducts[0], quantity: 1 }],
    total: 29999,
    status: 'delivered',
    paymentStatus: 'paid',
    deliveryPartnerId: 'delivery-1',
    deliveryPartnerName: 'John Driver',
    deliveryStatus: 'delivered',
    createdAt: '2024-02-01',
    updatedAt: '2024-02-05',
  },
  {
    id: 'ORD-00000002',
    customerId: 'customer-1',
    customerName: 'Jane Customer',
    customerEmail: 'customer@demo.com',
    items: [{ product: mockProducts[2], quantity: 1 }, { product: mockProducts[3], quantity: 1 }],
    total: 34998,
    status: 'shipped',
    paymentStatus: 'paid',
    deliveryPartnerId: 'delivery-2',
    deliveryPartnerName: 'Mike Runner',
    deliveryStatus: 'in_transit',
    createdAt: '2024-02-10',
    updatedAt: '2024-02-12',
  },
];

// Mock Invoices
let mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    orderId: 'ORD-00000001',
    invoiceNumber: 'INV-00000001',
    customerName: 'Jane Customer',
    customerEmail: 'customer@demo.com',
    items: [{ name: 'Enterprise CRM Suite', quantity: 1, price: 29999, total: 29999 }],
    subtotal: 29999,
    tax: 5400,
    total: 35399,
    createdAt: '2024-02-01',
  },
];

// Mock Jobs
let mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    description: 'We are looking for an experienced software engineer to join our team.',
    requirements: ['5+ years experience', 'React/TypeScript', 'Node.js', 'Cloud platforms'],
    active: true,
    createdAt: '2024-02-01',
  },
  {
    id: 'job-2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'full-time',
    description: 'Lead product strategy and roadmap for our enterprise solutions.',
    requirements: ['3+ years PM experience', 'B2B SaaS background', 'Strong analytics skills'],
    active: true,
    createdAt: '2024-02-05',
  },
];

// Cart state (in-memory)
let cart: CartItem[] = [];

// ============ MOCK SERVICES ============

// Auth Service
export const mockAuthService = {
  login: (email: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password !== 'demo123') {
          resolve(null);
          return;
        }
        const user = mockUsers.find(u => u.email === email);
        resolve(user || null);
      }, 500);
    });
  },
  
  logout: (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  },
};

// Product Service
export const mockProductService = {
  getAll: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockProducts]), 300);
    });
  },
  
  getActive: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts.filter(p => p.active)), 300);
    });
  },
  
  getByVendor: (vendorId: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts.filter(p => p.vendorId === vendorId)), 300);
    });
  },
  
  getById: (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts.find(p => p.id === id)), 200);
    });
  },
  
  create: (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    return new Promise((resolve) => {
      const newProduct: Product = {
        ...product,
        id: `prod-${generateId()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      mockProducts.push(newProduct);
      setTimeout(() => resolve(newProduct), 300);
    });
  },
  
  update: (id: string, updates: Partial<Product>): Promise<Product | null> => {
    return new Promise((resolve) => {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        resolve(null);
        return;
      }
      mockProducts[index] = { ...mockProducts[index], ...updates };
      setTimeout(() => resolve(mockProducts[index]), 300);
    });
  },
  
  delete: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        resolve(false);
        return;
      }
      mockProducts.splice(index, 1);
      setTimeout(() => resolve(true), 200);
    });
  },
};

// Cart Service
export const mockCartService = {
  getCart: (): CartItem[] => cart,
  
  addToCart: (product: Product, quantity: number = 1): CartItem[] => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    return [...cart];
  },
  
  updateQuantity: (productId: string, quantity: number): CartItem[] => {
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    return [...cart];
  },
  
  removeFromCart: (productId: string): CartItem[] => {
    cart = cart.filter(item => item.product.id !== productId);
    return [...cart];
  },
  
  clearCart: (): void => {
    cart = [];
  },
  
  getTotal: (): number => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  },
};

// Order Service
export const mockOrderService = {
  getAll: (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockOrders]), 300);
    });
  },
  
  getByCustomer: (customerId: string): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrders.filter(o => o.customerId === customerId)), 300);
    });
  },
  
  getByDeliveryPartner: (partnerId: string): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrders.filter(o => o.deliveryPartnerId === partnerId)), 300);
    });
  },
  
  getById: (id: string): Promise<Order | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrders.find(o => o.id === id)), 200);
    });
  },
  
  create: (customerId: string, customerName: string, customerEmail: string, items: CartItem[]): Promise<Order> => {
    return new Promise((resolve) => {
      const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const newOrder: Order = {
        id: generateOrderId(),
        customerId,
        customerName,
        customerEmail,
        items: [...items],
        total,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      mockOrders.unshift(newOrder);
      setTimeout(() => resolve(newOrder), 500);
    });
  },
  
  update: (id: string, updates: Partial<Order>): Promise<Order | null> => {
    return new Promise((resolve) => {
      const index = mockOrders.findIndex(o => o.id === id);
      if (index === -1) {
        resolve(null);
        return;
      }
      mockOrders[index] = { 
        ...mockOrders[index], 
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setTimeout(() => resolve(mockOrders[index]), 300);
    });
  },
  
  assignDeliveryPartner: (orderId: string, partnerId: string, partnerName: string): Promise<Order | null> => {
    return mockOrderService.update(orderId, {
      deliveryPartnerId: partnerId,
      deliveryPartnerName: partnerName,
      deliveryStatus: 'assigned',
      status: 'shipped',
    });
  },
  
  updateDeliveryStatus: (orderId: string, status: Order['deliveryStatus'], remarks?: string): Promise<Order | null> => {
    const updates: Partial<Order> = { deliveryStatus: status };
    if (remarks) updates.deliveryRemarks = remarks;
    if (status === 'delivered') updates.status = 'delivered';
    return mockOrderService.update(orderId, updates);
  },
};

// Invoice Service
export const mockInvoiceService = {
  getAll: (): Promise<Invoice[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockInvoices]), 300);
    });
  },
  
  getByOrder: (orderId: string): Promise<Invoice | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockInvoices.find(i => i.orderId === orderId)), 200);
    });
  },
  
  create: (order: Order): Promise<Invoice> => {
    return new Promise((resolve) => {
      const subtotal = order.total;
      const tax = Math.round(subtotal * 0.18); // 18% GST
      const newInvoice: Invoice = {
        id: `inv-${generateId()}`,
        orderId: order.id,
        invoiceNumber: generateInvoiceNumber(),
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity,
        })),
        subtotal,
        tax,
        total: subtotal + tax,
        createdAt: new Date().toISOString().split('T')[0],
      };
      mockInvoices.push(newInvoice);
      setTimeout(() => resolve(newInvoice), 300);
    });
  },
};

// Vendor Service
export const mockVendorService = {
  getAll: (): Promise<Vendor[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockVendors]), 300);
    });
  },
  
  getById: (id: string): Promise<Vendor | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockVendors.find(v => v.id === id)), 200);
    });
  },
};

// Delivery Partner Service
export const mockDeliveryService = {
  getAll: (): Promise<DeliveryPartner[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockDeliveryPartners]), 300);
    });
  },
  
  getById: (id: string): Promise<DeliveryPartner | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDeliveryPartners.find(d => d.id === id)), 200);
    });
  },
  
  getAvailable: (): Promise<DeliveryPartner[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDeliveryPartners.filter(d => d.status === 'available')), 300);
    });
  },
};

// Job Service
export const mockJobService = {
  getAll: (): Promise<Job[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockJobs]), 300);
    });
  },
  
  getActive: (): Promise<Job[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobs.filter(j => j.active)), 300);
    });
  },
  
  create: (job: Omit<Job, 'id' | 'createdAt'>): Promise<Job> => {
    return new Promise((resolve) => {
      const newJob: Job = {
        ...job,
        id: `job-${generateId()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      mockJobs.push(newJob);
      setTimeout(() => resolve(newJob), 300);
    });
  },
  
  update: (id: string, updates: Partial<Job>): Promise<Job | null> => {
    return new Promise((resolve) => {
      const index = mockJobs.findIndex(j => j.id === id);
      if (index === -1) {
        resolve(null);
        return;
      }
      mockJobs[index] = { ...mockJobs[index], ...updates };
      setTimeout(() => resolve(mockJobs[index]), 300);
    });
  },
  
  delete: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const index = mockJobs.findIndex(j => j.id === id);
      if (index === -1) {
        resolve(false);
        return;
      }
      mockJobs.splice(index, 1);
      setTimeout(() => resolve(true), 200);
    });
  },
};

// Payment Service (Mock)
export const mockPaymentService = {
  processPayment: (amount: number): Promise<{ success: boolean; transactionId: string }> => {
    return new Promise((resolve) => {
      // Simulate payment processing
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `TXN-${Date.now()}`,
        });
      }, 1500);
    });
  },
};

// Stats for dashboards
export const mockStatsService = {
  getAdminStats: (): Promise<{
    totalProducts: number;
    totalVendors: number;
    totalOrders: number;
    totalDeliveries: number;
    revenue: number;
    pendingOrders: number;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalProducts: mockProducts.length,
          totalVendors: mockVendors.length,
          totalOrders: mockOrders.length,
          totalDeliveries: mockOrders.filter(o => o.deliveryStatus === 'delivered').length,
          revenue: mockOrders.reduce((sum, o) => sum + o.total, 0),
          pendingOrders: mockOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length,
        });
      }, 300);
    });
  },
  
  getVendorStats: (vendorId: string): Promise<{
    totalProducts: number;
    activeProducts: number;
  }> => {
    return new Promise((resolve) => {
      const vendorProducts = mockProducts.filter(p => p.vendorId === vendorId);
      setTimeout(() => {
        resolve({
          totalProducts: vendorProducts.length,
          activeProducts: vendorProducts.filter(p => p.active).length,
        });
      }, 300);
    });
  },
  
  getDeliveryStats: (partnerId: string): Promise<{
    assignedDeliveries: number;
    completedDeliveries: number;
    inTransit: number;
  }> => {
    return new Promise((resolve) => {
      const partnerOrders = mockOrders.filter(o => o.deliveryPartnerId === partnerId);
      setTimeout(() => {
        resolve({
          assignedDeliveries: partnerOrders.length,
          completedDeliveries: partnerOrders.filter(o => o.deliveryStatus === 'delivered').length,
          inTransit: partnerOrders.filter(o => o.deliveryStatus === 'in_transit').length,
        });
      }, 300);
    });
  },
};
