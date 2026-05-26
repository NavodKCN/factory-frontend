/**
 * api.js — Centralized service layer
 *
 * All data access goes through this module. Right now every method
 * resolves against local mock files. When Odoo 19 integration is
 * ready, swap the mock calls for real JSON-RPC calls in each method
 * body — nothing else in the app needs to change.
 *
 * JSON-RPC call shape (for reference):
 *   POST /web/dataset/call_kw
 *   {
 *     jsonrpc: '2.0',
 *     method:  'call',
 *     params: {
 *       model:  '<odoo.model>',
 *       method: '<method_name>',
 *       args:   [...],
 *       kwargs: { context: { lang: 'it_IT', ... } }
 *     }
 *   }
 */

import {
  ORDERS,
  ARTICLES,
  SUPPLIERS,
} from '../data/ordersData';

import {
  inventories,
  inventoryItems152,
  articles,
  categories,
  wasteCalendar,
  wasteEntries,
} from '../data/mockData';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Simulate async network latency in dev (set to 0 for instant). */
const MOCK_DELAY_MS = 0;

function mockResolve(data) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), MOCK_DELAY_MS)
  );
}

// ─── Orders ───────────────────────────────────────────────────────────────────

/**
 * Fetch the orders list, optionally filtered.
 * Odoo target: stock.picking / purchase.order search_read
 */
export async function fetchOrders({ supplierId, supplierSearch, fromDate, toDate, dateMode } = {}) {
  let result = [...ORDERS];

  if (supplierId) {
    result = result.filter((o) => o.supplierId === Number(supplierId));
  }

  if (supplierSearch) {
    const q = supplierSearch.toLowerCase();
    result = result.filter((o) => o.supplierName.toLowerCase().includes(q));
  }

  if (fromDate || toDate) {
    result = result.filter((o) => {
      const dateField =
        dateMode === 'creato-il'   ? o.createdAt?.slice(0, 10) :
        dateMode === 'data-carico' ? o.ddtDate :
        o.requestedDelivery; // default: rich-consegna

      if (!dateField) return false;
      if (fromDate && dateField < fromDate) return false;
      if (toDate   && dateField > toDate)   return false;
      return true;
    });
  }

  return mockResolve(result);
}

/**
 * Fetch a single order by id.
 * Odoo target: purchase.order read (id)
 */
export async function fetchOrder(id) {
  const order = ORDERS.find((o) => o.id === Number(id)) ?? null;
  return mockResolve(order);
}

/**
 * Confirm order reception (bolla di carico).
 * Odoo target: stock.picking button_validate + lot/serial write
 */
export async function confirmOrderReceive(payload) {
  // payload = { orderId, loadDate, ddtNumber, ddtDate, suppPrice, lines: [...] }
  console.info('[api] confirmOrderReceive — stub', payload);
  return mockResolve({ success: true });
}

/**
 * Save a new order draft.
 * Odoo target: purchase.order create
 */
export async function createOrder(payload) {
  // payload = { supplierId, deliveryDate, lines: [{ articleId, units }] }
  console.info('[api] createOrder — stub', payload);
  return mockResolve({ id: Date.now() });
}

// ─── Articles & Suppliers ─────────────────────────────────────────────────────

/** Odoo target: product.product search_read */
export async function fetchArticles({ supplierId, category, search } = {}) {
  let result = [...ARTICLES];
  if (supplierId) result = result.filter((a) => a.supplierId === Number(supplierId));
  if (category)   result = result.filter((a) => a.category === category);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q)
    );
  }
  return mockResolve(result);
}

/** Odoo target: res.partner search_read (supplier=True) */
export async function fetchSuppliers() {
  return mockResolve([...SUPPLIERS]);
}

// ─── Inventories ──────────────────────────────────────────────────────────────

/** Odoo target: stock.inventory search_read */
export async function fetchInventories() {
  return mockResolve([...inventories]);
}

/** Odoo target: stock.inventory.line search_read (inventory_id = id) */
export async function fetchInventoryItems(id) {
  if (Number(id) === 152) {
    return mockResolve([...inventoryItems152]);
  }
  // Fallback: build skeleton from articles
  const skeleton = articles.slice(0, 20).map((a) => ({
    articleId: a.id,
    code: a.code,
    name: a.name,
    category: a.category,
    umxct: a.umxct,
    ct: null,
    sfuso: null,
  }));
  return mockResolve(skeleton);
}

/** Odoo target: stock.inventory write (line quantities) */
export async function saveInventoryItems(inventoryId, lines) {
  console.info('[api] saveInventoryItems — stub', { inventoryId, lines });
  return mockResolve({ success: true });
}

/** Odoo target: stock.inventory action_validate */
export async function closeInventory(inventoryId) {
  console.info('[api] closeInventory — stub', inventoryId);
  return mockResolve({ success: true });
}

// ─── Waste (Scarti) ───────────────────────────────────────────────────────────

/** Odoo target: factory.waste.calendar search_read */
export async function fetchWasteCalendar() {
  return mockResolve([...wasteCalendar]);
}

/** Odoo target: factory.waste.entry read (date) */
export async function fetchWasteEntry(date) {
  const entry = wasteEntries[date] ?? { invenduto: [], produzione: [] };
  return mockResolve({ ...entry });
}

/** Odoo target: factory.waste.entry create / write */
export async function saveWasteEntry(date, payload) {
  // payload = { invenduto: [{ articleId, qty }], produzione: [...] }
  console.info('[api] saveWasteEntry — stub', { date, payload });
  return mockResolve({ success: true });
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

export async function fetchCategories() {
  return mockResolve([...categories]);
}
