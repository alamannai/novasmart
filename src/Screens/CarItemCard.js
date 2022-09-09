import { StyleSheet, Pressable, View } from 'react-native';
import { Icon } from '@rneui/themed';




export default function CarItemCard() {
  return (
           
            <View>
                  { /** Car item */}
                <View style={[styles.elevation,styles.card]}>
                </View>
                <View style={{
                    position:'absolute',
                    right:8,
                    bottom:-16,
                    padding:14,
                    marginTop:10,
                    alignItems:'center',
                    justifyContent:'center',

                    }}>
                    <Pressable style={{
                        backgroundColor:'#000C66',
                        height:60,
                        width:60,
                        alignItems:'center',
                        justifyContent:'center',
                        borderTopRightRadius:  32,
                        borderBottomRightRadius:  8,
                        borderTopLeftRadius:  8,
                        borderBottomLeftRadius:  32,
                    }}>
                        <Icon name="chevron-forward" size={26} color='white' type='ionicon' ></Icon>
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
        height:300,
        width: '80%',
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