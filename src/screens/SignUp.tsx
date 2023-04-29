import React, { useContext } from 'react';
import {StyleSheet, View} from 'react-native';
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import {NavigationEvents, SafeAreaView} from "react-navigation";

const SignUpScreen = () => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={clearErrorMessage}
                />
                <AuthForm
                    headerText='Work Report Sign Up'
                    errorMessage={state.errorMessage}
                    onSubmit={signup}
                    submitButtonText='SIGN UP'
                />
                <NavLink text={'Already have an account, then SIGN IN bitch!'} routeName={'SignIn'} />
            </View>
        </SafeAreaView>
    );
};

SignUpScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        backgroundColor: '#222222',
        height: '100%',
    },
    headerText: {
        marginTop: 25,
        fontSize: 48,
        textAlign: 'center',
        color: 'orange',
    },
    text: {
        margin: 25,
        fontSize: 18,
        color: 'yellow',
    },
    button: {
        fontSize: 18,
        color: 'orange',
        backgroundColor: 'black',
        padding: 10,
        textAlign: 'center',
    }
});

export default SignUpScreen;
