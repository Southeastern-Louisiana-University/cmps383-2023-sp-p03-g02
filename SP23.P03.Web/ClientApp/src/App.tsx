import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { RoutePlanning } from './pages/RoutePlanning/RoutePlanning';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { routes } from './constants/routeconfig';
import { Navbar } from './components/Nav/Navbar';
import './App.css';
import LoginModal from './components/LoginModal';

export function App() : React.ReactElement {
  return (
    <div className="page-container">
        <LoginModal />
        <Navbar />
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.route_planning} element={<RoutePlanning />} />

          {/* If the path does not exist */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}

export default App;
