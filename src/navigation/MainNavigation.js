import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import SettingsScreen  from "../Screens/SettingsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login, logout } from "../features/userSlice";

import HomeScreen from  "../Screens/HomeScreen";


const Drawer = createDrawerNavigator();


function Root() {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen name="home" component={HomeScreen} />
    </Drawer.Navigator>
  );

}



export default function MainNavigation () {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer >
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}


