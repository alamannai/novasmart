import { NavigationContainer } from "@react-navigation/native";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";

import navigationTheme from "./navigationTheme";


import { createDrawerNavigator } from "@react-navigation/drawer";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { login, logout, selectUser } from "./features/userSlice";

import SettingsScreen from "../screens/Settings";

import HomeScreen from  "../screens/HomeScreen";

const Drawer = createDrawerNavigator();


function Root() {

  return (

    <Drawer.Navigator initialRouteName="Home">

      <Drawer.Screen name="booking" component={BookingNavigation} />

    </Drawer.Navigator>

  );

}


