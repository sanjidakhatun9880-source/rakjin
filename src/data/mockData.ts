import { Product, Category, Order, Coupon, Customer, AuditLog, StoreSettings } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-produce',
    name: 'Fresh Vegetables & Produce',
    banglaName: 'তাজা শাকসবজি ও ফল',
    icon: 'Carrot',
    description: 'Farm-fresh daily harvest vegetables, roots, greens and fresh herbs',
    slug: 'produce'
  },
  {
    id: 'cat-meat',
    name: 'Halal Meat & Poultry',
    banglaName: 'হালাল মাংস ও মুরগি',
    icon: 'Beef',
    description: '100% Certified fresh Halal beef, mutton, and organic chicken cuts',
    slug: 'halal-meat'
  },
  {
    id: 'cat-fish',
    name: 'Fresh Fish & Seafood',
    banglaName: 'তাজা মাছ ও সামুদ্রিক মাছ',
    icon: 'Fish',
    description: 'River Hilsa (Ilish), Rupchanda, Katla, and fresh prawns',
    slug: 'fish'
  },
  {
    id: 'cat-rice',
    name: 'Rice, Grains & Dal',
    banglaName: 'চাল, ডাল ও খাদ্যশস্য',
    icon: 'Wheat',
    description: 'Premium aromatic Basmati, Kalijira, Miniket rice, and lentils',
    slug: 'rice-grains'
  },
  {
    id: 'cat-spices',
    name: 'Spices & Pure Masala',
    banglaName: 'খাঁটি মসলা ও উপাদান',
    icon: 'Flame',
    description: 'Stone-ground pure turmeric, red chilli, cumin, cardamom, and garam masala',
    slug: 'spices'
  },
  {
    id: 'cat-dairy',
    name: 'Dairy, Ghee & Sweets',
    banglaName: 'দুধ, খাঁটি ঘি ও মিষ্টান্ন',
    icon: 'Milk',
    description: 'Traditional bati cow ghee, fresh curd, full cream milk, and paneer',
    slug: 'dairy-ghee'
  },
  {
    id: 'cat-oils',
    name: 'Pure Mustard & Cooking Oils',
    banglaName: 'খাঁটি সরিষার তেল ও ভোজ্যতেল',
    icon: 'Droplet',
    description: 'Cold-pressed organic mustard oil, pure sunflower oil, and olive oils',
    slug: 'oils'
  },
  {
    id: 'cat-snacks',
    name: 'Bakery, Tea & Snacks',
    banglaName: 'চা, বিস্কুট ও চানাচুর',
    icon: 'Cookie',
    description: 'Sylheti premium black tea, crispy spicy chanachur, and toast biscuits',
    slug: 'snacks'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Royal Premium Shahi Kalijira Rice (Polao Chal)',
    banglaName: 'কালিজিরা সুগন্ধি পোলাও চাল',
    category: 'Rice, Grains & Dal',
    price: 180,
    salePrice: 165,
    unit: '1 kg',
    stock: 45,
    sku: 'SFS-RIC-001',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    description: 'Naturally aged small grain aromatic Kalijira rice, perfect for royal biryani, polao, and festive khichuri.',
    isHalal: true,
    isOrganic: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    tags: ['Aromatic', 'Polao', 'Best Seller'],
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'prod-02',
    name: 'Pure Cold-Pressed Kachi Ghani Mustard Oil',
    banglaName: 'খাঁটি কাঠের ঘানি সরিষার তেল',
    category: 'Pure Mustard & Cooking Oils',
    price: 360,
    salePrice: 330,
    unit: '1 Liter',
    stock: 28,
    sku: 'SFS-OIL-002',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    description: '100% authentic wooden-pressed pungent mustard oil. Essential for authentic curries, fish fry, and pickles.',
    isHalal: true,
    isOrganic: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 52,
    tags: ['Organic', 'Pungent', 'Kachi Ghani'],
    createdAt: '2026-08-11T11:20:00Z'
  },
  {
    id: 'prod-03',
    name: 'Premium Grass-Fed Halal Beef Curry Cut',
    banglaName: 'তাজা খাঁটি হালাল গরুর মাংস',
    category: 'Halal Meat & Poultry',
    price: 780,
    unit: '1 kg',
    stock: 18,
    sku: 'SFS-MEA-003',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-selected, tender, bone-in fresh halal beef cuts. Cleaned and prepared according to Islamic dietary laws.',
    isHalal: true,
    isOrganic: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 29,
    tags: ['100% Halal', 'Fresh Daily', 'Grass-fed'],
    createdAt: '2026-08-12T09:15:00Z'
  },
  {
    id: 'prod-04',
    name: 'Padma River Fresh Silver Hilsa Fish (Ilish)',
    banglaName: 'পদ্মার তাজা রূপালী ইলিশ মাছ',
    category: 'Fresh Fish & Seafood',
    price: 1450,
    salePrice: 1350,
    unit: '1 kg size (approx)',
    stock: 9, // Low stock for alerts
    sku: 'SFS-FSH-004',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    description: 'Authentic sweet-water river Hilsa direct from Chandpur. Incomparable natural oiliness and rich flavor.',
    isHalal: true,
    isOrganic: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 44,
    tags: ['Fresh River Catch', 'Low Stock', 'Premium'],
    createdAt: '2026-08-14T08:00:00Z'
  },
  {
    id: 'prod-05',
    name: 'Traditional Granular Bati Cow Milk Ghee',
    banglaName: 'খাঁটি গাভীর দানাদার ঘি',
    category: 'Dairy, Ghee & Sweets',
    price: 650,
    salePrice: 590,
    unit: '500 gm',
    stock: 32,
    sku: 'SFS-DAI-005',
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80',
    description: 'Slow-simmered artisanal golden cow ghee with natural granular texture and enchanting aroma.',
    isHalal: true,
    isOrganic: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 67,
    tags: ['Artisanal', 'Danadar Ghee', 'Pure'],
    createdAt: '2026-08-15T12:00:00Z'
  },
  {
    id: 'prod-06',
    name: 'Natural Stone-Ground Turmeric Powder (Holud)',
    banglaName: 'খাঁটি দেশি হলুদ গুঁড়া',
    category: 'Spices & Pure Masala',
    price: 120,
    unit: '250 gm',
    stock: 60,
    sku: 'SFS-SPI-006',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80',
    description: 'Pure sun-dried organic turmeric roots ground slowly to preserve natural curcumin oils and vibrant color.',
    isHalal: true,
    isOrganic: true,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 22,
    tags: ['High Curcumin', 'Unadulterated'],
    createdAt: '2026-08-16T14:30:00Z'
  },
  {
    id: 'prod-07',
    name: 'Fresh Farm Deshi Red Potatoes (Lal Alu)',
    banglaName: 'মুন্সীগঞ্জের তাজা দেশি লাল আলু',
    category: 'Fresh Vegetables & Produce',
    price: 55,
    unit: '1 kg',
    stock: 120,
    sku: 'SFS-VEG-007',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp and sweet native red potatoes from Munshiganj, ideal for alu bhaji, curry, and mashed bhorta.',
    isHalal: true,
    isOrganic: true,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 19,
    tags: ['Daily Fresh', 'Farm Picked'],
    createdAt: '2026-08-18T07:15:00Z'
  },
  {
    id: 'prod-08',
    name: 'Finest Red Lentils (Deshi Masoor Dal)',
    banglaName: 'চিকন দেশি মসুর ডাল',
    category: 'Rice, Grains & Dal',
    price: 140,
    unit: '1 kg',
    stock: 75,
    sku: 'SFS-RIC-008',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    description: 'Premium small-grain quick-cooking red lentils, clean, stone-free, and rich in vegetarian protein.',
    isHalal: true,
    isOrganic: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 31,
    tags: ['High Protein', 'Cleaned'],
    createdAt: '2026-08-20T10:45:00Z'
  },
  {
    id: 'prod-09',
    name: 'Sylhet Garden CTC Leaf Black Tea',
    banglaName: 'সিলেটের বাগান তাজা সিটিসি চা পাতা',
    category: 'Bakery, Tea & Snacks',
    price: 240,
    salePrice: 215,
    unit: '500 gm',
    stock: 40,
    sku: 'SFS-SNK-009',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    description: 'Direct from Sreemangal tea estates. Strong liquor, malty aroma, and bold refreshing taste for morning milk tea.',
    isHalal: true,
    isOrganic: true,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 41,
    tags: ['Sreemangal', 'Strong Brew'],
    createdAt: '2026-08-21T15:20:00Z'
  },
  {
    id: 'prod-10',
    name: 'Crispy Spicy Bombay Mix Chanachur',
    banglaName: 'মুচমুচে মসলাদার স্পেশাল চানাচুর',
    category: 'Bakery, Tea & Snacks',
    price: 95,
    unit: '300 gm pack',
    stock: 50,
    sku: 'SFS-SNK-010',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80',
    description: 'Crunchy chickpea noodles mixed with roasted peanuts, lentils, green peas, and tangy spice blend.',
    isHalal: true,
    isOrganic: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 25,
    tags: ['Snack Time', 'Spicy Crunchy'],
    createdAt: '2026-08-22T16:00:00Z'
  },
  {
    id: 'prod-11',
    name: 'Fresh Halal Whole Broiler Chicken (Skin-off)',
    banglaName: 'তাজা চামড়া ছাড়া ব্রয়লার মুরগি',
    category: 'Halal Meat & Poultry',
    price: 220,
    unit: '1 kg',
    stock: 6, // Low stock alert
    sku: 'SFS-MEA-011',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80',
    description: 'Slaughtered freshly per strict Halal rites, hygienic skin-off cuts, washed and ready for roasting or korma.',
    isHalal: true,
    isOrganic: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 50,
    tags: ['100% Halal', 'Low Stock', 'Daily Fresh'],
    createdAt: '2026-08-25T08:30:00Z'
  },
  {
    id: 'prod-12',
    name: 'Fresh Green Cardamom Pods (Choto Elachi)',
    banglaName: 'সুগন্ধি সবুজ এলাচ',
    category: 'Spices & Pure Masala',
    price: 340,
    salePrice: 295,
    unit: '100 gm',
    stock: 3, // Critical low stock
    sku: 'SFS-SPI-012',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    description: 'High-grade large green cardamom pods packed with sweet aromatic essential oils for biryani and sweets.',
    isHalal: true,
    isOrganic: true,
    isFeatured: false,
    rating: 5.0,
    reviewsCount: 36,
    tags: ['Aromatic', 'Critical Low Stock'],
    createdAt: '2026-08-28T11:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SFS-8921',
    customerName: 'Kazi Mohammad Rafiq',
    customerEmail: 'rafiq.kazi@outlook.com',
    customerPhone: '+880 1712-345678',
    deliveryAddress: 'House 42, Road 7, Sector 3, Uttara',
    deliveryCity: 'Dhaka',
    deliverySlot: 'Evening (5:00 PM - 8:00 PM)',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'pending',
    items: [
      {
        productId: 'prod-01',
        productName: 'Royal Premium Shahi Kalijira Rice (Polao Chal)',
        price: 165,
        quantity: 2,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
        total: 330
      },
      {
        productId: 'prod-03',
        productName: 'Premium Grass-Fed Halal Beef Curry Cut',
        price: 780,
        quantity: 1,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
        total: 780
      },
      {
        productId: 'prod-05',
        productName: 'Traditional Granular Bati Cow Milk Ghee',
        price: 590,
        quantity: 1,
        unit: '500 gm',
        image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80',
        total: 590
      }
    ],
    subtotal: 1700,
    deliveryFee: 60,
    discount: 0,
    total: 1760,
    notes: 'Please call 15 minutes prior to arrival at Uttara.',
    createdAt: '2026-09-15T09:40:00Z',
    updatedAt: '2026-09-15T09:40:00Z',
    timeline: [
      {
        status: 'pending',
        label: 'Order Placed by Customer',
        time: '2026-09-15 09:40 AM',
        note: 'Customer chose Cash on Delivery'
      }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'SFS-8920',
    customerName: 'Nusrat Jahan Chowdhury',
    customerEmail: 'nusrat.jahan@gmail.com',
    customerPhone: '+880 1819-876543',
    deliveryAddress: 'Flat 4B, Green Heritage, Dhanmondi 27',
    deliveryCity: 'Dhaka',
    deliverySlot: 'Morning (9:00 AM - 1:00 PM)',
    paymentMethod: 'bKash / Mobile Banking',
    paymentStatus: 'Paid',
    orderStatus: 'processing',
    items: [
      {
        productId: 'prod-04',
        productName: 'Padma River Fresh Silver Hilsa Fish (Ilish)',
        price: 1350,
        quantity: 2,
        unit: '1 kg size',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        total: 2700
      },
      {
        productId: 'prod-02',
        productName: 'Pure Cold-Pressed Kachi Ghani Mustard Oil',
        price: 330,
        quantity: 2,
        unit: '1 Liter',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
        total: 660
      }
    ],
    subtotal: 3360,
    deliveryFee: 0,
    discount: 100,
    couponCode: 'SANJIDA100',
    total: 3260,
    notes: 'Please ensure fish is packed in temperature-controlled ice pack.',
    createdAt: '2026-09-15T08:15:00Z',
    updatedAt: '2026-09-15T08:45:00Z',
    timeline: [
      {
        status: 'pending',
        label: 'Order Placed',
        time: '2026-09-15 08:15 AM'
      },
      {
        status: 'confirmed',
        label: 'Payment Verified (bKash TrxID: 9JK7A4M)',
        time: '2026-09-15 08:25 AM'
      },
      {
        status: 'processing',
        label: 'Packing in Cold Storage Section',
        time: '2026-09-15 08:45 AM',
        note: 'Hilsa cleaned and packed with ice'
      }
    ]
  },
  {
    id: 'ord-1003',
    orderNumber: 'SFS-8919',
    customerName: 'Tanvir Ahmed Siddique',
    customerEmail: 'tanvir.ahmed@yahoo.com',
    customerPhone: '+880 1911-223344',
    deliveryAddress: 'Apartment 6A, Gulshan-2, Circle 2',
    deliveryCity: 'Dhaka',
    deliverySlot: 'Afternoon (2:00 PM - 5:00 PM)',
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    orderStatus: 'out_for_delivery',
    items: [
      {
        productId: 'prod-01',
        productName: 'Royal Premium Shahi Kalijira Rice (Polao Chal)',
        price: 165,
        quantity: 5,
        unit: '1 kg',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
        total: 825
      },
      {
        productId: 'prod-09',
        productName: 'Sylhet Garden CTC Leaf Black Tea',
        price: 215,
        quantity: 2,
        unit: '500 gm',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
        total: 430
      }
    ],
    subtotal: 1255,
    deliveryFee: 60,
    discount: 0,
    total: 1315,
    createdAt: '2026-09-14T17:20:00Z',
    updatedAt: '2026-09-15T09:00:00Z',
    timeline: [
      { status: 'pending', label: 'Order Placed', time: '2026-09-14 05:20 PM' },
      { status: 'confirmed', label: 'Card Payment Confirmed', time: '2026-09-14 05:22 PM' },
      { status: 'processing', label: 'Order Packed', time: '2026-09-14 07:00 PM' },
      { status: 'out_for_delivery', label: 'Rider Assigned (Habib, +880 1788-001122)', time: '2026-09-15 09:00 AM' }
    ]
  },
  {
    id: 'ord-1004',
    orderNumber: 'SFS-8918',
    customerName: 'Dr. Farhana Yasmin',
    customerEmail: 'farhana.dr@med.edu',
    customerPhone: '+880 1722-998877',
    deliveryAddress: 'House 19, Road 4, Banani DOHS',
    deliveryCity: 'Dhaka',
    deliverySlot: 'Morning (9:00 AM - 1:00 PM)',
    paymentMethod: 'bKash / Mobile Banking',
    paymentStatus: 'Paid',
    orderStatus: 'delivered',
    items: [
      {
        productId: 'prod-05',
        productName: 'Traditional Granular Bati Cow Milk Ghee',
        price: 590,
        quantity: 2,
        unit: '500 gm',
        image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80',
        total: 1180
      },
      {
        productId: 'prod-06',
        productName: 'Natural Stone-Ground Turmeric Powder (Holud)',
        price: 120,
        quantity: 2,
        unit: '250 gm',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80',
        total: 240
      }
    ],
    subtotal: 1420,
    deliveryFee: 60,
    discount: 50,
    couponCode: 'WELCOME50',
    total: 1430,
    createdAt: '2026-09-14T11:00:00Z',
    updatedAt: '2026-09-14T16:30:00Z',
    timeline: [
      { status: 'pending', label: 'Order Received', time: '2026-09-14 11:00 AM' },
      { status: 'confirmed', label: 'Payment Confirmed', time: '2026-09-14 11:05 AM' },
      { status: 'processing', label: 'Packed & Dispatched', time: '2026-09-14 01:30 PM' },
      { status: 'out_for_delivery', label: 'Out for Delivery', time: '2026-09-14 02:45 PM' },
      { status: 'delivered', label: 'Delivered safely to customer', time: '2026-09-14 04:30 PM' }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'SANJIDA10',
    discountType: 'percent',
    discountValue: 10,
    minOrder: 1000,
    maxDiscount: 200,
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 142,
    description: '10% discount on all authentic grocery items over ৳1,000'
  },
  {
    id: 'coup-2',
    code: 'FREESHIP',
    discountType: 'flat',
    discountValue: 60,
    minOrder: 1500,
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 89,
    description: 'Free doorstep delivery across Dhaka for orders over ৳1,500'
  },
  {
    id: 'coup-3',
    code: 'EIDSPECIAL',
    discountType: 'percent',
    discountValue: 15,
    minOrder: 2500,
    maxDiscount: 500,
    expiryDate: '2026-10-30',
    isActive: true,
    usageCount: 65,
    description: 'Special festive promotion for premium polao rice and halal meat cuts'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Kazi Mohammad Rafiq',
    email: 'rafiq.kazi@outlook.com',
    phone: '+880 1712-345678',
    address: 'House 42, Road 7, Sector 3, Uttara',
    city: 'Dhaka',
    totalOrders: 6,
    totalSpent: 9420,
    lastOrderDate: '2026-09-15',
    joinedDate: '2026-04-12',
    status: 'vip'
  },
  {
    id: 'cust-2',
    name: 'Nusrat Jahan Chowdhury',
    email: 'nusrat.jahan@gmail.com',
    phone: '+880 1819-876543',
    address: 'Flat 4B, Green Heritage, Dhanmondi 27',
    city: 'Dhaka',
    totalOrders: 4,
    totalSpent: 11840,
    lastOrderDate: '2026-09-15',
    joinedDate: '2026-05-19',
    status: 'vip'
  },
  {
    id: 'cust-3',
    name: 'Tanvir Ahmed Siddique',
    email: 'tanvir.ahmed@yahoo.com',
    phone: '+880 1911-223344',
    address: 'Apartment 6A, Gulshan-2, Circle 2',
    city: 'Dhaka',
    totalOrders: 3,
    totalSpent: 4250,
    lastOrderDate: '2026-09-14',
    joinedDate: '2026-06-03',
    status: 'active'
  },
  {
    id: 'cust-4',
    name: 'Dr. Farhana Yasmin',
    email: 'farhana.dr@med.edu',
    phone: '+880 1722-998877',
    address: 'House 19, Road 4, Banani DOHS',
    city: 'Dhaka',
    totalOrders: 8,
    totalSpent: 16500,
    lastOrderDate: '2026-09-14',
    joinedDate: '2026-03-01',
    status: 'vip'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'SANJIDA FOOD STORE',
  tagline: 'Fresh, 100% Halal & Authentic Groceries Delivered To Your Doorstep',
  contactPhone: '+880 1711-000000',
  contactEmail: 'contact@sanjidafoodstore.com',
  currency: '৳',
  currencyCode: 'BDT',
  standardDeliveryFee: 60,
  freeDeliveryThreshold: 2000,
  address: 'Plot 14, Block D, Mirpur-1, Dhaka 1216, Bangladesh',
  openingHours: 'Everyday 7:30 AM – 10:30 PM',
  announcementText: '🌟 Fast 60-minute express grocery delivery now available across all Dhaka sectors! Free delivery on orders over ৳2,000.',
  adminEmail: 'sanjidakhatun9880@gmail.com', // Strict requirement: Only ONE specific Gmail account allowed
  securityPin: '9880', // Default admin security PIN matching email handle
  maintenanceMode: false
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-09-15T09:40:15Z',
    type: 'auth_success',
    actor: 'sanjidakhatun9880@gmail.com',
    description: 'Administrator Sanjida Khatun securely authenticated into Private Admin Panel.',
    ipAddress: '103.144.200.12',
    severity: 'info'
  },
  {
    id: 'log-002',
    timestamp: '2026-09-15T08:45:00Z',
    type: 'order_status',
    actor: 'sanjidakhatun9880@gmail.com',
    description: 'Updated Order #SFS-8920 status to Processing (Packing in cold storage).',
    severity: 'info'
  },
  {
    id: 'log-003',
    timestamp: '2026-09-14T22:15:30Z',
    type: 'auth_denied',
    actor: 'unknown_attempt@gmail.com',
    description: 'Security Gate blocked unauthorized login attempt. Email not in allowed list.',
    ipAddress: '185.220.101.44',
    severity: 'critical'
  },
  {
    id: 'log-004',
    timestamp: '2026-09-14T19:00:00Z',
    type: 'inventory_restock',
    actor: 'sanjidakhatun9880@gmail.com',
    description: 'Restocked +25 kg Shahi Kalijira Rice inventory.',
    severity: 'info'
  }
];
