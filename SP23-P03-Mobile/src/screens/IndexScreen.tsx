import React from 'react';
import { Button, TouchableHighlight, Text, View } from 'react-native';
import { Link } from 'react-router-native';
import { logoutUser, useUser } from '../components/AuthProvider';
import EnTrackColors from '../style/colors';
import styles from '../style/styles';

const IndexScreen: React.FC = () => {
    const user = useUser();

    return (
    <>
      <Text style={{ color: EnTrackColors.mainColor, fontSize: 32 }}>
        Hi {user.userName}!
      </Text>
      <View style={[styles.container, { alignItems: "stretch" }]}>
        <Link style={[styles.borderedView, styles.menuItem]} to="/boardingpasses">
            <Text style={[styles.hugeText]}>
                Boarding Passes
            </Text>
        </Link>
        <TouchableHighlight style={[styles.borderedView, styles.menuItem]} onPress={logoutUser}>
            <Text style={[styles.hugeText]}>
                Logout
            </Text>
        </TouchableHighlight>
      </View>
    </>
    );
}

export default IndexScreen;