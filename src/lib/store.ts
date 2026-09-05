import {
  Product,
  Order,
  OrderStatus,
  PerfumeType,
  ProductCategory,
  ProductTag,
} from "../types/store";
import royalBloom from "@/assets/royal-bloom.jpg";
import midnightEssence from "@/assets/midnight-essence.jpg";
import natureSpirit from "@/assets/nature-spirit.jpg";
import heroPerfume from "@/assets/hero-perfume.jpg";
import barakkatRouge from "@/assets/barakkat-rouge-540.jpg";

export const WHATSAPP_NUMBER = "256753325780";
export const WHATSAPP_DISPLAY = "0753 325 780";

export const SUE_PHONE_NUMBER = "256760370341";
export const SUE_PHONE_DISPLAY = "0760 370 341";
export const SUE_NAME = "SUE";
export const SUE_ROLE = "Director of Flosh Scents";

export const formatUGX = (amount: number): string => {
  return `UGX ${Math.round(amount).toLocaleString("en-UG")}`;
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "fc-prod-540",
    name: "Barakkat Rouge 540 Extrait de Parfum",
    type: "Spray Perfume",
    category: "Designer Inspired",
    size: "100ml extrait de parfum",
    price: 140000,
    stock: 24,
    description:
      "An opulent, intense amber floral masterpiece housed in an iconic ruby-red crystal flacon with a polished gold crown cap and architectural presentation box. Barakkat Rouge 540 delivers a radiant opening of Grandiflorum jasmine and fiery saffron, interwoven with Moroccan bitter almond, aristocratic cedarwood, and an unforgettable, magnetic ambergris sillage.",
    notes: {
      top: "Egyptian Jasmine Grandiflorum, Saffron & Bitter Almond",
      middle: "Cedarwood, Warm Amberwood & Spiced Florals",
      base: "Sensual Ambergris, Fir Balsam & Woody Musk",
    },
    displayNotes: "Saffron · Bitter Almond · Ambergris · Jasmine",
    image: barakkatRouge,
    tag: "Signature",
    isAvailable: true,
    createdAt: 1710000010000,
  },
  {
    id: "fc-prod-001",
    name: "Pocket Attar Mini",
    type: "Oil Perfume",
    category: "Oil Perfumes",
    size: "1.5ml roll-on",
    price: 5000,
    stock: 60,
    description:
      "Concentrated floral and musk oil perfume in a handy pocket vial. Pure fragrance without alcohol that lingers on pulse points.",
    notes: {
      top: "Sweet Rose Petals",
      middle: "Warm Saffron",
      base: "Soft White Musk",
    },
    displayNotes: "Rose · Saffron · White Musk",
    image: royalBloom,
    tag: "Affordable",
    isAvailable: true,
    createdAt: 1710000000000,
  },
  {
    id: "fc-prod-002",
    name: "Vanilla Silk Oil",
    type: "Oil Perfume",
    category: "Oil Perfumes",
    size: "3ml pocket gem",
    price: 15000,
    stock: 40,
    description:
      "Warm, delectable vanilla cream folded into golden amber oils. Velvety, inviting and comforting for daily wear in Kampala.",
    notes: {
      top: "Bourbon Vanilla",
      middle: "Tonka Bean & Coconut",
      base: "Golden Amber",
    },
    displayNotes: "Vanilla · Tonka Bean · Golden Amber",
    image: natureSpirit,
    tag: "Best Seller",
    isAvailable: true,
    createdAt: 1710000001000,
  },
  {
    id: "fc-prod-003",
    name: "Garden Fresh Mist",
    type: "Spray Perfume",
    category: "Body Mists",
    size: "150ml spray",
    price: 25000,
    stock: 25,
    description:
      "Crisp botanical mist bursting with dew-drenched petals and juicy green apples. Perfect for an uplifting midday refresher.",
    notes: {
      top: "Green Apple & Bergamot",
      middle: "Jasmine & Lotus",
      base: "Clean Cedarwood",
    },
    displayNotes: "Green Apple · Jasmine · Clean Cedar",
    image: heroPerfume,
    tag: "New Arrival",
    isAvailable: true,
    createdAt: 1710000002000,
  },
  {
    id: "fc-prod-004",
    name: "Golden Oud Oil",
    type: "Oil Perfume",
    category: "Oil Perfumes",
    size: "6ml crystal bottle",
    price: 35000,
    stock: 30,
    description:
      "Deep, resinous Agarwood extract complemented by velvety damask rose and warm sandalwood. A single dab lasts 24+ hours.",
    notes: {
      top: "Smoky Saffron",
      middle: "Damask Rose & Agarwood",
      base: "Sandalwood & Amber",
    },
    displayNotes: "Saffron · Agarwood · Sandalwood",
    image: royalBloom,
    tag: "Signature",
    isAvailable: true,
    createdAt: 1710000003000,
  },
  {
    id: "fc-prod-005",
    name: "Kampala Breeze Spray",
    type: "Spray Perfume",
    category: "Spray Perfumes",
    size: "50ml eau de parfum",
    price: 50000,
    stock: 20,
    description:
      "Vibrant and clean citrus aromatic scent inspired by the refreshing afternoon rains over the hills of Kampala.",
    notes: {
      top: "Sparkling Lemon & Mandarin",
      middle: "Lavender & Aquatic Notes",
      base: "Vetiver & Light Musk",
    },
    displayNotes: "Lemon · Lavender · Vetiver",
    image: natureSpirit,
    tag: "Affordable",
    isAvailable: true,
    createdAt: 1710000004000,
  },
  {
    id: "fc-prod-006",
    name: "Flosh Duo Gift Set",
    type: "Spray Perfume",
    category: "Gift Sets",
    size: "50ml Spray + 6ml Oil",
    price: 95000,
    stock: 10,
    description:
      "Hand-wrapped luxury gift box containing a signature Eau de Parfum with its concentrated matching perfume oil companion.",
    notes: {
      top: "Sweet Orange & Pear",
      middle: "Red Peony & Orchid",
      base: "Rich Patchouli & Amber",
    },
    displayNotes: "Orange · Peony · Rich Amber",
    image: midnightEssence,
    tag: "Gift",
    isAvailable: true,
    createdAt: 1710000005000,
  },
  {
    id: "fc-prod-007",
    name: "Nature Spirit",
    type: "Spray Perfume",
    category: "Spray Perfumes",
    size: "75ml eau de parfum",
    price: 120000,
    stock: 15,
    description:
      "An homage to Uganda's lush tropical nature. Earthy, refreshing, and radiating timeless natural confidence.",
    notes: {
      top: "Crushed Fig Leaves & Citrus",
      middle: "Cardamom & White Tea",
      base: "Cedar & Forest Moss",
    },
    displayNotes: "Fig Leaves · Cardamom · Forest Moss",
    image: natureSpirit,
    tag: "New Arrival",
    isAvailable: true,
    createdAt: 1710000006000,
  },
  {
    id: "fc-prod-008",
    name: "Royal Bloom",
    type: "Spray Perfume",
    category: "Spray Perfumes",
    size: "100ml luxury flacon",
    price: 150000,
    stock: 12,
    description:
      "Our crowning masterpiece. Majestic Turkish rose blended with lush peony, golden honey, and warm cashmere amber.",
    notes: {
      top: "Pink Pepper & Turkish Rose",
      middle: "Peony & Honeyed Blossom",
      base: "Cashmere Wood & Amber",
    },
    displayNotes: "Turkish Rose · Peony · Cashmere Amber",
    image: royalBloom,
    tag: "Best Seller",
    isAvailable: true,
    createdAt: 1710000007000,
  },
  {
    id: "fc-prod-009",
    name: "Midnight Essence",
    type: "Spray Perfume",
    category: "Designer Inspired",
    size: "100ml luxury flacon",
    price: 180000,
    stock: 8,
    description:
      "A dark, seductive nocturnal fragrance. Bold notes of black pepper, smoky birch, and intense woody oud that captivate the room.",
    notes: {
      top: "Black Pepper & Cardamom",
      middle: "Smoky Birch & Leather",
      base: "Intense Oud & Vetiver",
    },
    displayNotes: "Black Pepper · Smoky Birch · Oud",
    image: midnightEssence,
    tag: "Signature",
    isAvailable: true,
    createdAt: 1710000008000,
  },
  {
    id: "fc-prod-010",
    name: "One PM Prestige",
    type: "Spray Perfume",
    category: "Designer Inspired",
    size: "100ml grand flacon",
    price: 200000,
    stock: 6,
    description:
      "The pinnacle of executive luxury. Crisp Italian bergamot balanced with precious iris root and deep Haitian vetiver.",
    notes: {
      top: "Calabrian Bergamot & Neroli",
      middle: "Orris Butter & Violet Leaf",
      base: "Haitian Vetiver & Ambergris",
    },
    displayNotes: "Bergamot · Orris Butter · Vetiver",
    image: heroPerfume,
    tag: "Premium",
    isAvailable: true,
    createdAt: 1710000009000,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "FC-2609-7241",
    customerName: "Sarah Nalwanga",
    phoneNumber: "0772 341 980",
    deliveryLocation: "Kololo, Prince Charles Drive, Kampala",
    instructions: "Please call when you reach the gate. Wrap in gold gift ribbon.",
    items: [
      {
        productId: "fc-prod-008",
        name: "Royal Bloom",
        type: "Spray Perfume",
        size: "100ml luxury flacon",
        unitPrice: 150000,
        quantity: 1,
        subtotal: 150000,
        image: royalBloom,
      },
      {
        productId: "fc-prod-002",
        name: "Vanilla Silk Oil",
        type: "Oil Perfume",
        size: "3ml pocket gem",
        unitPrice: 15000,
        quantity: 2,
        subtotal: 30000,
        image: natureSpirit,
      },
    ],
    totalAmount: 180000,
    status: "Confirmed",
    createdAt: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
  },
  {
    id: "FC-2609-8815",
    customerName: "David Kato",
    phoneNumber: "0754 118 420",
    deliveryLocation: "Ntinda Ministers Village, near Shopping Mall",
    instructions: "Leave with security at the reception.",
    items: [
      {
        productId: "fc-prod-009",
        name: "Midnight Essence",
        type: "Spray Perfume",
        size: "100ml luxury flacon",
        unitPrice: 180000,
        quantity: 1,
        subtotal: 180000,
        image: midnightEssence,
      },
    ],
    totalAmount: 180000,
    status: "Pending",
    createdAt: Date.now() - 1000 * 60 * 25, // 25 mins ago
  },
];

const PRODUCTS_STORAGE_KEY = "flosh_cents_products_v3";
const ORDERS_STORAGE_KEY = "flosh_cents_orders_v3";
const LAST_SYNC_KEY = "flosh_cents_last_sync_timestamp";
const RECENT_ORDERS_KEY = "flosh_cents_my_recent_orders";

const SYNC_CHANNEL_NAME = "flosh_cents_live_sync_v1";
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  try {
    broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
  } catch {
    broadcastChannel = null;
  }
}

export function notifyChange(type: "products" | "orders" | "all" = "all") {
  if (typeof window === "undefined") return;
  const now = Date.now();
  try {
    localStorage.setItem(LAST_SYNC_KEY, now.toString());
  } catch {
    // ignore
  }

  // Cross-tab / cross-frame broadcast
  try {
    broadcastChannel?.postMessage({ type, timestamp: now });
  } catch {
    // ignore
  }

  // Same-window custom event
  try {
    window.dispatchEvent(
      new CustomEvent("flosh-cents-store-sync", {
        detail: { type, timestamp: now },
      }),
    );
  } catch {
    // ignore
  }
}

export function getLastSyncTimestamp(): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(localStorage.getItem(LAST_SYNC_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function getMyRecentOrderIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecentOrderId(orderId: string): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getMyRecentOrderIds();
    const updated = [orderId, ...existing.filter((id) => id !== orderId)].slice(0, 10);
    localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function findOrderByNumber(query: string): Order | null {
  if (!query || typeof query !== "string") return null;
  const clean = query.trim().replace(/^#/, "").toUpperCase();
  if (!clean) return null;

  const orders = getStoredOrders();
  return (
    orders.find((o) => {
      const orderIdClean = o.id.replace(/^#/, "").toUpperCase();
      return orderIdClean === clean;
    }) || null
  );
}

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    let parsed = JSON.parse(data) as Product[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }

    // Ensure Barakkat Rouge 540 Extrait de Parfum is always published and in stock
    const barakkatInStorage = parsed.find(
      (p) =>
        p.id === "fc-prod-540" ||
        p.name.toLowerCase().includes("barakkat") ||
        p.name.toLowerCase().includes("540"),
    );

    const barakkatInitial = INITIAL_PRODUCTS.find((p) => p.id === "fc-prod-540")!;
    if (!barakkatInStorage) {
      parsed = [barakkatInitial, ...parsed];
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(parsed));
    } else if (!barakkatInStorage.image || barakkatInStorage.stock <= 0) {
      // Refresh image and stock if it was unconfigured
      barakkatInStorage.image = barakkatRouge;
      if (barakkatInStorage.stock <= 0) barakkatInStorage.stock = 24;
      barakkatInStorage.isAvailable = true;
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(parsed));
    }

    return parsed;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveAllProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    notifyChange("products");
  } catch (e) {
    console.error("Storage save failed:", e);
  }
}

export function saveProduct(
  productInput: Partial<Product> & { name: string; price: number },
): Product {
  const products = getStoredProducts();
  const id = productInput.id || `fc-prod-${Date.now()}`;
  const existingIdx = products.findIndex((p) => p.id === id);

  const price = Math.min(200000, Math.max(5000, Number(productInput.price) || 5000));
  const stock = Math.max(0, Number(productInput.stock) || 0);

  const topNote = productInput.notes?.top || "Sparkling Bergamot";
  const midNote = productInput.notes?.middle || "Damask Rose";
  const baseNote = productInput.notes?.base || "Warm Amber";

  const newProduct: Product = {
    id,
    name: productInput.name.trim(),
    type:
      productInput.type ||
      (productInput.category === "Oil Perfumes" ? "Oil Perfume" : "Spray Perfume"),
    category:
      productInput.category ||
      (productInput.type === "Oil Perfume" ? "Oil Perfumes" : "Spray Perfumes"),
    size:
      productInput.size?.trim() || (productInput.type === "Oil Perfume" ? "6ml roll-on" : "100ml"),
    price,
    stock,
    description:
      productInput.description?.trim() ||
      "A distinguished luxury fragrance blended by Flosh Scents in Kampala.",
    notes: {
      top: topNote,
      middle: midNote,
      base: baseNote,
    },
    displayNotes: productInput.displayNotes || `${topNote} · ${midNote} · ${baseNote}`,
    image: productInput.image || royalBloom,
    tag: productInput.tag || (stock === 0 ? "Affordable" : "New Arrival"),
    isAvailable: stock > 0,
    createdAt: productInput.createdAt || Date.now(),
    custom: true,
  };

  let updated: Product[];
  if (existingIdx >= 0) {
    updated = [...products];
    updated[existingIdx] = newProduct;
  } else {
    updated = [newProduct, ...products];
  }

  saveAllProducts(updated);
  return newProduct;
}

export function deleteProduct(id: string): void {
  const products = getStoredProducts();
  const next = products.filter((p) => p.id !== id);
  saveAllProducts(next);
}

export function updateStockQuantity(productId: string, newStock: number): Product | null {
  const products = getStoredProducts();
  const idx = products.findIndex((p) => p.id === productId);
  if (idx < 0) return null;

  const validStock = Math.max(0, Math.floor(newStock));
  const updatedProduct = {
    ...products[idx],
    stock: validStock,
    isAvailable: validStock > 0,
  };

  const next = [...products];
  next[idx] = updatedProduct;
  saveAllProducts(next);
  return updatedProduct;
}

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed = JSON.parse(data) as Order[];
    return Array.isArray(parsed) ? parsed : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveAllOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    notifyChange("orders");
  } catch (e) {
    console.error("Orders save failed:", e);
  }
}

export function createCustomerOrder(data: {
  customerName: string;
  phoneNumber: string;
  deliveryLocation: string;
  instructions?: string;
  items: {
    product: Product;
    quantity: number;
  }[];
}): Order {
  const orderNumber = `FC-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;

  let totalAmount = 0;
  const orderItems = data.items.map(({ product, quantity }) => {
    const qty = Math.max(1, quantity);
    const subtotal = product.price * qty;
    totalAmount += subtotal;
    return {
      productId: product.id,
      name: product.name,
      type: product.type,
      size: product.size,
      unitPrice: product.price,
      quantity: qty,
      subtotal,
      image: product.image,
    };
  });

  const newOrder: Order = {
    id: orderNumber,
    customerName: data.customerName.trim(),
    phoneNumber: data.phoneNumber.trim(),
    deliveryLocation: data.deliveryLocation.trim(),
    instructions: data.instructions?.trim(),
    items: orderItems,
    totalAmount,
    status: "Pending",
    createdAt: Date.now(),
  };

  // Automatically adjust and decrease inventory
  const currentProducts = getStoredProducts();
  const updatedProducts = currentProducts.map((p) => {
    const ordered = data.items.find((item) => item.product.id === p.id);
    if (ordered) {
      const newStock = Math.max(0, p.stock - ordered.quantity);
      return {
        ...p,
        stock: newStock,
        isAvailable: newStock > 0,
      };
    }
    return p;
  });

  saveAllProducts(updatedProducts);

  const currentOrders = getStoredOrders();
  saveAllOrders([newOrder, ...currentOrders]);
  saveRecentOrderId(newOrder.id);

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
  const orders = getStoredOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx < 0) return null;

  const prevStatus = orders[idx].status;
  const updatedOrder = {
    ...orders[idx],
    status,
  };

  // If an order is cancelled from a reserved status, we could restore inventory if needed
  if (status === "Cancelled" && prevStatus !== "Cancelled") {
    const products = getStoredProducts();
    const restoredProducts = products.map((p) => {
      const item = updatedOrder.items.find((i) => i.productId === p.id);
      if (item) {
        const nextStock = p.stock + item.quantity;
        return { ...p, stock: nextStock, isAvailable: nextStock > 0 };
      }
      return p;
    });
    saveAllProducts(restoredProducts);
  }

  const next = [...orders];
  next[idx] = updatedOrder;
  saveAllOrders(next);
  return updatedOrder;
}

export function formatWhatsAppOrderMessage(order: Order): string {
  const itemsText = order.items
    .map(
      (it, idx) =>
        `${idx + 1}. *${it.name}* (${it.type}, ${it.size})\n   Qty: ${it.quantity} × ${formatUGX(it.unitPrice)} = ${formatUGX(it.subtotal)}`,
    )
    .join("\n");

  return `✨ *FLOSH SCENTS — ORDER CONFIRMATION* ✨
━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* #${order.id}
👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.phoneNumber}
📍 *Delivery Location:* ${order.deliveryLocation}
${order.instructions ? `📝 *Notes:* ${order.instructions}\n` : ""}
🛍️ *Items Ordered:*
${itemsText}

💰 *TOTAL AMOUNT:* ${formatUGX(order.totalAmount)}
━━━━━━━━━━━━━━━━━━━━
Hello Flosh! I just placed this order on the Flosh Scents website. Please confirm availability and delivery time in Kampala. Thank you!`;
}

export function generateDirectWhatsAppLink(order: Order): string {
  const message = formatWhatsAppOrderMessage(order);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
