import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ORDERS, ARTICLES } from '../../data/ordersData';
import './orders.css';

// ─── helpers ────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function getArticle(id) {
  return ARTICLES.find(a => a.id === id);
}

// ─── component ──────────────────────────────────────────────────────────────
export default function ReceiveOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = ORDERS.find(o => o.id === Number(id));

  const [loadDate, setLoadDate] = useState('');
  const [ddtNumber, setDdtNumber] = useState('');
  const [ddtDate, setDdtDate] = useState('');
  const [suppPrice, setSuppPrice] = useState('');
  const [search, setSearch] = useState('');

  // received/accepted quantities — keyed by articleId
  const [received, setReceived] = useState(() => {
    if (!order) return {};
    return Object.fromEntries(order.items.map(i => [i.articleId, i.units]));
  });
  const [accepted, setAccepted] = useState(() => {
    if (!order) return {};
    return Object.fromEntries(order.items.map(i => [i.articleId, i.accepted ?? i.units]));
  });

  if (!order) {
    return (
      <div className="page-root">
        <div className="not-found">Ordine non trovato.</div>
        <div className="action-bar">
          <button className="action-bar__back" onClick={() => navigate('/orders')}>←</button>
        </div>
      </div>
    );
  }

  const docTotal = order.items.reduce((sum, item) => {
    const art = getArticle(item.articleId);
    const acc = Number(accepted[item.articleId] ?? 0);
    return sum + (art ? acc * item.unitCost : 0);
  }, 0);

  // Catalogue side: all articles in the order (could filter by search)
  const catalogueItems = order.items.filter(item => {
    if (!search) return true;
    const art = getArticle(item.articleId);
    if (!art) return true;
    return art.name.toLowerCase().includes(search.toLowerCase()) || art.code.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="page-root page-root--split">
      {/* ── Top bar ── */}
      <div className="orders-topbar">
        <div className="orders-topbar__left">
          <h1 className="page-title">ORDINE #{String(order.id).padStart(4, '0')}</h1>
          <span className="page-subtitle">
            Fornitore: <strong>{order.supplierName}</strong>
            &nbsp;·&nbsp;Rich. consegna: <strong>{formatDate(order.requestedDelivery)}</strong>
          </span>
        </div>
        <div className="orders-topbar__right">
          <span className="meta-label">PDV: <strong>CESENATICO</strong></span>
          <span className="meta-label">User: <strong>AMMINISTRATORE</strong></span>
        </div>
      </div>

      {/* ── DDT header fields ── */}
      <div className="ddt-fields-bar">
        <div className="ddt-field">
          <button className="filter-icon-btn">📅</button>
          <select className="filter-select filter-select--sm" value={loadDate} onChange={e => setLoadDate(e.target.value)}>
            <option value="">Data carico</option>
          </select>
        </div>
        <div className="ddt-field">
          <input className="ddt-input" placeholder="Numero bolla" value={ddtNumber} onChange={e => setDdtNumber(e.target.value)} />
        </div>
        <div className="ddt-field">
          <button className="filter-icon-btn">📅</button>
          <select className="filter-select filter-select--sm" value={ddtDate} onChange={e => setDdtDate(e.target.value)}>
            <option value="">Data bolla</option>
          </select>
        </div>
        <div className="ddt-field">
          <input className="ddt-input ddt-input--sm" placeholder="Imp. supp." value={suppPrice} onChange={e => setSuppPrice(e.target.value)} />
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="split-layout">
        {/* ── LEFT: article list (order catalogue) ── */}
        <div className="split-layout__left">
          <div className="filter-bar filter-bar--compact">
            <input
              className="filter-input filter-input--grow"
              placeholder="Cerca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="article-list">
            <div className="article-list__header article-list__header--receive">
              <span className="col-article">Articolo</span>
              <span className="col-pack">Pack</span>
              <span className="col-um">UM</span>
              <span className="col-cost">Costo unit</span>
              <span className="col-qty">Unità</span>
            </div>

            {order.items.length === 0 && (
              <div className="article-list__empty">Nessun articolo in questo ordine.</div>
            )}

            {catalogueItems.map(item => {
              const art = getArticle(item.articleId);
              if (!art) return null;
              return (
                <div key={item.articleId} className="article-row article-row--selected">
                  <div className="article-row__info">
                    <span className="article-row__code">{art.code}</span>
                    <span className="article-row__name">{art.name}</span>
                    <span className="article-row__cat">{art.category}</span>
                  </div>
                  <span className="col-pack">{art.pack}</span>
                  <span className="col-um">{art.um}</span>
                  <span className="col-cost">{item.unitCost.toFixed(3)}</span>
                  <div className="col-qty">
                    <input
                      type="number"
                      className="qty-input"
                      min="0"
                      value={received[item.articleId] ?? ''}
                      onChange={e => setReceived(prev => ({ ...prev, [item.articleId]: e.target.value }))}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: document panel ── */}
        <div className="split-layout__right">
          <div className="doc-panel">
            <div className="doc-panel__header">
              <span className="doc-panel__title">DOCUMENTO</span>
              <span className="doc-panel__count">{order.items.length} items</span>
            </div>

            {order.items.length > 0 && (
              <table className="doc-table doc-table--receive">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Articolo</th>
                    <th colSpan={2} className="th-group">Unità</th>
                    <th colSpan={2} className="th-group">Costo</th>
                  </tr>
                  <tr className="doc-table__subheader">
                    <th></th>
                    <th></th>
                    <th>Ricevuti</th>
                    <th>Accettati</th>
                    <th>Unita</th>
                    <th>Tot</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => {
                    const art = getArticle(item.articleId);
                    if (!art) return null;
                    const acc = Number(accepted[item.articleId] ?? 0);
                    const lineTotal = acc * item.unitCost;
                    return (
                      <tr key={item.articleId}>
                        <td>{idx + 1}</td>
                        <td className="doc-table__art-name">{art.code} {art.name}</td>
                        <td>
                          <input
                            type="number"
                            className="qty-input qty-input--doc"
                            min="0"
                            value={received[item.articleId] ?? ''}
                            onChange={e => setReceived(prev => ({ ...prev, [item.articleId]: e.target.value }))}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="qty-input qty-input--doc"
                            min="0"
                            value={accepted[item.articleId] ?? ''}
                            onChange={e => setAccepted(prev => ({ ...prev, [item.articleId]: e.target.value }))}
                          />
                        </td>
                        <td className="doc-table__val">{item.unitCost.toFixed(2)}</td>
                        <td className="doc-table__val">{lineTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="doc-table__total-label">Totale</td>
                    <td className="doc-table__total-val">{docTotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            )}

            {order.items.length === 0 && (
              <div className="doc-panel__empty">Nessun articolo nel documento.</div>
            )}
          </div>
        </div>
      </div>

      {/* ── Action bar ── */}
      <div className="action-bar">
        <button className="action-bar__back" onClick={() => navigate('/orders')}>←</button>
        <button
          className="action-bar__confirm"
          onClick={() => navigate('/orders')}
          title="Conferma ricezione"
        >
          ✓
        </button>
      </div>
    </div>
  );
}
