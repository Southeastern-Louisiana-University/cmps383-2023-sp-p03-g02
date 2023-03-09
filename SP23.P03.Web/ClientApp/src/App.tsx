import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage'

export const routes = {
  home : '/',
}

export function App() : React.ReactElement {
  return (
    <div>
        <Routes>
          <Route path={routes.home} element={<HomePage />} />

          {/* If the path does not exist */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}

export default App;