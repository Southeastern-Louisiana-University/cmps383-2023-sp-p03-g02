import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import EnTrackColors from '../style/colors';
import { useUser } from './AuthProvider';
import MainLogo from './MainLogo';

const ScreenRouter: React.FC = () => {
    const user = useUser();

    return (
        user ?
        (
            <>
                <MainLogo />
                <View style={ styles.divider } />
                <LogoutScreen />
            </>
        ) : (
            <LoginScreen />
        )
    );
}

export default ScreenRouter;

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        borderTopColor: EnTrackColors.mainColor,
        borderTopWidth: 3,
        marginBottom: 1,
    }
});