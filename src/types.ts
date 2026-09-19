export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  category: string;
  price: number;
  salePrice?: number;
  unit: string; // e.g. '1 kg', '500g', '1 L', '1 bunch', '12 pcs'
  stock: number;
  sku: string;
  image: string;
  description: string;
  isHalal: boolean;
  isOrganic?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  tags?: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  banglaName?: string;
  icon: string;
  description: string;
  slug: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentMethod = 'Cash on Delivery' | 'bKash / Mobile Banking' | 'Credit / Debit Card';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  time: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliverySlot: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percent' | 'flat';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  joinedDate: string;
  status: 'active' | 'vip' | 'blocked';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  type: 'auth_success' | 'auth_denied' | 'product_create' | 'product_update' | 'product_delete' | 'order_status' | 'inventory_restock' | 'settings_update' | 'security_event';
  actor: string;
  description: string;
  ipAddress?: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  contactPhone: string;
  contactEmail: string;
  currency: string; // e.g., '৳' or '$'
  currencyCode: string; // e.g. 'BDT'
  standardDeliveryFee: number;
  freeDeliveryThreshold: number;
  address: string;
  openingHours: string;
  announcementText: string;
  adminEmail: string; // Strictly sanjidakhatun9880@gmail.com
  securityPin: string;
  maintenanceMode: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
