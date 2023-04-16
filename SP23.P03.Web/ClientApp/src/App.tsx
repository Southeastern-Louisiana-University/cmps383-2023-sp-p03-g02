import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { RoutePlanning } from './pages/RoutePlanning/RoutePlanning';
import { StationListingPage } from './pages/TrainStations/StationListingPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { routes } from './constants/routeconfig';
import { Navbar } from './components/Nav/Navbar';
import { Footer } from './components/Footer/Footer';
import './App.css';
import LoginModal from './components/LoginModal';

export function App() : React.ReactElement {
  return (
    <div className="page-container"
    style={{backgroundColor: '#222222'}}>
        <LoginModal />
        <Navbar />
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.route_planning} element={<RoutePlanning />} />
          <Route path={routes.trainStation_listing} element={<StationListingPage />} />

          {/* If the path does not exist */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
