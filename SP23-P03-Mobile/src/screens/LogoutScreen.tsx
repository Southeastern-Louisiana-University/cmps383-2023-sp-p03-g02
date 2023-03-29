import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import EnTrackColors from '../style/colors';
import { logoutUser, useUser } from '../components/AuthProvider';
import BoardingPassList from '../components/BoardingPassList';

/*
 * THIS IS A PLACEHOLDER SCREEN
 */

export default function LogoutScreen() {
  const user = useUser();

  return (
    <View style={styles.container}>
      <Text style={{ color: EnTrackColors.mainColor, fontSize: 32 }}>
        Hi {user.userName}
      </Text>
      <Button
        title='Logout'
        color={EnTrackColors.mainColor}
        onPress={logoutUser}
      />
      <BoardingPassList />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});