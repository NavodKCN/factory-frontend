import React from 'react';
import './SplitLayout.css';

/**
 * SplitLayout
 * Left panel (article list) + Right panel (document/summary)
 * Core layout pattern used in: Orders, Scarti
 *
 * Props:
 *   left     {ReactNode}  - left panel content (article list)
 *   right    {ReactNode}  - right panel content (document panel)
 *   leftTitle  {string}
 *   rightTitle {string}
 */
const SplitLayout = ({ left, right, leftTitle, rightTitle }) => {
  return (
    <div className="split-layout">
      <div className="split-layout__left">
        {leftTitle && (
          <div className="split-layout__panel-header">
            <h2 className="split-layout__panel-title">{leftTitle}</h2>
          </div>
        )}
        <div className="split-layout__panel-body">{left}</div>
      </div>
      <div className="split-layout__right">
        {rightTitle && (
          <div className="split-layout__panel-header">
            <h2 className="split-layout__panel-title">{rightTitle}</h2>
          </div>
        )}
        <div className="split-layout__panel-body">{right}</div>
      </div>
    </div>
  );
};

export default SplitLayout;
