import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  inventories,
  inventoryItems152,
  articles,
  categories,
  formatDate,
} from '../../data/mockData';
import { saveInventoryItems } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import ActionBar from '../../components/common/ActionBar';
import './inventories.css';

const InventoryEntryPage = () => {
  const { id } = useParams();
  const inventory = inventories.find((i) => i.id === Number(id));

  const baseItems = id === '152'
    ? inventoryItems152
    : articles.slice(0, 20).map((a) => ({
        articleId: a.id,
        code: a.code,
        name: a.name,
        category: a.category,
        umxct: a.umxct,
        ct: null,
        sfuso: null,
      }));

  const [items, setItems] = useState(baseItems);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [semifinishedFilter, setSemifinishedFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showKnownOnly, setShowKnownOnly] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleQtyChange = (articleId, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.articleId === articleId
          ? { ...item, [field]: value === '' ? null : Number(value) }
          : item
      )
    );
  };

  const filtered = items.filter((item) => {
    const matchSearch = !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoryFilter || categoryFilter === '-- TUTTI --' ||
      item.category === categoryFilter;
    const matchKnown = !showKnownOnly || item.ct !== null || item.sfuso !== null;
    return matchSearch && matchCat && matchKnown;
  });

  // ── JSON-RPC stub ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      const lines = items.map(i => ({ articleId: i.articleId, ct: i.ct, sfuso: i.sfuso }));
      await saveInventoryItems(Number(id), lines);
      alert('Inventario salvato');
    } finally {
      setSaving(false);
    }
  };

  if (!inventory) {
    return (
      <div style={{ padding: '2rem', color: 'var(--color-danger)' }}>
        Inventario non trovato.
      </div>
    );
  }

  return (
    <div className="inv-entry-page">
      <PageHeader
        title={`Inventario #${inventory.id}`}
        subtitle={`Data inventario: ${formatDate(inventory.date)} — ${inventory.warehouse}`}
      />

      {/* Filters row */}
      <div className="inv-entry__filters">
        <select
          className="inv-entry__select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">-- REPARTO MP --</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className="inv-entry__select"
          value={semifinishedFilter}
          onChange={(e) => setSemifinishedFilter(e.target.value)}
        >
          <option value="">-- SEMILAVORATO --</option>
          <option>SEMILAVORATO</option>
          <option>MATERIA PRIMA</option>
        </select>

        <div className="inv-entry__search-wrap">
          <input
            type="text"
            className="inv-entry__search"
            placeholder="Cerca articolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <label className="inv-entry__checkbox-label">
          <input
            type="checkbox"
            checked={showKnownOnly}
            onChange={(e) => setShowKnownOnly(e.target.checked)}
          />
          <span>Solo con quantità</span>
        </label>
      </div>

      {/* Table */}
      <div className="inv-entry__body">
        <div className="data-table-wrap">
          <table className="data-table">
            <thead className="data-table__head">
              <tr>
                <th className="data-table__th">Articolo</th>
                <th className="data-table__th inv-entry__th-narrow">UMxCT</th>
                <th className="data-table__th inv-entry__th-narrow">CT</th>
                <th className="data-table__th inv-entry__th-narrow">Sfuso</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td className="data-table__empty" colSpan={4}>
                    Nessun articolo trovato
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.articleId} className="data-table__row">
                    <td className="data-table__td">
                      <div className="inv-entry__article-name">{item.name}</div>
                      <div className="inv-entry__article-code">{item.code}</div>
                    </td>
                    <td className="data-table__td inv-entry__td-center">
                      <span className="inv-entry__umxct">{item.umxct}</span>
                    </td>
                    <td className="data-table__td inv-entry__td-center">
                      <input
                        type="number"
                        className="inv-entry__qty-input"
                        value={item.ct ?? ''}
                        onChange={(e) => handleQtyChange(item.articleId, 'ct', e.target.value)}
                        placeholder="—"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="data-table__td inv-entry__td-center">
                      <input
                        type="number"
                        className="inv-entry__qty-input"
                        value={item.sfuso ?? ''}
                        onChange={(e) => handleQtyChange(item.articleId, 'sfuso', e.target.value)}
                        placeholder="—"
                        min="0"
                        step="0.1"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ActionBar onBack="/inventories" onConfirm={handleSave} disabled={saving} />
    </div>
  );
};

export default InventoryEntryPage;
