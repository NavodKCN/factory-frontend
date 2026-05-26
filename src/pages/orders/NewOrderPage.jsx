import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICLES, SUPPLIERS } from '../../data/ordersData';
import { createOrder } from '../../services/api';
import './orders.css';

// ─── helpers ────────────────────────────────────────────────────────────────
const CATEGORIES = [...new Set(ARTICLES.map(a => a.category))].sort();

function calcLineTotal(item, articles) {
  const art = articles.find(a => a.id === item.articleId);
  if (!art) return 0;
  return art.unitCost * item.units;
}

// ─── component ──────────────────────────────────────────────────────────────
export default function NewOrderPage() {
  const navigate = useNavigate();

  const [supplierId, setSupplierId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [search, setSearch] = useState('');
  const [orderItems, setOrderItems] = useState([]);   // [{ articleId, units }]
  const [pendingQty, setPendingQty] = useState({});   // articleId -> input value string
  const [saving, setSaving] = useState(false);

  // Articles filtered by supplier + category + search
  const supplierArticles = useMemo(() => {
    return ARTICLES.filter(a => {
      if (supplierId && a.supplierId !== Number(supplierId)) return false;
      if (categoryFilter && a.category !== categoryFilter) return false;
      if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.code.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [supplierId, categoryFilter, search]);

  function handleQtyChange(articleId, val) {
    setPendingQty(prev => ({ ...prev, [articleId]: val }));
  }

  function handleQtyCommit(articleId) {
    const qty = Number(pendingQty[articleId]);
    if (!qty || qty <= 0) return;
    setOrderItems(prev => {
      const exists = prev.find(i => i.articleId === articleId);
      if (exists) {
        return prev.map(i => i.articleId === articleId ? { ...i, units: qty } : i);
      }
      return [...prev, { articleId, units: qty }];
    });
  }

  function removeItem(articleId) {
    setOrderItems(prev => prev.filter(i => i.articleId !== articleId));
  }

  const orderTotal = orderItems.reduce((sum, item) => sum + calcLineTotal(item, ARTICLES), 0);

  const getArticle = id => ARTICLES.find(a => a.id === id);

  // ── JSON-RPC stub ──────────────────────────────────────────────────────────
  async function handleConfirm() {
    setSaving(true);
    try {
      await createOrder({
        supplierId: Number(supplierId),
        deliveryDate,
        lines: orderItems.map(i => ({ articleId: i.articleId, units: i.units })),
      });
      navigate('/orders');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-root page-root--split">
      {/* ── Top bar ── */}
      <div className="orders-topbar">
        <div className="orders-topbar__left">
          <h1 className="page-title">NUOVO ORDINE</h1>
          {supplierId && (
            <span className="page-subtitle">
              Fornitore: <strong>{SUPPLIERS.find(s => s.id === Number(supplierId))?.name}</strong>
              {deliveryDate && ` · Rich. consegna: ${deliveryDate}`}
            </span>
          )}
        </div>
        <div className="orders-topbar__right">
          <span className="meta-label">PDV: <strong>CESENATICO</strong></span>
          <span className="meta-label">User: <strong>AMMINISTRATORE</strong></span>
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="split-layout">
        {/* ── LEFT: article catalogue ── */}
        <div className="split-layout__left">
          {/* Order header fields */}
          <div className="order-header-fields">
            <select
              className="filter-select"
              value={supplierId}
              onChange={e => { setSupplierId(e.target.value); setOrderItems([]); setPendingQty({}); }}
            >
              <option value="">— Seleziona fornitore —</option>
              {SUPPLIERS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <input
              type="date"
              className="filter-input"
              value={deliveryDate}
              onChange={e => setDeliveryDate(e.target.value)}
              placeholder="Rich. consegna"
            />
          </div>

          {/* Filters */}
          <div className="filter-bar filter-bar--compact">
            <select className="filter-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              <option value="">— Categoria —</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              className="filter-input filter-input--grow"
              placeholder="Cerca articolo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Article list */}
          <div className="article-list">
            <div className="article-list__header">
              <span className="col-article">Articolo</span>
              <span className="col-pack">Pack</span>
              <span className="col-um">UM</span>
              <span className="col-cost">Costo unit</span>
              <span className="col-qty">Unità</span>
            </div>
            {supplierArticles.length === 0 && (
              <div className="article-list__empty">
                {supplierId ? 'Nessun articolo trovato.' : 'Seleziona un fornitore per vedere gli articoli.'}
              </div>
            )}
            {supplierArticles.map(art => {
              const inOrder = orderItems.find(i => i.articleId === art.id);
              return (
                <div
                  key={art.id}
                  className={`article-row ${inOrder ? 'article-row--selected' : ''}`}
                >
                  <div className="article-row__info">
                    <span className="article-row__code">{art.code}</span>
                    <span className="article-row__name">{art.name}</span>
                    <span className="article-row__cat">{art.category}</span>
                  </div>
                  <span className="col-pack">{art.pack}</span>
                  <span className="col-um">{art.um}</span>
                  <span className="col-cost">{art.unitCost.toFixed(3)}</span>
                  <div className="col-qty">
                    <input
                      type="number"
                      className="qty-input"
                      min="0"
                      placeholder=""
                      value={pendingQty[art.id] ?? (inOrder?.units ?? '')}
                      onChange={e => handleQtyChange(art.id, e.target.value)}
                      onBlur={() => handleQtyCommit(art.id)}
                      onKeyDown={e => e.key === 'Enter' && handleQtyCommit(art.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: order document panel ── */}
        <div className="split-layout__right">
          <div className="doc-panel">
            <div className="doc-panel__header">
              <span className="doc-panel__title">DETTAGLIO ORDINE</span>
              <span className="doc-panel__count">{orderItems.length} items</span>
            </div>

            <div className="doc-panel__totals-bar">
              <span>Valore totale: <strong>{orderTotal.toLocaleString('it-IT', { minimumFractionDigits: 2 })} EUR</strong></span>
            </div>

            {orderItems.length > 0 ? (
              <div className="doc-panel__scroll">
                <table className="doc-table">
                  <colgroup>
                    <col className="col-num" />
                    <col className="col-art" />
                    <col className="col-unit" />
                    <col style={{ width: 40 }} />
                    <col className="col-tot" />
                    <col style={{ width: 28 }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="th-art">Articolo</th>
                      <th>Unità</th>
                      <th>Pack</th>
                      <th>Valore</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, idx) => {
                      const art = getArticle(item.articleId);
                      if (!art) return null;
                      const total = calcLineTotal(item, ARTICLES);
                      return (
                        <tr key={item.articleId}>
                          <td>{idx + 1}</td>
                          <td className="doc-table__art-name">{art.code} {art.name.substring(0, 14)}{art.name.length > 14 ? '…' : ''}</td>
                          <td className="doc-table__qty">{item.units}</td>
                          <td>{art.pack}</td>
                          <td className="doc-table__val">{total.toFixed(2)}</td>
                          <td>
                            <button className="remove-btn" onClick={() => removeItem(item.articleId)}>✕</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="doc-table__total-label">Totale</td>
                      <td className="doc-table__total-val">{orderTotal.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="doc-panel__empty">Aggiungi articoli dall'elenco a sinistra.</div>
            )}
          </div>
        </div>
      </div>

      {/* ── Action bar ── */}
      <div className="action-bar">
        <button className="action-bar__back" onClick={() => navigate('/orders')}>←</button>
        <button
          className="action-bar__confirm"
          disabled={orderItems.length === 0 || saving}
          onClick={handleConfirm}
          title="Conferma ordine"
        >
          ✓
        </button>
      </div>
    </div>
  );
}
