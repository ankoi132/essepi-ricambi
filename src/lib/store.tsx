'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CookiePreferences, VehicleCompatibility } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data';

interface ActiveVehicle {
  make: string;
  model: string;
  year?: number;
  engine?: string;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (newProd: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewsCount'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  updateProductStock: (id: string, newStock: number) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalNet: number;
  cartVat: number;
  cartTotalGross: number;

  // Vehicle Garage / Filter
  activeVehicle: ActiveVehicle | null;
  setActiveVehicle: (vehicle: ActiveVehicle | null) => void;
  clearActiveVehicle: () => void;
  isVehicleCompatible: (product: Product, vehicle: ActiveVehicle | null) => boolean;

  // Orders & Logistics
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderTracking: (orderId: string, courier: string, trackingNumber: string) => void;

  // Legal & Cookies
  cookieConsent: CookiePreferences | null;
  saveCookieConsent: (prefs: CookiePreferences) => void;

  // UI Drawer State
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isVehicleModalOpen: boolean;
  setIsVehicleModalOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS_KEY = 'essepi_products_v1';
const LOCAL_STORAGE_CART_KEY = 'essepi_cart_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'essepi_orders_v1';
const LOCAL_STORAGE_VEHICLE_KEY = 'essepi_active_vehicle_v1';
const LOCAL_STORAGE_COOKIES_KEY = 'essepi_cookies_v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeVehicle, setActiveVehicleState] = useState<ActiveVehicle | null>(null);
  const [cookieConsent, setCookieConsent] = useState<CookiePreferences | null>(null);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedProds = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      if (storedProds) {
        setProducts(JSON.parse(storedProds));
      }

      const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      const storedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }

      const storedVehicle = localStorage.getItem(LOCAL_STORAGE_VEHICLE_KEY);
      if (storedVehicle) {
        setActiveVehicleState(JSON.parse(storedVehicle));
      }

      const storedCookies = localStorage.getItem(LOCAL_STORAGE_COOKIES_KEY);
      if (storedCookies) {
        setCookieConsent(JSON.parse(storedCookies));
      }
    } catch (e) {
      console.warn('Could not read from local storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders, isLoaded]);

  const setActiveVehicle = (vehicle: ActiveVehicle | null) => {
    setActiveVehicleState(vehicle);
    try {
      if (vehicle) {
        localStorage.setItem(LOCAL_STORAGE_VEHICLE_KEY, JSON.stringify(vehicle));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_VEHICLE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearActiveVehicle = () => {
    setActiveVehicle(null);
  };

  const isVehicleCompatible = (product: Product, vehicle: ActiveVehicle | null): boolean => {
    if (!vehicle || !vehicle.make) return true;
    return product.compatibility.some((comp: VehicleCompatibility) => {
      const matchMake = comp.make.toLowerCase() === vehicle.make.toLowerCase();
      const matchModel = !vehicle.model || comp.model.toLowerCase().includes(vehicle.model.toLowerCase()) || vehicle.model.toLowerCase().includes(comp.model.toLowerCase());
      const matchYear = !vehicle.year || (vehicle.year >= comp.yearStart && vehicle.year <= comp.yearEnd);
      return matchMake && matchModel && matchYear;
    });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const maxQ = item.product.stock;
          return { ...item, quantity: Math.min(quantity, maxQ) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart calculations with 22% Italian VAT breakdown
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalNet = parseFloat(
    cart.reduce((acc, item) => acc + item.product.priceNet * item.quantity, 0).toFixed(2)
  );
  const cartTotalGross = parseFloat(
    cart.reduce((acc, item) => acc + item.product.priceGross * item.quantity, 0).toFixed(2)
  );
  const cartVat = parseFloat((cartTotalGross - cartSubtotalNet).toFixed(2));

  // Product operations for Admin
  const addProduct = (newProd: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewsCount'>): Product => {
    const slug = newProd.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const id = `esp-${Date.now()}`;
    const product: Product = {
      ...newProd,
      id,
      slug: `${slug}-${id.slice(-6)}`,
      rating: 5.0,
      reviewsCount: 0,
      createdAt: new Date().toISOString()
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Order creation & stock reduction
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `ESP-${new Date().getFullYear()}-${String(orders.length + 41).padStart(4, '0')}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      invoiceIssued: false
    };

    // Decrement stock in catalog
    setProducts((prev) =>
      prev.map((prod) => {
        const orderedItem = orderData.items.find((i) => i.product.id === prod.id);
        if (orderedItem) {
          return { ...prod, stock: Math.max(0, prod.stock - orderedItem.quantity) };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const updateOrderTracking = (orderId: string, courier: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, courierName: courier, trackingNumber, status: 'shipped' }
          : ord
      )
    );
  };

  const saveCookieConsent = (prefs: CookiePreferences) => {
    setCookieConsent(prefs);
    try {
      localStorage.setItem(LOCAL_STORAGE_COOKIES_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        updateProductStock,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotalNet,
        cartVat,
        cartTotalGross,
        activeVehicle,
        setActiveVehicle,
        clearActiveVehicle,
        isVehicleCompatible,
        orders,
        createOrder,
        updateOrderStatus,
        updateOrderTracking,
        cookieConsent,
        saveCookieConsent,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isVehicleModalOpen,
        setIsVehicleModalOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
