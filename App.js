import  React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from "./store";
import LoginScreen  from './Screens/LoginScreen';
import HomeScreen  from './Screens/HomeScreen';
import SettingsScreen  from './Screens/SettingsScreen';
import FixScreen  from './Screens/FixScreen';

import Nav  from './navigation/Nav';


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
  const [isLogged, setIsLogged] = useState(false);
  const [title, setTitle] = useState('Home');
  const Stack = createNativeStackNavigator();

  const setChangeTitle = (title) => {
    if (!isLogged) {
      setTitle('Logo');
    }

 };

  return (
    <Provider store={store}>

    
    <SafeAreaView style={{ flex: 1}}>
      <View
        style={{
          backgroundColor: '#FAFAFA',
          alignItems: 'center',
          justifyContent: 'center',
          height:50
        }}>
        <StatusBar style="dark" />
      </View>
        {
          isLogged? <Nav title={ title } status={isLogged} />  : <View></View>
        }
      
        

      <NavigationContainer >
        
        {
          isLogged ? 
          <Stack.Navigator initialRouteName='home'>
            <Stack.Screen 
              name="home" 
              component={HomeScreen} 
              options={{
                headerShown:false
              }}
            /> 
            <Stack.Screen 
              name="settings" 
              component={SettingsScreen} 
              options={{
                headerShown:false
              }}  
            />
          </Stack.Navigator>


        : 
        <Stack.Navigator initialRouteName='fix'>
          <Stack.Screen 
          name="login" 
          component={LoginScreen} 
          options={{
            headerShown:false
          }} 
        />
        <Stack.Screen 
          name="fix" 
          component={FixScreen} 
          options={{
            headerShown:false
          }} 
        />
          </Stack.Navigator>
        }

      </NavigationContainer>
  
  </SafeAreaView>
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
