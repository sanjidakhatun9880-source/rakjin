import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order, Coupon, Customer, AuditLog, StoreSettings, CartItem, OrderStatus } from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_CUSTOMERS,
  INITIAL_SETTINGS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

interface AdminSession {
  isAuthenticated: boolean;
  email: string | null;
  loginTime: string | null;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkRestock: (id: string, amount: number) => void;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Orders
  orders: Order[];
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  placeCustomerOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'timeline'>) => Order;
  deleteOrder: (orderId: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;

  // Customers
  customers: Customer[];

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
  exportDatabaseJSON: () => void;
  importDatabaseJSON: (jsonData: string) => boolean;

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (type: AuditLog['type'], description: string, severity?: AuditLog['severity'], actor?: string) => void;
  clearAuditLogs: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Admin Auth
  adminSession: AdminSession;
  loginAdmin: (email: string, pin: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'sanjida_food_store_data_v1';
const SESSION_KEY = 'sanjida_admin_session_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or mock defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_categories`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_coupons`);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_customers`);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.storeName) {
          return { ...INITIAL_SETTINGS, ...parsed };
        }
      }
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cart`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Admin Session State
  const [adminSession, setAdminSession] = useState<AdminSession>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : { isAuthenticated: false, email: null, loginTime: null };
    } catch {
      return { isAuthenticated: false, email: null, loginTime: null };
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_categories`, JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_coupons`, JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_customers`, JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
    } catch (e) {
      console.error(e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Helper for adding audit log
  const addAuditLog = (
    type: AuditLog['type'],
    description: string,
    severity: AuditLog['severity'] = 'info',
    actor = adminSession.email || 'System'
  ) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      type,
      actor,
      description,
      severity
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
  };

  // Admin Auth Logic
  const loginAdmin = (email: string, pin: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const authorizedEmail = settings.adminEmail.trim().toLowerCase();

    // STRICT VALIDATION: Only one specific Gmail account allowed!
    if (trimmedEmail !== authorizedEmail) {
      addAuditLog(
        'auth_denied',
        `Access denied to unauthorized email '${trimmedEmail}'. Admin portal is strictly locked to ${settings.adminEmail}.`,
        'critical',
        trimmedEmail
      );
      return {
        success: false,
        message: `ACCESS DENIED: Only the designated administrator (${settings.adminEmail}) has authorization to access this Private Admin Panel.`
      };
    }

    // Verify PIN/Passcode
    if (pin.trim() !== settings.securityPin) {
      addAuditLog(
        'auth_denied',
        `Failed passcode attempt for authorized administrator ${settings.adminEmail}.`,
        'warning',
        trimmedEmail
      );
      return {
        success: false,
        message: 'Invalid Admin Security PIN/Passcode. Please check your credentials.'
      };
    }

    // Success
    const newSession: AdminSession = {
      isAuthenticated: true,
      email: settings.adminEmail,
      loginTime: new Date().toISOString()
    };
    setAdminSession(newSession);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    } catch (e) {
      console.error(e);
    }

    addAuditLog('auth_success', `Store administrator Sanjida Khatun successfully logged in to Private Admin Panel.`, 'info', settings.adminEmail);
    return { success: true, message: 'Authentication successful! Welcome back, Sanjida Khatun.' };
  };

  const logoutAdmin = () => {
    addAuditLog('security_event', `Administrator session ended. Successfully logged out.`, 'info', adminSession.email || settings.adminEmail);
    const cleared: AdminSession = { isAuthenticated: false, email: null, loginTime: null };
    setAdminSession(cleared);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Product Actions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    addAuditLog('product_create', `Added new product "${newProduct.name}" (SKU: ${newProduct.sku}) in ${newProduct.category}`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          addAuditLog('product_update', `Updated product details for "${updated.name}"`);
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (prod) {
      addAuditLog('product_delete', `Removed product "${prod.name}" from catalog`, 'warning');
    }
  };

  const bulkRestock = (id: string, amount: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const newStock = p.stock + amount;
          addAuditLog('inventory_restock', `Restocked "${p.name}" (+${amount} ${p.unit}). Total now: ${newStock}`);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  // Category Actions
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
    addAuditLog('product_create', `Created new store category "${newCat.name}"`);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Order Actions
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const statusLabels: Record<OrderStatus, string> = {
            pending: 'Order Placed',
            confirmed: 'Order Confirmed',
            processing: 'Processing & Packing',
            out_for_delivery: 'Dispatched with Courier/Rider',
            delivered: 'Successfully Delivered',
            cancelled: 'Order Cancelled'
          };

          const newTimelineEvent = {
            status: newStatus,
            label: statusLabels[newStatus] || newStatus,
            time: new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            note
          };

          const updated: Order = {
            ...ord,
            orderStatus: newStatus,
            updatedAt: new Date().toISOString(),
            paymentStatus: newStatus === 'delivered' && ord.paymentMethod === 'Cash on Delivery' ? 'Paid' : ord.paymentStatus,
            timeline: [...ord.timeline, newTimelineEvent]
          };

          addAuditLog('order_status', `Updated Order #${ord.orderNumber} status to "${newStatus.toUpperCase()}"`);
          return updated;
        }
        return ord;
      })
    );
  };

  const placeCustomerOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'timeline'>): Order => {
    const orderNum = `SFS-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      timeline: [
        {
          status: 'pending',
          label: 'Order Placed by Customer',
          time: formattedTime,
          note: `Payment via ${orderData.paymentMethod}`
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock for ordered items
    setProducts(prev =>
      prev.map(prod => {
        const matchingItem = orderData.items.find(i => i.productId === prod.id);
        if (matchingItem) {
          const updatedStock = Math.max(0, prod.stock - matchingItem.quantity);
          return { ...prod, stock: updatedStock };
        }
        return prod;
      })
    );

    // Update customer history or create new customer
    setCustomers(prev => {
      const existing = prev.find(c => c.phone === orderData.customerPhone || c.email === orderData.customerEmail);
      if (existing) {
        return prev.map(c =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + orderData.total,
                lastOrderDate: now.toISOString().split('T')[0],
                status: c.totalOrders + 1 >= 5 ? 'vip' : c.status
              }
            : c
        );
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          address: orderData.deliveryAddress,
          city: orderData.deliveryCity,
          totalOrders: 1,
          totalSpent: orderData.total,
          lastOrderDate: now.toISOString().split('T')[0],
          joinedDate: now.toISOString().split('T')[0],
          status: 'active'
        };
        return [newCust, ...prev];
      }
    });

    addAuditLog('order_status', `New online order #${orderNum} received from ${orderData.customerName} (Total: ${settings.currency}${orderData.total})`);
    return newOrder;
  };

  const deleteOrder = (orderId: string) => {
    const ord = orders.find(o => o.id === orderId);
    setOrders(prev => prev.filter(o => o.id !== orderId));
    if (ord) {
      addAuditLog('order_status', `Deleted order #${ord.orderNumber}`, 'warning');
    }
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`,
      usageCount: 0
    };
    setCoupons(prev => [...prev, newCoupon]);
    addAuditLog('settings_update', `Created promotional coupon code "${newCoupon.code}"`);
  };

  const toggleCoupon = (id: string) => {
    setCoupons(prev => prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      addAuditLog('settings_update', `Updated store settings configuration`);
      return updated;
    });
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    setCustomers(INITIAL_CUSTOMERS);
    setSettings(INITIAL_SETTINGS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.clear();
    addAuditLog('settings_update', `Reset database store values to factory defaults`, 'warning');
  };

  const exportDatabaseJSON = () => {
    const fullBackup = {
      storeName: settings.storeName,
      backupDate: new Date().toISOString(),
      adminEmail: settings.adminEmail,
      products,
      categories,
      orders,
      coupons,
      customers,
      settings,
      auditLogs
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sanjida_food_store_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addAuditLog('security_event', 'Exported complete store database backup JSON.');
  };

  const importDatabaseJSON = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.products && Array.isArray(data.products)) setProducts(data.products);
      if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
      if (data.orders && Array.isArray(data.orders)) setOrders(data.orders);
      if (data.coupons && Array.isArray(data.coupons)) setCoupons(data.coupons);
      if (data.customers && Array.isArray(data.customers)) setCustomers(data.customers);
      if (data.settings && typeof data.settings === 'object') setSettings(data.settings);
      addAuditLog('security_event', 'Imported and restored store database from JSON backup file.', 'warning');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    const cartSubtotal = cart.reduce((acc, item) => {
      const price = item.product.salePrice ?? item.product.price;
      return acc + price * item.quantity;
    }, 0);

    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum cart subtotal of ${settings.currency}${found.minOrder}.`
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkRestock,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        orders,
        updateOrderStatus,
        placeCustomerOrder,
        deleteOrder,
        coupons,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        customers,
        settings,
        updateSettings,
        resetToDefaults,
        exportDatabaseJSON,
        importDatabaseJSON,
        auditLogs,
        addAuditLog,
        clearAuditLogs,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        adminSession,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
