import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionBar.css';

/**
 * ActionBar
 * Fixed bottom bar — matches Mosaico green back arrow + green checkmark pattern
 *
 * Props:
 *   onBack       {function|string}  - handler or path for back button
 *   onConfirm    {function}         - handler for confirm button
 *   confirmLabel {string}           - optional label next to confirm (default: none)
 *   backLabel    {string}           - optional label next to back (default: none)
 *   showConfirm  {boolean}          - show confirm button (default: true)
 *   disabled     {boolean}          - disable confirm button
 *   extra        {ReactNode}        - extra content in the middle
 */
const ActionBar = ({
  onBack,
  onConfirm,
  confirmLabel,
  backLabel,
  showConfirm = true,
  disabled = false,
  extra,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof onBack === 'string') navigate(onBack);
    else if (typeof onBack === 'function') onBack();
    else navigate(-1);
  };

  return (
    <div className="action-bar">
      <button
        className="action-bar__btn action-bar__btn--back"
        onClick={handleBack}
        aria-label="Torna indietro"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {backLabel && <span className="action-bar__label">{backLabel}</span>}
      </button>

      {extra && <div className="action-bar__extra">{extra}</div>}

      {showConfirm && (
        <button
          className="action-bar__btn action-bar__btn--confirm"
          onClick={onConfirm}
          disabled={disabled}
          aria-label="Conferma"
        >
          {confirmLabel && <span className="action-bar__label">{confirmLabel}</span>}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ActionBar;
