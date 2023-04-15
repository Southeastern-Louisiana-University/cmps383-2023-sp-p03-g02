import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import EnTrackColors from '../style/colors';
import { LoginDto } from '../types/authentication';
import { loginUser } from './AuthProvider';
import styles from '../style/styles';

const Login: React.FC = () => {
    const [loginLoading, setLoginLoading] = useState(false);

    const onSubmit = async (values: LoginDto) => {
        setLoginLoading(true);
        await loginUser(values)
            .catch((error) => {
                if(axios.isAxiosError(error)){
                    ToastAndroid.show(`Login failed. (${error.code})`, ToastAndroid.LONG)
                }
            });
        setLoginLoading(false);
    }

    const INITIAL_VALUES: LoginDto = { userName: "", password: "" };

    return (
        <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (<View style={[loginStyles.textInputView, loginStyles.loginContainer]}>
                <View style={loginStyles.textInputView}>
                    <TextInput 
                        style={loginStyles.textInput}
                        placeholder="Username"
                        onChangeText={handleChange('userName')}
                        onBlur={handleBlur('userName')}
                        value={values.userName}
                        placeholderTextColor={EnTrackColors.mainColor + "BB"}
                    />
                </View>
                
                <View style={loginStyles.textInputView}>
                    <TextInput 
                        style={loginStyles.textInput}
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        placeholderTextColor={EnTrackColors.mainColor + "BB"}
                    />
                </View>
                <View style={{ padding: 5, height: 45, margin: 10 }}>
                    {loginLoading ?
                    (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Pressable
                            onPress={handleSubmit as any}
                            style={[styles.borderedView, styles.container, styles.center, { padding: 0, backgroundColor: EnTrackColors.mainColor }]}
                        >
                            <Text style={[styles.bigText, { color: EnTrackColors.darkBackground }]}>LOGIN</Text>
                        </Pressable>
                    )}
                </View>
            </View>)}
        </Formik>
    );
}

export default Login;

const loginStyles = StyleSheet.create({
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