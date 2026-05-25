import React from 'react';
import './DataTable.css';

/**
 * DataTable
 * Reusable, responsive table component
 * Used in: Orders list, Inventories list, etc.
 *
 * Props:
 *   columns  {Array}  - [{ key, label, width, align, render }]
 *   rows     {Array}  - data rows
 *   onRowClick {function} - optional row click handler
 *   emptyText {string} - message when no rows
 *   loading  {boolean}
 *   className {string}
 */
const DataTable = ({
  columns = [],
  rows = [],
  onRowClick,
  emptyText = 'Nessun dato disponibile',
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className="data-table__loading">
        <div className="data-table__spinner" />
        <span>Caricamento...</span>
      </div>
    );
  }

  return (
    <div className={`data-table-wrap ${className}`}>
      <table className="data-table">
        <thead className="data-table__head">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="data-table__th"
                style={{ width: col.width, textAlign: col.align || 'left' }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="data-table__empty" colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className={`data-table__row ${onRowClick ? 'data-table__row--clickable' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="data-table__td"
                    style={{ textAlign: col.align || 'left' }}
                    data-label={col.label}
                  >
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
