import { StyleSheet, Pressable, View, Text } from 'react-native';
import { Icon } from '@rneui/themed';




export default function FormAddCard({event}) {
  return (
                   
    <View>
        <View style={{padding:4,alignItems:'center'}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Add a Car</Text>
        </View>
        
    { /** Car item */}
  <View style={[styles.elevation,styles.card]}>
  </View>
  <View style={{
      position:'absolute',
      left:80,
      bottom:0,
      alignItems:'center',
      justifyContent:'center',
      }}>
      <Pressable style={{
          backgroundColor:'#00c04b',
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
      right:80,
      bottom:0,
      alignItems:'center',
      justifyContent:'center',

      }}>
      <Pressable onPress={event} style={{
          backgroundColor:'#d3d3d3',
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

  );
}

const styles = StyleSheet.create({
    card: {
        position:'relative',
        backgroundColor: 'white',
        borderRadius: 30,
        padding:10,
        height:350,
        width: '90%',
        alignSelf:'center',
        margin:6,
        marginTop:40,
        marginBottom:10
      },
    elevation: {
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity:0.2,
        shadowOffset: { width: 0, height: 0 },

  },
})