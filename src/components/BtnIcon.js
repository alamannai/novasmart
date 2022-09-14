import React from 'react'
import { StyleSheet , TouchableOpacity} from 'react-native'

import { Icon } from '@rneui/themed';

export default function Button() {
  return (
    <TouchableOpacity style={styles.button}>
        <Icon name="settings-outline" size={24} type='ionicon' color={'#fff'} ></Icon>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width:40,
    height:40,
    padding:4, 
    borderRadius:8, 
    backgroundColor:'#c5d4e8',
    alignItems: "center",
    justifyContent:'center',
  },

})