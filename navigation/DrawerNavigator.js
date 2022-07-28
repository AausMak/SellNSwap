import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";

//import CustomSidebarMenu from "../screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
 
   render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          inactiveTintColor: this.state.light_theme ? "black" : "white",
          itemStyle: { marginVertical: 5 }
        }}
        //drawerContent={props => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
