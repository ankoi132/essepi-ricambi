export interface VehicleCompatibility {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  engine?: string;
}

export interface Product {
  id: string;
  sku: string;
  oemCode: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subCategory?: string;
  condition: 'Nuovo Originale' | 'Nuovo NOS' | 'Aftermarket Certificato' | 'Ricondizionato Garantito' | 'Usato Verificato';
  priceNet: number; // Imponibile
  priceGross: number; // Prezzo con IVA
  vatRate: number; // 22% standard
  stock: number;
  minStock: number;
  location: string; // Scaffale / Posizione magazzino (es. Scaffale B-14)
  costPrice?: number; // Costo acquisto fornitore
  weightKg: number;
  shippingCost: number;
  featured: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  features: string[];
  compatibility: VehicleCompatibility[];
  createdAt?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  itemCount: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerData {
  customerType: 'private' | 'business';
  firstName: string;
  lastName: string;
  companyName?: string;
  vatNumber?: string; // P.IVA
  fiscalCode: string; // Codice Fiscale
  sdiCode?: string; // Codice SDI per fattura elettronica
  pec?: string; // Posta Elettronica Certificata
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
  notes?: string;
}

export type ShippingMethodId = 'express_standard' | 'express_insured' | 'pickup';

export interface ShippingMethod {
  id: ShippingMethodId;
  name: string;
  courier: string;
  description: string;
  estimatedDays: string;
  price: number;
  freeAbove?: number;
}

export type PaymentMethodId = 'card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  description: string;
  extraFee: number;
  badge?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // es. ESP-2026-0042
  createdAt: string;
  customer: CustomerData;
  items: CartItem[];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  subtotalNet: number; // Totale imponibile
  vatAmount: number; // Totale IVA 22%
  shippingTotal: number;
  paymentExtraFee: number;
  totalGross: number; // Totale finale da pagare
  status: 'pending_payment' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  courierName?: string;
  invoiceIssued: boolean;
  invoiceNumber?: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  brand: string;
  condition: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number | null;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'newest';
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}
