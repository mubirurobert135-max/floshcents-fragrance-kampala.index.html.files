import { useState, useEffect, useCallback } from "react";
import { Product, Order, CartItem, OrderStatus } from "../types/store";
import {
  getStoredProducts,
  getStoredOrders,
  saveProduct,
  deleteProduct,
  updateStockQuantity,
  createCustomerOrder,
  updateOrderStatus,
} from "../lib/store";
import { toast } from "sonner";

const CART_STORAGE_KEY = "flosh_cents_cart_v3";

export function useStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  // Sync products and orders from localStorage
  const refresh = useCallback(() => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
  }, []);

  useEffect(() => {
    refresh();

    // Load initial cart
    try {
      const rawCart = localStorage.getItem(CART_STORAGE_KEY);
      if (rawCart) {
        setCart(JSON.parse(rawCart));
      }
    } catch {
      setCart([]);
    }

    const onSync = () => {
      refresh();
    };

    window.addEventListener("flosh-cents-store-sync", onSync);
    window.addEventListener("storage", onSync);
    return () => {
      window.removeEventListener("flosh-cents-store-sync", onSync);
      window.removeEventListener("storage", onSync);
    };
  }, [refresh]);

  // Persist cart
  const updateCart = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    } catch {
      // storage error fallback
    }
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      // Refresh product stock check
      const currentProducts = getStoredProducts();
      const liveProduct = currentProducts.find((p) => p.id === product.id) || product;

      if (liveProduct.stock <= 0) {
        toast.error(`${liveProduct.name} is currently out of stock.`, {
          description: "Flosh will restock soon. You can also inquire via WhatsApp.",
        });
        return false;
      }

      const existingIndex = cart.findIndex((item) => item.product.id === liveProduct.id);
      let nextCart: CartItem[];

      if (existingIndex >= 0) {
        const currentQty = cart[existingIndex].quantity;
        const targetQty = currentQty + quantity;

        if (targetQty > liveProduct.stock) {
          toast.warning(
            `Only ${liveProduct.stock} bottles of ${liveProduct.name} available in stock.`,
            {
              description: `We adjusted your cart to the maximum available (${liveProduct.stock}).`,
            },
          );
          nextCart = [...cart];
          nextCart[existingIndex] = {
            product: liveProduct,
            quantity: liveProduct.stock,
          };
        } else {
          nextCart = [...cart];
          nextCart[existingIndex] = {
            product: liveProduct,
            quantity: targetQty,
          };
          toast.success(`Updated ${liveProduct.name} quantity in bag`, {
            description: `Total: ${targetQty} item(s)`,
          });
        }
      } else {
        const addQty = Math.min(quantity, liveProduct.stock);
        nextCart = [...cart, { product: liveProduct, quantity: addQty }];
        toast.success(`Added ${liveProduct.name} to shopping bag`, {
          description: `${liveProduct.size} · UGX ${liveProduct.price.toLocaleString("en-UG")}`,
        });
      }

      updateCart(nextCart);
      return true;
    },
    [cart, updateCart],
  );

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const currentProducts = getStoredProducts();
      const liveProduct = currentProducts.find((p) => p.id === productId);
      const maxStock = liveProduct ? liveProduct.stock : 999;

      if (quantity > maxStock) {
        toast.warning(`Only ${maxStock} in stock for this perfume.`);
        return;
      }

      const nextCart = cart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });

      updateCart(nextCart);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, updateCart],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      const nextCart = cart.filter((item) => item.product.id !== productId);
      updateCart(nextCart);
      toast.info("Item removed from your bag");
    },
    [cart, updateCart],
  );

  const clearCart = useCallback(() => {
    updateCart([]);
  }, [updateCart]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Admin and order actions
  const handleSaveProduct = useCallback(
    (productInput: Partial<Product> & { name: string; price: number }) => {
      const saved = saveProduct(productInput);
      refresh();
      return saved;
    },
    [refresh],
  );

  const handleDeleteProduct = useCallback(
    (id: string) => {
      deleteProduct(id);
      refresh();
    },
    [refresh],
  );

  const handleUpdateStock = useCallback(
    (id: string, newStock: number) => {
      const updated = updateStockQuantity(id, newStock);
      refresh();
      return updated;
    },
    [refresh],
  );

  const handleCreateOrder = useCallback(
    (data: {
      customerName: string;
      phoneNumber: string;
      deliveryLocation: string;
      instructions?: string;
      items: { product: Product; quantity: number }[];
    }) => {
      const order = createCustomerOrder(data);
      clearCart();
      refresh();
      setOrderSuccess(order);
      setIsCheckoutOpen(false);
      return order;
    },
    [clearCart, refresh],
  );

  const handleUpdateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus) => {
      const updated = updateOrderStatus(orderId, status);
      refresh();
      return updated;
    },
    [refresh],
  );

  return {
    products,
    orders,
    cart,
    cartTotal,
    cartCount,
    selectedProduct,
    isCartOpen,
    isCheckoutOpen,
    isAdminOpen,
    orderSuccess,
    setSelectedProduct,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsAdminOpen,
    setOrderSuccess,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    handleSaveProduct,
    handleDeleteProduct,
    handleUpdateStock,
    handleCreateOrder,
    handleUpdateOrderStatus,
    refresh,
  };
}
