// Mock Data Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'vendor' | 'delivery' | 'customer';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  vendorId: string;
  vendorName: string;
  image: string;
  active: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryStatus?: 'assigned' | 'in_transit' | 'delivered' | 'delayed';
  deliveryRemarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number; total: number }[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  company: string;
  productsCount: number;
  status: 'active' | 'inactive';
}

export interface DeliveryPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  deliveriesCount: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  active: boolean;
  createdAt: string;
}
