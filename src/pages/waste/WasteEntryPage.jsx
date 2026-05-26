import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { articles, getDayName, formatDate } from '../../data/mockData';
import { saveWasteEntry } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import ActionBar from '../../components/common/ActionBar';
import './waste.css';

const TABS = ['INVENDUTO', 'PRODUZIONE'];

const WasteEntryPage = () => {
  const { date } = useParams();
  const dayName = getDayName(date);
  const displayDate = formatDate(date);

  const [activeTab, setActiveTab] = useState('INVENDUTO');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  // Waste document state — keyed by tab
  const [wasteDoc, setWasteDoc] = useState({
    INVENDUTO:  [],
    PRODUZIONE: [],
  });

  // Filtered article list (left panel)
  const filteredArticles = articles.filter((a) =>
    !search ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.code.toLowerCase().includes(search.toLowerCase())
  );

  // Add article to active tab document
  const handleArticleClick = (article) => {
    setWasteDoc((prev) => {
      const existing = prev[activeTab].find((i) => i.articleId === article.id);
      if (existing) return prev;
      return {
        ...prev,
        [activeTab]: [
          ...prev[activeTab],
          { articleId: article.id, code: article.code, name: article.name, um: article.um, qty: '' },
        ],
      };
    });
  };

  const handleQtyChange = (articleId, value) => {
    setWasteDoc((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((i) =>
        i.articleId === articleId ? { ...i, qty: value } : i
      ),
    }));
  };

  const handleRemove = (articleId) => {
    setWasteDoc((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((i) => i.articleId !== articleId),
    }));
  };

  // ── JSON-RPC stub ──────────────────────────────────────────────────────────
  const handleConfirm = async () => {
    setSaving(true);
    try {
      await saveWasteEntry(date, {
        invenduto:  wasteDoc.INVENDUTO.map(i => ({ articleId: i.articleId, qty: Number(i.qty) })),
        produzione: wasteDoc.PRODUZIONE.map(i => ({ articleId: i.articleId, qty: Number(i.qty) })),
      });
      alert('Scarto salvato');
    } finally {
      setSaving(false);
    }
  };

  const currentDoc = wasteDoc[activeTab];

  return (
    <div className="waste-entry-page">
      <PageHeader
        title="Scarto Articoli"
        subtitle={`Data: ${displayDate} ${dayName.charAt(0).toUpperCase() + dayName.slice(1)}`}
      />

      {/* Tab switcher */}
      <div className="waste-entry__tabs">
        {TABS.map((tab) => {
          const count = wasteDoc[tab].length;
          return (
            <button
              key={tab}
              className={`waste-entry__tab ${activeTab === tab ? 'waste-entry__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="waste-entry__tab-label">{tab}</span>
              <span className="waste-entry__tab-count">{count} items</span>
            </button>
          );
        })}
      </div>

      {/* Split layout */}
      <div className="waste-entry__split">

        {/* LEFT — article list */}
        <div className="waste-entry__left">
          <div className="waste-entry__search-wrap">
            <svg className="waste-entry__search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="waste-entry__search"
              placeholder="Cerca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="waste-entry__article-header">
            <span className="waste-entry__article-header-name">Articolo</span>
            <span className="waste-entry__article-header-um">UM2</span>
            <span className="waste-entry__article-header-qty">Quantita'</span>
          </div>

          <div className="waste-entry__article-list">
            {filteredArticles.map((article) => {
              const inDoc = currentDoc.find((i) => i.articleId === article.id);
              return (
                <div
                  key={article.id}
                  className={`waste-entry__article-row ${inDoc ? 'waste-entry__article-row--selected' : ''}`}
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="waste-entry__article-info">
                    <span className="waste-entry__article-name">{article.name}</span>
                    <span className="waste-entry__article-cat">{article.category}</span>
                  </div>
                  <span className="waste-entry__article-um">{article.um}</span>
                  <div className="waste-entry__article-qty-cell">
                    {inDoc && (
                      <input
                        type="number"
                        className="waste-entry__qty-input"
                        value={inDoc.qty}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleQtyChange(article.id, e.target.value)}
                        placeholder=""
                        min="0"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — document panel */}
        <div className="waste-entry__right">
          <div className="waste-entry__doc-panel">
            <div className="waste-entry__doc-header">
              <span className="waste-entry__doc-title">SCARTO {activeTab}</span>
              <span className="waste-entry__doc-count">{currentDoc.length} items</span>
            </div>

            {currentDoc.length === 0 ? (
              <div className="waste-entry__doc-empty">
                <EmptyIcon />
                <span>Nessun articolo aggiunto</span>
                <span className="waste-entry__doc-empty-hint">
                  Clicca un articolo a sinistra per aggiungerlo
                </span>
              </div>
            ) : (
              <>
                <div className="waste-entry__doc-col-header">
                  <span className="waste-entry__doc-col-name">Articolo</span>
                  <span className="waste-entry__doc-col-qty">Quantita'</span>
                </div>
                {/* scrollable items list */}
                <div className="waste-entry__doc-scroll">
                  {currentDoc.map((item) => (
                    <div key={item.articleId} className="waste-entry__doc-item">
                      <div className="waste-entry__doc-item-name">{item.name}</div>
                      <div className="waste-entry__doc-item-right">
                        <input
                          type="number"
                          className="waste-entry__doc-qty-input"
                          value={item.qty}
                          onChange={(e) => handleQtyChange(item.articleId, e.target.value)}
                          placeholder="0"
                          min="0"
                        />
                        <button
                          className="waste-entry__doc-remove"
                          onClick={() => handleRemove(item.articleId)}
                          title="Rimuovi"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ActionBar onBack="/waste" onConfirm={handleConfirm} disabled={saving} />
    </div>
  );
};

const EmptyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
  </svg>
);

export default WasteEntryPage;
