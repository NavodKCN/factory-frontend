import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ORDERS, SUPPLIERS } from '../../data/ordersData';
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
  const [dateMode, setDateMode] = useState('rich-consegna'); // 'rich-consegna'
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [supplierSearch, setSupplierSearch] = useState('');

  const filtered = useMemo(() => {
    return ORDERS.filter(o => {
      if (supplierFilter && o.supplierId !== Number(supplierFilter)) return false;
      if (supplierSearch && !o.supplierName.toLowerCase().includes(supplierSearch.toLowerCase())) return false;
      return true;
    });
  }, [supplierFilter, supplierSearch]);

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
          <button className="filter-icon-btn" title="Calendario">📅</button>
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
          <button className="filter-icon-btn">📅</button>
          <select className="filter-select filter-select--sm">
            <option>Da data...</option>
          </select>
        </div>
        <div className="filter-date-pair">
          <button className="filter-icon-btn">📅</button>
          <select className="filter-select filter-select--sm">
            <option>A data...</option>
          </select>
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
        <button className="btn-nav-arrow btn-nav-arrow--right">▶</button>
      </div>

      {/* ── Table ── */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th colSpan={8} className="orders-table__group-header">INFOMAZIONI ORDINE</th>
              <th colSpan={5} className="orders-table__group-header">INFOMAZIONI BOLLA</th>
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
            {filtered.map(order => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
