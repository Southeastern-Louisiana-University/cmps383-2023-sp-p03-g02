import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthProvider } from './src/components/AuthProvider';
import ScreenRouter from './src/components/ScreenRouter';
import EnTrackColors from './src/style/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <ScreenRouter />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EnTrackColors.darkBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
