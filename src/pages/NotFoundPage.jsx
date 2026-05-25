import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60vh', gap:'1rem', color:'var(--color-text-secondary)' }}>
    <h1 style={{ fontSize:'3rem', fontWeight:700, color:'var(--color-primary)' }}>404</h1>
    <p>Pagina non trovata</p>
    <Link to="/" style={{ color:'var(--color-primary)', fontWeight:600 }}>← Torna al menu</Link>
  </div>
);

export default NotFoundPage;
