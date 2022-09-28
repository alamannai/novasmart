import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Avatar } from "@rneui/themed";
import WrapElt from '../components/WrapElt';
import { Icon } from '@rneui/themed';
import UpdatePass from '../components/UpdatePass';
import { useDispatch ,useSelector } from "react-redux";
import { logout } from '../features/authSlice';


const userDetails= {
    username: 'John123',
    FullName:'John Doe',
    mail: 'Test@exemple.com',
    birth: '01/01/2020',
    phone: '+216 00 000 000'
}

 export default function SettingsScreen() {
  
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userInfo);
  function out() {
    console.log("logout")
    dispatch(logout())
    console.log('user data',user)
  };
    return (
    <WrapElt style={{backgroundColor:'#FAFAFA'}}>
        <View style={styles.profileSection}>
            <View style={styles.profilePic}>
                <Avatar
                    size={76}
                    rounded
                    source={{
                        uri:
                          'https://dummyimage.com/100x100/000/fff',
                      }}
                />

            </View>
            <View style={styles.profileInfo}>
                <Text style={{
                    fontSize:25,
                    color:'#363636',
                    fontWeight: 'bold',
                    marginLeft:10,
                    marginBottom:6
                    }}>
                    {user.SCIV_PRE}
                </Text>
                <Text style={styles.innerText}> {userDetails.mail}</Text>
                <TouchableOpacity style={{
                    width:90,
                    padding:2, 
                    margin:8,
                    marginTop:12,
                    borderRadius:15, 
                    borderColor:'purple',
                    borderWidth: 1 , 
                    alignItems: "center",
                    justifyContent:'center',
                    marginLeft:10,
                    marginTop:14
                    
                    }}>
                    <Text style={{fontSize: 13,color:'purple'}} >Edit profile</Text>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={[styles.card, styles.elevation, {marginHorizontal: 20,}]}>
          <Text style={styles.headingText}>
            Option
          </Text>
          <Text style={styles.inpText}>Notifications</Text>
          <Text style={styles.inpText}>Theme Mode</Text>
          <Text style={styles.inpText}>Offline reading</Text>
          <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop:6,
            marginBottom:18,
            opacity:0.2
          }}
        />
          <Text style={styles.headingText}>
            Account
          </Text>
          <View style={{flexDirection:'row', position:'relative'}}>
            <Text style={styles.inpText}>Personal informations</Text>
            <TouchableOpacity style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="greater-than" size={14} type='material-community' ></Icon>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', position:'relative'}}>
            <Text style={styles.inpText}>Country</Text>
            <Text style={{color:'gray',fontSize: 11,fontWeight: 'normal',position:'absolute', right:24, top:3 }}>
              UK
            </Text>
            <TouchableOpacity style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="greater-than" size={14} type='material-community' ></Icon>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', position:'relative'}}>
            <Text style={styles.inpText}>Region</Text>
            <Text style={{color:'gray',fontSize: 11,fontWeight: 'normal',position:'absolute', right:24, top:3 }}>
              London
            </Text>
            <TouchableOpacity style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="greater-than" size={14} type='material-community' ></Icon>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', position:'relative'}}>
            <Text style={styles.inpText}>Language</Text>
            <Text style={{color:'gray',fontSize: 11,fontWeight: 'normal',position:'absolute', right:24, top:3 }}>
              English
            </Text>
            <TouchableOpacity style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="greater-than" size={14} type='material-community' ></Icon>
            </TouchableOpacity>
          </View>
          <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop:6,
            marginBottom:18,
            opacity:0.2
          }}
        />
          <Text style={styles.headingText}>
            General
          </Text>
          
          <Text style={styles.inpText}>Touch ID & Passcode</Text>
          
          <View style={{flexDirection:'row', position:'relative'}}>
            <Text style={styles.inpText}>Display</Text>
            <TouchableOpacity style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="greater-than" size={14} type='material-community' ></Icon>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', position:'relative'}}>
            <Text style={styles.inpText}>Color fix</Text>
            <TouchableOpacity style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="exchange" size={14} type='font-awesome' ></Icon>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row', position:'relative'}}>
            <Text style={styles.inpText}>Brightness</Text>
            <TouchableOpacity style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="brightness-auto" size={14} type='material-community' ></Icon>
            </TouchableOpacity>
          </View>
          <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop:6,
            marginBottom:18,
            opacity:0.2
          }}
        />
          <View style={styles.lastChild}>
            <Text style={[styles.headingText]}>
              Logout
            </Text>
            <TouchableOpacity onPress={out} style={{position:'absolute', right:0 ,padding:4}}>
                <Icon name="logout" size={16} type='antdesign' ></Icon>
            </TouchableOpacity>
          </View>
          

      </ScrollView>

        
    </WrapElt>
    
    );
  }

  const styles = StyleSheet.create({
    headingText: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 15,
      },
    card: {
      position:'relative',
        backgroundColor: 'white',
        width:'90%',
        paddingVertical: 35,
        borderRadius:4,
        paddingHorizontal: 25,
        margin:16,
        marginTop:24
      },
      elevation: {
        elevation: 6,
        shadowColor: 'gray',
      },
    profileSection:{
        flexDirection:'row',
        marginTop:32,
        marginBottom:8,
        padding:8
    },
    profileInfo:{
        flex:1,
        marginLeft:24,
        paddingHorizontal: 12,
    },
    profilePic:{
        padding:8,
        alignItems: "center",
        justifyContent:'center',
        paddingHorizontal: 16,
    },
    innerText: {
        color:'gray',
        fontSize: 13,
        fontWeight: 'normal',
        marginLeft:10,
      },
    baseText: {
        fontSize:16,
        color:'#363636',
        fontWeight: 'bold',
        margin:4,
      },
      button: {
        width:80,
        borderRadius:10,
        alignItems: "center",
        margin:8,
        backgroundColor: "#0f056b",
        padding: 10,
        marginTop:20,
        alignSelf:'flex-end'
      },
      buttonUp:{
        padding:12,
        width:100,
        height:100, 
        borderRadius:50,
        backgroundColor:'#fac',
        borderColor:'#fff',
        alignSelf:'center' 
      },
      inpText:{
        color:'gray',
        fontSize: 13,
        fontWeight: 'normal',
        marginBottom:15,
        
      },
      lastChild:{
        marginBottom:40,
        paddingBottom:10,
        marginTop:10,
        justifyContent:'center'
      }
      
  });