import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appMeta } from '../data/mockData';
import './MenuPage.css';

// ── Icons as inline SVG components ────────────────────────────
const IconOrdini = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    <circle cx="7" cy="17" r="1" fill="currentColor"/>
  </svg>
);

const IconBolle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
    <polyline points="9 11 12 14 16 9"/>
  </svg>
);

const IconInventari = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <line x1="6" y1="8" x2="10" y2="8"/>
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="14" y1="8" x2="18" y2="8"/>
    <line x1="14" y1="12" x2="18" y2="12"/>
  </svg>
);

const IconRettifiche = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconScarti = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const IconBuffet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const IconProduzione = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 8 8 21"/>
    <line x1="12" y1="15" x2="21" y2="6"/>
    <polyline points="3 3 21 21"/>
    <polyline points="3 12 12 21"/>
  </svg>
);

const IconTrasferimenti = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

const IconGiacenze = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);

const IconArchivio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8"/>
    <rect x="1" y="3" width="22" height="5"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
);

const IconCdG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
    <polyline points="12 12 12 17"/>
  </svg>
);

const IconOperatori = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconHelp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

// ── Menu tile definitions ──────────────────────────────────────
const menuTiles = [
  { id: 'orders',       label: 'ORDINI A FORNITORE', icon: <IconOrdini />,       path: '/orders',       active: true  },
  { id: 'bolle',        label: 'BOLLE CARICO',        icon: <IconBolle />,        path: '/orders',       active: false },
  { id: 'inventari',   label: 'INVENTARI',            icon: <IconInventari />,    path: '/inventories',  active: true  },
  { id: 'rettifiche',  label: 'RETTIFICHE',           icon: <IconRettifiche />,   path: '#',             active: false },
  { id: 'scarti',      label: 'SCARTI',               icon: <IconScarti />,       path: '/waste',        active: true  },
  { id: 'buffet',      label: 'BUFFET',               icon: <IconBuffet />,       path: '#',             active: false },
  { id: 'produzione',  label: 'PRODUZIONE',           icon: <IconProduzione />,   path: '#',             active: false },
  { id: 'trasferimenti',label:'TRASFERIMENTI A PDV',  icon: <IconTrasferimenti />,path: '#',             active: false },
  { id: 'giacenze',    label: 'GIACENZE',             icon: <IconGiacenze />,     path: '#',             active: false },
  { id: 'archivio',    label: 'ARCHIVIO DOCUMENTI',   icon: <IconArchivio />,     path: '#',             active: false },
  { id: 'cdg',         label: 'CdG',                  icon: <IconCdG />,          path: '#',             active: false },
  { id: 'operatori',   label: 'OPERATORI',            icon: <IconOperatori />,    path: '#',             active: false },
  { id: 'help',        label: 'HELP',                 icon: <IconHelp />,         path: '#',             active: false },
];

// ── Component ──────────────────────────────────────────────────
const MenuPage = () => {
  const navigate = useNavigate();

  const handleTileClick = (tile) => {
    if (!tile.active || tile.path === '#') return;
    navigate(tile.path);
  };

  return (
    <div className="menu-page">
      {/* Top info bar */}
      <div className="menu-page__topbar">
        <div className="menu-page__topbar-meta">
          <span>PDV: <strong>{appMeta.pdv}</strong></span>
          <span>User: <strong>{appMeta.user}</strong></span>
        </div>
      </div>

      {/* Tile grid */}
      <div className="menu-page__grid">
        {menuTiles.map((tile) => (
          <button
            key={tile.id}
            className={`menu-tile ${tile.active ? 'menu-tile--active' : 'menu-tile--disabled'}`}
            onClick={() => handleTileClick(tile)}
            aria-label={tile.label}
            title={!tile.active ? 'Non disponibile in questa fase' : tile.label}
          >
            <div className="menu-tile__icon">{tile.icon}</div>
            <span className="menu-tile__label">{tile.label}</span>
            {!tile.active && <span className="menu-tile__soon">Presto</span>}
          </button>
        ))}
      </div>

      {/* Footer brand */}
      <div className="menu-page__footer">
        <div className="menu-page__footer-brand">
          <span className="menu-page__footer-logo">M</span>
          <span className="menu-page__footer-name">MOSAICO</span>
          <sup className="menu-page__footer-reg">®</sup>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
