import React from 'react'
import { Image, StyleSheet,SafeAreaView, KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { theme } from '../core/theme'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { StatusBar } from 'expo-status-bar';
import { ZoomIn, ZoomInDown } from 'react-native-reanimated';
export default function Background({ children }) {
  return (
    <SafeAreaView
      style={styles.background}
    >
          <View
      style={{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:40,
        
      }}>
      <StatusBar style="dark"  />
    </View>
      <Image source={require('../../assets/gg.jpg')} style={styles.imageRev} />

      <ScrollView >
       
        {children}
   
        </ScrollView>

     {/* <Image source={require('../../assets/gg.jpg')} style={styles.image} />*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
    position:'relative'
  },
  container: {
    padding: '8%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    position:'absolute',
    top:'10%'
  },
  image: {
    width: '100%',
    height: 120,
    position:'absolute',
    bottom:0,
    zIndex:-1
  },
  imageRev: {
    width: '100%',
    height: 80,

    position:'absolute',
    rotation:180

  },
})