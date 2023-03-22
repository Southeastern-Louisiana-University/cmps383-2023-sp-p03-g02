import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import MainLogo from './src/components/MainLogo';
import AnimatedBar from './src/components/AnimatedBar';
import Login from './src/components/Login';
import EnTrackColors from './src/style/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <MainLogo />
      <AnimatedBar />
      <Login />
      <StatusBar style="light" />
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
