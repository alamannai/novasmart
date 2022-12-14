import React from 'react'
import { StyleSheet , TouchableOpacity} from 'react-native'

import { Icon } from '@rneui/themed';

export default function Button({event}) {
  return (
    <TouchableOpacity onPress={event} style={styles.button}>
        <Icon name="ios-settings-outline" size={22} type='ionicon' color={'#000'} ></Icon>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width:40,
    height:40,
    padding:4, 
    borderRadius:8, 
    backgroundColor:'#fff',
    alignItems: "center",
    justifyContent:'center',
  },

})