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
import PassengersPage from './pages/Passengers/PassengersPage';
import BoardingPassesPage from './pages/BoardingPasses/BoardingPassesPage';
import { AccountManage } from './pages/Account/AccountManage';
import { TrainListingPage } from './pages/Trains/TrainListingPage';

export function App() : React.ReactElement {
  return (
    <div className="page-container"
    style={{backgroundColor: '#222222'}}>
        <LoginModal />
        <Navbar />
  
        <div className="page-content">
          <Routes>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.account} element={<AccountManage />} />
            <Route path={routes.route_planning} element={<RoutePlanning />} />
            <Route path={routes.trainStation_listing} element={<StationListingPage />} />
            <Route path={routes.passengers} element={<PassengersPage />} />
          	<Route path={routes.boardingpasses} element={<BoardingPassesPage />} />
            <Route path={routes.trains} element={<TrainListingPage />} />

            {/* If the path does not exist */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
    </div>
  );
}

export default App;
