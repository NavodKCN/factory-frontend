import React from 'react';
import './StatusBadge.css';

/**
 * StatusBadge
 * Displays order status, circle indicators, etc.
 *
 * Props:
 *   status   {string}  - 'EVASO' | 'APERTO' | 'success' | 'warning' | 'danger'
 *   label    {string}  - optional override label
 *   dot      {boolean} - show as circle dot (for waste calendar)
 *   filled   {boolean} - filled dot vs outline dot
 */
const STATUS_MAP = {
  EVASO:   { variant: 'success', label: 'EVASO'  },
  APERTO:  { variant: 'warning', label: 'APERTO' },
  CHIUSO:  { variant: 'default', label: 'CHIUSO' },
  success: { variant: 'success', label: ''        },
  warning: { variant: 'warning', label: ''        },
  danger:  { variant: 'danger',  label: ''        },
  default: { variant: 'default', label: ''        },
};

const StatusBadge = ({ status, label, dot = false, filled = true }) => {
  const config = STATUS_MAP[status] || STATUS_MAP.default;
  const displayLabel = label ?? config.label;

  if (dot) {
    return (
      <span
        className={`status-dot status-dot--${config.variant} ${filled ? 'status-dot--filled' : 'status-dot--outline'}`}
        aria-label={displayLabel}
      />
    );
  }

  return (
    <span className={`status-badge status-badge--${config.variant}`}>
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
