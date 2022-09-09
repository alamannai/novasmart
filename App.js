import  React, {useState} from 'react';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from "./store";
import LoginScreen  from './src/Screens/LoginScreen';
import MainNavigation  from './src/navigation/MainNavigation';
import HomeScreen  from './src/Screens/HomeScreen';
import SettingsScreen  from './src/Screens/SettingsScreen';
import FixScreen  from './src/Screens/FixScreen';
import WelcomeScreen  from './src/Screens/WelcomeScreen';
import "localstorage-polyfill";
import Nav  from './src/navigation/Nav';


const loginSceenLang = [{
  id:1,
  name:'fr',
  elt: [
      {
          btn : ['Connexion','Mot de passe oublié']
      },
      {
          input:['Identifiant', 'Mot de passe']
      },
      {
          text : 'Bienvenu sur NovaSmart HR '
      }
  ]
},
{
  id:2,
  name:'en',
  elt: [
      {
          btn : ['Login','Forget password']
      },
      {
          input:['Username', 'Password']
      },
      {
          text : 'Welcome to NovaSmart HR '
      }
  ]
}
]


export default function App() {

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ECF0F1'
  },
  nav:{
    color: '#fff',
    height: 20
  }
});
