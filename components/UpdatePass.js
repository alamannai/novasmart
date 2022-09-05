import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

export default function UpdatePass({textSection, icn}) {
  return (
    <View style={{flexDirection:'row',alignItems:'center',position:'relative'}}>
      <Text style={styles.baseText}>
            {textSection}
            </Text>
        <TouchableOpacity style={{
            position:'absolute',
            right:-20,
            width:80,
            height:30,
            borderRadius:6,
            alignItems: "center",
            justifyContent:'center',
            margin:8
        }}
            >
            <Icon name={icn} type='ionicon' >

            </Icon>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    baseText: {
        fontSize:16,
        color:'#363636',
        fontWeight: 'bold',
        margin:4,
      }
})