import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import MainLogo from '../components/MainLogo';
import AnimatedBar from '../components/AnimatedBar';
import Login from '../components/Login';
import styles from '../style/styles';

export default function LoginScreen() {
  return (
    <View style={[styles.container, styles.center]}>
      <MainLogo />
      <AnimatedBar />
      <Login />
      <StatusBar style="light" />
    </View>
  );
}