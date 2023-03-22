import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MainLogo from '../components/MainLogo';
import AnimatedBar from '../components/AnimatedBar';
import EnTrackColors from '../style/colors';
import { logoutUser, useUser } from '../components/AuthProvider';

/*
 * THIS IS A PLACEHOLDER SCREEN
 */

export default function LogoutScreen() {
  const user = useUser();

  return (
    <View style={styles.container}>
      <MainLogo />
      <AnimatedBar />
      <View>
        <Text style={{ color: EnTrackColors.mainColor, fontSize: 32 }}>
          Hi {user.userName}
        </Text>
        <Button
          title='Logout'
          color={EnTrackColors.mainColor}
          onPress={logoutUser}
        />
      </View>
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