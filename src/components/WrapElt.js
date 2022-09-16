import { StyleSheet, View, SafeAreaView} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Icon } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function WrapElt({ children, color }) {
  return (
    <SafeAreaView style={{ flex: 1}}>
    <View
      style={{
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        height:40,
        
      }}>
      <StatusBar style="dark"  />
    </View>
      <View style={styles.container}>
        {children}
      </View>
      {/*
      <View style={{
        backgroundColor:'#fff',
        height:'7%',
        flexDirection:'row',
        borderTopRightRadius:  8,
        borderTopLeftRadius:  8,
        }}>
          <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
            }}>
         <Icon name="home" size={24} color={'#000'} type='antdesign'></Icon>

          </View>
          <View style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
            }}>
          <Icon name="user" size={24} color={'#000'} type='antdesign'></Icon>

          </View>
        </View>*/}
    
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
      elevation: {
          elevation: 20,
          shadowColor: '#000',
          shadowOpacity:0.8,
          shadowOffset: { width: 2, height: 2 },
  
  
  
      }
})