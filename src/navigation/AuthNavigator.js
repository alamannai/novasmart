import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screens/LoginScreen";
import HomeScreen  from '../Screens/HomeScreen';
import CarScreen  from '../Screens/CarScreen';

const Stack = createNativeStackNavigator();


export default function ScreenNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false}}
    >
      <Stack.Screen name="login" component={LoginScreen}  />
      <Stack.Screen name="home" component={HomeScreen} />
      {/*<Stack.Screen name="car" component={CarScreen} />*/}
    </Stack.Navigator>

  );

}
