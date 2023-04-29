import React from 'react';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import EmployeeCreateScreen from "./src/screens/GeoPathCreateScreen";
import EmployeeListScreen from "./src/screens/GeoPathListScreen";
import {Provider as AuthProvider} from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import EmployeeDetailScreen from "./src/screens/GeoPathDetailScreen";
import { Provider as LocationProvider } from "./src/context/LocationContext";

const switchNavigator = createSwitchNavigator(
    {
      ResolveAuth: ResolveAuthScreen,
      loginFlow: createStackNavigator({
        SignUp: SignUpScreen,
        SignIn: SignInScreen
      }),
      mainFlow: createMaterialBottomTabNavigator({
        employeeFlow: createStackNavigator({
          EmployeeList: EmployeeListScreen,
          EmployeeDetail: EmployeeDetailScreen
        }),
      EmployeeCreate: EmployeeCreateScreen,
      Account: AccountScreen
      })
    });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
      <LocationProvider>
        <AuthProvider>
          <App
              ref={(navigator) => {
                setNavigator(navigator)
              }}
          />
        </AuthProvider>
      </LocationProvider>
  );
}
