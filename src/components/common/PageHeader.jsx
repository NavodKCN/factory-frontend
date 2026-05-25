import React from 'react';
import { appMeta } from '../../data/mockData';
import './PageHeader.css';

/**
 * PageHeader
 * Matches Mosaico top-right PDV/User info + page title area
 *
 * Props:
 *   title      {string}        - Main page title
 *   subtitle   {string}        - Optional subtitle (e.g. date, order #)
 *   actions    {ReactNode}     - Optional right-side action buttons
 */
const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <header className="page-header">
      <div className="page-header__left">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      <div className="page-header__right">
        {actions && <div className="page-header__actions">{actions}</div>}
        <div className="page-header__meta">
          <span className="page-header__meta-row">
            <span className="page-header__meta-label">PDV:</span>
            <span className="page-header__meta-value">{appMeta.pdv}</span>
          </span>
          <span className="page-header__meta-row">
            <span className="page-header__meta-label">User:</span>
            <span className="page-header__meta-value">{appMeta.user}</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
