import React from 'react'
import { ImageBackground, StyleSheet,TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native'
import { theme } from '../core/theme'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from '@rneui/themed';
import Logo from '../components/Logo'

export default function Background() {
  return (

    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Logo />

       
<TouchableOpacity 
    style={{
        backgroundColor:'#fff',
 
        height:60,
        position:'absolute',
        bottom:20, 
        borderRadius:30, 
        alignItems:'center',
        justifyContent:'center'
        }}>
    <Icon name="right" size={36} type='antdesign'  ></Icon>
</TouchableOpacity>
      </View>
    </View>
       

  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    headerContainer: {
      marginTop: 50,
      marginHorizontal: 10
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginTop: 35
    }
  });