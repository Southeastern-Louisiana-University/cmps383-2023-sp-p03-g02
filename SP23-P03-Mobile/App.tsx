import React from 'react';
import { View } from 'react-native';
import { AuthProvider } from './src/components/AuthProvider';
import ScreenRouter from './src/components/ScreenRouter';
import ScreenWrapper from './src/components/ScreenWrapper';
import LoginScreen from './src/screens/LoginScreen';
import EnTrackColors from './src/style/colors';
import styles from './src/style/styles';

export default function App() {
  return (
    <View style={[styles.background, styles.container]}>
      <AuthProvider loginElement={<LoginScreen />}>
        <ScreenWrapper>
          <ScreenRouter />
        </ScreenWrapper>
      </AuthProvider>
    </View>
  );
}
