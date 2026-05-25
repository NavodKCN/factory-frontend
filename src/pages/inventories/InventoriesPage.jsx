import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventories, formatDate, formatDateTime } from '../../data/mockData';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import './inventories.css';

const InventoriesPage = () => {
  const navigate = useNavigate();
  const [rows] = useState(inventories);

  const handlePrint = () => window.print();

  const columns = [
    {
      key: 'id',
      label: '#',
      width: '60px',
      align: 'center',
      render: (val) => <span className="inv-id">{val}</span>,
    },
    {
      key: 'date',
      label: 'Data',
      width: '110px',
      render: (val) => formatDate(val),
    },
    {
      key: 'createdAt',
      label: 'Creato il',
      width: '160px',
      render: (val) => formatDateTime(val),
    },
    {
      key: 'id',
      label: 'PHONE',
      width: '60px',
      align: 'center',
      render: (_, row) =>
        row.status === 'open' ? (
          <button
            className="inv-icon-btn inv-icon-btn--edit"
            onClick={(e) => { e.stopPropagation(); navigate(`/inventories/${row.id}`); }}
            title="Modifica (Phone)"
          >
            <PencilIcon />
          </button>
        ) : null,
    },
    {
      key: 'id',
      label: 'PC',
      width: '60px',
      align: 'center',
      render: (_, row) =>
        row.status === 'open' ? (
          <button
            className="inv-icon-btn inv-icon-btn--edit"
            onClick={(e) => { e.stopPropagation(); navigate(`/inventories/${row.id}`); }}
            title="Modifica (PC)"
          >
            <PencilIconGreen />
          </button>
        ) : null,
    },
    {
      key: 'id',
      label: 'PDF',
      width: '60px',
      align: 'center',
      render: () => (
        <button className="inv-icon-btn" onClick={(e) => { e.stopPropagation(); handlePrint(); }} title="Stampa PDF">
          <PdfIcon />
        </button>
      ),
    },
    {
      key: 'id',
      label: 'XLS',
      width: '60px',
      align: 'center',
      render: () => (
        <button className="inv-icon-btn" onClick={(e) => e.stopPropagation()} title="Esporta XLS">
          <XlsIcon />
        </button>
      ),
    },
    {
      key: 'status',
      label: 'CHIUDI',
      width: '70px',
      align: 'center',
      render: (val, row) =>
        val === 'open' ? (
          <button
            className="inv-icon-btn inv-icon-btn--success"
            onClick={(e) => { e.stopPropagation(); navigate(`/inventories/${row.id}`); }}
            title="Aperto — clicca per gestire"
          >
            <CheckCircleIcon />
          </button>
        ) : (
          <button
            className="inv-icon-btn inv-icon-btn--view"
            onClick={(e) => { e.stopPropagation(); navigate(`/inventories/${row.id}`); }}
            title="Visualizza"
          >
            <EyeIcon />
          </button>
        ),
    },
  ];

  // Render sub-row links (Produzione, Bolle, Diff) for closed inventories
  const renderSubRow = (row) => {
    if (row.status === 'open') return null;
    return (
      <tr key={`sub-${row.id}`} className="inv-subrow">
        <td colSpan={8} className="inv-subrow__td">
          <span className="inv-subrow__link">Produzione Bolle di carico</span>
          <span className="inv-subrow__sep">-</span>
          <span className="inv-subrow__link">Diff. inventariali</span>
          <span className="inv-subrow__sep">-</span>
          <span className="inv-subrow__link">Diff. inventariali Pz Produzione</span>
        </td>
      </tr>
    );
  };

  return (
    <div className="inv-list-page">
      <PageHeader
        title="Inventari Magazzino"
        actions={
          <button className="inv-print-btn" onClick={handlePrint}>
            <PrintIcon />
            <span>Modulo stampa</span>
          </button>
        }
      />

      <div className="inv-list-page__body">
        {/* Custom table to support sub-rows */}
        <div className="data-table-wrap">
          <table className="data-table">
            <thead className="data-table__head">
              <tr>
                <th className="data-table__th" style={{ textAlign: 'center', width: 60 }}>#</th>
                <th className="data-table__th" style={{ width: 110 }}>Data</th>
                <th className="data-table__th" style={{ width: 160 }}>Creato il</th>
                <th className="data-table__th" style={{ textAlign: 'center', width: 60 }}>PHONE</th>
                <th className="data-table__th" style={{ textAlign: 'center', width: 60 }}>PC</th>
                <th className="data-table__th" style={{ textAlign: 'center', width: 60 }}>PDF</th>
                <th className="data-table__th" style={{ textAlign: 'center', width: 60 }}>XLS</th>
                <th className="data-table__th" style={{ textAlign: 'center', width: 70 }}>CHIUDI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr className="data-table__row">
                    <td className="data-table__td" style={{ textAlign: 'center' }}>
                      <span className="inv-id">{row.id}</span>
                    </td>
                    <td className="data-table__td">{formatDate(row.date)}</td>
                    <td className="data-table__td">{formatDateTime(row.createdAt)}</td>
                    {/* PHONE */}
                    <td className="data-table__td" style={{ textAlign: 'center' }}>
                      {row.status === 'open' && (
                        <button className="inv-icon-btn inv-icon-btn--edit"
                          onClick={() => navigate(`/inventories/${row.id}`)}>
                          <PencilIcon />
                        </button>
                      )}
                    </td>
                    {/* PC */}
                    <td className="data-table__td" style={{ textAlign: 'center' }}>
                      {row.status === 'open' && (
                        <button className="inv-icon-btn inv-icon-btn--edit-green"
                          onClick={() => navigate(`/inventories/${row.id}`)}>
                          <PencilIconGreen />
                        </button>
                      )}
                    </td>
                    {/* PDF */}
                    <td className="data-table__td" style={{ textAlign: 'center' }}>
                      <button className="inv-icon-btn" onClick={handlePrint}><PdfIcon /></button>
                    </td>
                    {/* XLS */}
                    <td className="data-table__td" style={{ textAlign: 'center' }}>
                      <button className="inv-icon-btn"><XlsIcon /></button>
                    </td>
                    {/* CHIUDI */}
                    <td className="data-table__td" style={{ textAlign: 'center' }}>
                      {row.status === 'open' ? (
                        <button className="inv-icon-btn inv-icon-btn--success"
                          onClick={() => navigate(`/inventories/${row.id}`)}>
                          <CheckCircleIcon />
                        </button>
                      ) : (
                        <button className="inv-icon-btn inv-icon-btn--view"
                          onClick={() => navigate(`/inventories/${row.id}`)}>
                          <EyeIcon />
                        </button>
                      )}
                    </td>
                  </tr>
                  {renderSubRow(row)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Icons ──────────────────────────────────────────────────────
const PencilIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const PencilIconGreen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d7a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const PdfIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d7a4f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
    <line x1="9" y1="11" x2="15" y2="11"/>
    <text x="7" y="20" fontSize="5" fill="#2d7a4f" stroke="none" fontWeight="700">PDF</text>
  </svg>
);

const XlsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
    <line x1="15" y1="3" x2="15" y2="21"/>
    <line x1="6" y1="6" x2="12" y2="12"/>
    <line x1="12" y1="6" x2="6" y2="12"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#2d7a4f" stroke="none">
    <circle cx="12" cy="12" r="12" fill="#2d7a4f"/>
    <polyline points="7 12 10 15 17 9" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d7a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const PrintIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

export default InventoriesPage;