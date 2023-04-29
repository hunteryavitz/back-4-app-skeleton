import React, {useContext} from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationEvents, SafeAreaView} from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import {Context as AuthContext} from "../context/AuthContext";

const SignInScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={clearErrorMessage}
                />
                <AuthForm
                    headerText='Work Report Sign In'
                    errorMessage={state.errorMessage}
                    onSubmit={signin}
                    submitButtonText='SIGN IN'
                />
                <NavLink
                    text={'Dont have an account, then SIGN UP bitch!'}
                    routeName={'SignUp'}
                />
            </View>
        </SafeAreaView>
    );
};

SignInScreen.navigationOptions = () => {
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

export default SignInScreen;
