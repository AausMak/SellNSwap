import * as React from "react";
import{createSwitchNavigator , createAppContainer} from 'react-navigation';
import LoginScreen from './screens/Login';
import DashboardScreen from './screens/Dashboard';
import LoadingScreen from './screens/LoadingScreen';

const AppswitchNavigator = createSwitchNavigator({
  Loading:LoadingScreen,
  login:LoginScreen,
  Dashboard:DashboardScreen,
})

const AppNavigator = createAppContainer(AppswitchNavigator)

export default function App(){
  return(
    <AppNavigator />
  )
}