import React from 'react';
import { Text, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import { useUser } from './AuthProvider';

const ScreenRouter: React.FC = () => {
    const user = useUser();

    return (
        user ?
        (
            <LogoutScreen />
            
        ) : (
            <LoginScreen />
        )
    );
}

export default ScreenRouter;