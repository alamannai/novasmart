import { StyleSheet, Pressable, View, Text } from 'react-native';
import { Icon } from '@rneui/themed';

import AppTextInput from "../components/AppTextInput";

export default function FormAdd() {
  return (
                   
    <View style={{ flex:1,position:'relative'}}>
        
        
    { /** Car item */}
  <View style={[styles.elevation,styles.card]}>
  <View style={{alignItems:'center', marginTop:50}}>
            <Text style={{fontSize:16, fontWeight:'bold',color:'#2b3d5b'}}>Add a Car</Text>
        </View>
  <View style={{marginTop:40,padding:8}} >
                
                <AppTextInput
                onChangeText={"model"}
                value={""}
                name="model"
                
                placeholder={"model"}
                type="text"
       
              />
          <AppTextInput
                onChangeText={"description"}
                value={""}
                name="description"
                
                placeholder={"description"}
                type="text"
                
              />
          <AppTextInput
                onChangeText={"reference"}
                value={""}
                name="reference"
                
                placeholder={"reference"}
                type="text"
                
              />
                    </View>

                 <View style={{
      position:'absolute',
      left:60,
      top:-20,
      alignItems:'center',
      justifyContent:'center',

      }}>
        
      <Pressable style={{
          backgroundColor:'#798571',
          height:40,
          width:80,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:12
      }}>
          <Icon name="chevron-forward" size={18} color='white' type='ionicon' ></Icon>
      </Pressable>
  </View>
  <View style={{
      position:'absolute',
      right:60,
      top:-20,
      alignItems:'center',
      justifyContent:'center',

      }}>
      <Pressable style={{
          backgroundColor:'#43718b',
          height:40,
          width:80,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:12
      }}>
          <Icon name="close" size={18} color='white' type='ionicon' ></Icon>
      </Pressable> 
  </View>

  </View>
  
 
</View>

  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:'#fff',
    padding:16,
    
    width: '100%',
    alignSelf:'center',
    position:'absolute',
    marginTop:160,
    bottom:0,
                    borderTopRightRadius:  70,
                    borderTopLeftRadius:  70,
  
  },
    elevation: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.65,
      shadowRadius: 13.16,
      
      elevation: 20,
  },
})