import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import SettingsScreen  from "../Screens/SettingsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login, logout } from "../features/userSlice";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from  "../Screens/HomeScreen";
import PlanningScreen from  "../Screens/PlanningScreen";
import AskVacc from  "../Screens/AskVacc";

import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();
function Root() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarShowLabel:false,
      tabBarStyle:{
        backgroundColor:'#fff',
        bottom:0,
        height:'7%',
        elevation:0,
      },
     tabBarIcon: () => {
        if (route.name === 'home') {
        return  <Icon name="home" size={22} type='antdesign' color={'#000'} />;
        } else if (route.name === 'settings') {
        return  <Icon name="user" size={22} type='antdesign' color={'#000'} />;
        }
      }
          })}
        options={{ headerShown: false }}  >
          <Tab.Screen name="home" component={HomeScreen}  options={{ headerShown: false }} />
          <Tab.Screen name="settings" component={SettingsScreen}  options={{ headerShown: false }} />
        </Tab.Navigator>
 

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
               name="Root"
               component={Root} 
               options={{ headerShown: false }}
             />
             <Stack.Screen name="CPH_SAPT" component={PlanningScreen}     options={{ headerShown: false }}  />
             <Stack.Screen name="SPH_SABD" component={AskVacc}     options={{ headerShown: false }}  />
           </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}


