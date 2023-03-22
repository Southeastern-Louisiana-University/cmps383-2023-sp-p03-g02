import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MainLogo from '../components/MainLogo';
import AnimatedBar from '../components/AnimatedBar';
import Login from '../components/Login';
import EnTrackColors from '../style/colors';

export default function LoginScreen() {
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