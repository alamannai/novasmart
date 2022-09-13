import { StyleSheet, View, SafeAreaView} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';



export default function WrapElt({ children }) {
  return (
    <SafeAreaView style={{ flex: 1}}>
    <View
      style={{
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        height:40,

      }}>
      <StatusBar style="dark"  />
    </View>
      <View style={styles.container}>
        {children}
      </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },

})