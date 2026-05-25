import React from 'react';
import './FilterBar.css';

/**
 * FilterBar
 * Reusable filter row with dropdowns + search input
 * Matches Mosaico filter pattern used across Orders, Inventory, Scarti
 *
 * Props:
 *   filters    {Array}  - [{ label, value, options: [{label,value}], onChange }]
 *   search     {object} - { value, onChange, placeholder }
 *   actions    {ReactNode} - right-side buttons
 */
const FilterBar = ({ filters = [], search, actions }) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        {filters.map((filter, idx) => (
          <select
            key={idx}
            className="filter-bar__select"
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            aria-label={filter.label}
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {search && (
          <div className="filter-bar__search-wrap">
            <svg className="filter-bar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="filter-bar__search"
              placeholder={search.placeholder || 'Cerca...'}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
            />
            {search.value && (
              <button
                className="filter-bar__search-clear"
                onClick={() => search.onChange('')}
                aria-label="Cancella ricerca"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {actions && (
        <div className="filter-bar__actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
