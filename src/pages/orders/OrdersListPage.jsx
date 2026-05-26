import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUPPLIERS } from '../../data/ordersData';
import { fetchOrders } from '../../services/api';
import './orders.css';

// ─── helpers ────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function formatValue(v) {
  return v != null ? `${v.toLocaleString('it-IT', { minimumFractionDigits: 2 })} EUR` : '—';
}

// ─── component ──────────────────────────────────────────────────────────────
export default function OrdersListPage() {
  const navigate = useNavigate();

  const [supplierFilter, setSupplierFilter] = useState('');
  const [dateMode, setDateMode]   = useState('rich-consegna');
  const [fromDate, setFromDate]   = useState('');
  const [toDate, setToDate]       = useState('');
  const [supplierSearch, setSupplierSearch] = useState('');
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchOrders({ supplierFilter, supplierSearch, fromDate, toDate, dateMode });
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, [supplierFilter, supplierSearch, fromDate, toDate, dateMode]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="page-root">
      {/* ── Top bar ── */}
      <div className="orders-topbar">
        <div className="orders-topbar__left">
          <h1 className="page-title">ORDINI A FORNITORE</h1>
        </div>
        <div className="orders-topbar__right">
          <span className="meta-label">PDV: <strong>CESENATICO</strong></span>
          <span className="meta-label">User: <strong>AMMINISTRATORE</strong></span>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="filter-bar">
        <select
          className="filter-select"
          value={supplierFilter}
          onChange={e => setSupplierFilter(e.target.value)}
        >
          <option value="">— FORNITORE —</option>
          {SUPPLIERS.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <div className="filter-date-group">
          <button className="filter-icon-btn" title="Tipo data">📅</button>
          <select className="filter-select filter-select--sm" value={dateMode} onChange={e => setDateMode(e.target.value)}>
            <option value="rich-consegna">Rich. consegna</option>
            <option value="creato-il">Creato il</option>
            <option value="data-carico">Data carico</option>
          </select>
        </div>

        <button className="btn-add" onClick={() => navigate('/orders/new')} title="Nuovo ordine">
          <span className="btn-add__icon">＋</span>
        </button>

        <div className="filter-notes">
          <input className="filter-notes__input" placeholder="Note al fornitore..." />
        </div>
      </div>

      {/* ── Secondary filter row ── */}
      <div className="filter-bar filter-bar--secondary">
        <div className="filter-date-pair">
          <button className="filter-icon-btn" title="Da data">📅</button>
          <input
            type="date"
            className="filter-input filter-input--date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            placeholder="Da data..."
          />
        </div>
        <div className="filter-date-pair">
          <button className="filter-icon-btn" title="A data">📅</button>
          <input
            type="date"
            className="filter-input filter-input--date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            placeholder="A data..."
          />
        </div>
        <div className="filter-supplier-search">
          <select
            className="filter-select"
            value={supplierSearch}
            onChange={e => setSupplierSearch(e.target.value)}
          >
            <option value="">— CERCA FORNITORE —</option>
            {SUPPLIERS.map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        {(fromDate || toDate || supplierSearch || supplierFilter) && (
          <button
            className="btn-clear-filter"
            onClick={() => { setFromDate(''); setToDate(''); setSupplierSearch(''); setSupplierFilter(''); }}
            title="Rimuovi filtri"
          >
            ✕ Reset
          </button>
        )}
        <button className="btn-nav-arrow btn-nav-arrow--right">▶</button>
      </div>

      {/* ── Desktop Table ── */}
      {loading ? (
        <div className="orders-loading">Caricamento…</div>
      ) : (
        <>
          <div className="orders-table-wrapper orders-table-wrapper--desktop">
            <table className="orders-table">
              <thead>
                <tr>
                  <th colSpan={8} className="orders-table__group-header">INFORMAZIONI ORDINE</th>
                  <th colSpan={5} className="orders-table__group-header">INFORMAZIONI BOLLA</th>
                </tr>
                <tr>
                  <th>Fornitore</th>
                  <th>#</th>
                  <th>Stato</th>
                  <th>Rich. consegna</th>
                  <th>Valore</th>
                  <th>Creato il</th>
                  <th></th>
                  <th></th>
                  <th>Data carico</th>
                  <th>Rif.</th>
                  <th>Valore</th>
                  <th>Cambio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr
                    key={order.id}
                    className="orders-table__row"
                    onClick={() => navigate(`/orders/${order.id}/receive`)}
                  >
                    <td className="cell-supplier">{order.supplierName}</td>
                    <td className="cell-num">{String(order.id).padStart(5, '0')}</td>
                    <td>
                      <span className="status-badge status-badge--evaso">{order.status}</span>
                    </td>
                    <td>{formatDate(order.requestedDelivery)}</td>
                    <td className="cell-value">{formatValue(order.value)}</td>
                    <td className="cell-datetime">{order.createdAt}</td>
                    <td>
                      <button className="icon-btn icon-btn--doc" title="Documento" onClick={e => { e.stopPropagation(); }}>
                        📄
                      </button>
                    </td>
                    <td></td>
                    <td>{order.ddtDate ? formatDate(order.ddtDate) : '—'}</td>
                    <td className="cell-ref">{order.ddtRef || '—'}</td>
                    <td className="cell-value">{order.ddtValue ? formatValue(order.ddtValue) : '—'}</td>
                    <td>—</td>
                    <td>
                      {order.ddtRef ? (
                        <button className="link-btn" onClick={e => { e.stopPropagation(); }}>Modifica</button>
                      ) : (
                        <button className="icon-btn icon-btn--edit" title="Modifica" onClick={e => { e.stopPropagation(); }}>✏️</button>
                      )}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={13} className="orders-table__empty">Nessun ordine trovato.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card view */}
          <div className="orders-card-list">
            {orders.map(order => (
              <div
                key={order.id}
                className="order-card"
                onClick={() => navigate(`/orders/${order.id}/receive`)}
              >
                <div className="order-card__top">
                  <span className="order-card__supplier">{order.supplierName}</span>
                  <span className="status-badge status-badge--evaso">{order.status}</span>
                </div>
                <div className="order-card__row">
                  <span className="order-card__label">#</span>
                  <span className="order-card__num">{String(order.id).padStart(5, '0')}</span>
                  <span className="order-card__label">Rich. consegna</span>
                  <span>{formatDate(order.requestedDelivery)}</span>
                </div>
                <div className="order-card__row">
                  <span className="order-card__label">Valore</span>
                  <span className="order-card__value">{formatValue(order.value)}</span>
                  <span className="order-card__label">Creato</span>
                  <span className="order-card__date">{order.createdAt}</span>
                </div>
                {order.ddtRef && (
                  <div className="order-card__ddt">
                    <span className="order-card__label">Bolla</span>
                    <span>{order.ddtRef}</span>
                    {order.ddtDate && <span className="order-card__date">{formatDate(order.ddtDate)}</span>}
                    {order.ddtValue && <span className="order-card__value">{formatValue(order.ddtValue)}</span>}
                  </div>
                )}
                <div className="order-card__actions">
                  <button className="icon-btn" title="Documento" onClick={e => e.stopPropagation()}>📄</button>
                  <button className="icon-btn" title="Modifica" onClick={e => e.stopPropagation()}>✏️</button>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="orders-loading">Nessun ordine trovato.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
