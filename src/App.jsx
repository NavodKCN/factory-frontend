import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages — lazy loaded for performance
import MenuPage           from './pages/MenuPage';
import OrdersListPage     from './pages/orders/OrdersListPage';
import NewOrderPage       from './pages/orders/NewOrderPage';
import ReceiveOrderPage   from './pages/orders/ReceiveOrderPage';
import InventoriesPage    from './pages/inventories/InventoriesPage';
import InventoryEntryPage from './pages/inventories/InventoryEntryPage';
import WasteCalendarPage  from './pages/waste/WasteCalendarPage';
import WasteEntryPage     from './pages/waste/WasteEntryPage';
import NotFoundPage       from './pages/NotFoundPage';

import './styles/global.css';

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Home — Menu */}
          <Route path="/"                        element={<MenuPage />} />

          {/* Ordini a Fornitore */}
          <Route path="/orders"                  element={<OrdersListPage />} />
          <Route path="/orders/new"              element={<NewOrderPage />} />
          <Route path="/orders/:id/receive"      element={<ReceiveOrderPage />} />

          {/* Inventari */}
          <Route path="/inventories"             element={<InventoriesPage />} />
          <Route path="/inventories/:id"         element={<InventoryEntryPage />} />

          {/* Scarti */}
          <Route path="/waste"                   element={<WasteCalendarPage />} />
          <Route path="/waste/:date"             element={<WasteEntryPage />} />

          {/* 404 */}
          <Route path="*"                        element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
