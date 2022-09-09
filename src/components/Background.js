import React from 'react'
import { ImageBackground, StyleSheet,SafeAreaView, KeyboardAvoidingView, Platform, View } from 'react-native'
import { theme } from '../core/theme'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Background({ children }) {
  return (
    <SafeAreaView
      style={styles.background}
    >
      <KeyboardAwareScrollView 
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20,paddingVertical: 25,}}
        showsHorizontalScrollIndicator={false} >
        <View style={styles.container}>
        {children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 18,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})