import React from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native';
import BoardingPassesScreen from '../screens/BoardingPassesScreen';
import IndexScreen from '../screens/IndexScreen';

const ScreenRouter: React.FC = () => {

    return (
        <NativeRouter>
            <Routes>
                <Route path='/' element={<IndexScreen />} />
                <Route path='/boardingpasses' element={<BoardingPassesScreen />} />
            </Routes>
        </NativeRouter>
    );
}

export default ScreenRouter;