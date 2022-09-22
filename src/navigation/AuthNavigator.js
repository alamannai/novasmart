import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screens/LoginScreen";
import ParamScreen  from '../Screens/ParamScreen';
import CarScreen  from '../Screens/CarScreen';

const Stack = createNativeStackNavigator();


export default function ScreenNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false}}
    >
      <Stack.Screen name="login" component={LoginScreen}  />
      <Stack.Screen name="param" component={ParamScreen}  />
      {/*<Stack.Screen name="car" component={CarScreen} />*/}
    </Stack.Navigator>

  );

}
