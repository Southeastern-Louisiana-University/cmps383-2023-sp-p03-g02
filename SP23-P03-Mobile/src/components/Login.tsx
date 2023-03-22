import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import EnTrackColors from '../style/colors';

const Login: React.FC = () => {
    return (
        <View style={[styles.textInputView, styles.loginContainer]}>
            <View style={styles.textInputView}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor={EnTrackColors.mainColor + "BB"}
                />
            </View>
            
            <View style={styles.textInputView}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor={EnTrackColors.mainColor + "BB"}
                />
            </View>
            <View style={{ padding: 5, margin: 10 }}>
                <Button
                    color={EnTrackColors.mainColor}
                    title='Login'
                />
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    loginContainer: {
        width: 300,
        display: "flex",
        flexDirection: "column",
    },
    textInputView: {
        padding: 5,
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: EnTrackColors.mainColor,
    },
    textInput: {
        height: 32,
        color: EnTrackColors.mainColor,
    }
})