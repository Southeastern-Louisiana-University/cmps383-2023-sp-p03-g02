import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput, ToastAndroid, View } from 'react-native';
import EnTrackColors from '../style/colors';
import { LoginDto } from '../types/authentication';
import { loginUser } from './AuthProvider';

const Login: React.FC = () => {
    const [loginLoading, setLoginLoading] = useState(false);

    const onSubmit = async (values: LoginDto) => {
        setLoginLoading(true);
        loginUser(values)
            .then(() => {
                setLoginLoading(false);
            })
            .catch((error) => {
                setLoginLoading(false);
                if(axios.isAxiosError(error)){
                    ToastAndroid.show(`Login failed. (${error.code})`, ToastAndroid.LONG)
                }
            });
    }

    const INITIAL_VALUES: LoginDto = { userName: "", password: "" };

    return (
        <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (<View style={[styles.textInputView, styles.loginContainer]}>
                <View style={styles.textInputView}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Username"
                        onChangeText={handleChange('userName')}
                        onBlur={handleBlur('userName')}
                        value={values.userName}
                        placeholderTextColor={EnTrackColors.mainColor + "BB"}
                    />
                </View>
                
                <View style={styles.textInputView}>
                    <TextInput 
                        style={styles.textInput}
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
                        <Button
                            onPress={handleSubmit as any}
                            color={EnTrackColors.mainColor}
                            title='Login'
                        />
                    )}
                </View>
            </View>)}
        </Formik>
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