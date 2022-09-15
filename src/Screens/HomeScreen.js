import { StyleSheet, Modal, ActivityIndicator, Text, View, FlatList, TouchableOpacity , Image} from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import {  getMenu } from '../features/menuSlice';

import { useDispatch ,useSelector } from "react-redux";
import WrapElt from '../components/WrapElt';
import { string } from 'yup';
import { getFer, getAbs } from '../features/calendarSlice';

import { Avatar } from "@rneui/themed";



export default function HomeScreen({navigation}) {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.userInfo);
    const menu = useSelector((state) => state.menu.menu);

    
    const getIconName = (id) => {
        const icons = [  
            { id: "CPH_SAPT" , name:"calendar"},
            { id: "SPH_SABD" , name:"pencil"},
        ]
            for (let i = 0; i < icons.length; i++) {
                if (icons[i].id == id){
                    return icons[i].name
                }
            }
            
      };


    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date(Date.now()));
  
    const showPicker = () => {
      setIsPickerShow(true);
    };
  
    const onChange = (event, value) => {
      setDate(value);
      const time = date.toString().slice(16,25)
      console.log('picked time : ',time)
      if (Platform.OS === 'android') {
        setIsPickerShow(false);
      }
    };


    const handleNavigate = (name) => {

        navigation.navigate(name)
      };

      useEffect(() => {
        dispatch( getMenu())
            .then((res) => { 
                console.log('menu res',res)
            })
            .catch((error) => {
            // ToastAndroid.show(error, ToastAndroid.showWithGravity);
            });
      }, [])
   
      const isLoading = useSelector((state) => state.menu.isLoading);

 
  useEffect(() => {
    dispatch(getFer(date.toISOString().slice(0,4)))
      .unwrap()
      .then((response) => {
        console.log('gg')
      })
      .catch((error) => {
        // ToastAndroid.show(error, ToastAndroid.showWithGravity);
      });
  }, [])

  useEffect(() => {
    dispatch(getAbs(date.toISOString().slice(0,4)))
      .unwrap()
      .then((response) => {
        console.log(date.toISOString().slice(0,4))
        console.log('--------------getting abs-----------',response.length())
      })
      .catch((error) => {
        // ToastAndroid.show(error, ToastAndroid.showWithGravity);
      });
  }, [])

  return (
    isLoading? 
    <View style={{flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
        }}>
        <ActivityIndicator size="large" color="#8cd3ff"/>
    </View> :
    
        <WrapElt color={'#82eefd'}>
            <View style={{
                height:'25%',
                width:'100%',
                backgroundColor:'#82eefd',
                justifyContent:'center',
                position:'relative',
                }}>
            <Text style={{marginLeft:'10%',fontSize:16,marginTop:35,fontWeight:'500',color:'#191970'}} >
                {user.LAN == 'F'?'Bonjour, ':'Hello, '}
                </Text>
            <Text style={{padding:6,marginLeft:'15%',fontSize:28,fontWeight:'700',color:'#000080'}}>
                {user.SCIV_PRE}
            </Text>
            <View style={{position:'absolute',right:40,bottom:30}}>
                <Avatar
                    size={76}
                    rounded
                    source={{
                        uri:
                          'https://dummyimage.com/100x100/000/fff',
                      }}
                />

            </View>

            <TouchableOpacity  style={{
                        backgroundColor:'#82eefd',
                        height:30,
                        width:30,           
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:20,
                        top:20
                        }}>
                        <Icon name="notifications" size={20} color={'#000'} type='ionicons'></Icon>
                       
                    </TouchableOpacity>
                    <TouchableOpacity  style={{
                        backgroundColor:'#82eefd',
                        height:30,
                        width:30,           
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        left:20,
                        top:20
                        }}>
                        <Icon name="menu" size={20} color={'#000'} type='ionicons'></Icon>
                    </TouchableOpacity>

            
            </View>



        <FlatList  style={{backgroundColor:'#fff',width:'100%'}} 
        data={menu} 
        renderItem={({item}) =>  
        <View style={[styles.elevation,{
            position:'relative',
            alignSelf:'center',
            margin:16,
            height:120,
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            borderRadius:20,
            backgroundColor:'#fafafa'
            }]}>
                <Image source={require('../../assets/cart-bg.jpg')} style={{
                    width:'100%',
                    flex:1,
                    height:120,
                    borderRadius:8,
                    position:'absolute',
                    top:0,

                    alignSelf:'center',backgroundColor:'#fafafa'
                    }} 
                    />
                    <View style={{flex:1,padding:8,flexDirection:'row',paddingLeft:20}}>


                        <Text style={{margin:2,color:'#fff',marginLeft:16, fontSize:16,fontWeight:'bold'}}>
                            {item.ZMOD_DES}
                        </Text>
                    </View>
                    <TouchableOpacity onPressOut={() =>handleNavigate(item.ZMOD_ID)}   style={[styles.elevation,{
                        backgroundColor:'#4adede',
                        height:42,
                        width:42,           
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:20,
                        borderRadius:8
                        }]}>

                        <Icon name="chevron-right" size={22} color={'#fff'} type='entypo'></Icon>
                    </TouchableOpacity>
         
        </View>
    } 
        />
    </WrapElt>
  );
}

const styles = StyleSheet.create({
    headerText:{
        padding:8,
        paddingHorizontal:14,
        fontSize: 16,
        fontWeight: '500'
    },
    h2Text:{
        color:'#353839',
        padding:8,
        paddingHorizontal:14,
        fontSize: 14,
        fontWeight: '500'
    },
    calenderElt:{
        padding:4, 
        borderWidth:0.8,
        margin:4 , 
        borderColor:'#00f'
    },
    addBtn:{
        width:30,
        height:30,
        padding:4, 
        borderRadius:8, 
        backgroundColor:'#8cd3ff',
        alignItems: "center",
        justifyContent:'center',
        right:18,
        position:"absolute",
        top:16
    }   ,  
    elevation: {
        elevation: 2,
        shadowColor: '#999999',
        shadowOpacity:0.2,
        shadowOffset: { width: 0, height: 0 },



    },
    
      hideModal:{
        width:30,
        height:30,
        padding:4, 
        borderRadius:50, 
        alignItems: "center",
        justifyContent:'center',
        right:-2,
        position:"absolute",
        top:-2
      },

  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,}
})