import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';


export default function Nav({title}) {

  return (


        <SafeAreaView style={{height: 55 , backgroundColor:'#FAFAFA',position:'relative'}  }>
                <View style={styles.leftBtn}>
                <TouchableOpacity >
                    <Icon name="menu-outline" size={22} type='ionicon' ></Icon>
                </TouchableOpacity>
            </View>
            
            <View style={styles.viewElt}>
                <Text style={styles.textHeader} >{title}</Text>
            </View>

            <View style={ styles.rightBtn}>
                <TouchableOpacity  >
                    <Icon name="notifications-outline" size={22} type='ionicon' ></Icon>
                </TouchableOpacity>
            </View>
        </SafeAreaView>    
 
    
       
  );
}

const styles = StyleSheet.create({
    viewElt:{
        flex:1,
        alignItems: "center",
        justifyContent:'center',
    },
    textHeader:{
        fontSize:22,
        fontWeight: 'bold',
        marginBottom:6
    },
    leftBtn:{
        position:'absolute',
        left:12,
        top:12
    },
    rightBtn:{
        position:'absolute',
        right:12,
        top:12
    },
    tinyLogo: {
        width: 50,
        height: 50,
      },

})