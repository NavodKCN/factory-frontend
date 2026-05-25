import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isMenu = location.pathname === '/';

  return (
    <div className="app-layout">
      {/* Top nav bar */}
      <nav className="app-nav">
        <Link to="/" className="app-nav__brand">
          <div className="app-nav__logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="app-nav__brand-name">FACTORY</span>
        </Link>

        {!isMenu && (
          <Link to="/" className="app-nav__menu-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span>Menu</span>
          </Link>
        )}
      </nav>

      {/* Page content */}
      <main className="app-main">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
