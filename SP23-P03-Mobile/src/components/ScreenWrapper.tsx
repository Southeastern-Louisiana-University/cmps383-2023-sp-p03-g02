import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import styles from '../style/styles';
import MainLogo from './MainLogo';

type ScreenWrapperProps = React.PropsWithChildren;

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
    return (
        <>
            <MainLogo />
            <View style={ styles.divider } />
            <View style={ styles.container }>
                {children}
            </View>
            <StatusBar style="light" />
        </>
    )
}

export default ScreenWrapper;