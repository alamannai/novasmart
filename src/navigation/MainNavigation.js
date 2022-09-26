import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import SettingsScreen  from "../Screens/SettingsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login, logout } from "../features/userSlice";

import HomeScreen from  "../Screens/HomeScreen";
import PlanningScreen from  "../Screens/PlanningScreen";
import AskVacc from  "../Screens/AskVacc";


const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="CPH_SAPT" component={PlanningScreen}     options={{ headerShown: false }}  />
          <Stack.Screen name="SPH_SABD" component={AskVacc}     options={{ headerShown: false }}  />
        </Stack.Navigator>

  );

}


export default function MainNavigation () {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer >
      {isLoggedIn ? (
          <Drawer.Navigator initialRouteName="Root"  >
            <Drawer.Screen name="Root" component={HomeScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="CPH_SAPT" component={PlanningScreen}     options={{ headerShown: false }}  />
            <Drawer.Screen name="SPH_SABD" component={AskVacc}     options={{ headerShown: false }}  />
          </Drawer.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}


