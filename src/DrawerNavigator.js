// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from '@react-navigation/drawer';

import homeScreen from "../component/screens/homeScreen.js";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={homeScreen} />
      {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;