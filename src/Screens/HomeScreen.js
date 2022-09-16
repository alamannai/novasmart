import { StyleSheet, Modal, ActivityIndicator, Text, View, FlatList, TouchableOpacity , Image, Pressable} from 'react-native';
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
import { ScrollView } from 'react-native-gesture-handler';



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
    
        <WrapElt color={'#fafafa'}>
            <View style={{
                height:'20%',
                width:'100%',
                backgroundColor:'#fafafa',
                justifyContent:'center',
                position:'relative',
                }}>
                    <View style={{flexDirection:'row' ,alignItems:'center',marginLeft:'5%',marginTop:'10%'}}>
                    <Text style={{fontSize:22,fontWeight:'300',color:'#1c1c1c'}} >
                        {user.LAN == 'F'?'Bonjour,  ':'Hello,  '}
                        </Text>
                    <Text style={{fontSize:22,fontWeight:'700',color:'#1c1c1c'}}>
                        {user.SCIV_PRE}
                    </Text>
                    </View>
                    <Text style={{fontSize:14,fontWeight:'400',color:'1c1c1c',opacity:0.2,marginLeft:'5%',marginTop:10}}>
                    {user.LAN == 'F'?'Bonne Journée .':'Have a nice day .'}
                    </Text>
                    {/**
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
 */}
            <TouchableOpacity  style={{
                        backgroundColor:'#fafafa',
                        height:30,
                        width:30,           
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:20,
                        top:20
                        }}>
                        <Icon name="notifications-outline" size={20} color={'#000'} type='ionicon'></Icon>
                       
                    </TouchableOpacity>
                 <TouchableOpacity  style={{
                        backgroundColor:'#fafafa',
                        height:30,
                        width:30,           
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        left:20,
                        top:20
                        }}>
                        <Icon name="md-menu-outline" size={20} color={'#000'} type='ionicon'></Icon>
                    </TouchableOpacity>

            
            </View>




        <FlatList  style={{backgroundColor:'#fafafa',flex:1}} horizontal={true}
        data={menu} 
        renderItem={({item}) =>  
        <View style={[styles.elevation,{
            position:'relative',
            marginTop:30,
            margin:8,
            flex:1,
            width:200,
            flex:1,
            borderRadius:10,
            backgroundColor:'#3964bc',
            }]}>
                {/** <Image source={require('../../assets/cart-bg.jpg')} style={{
                    width:'100%',
                    flex:1,
                    height:120,
                    borderRadius:8,
                    position:'absolute',
                    top:0,

                    alignSelf:'center',backgroundColor:'#fafafa'
                    }} 
                    />*/}
                    <View key={item.ZMOD_ID} style={{padding:8,height:'20%'}}>


                    <Text style={{margin:2,color:'#fafafa',opacity:0.5, fontSize:10,fontWeight:'bold',alignSelf:'flex-end'}}>
                        #{item.ZMOD_PAG}
                    </Text>
                    </View>
                    <View style={{padding:8,width:'80%',position:'absolute',bottom:'15%',left:'5%'}}>


                        <Text style={{margin:2,color:'#fafafa', opacity:0.8,fontSize:14,fontWeight:'bold'}}>
                            {item.ZMOD_DES}
                        </Text>
                    </View> 
                    <TouchableOpacity onPressOut={() =>handleNavigate(item.ZMOD_ID)}   style={{
                        backgroundColor:'#3964bc',
                        height:30,
                        width:30,   
                        position:'absolute',
                        bottom:10,
                        right:10,        
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:8
                        }}>

                        <Icon name="chevron-right" size={22} color={'#fff'} type='entypo'></Icon>
                    </TouchableOpacity>
         
        </View>
    } 
        />
        <View style={{backgroundColor:'#fafafa',flex:1,width:'100%',padding:16}}>
            <View style={{height:'15%'}}>
            <Text style={{fontWeight:'700'}}>Event</Text>
            </View>
               
                <ScrollView>

             
                <View style={[styles.elevation,
                    {
                        backgroundColor:'#fff',
                        margin:8,
                        marginTop:16,
                        height:70,
                        borderRadius:12,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'relative'
                        }]}>
                    <Text>gg</Text>
                    <TouchableOpacity style={{
                        backgroundColor:'#3964bc',
                        height:80,
                        width:50,
                        position:'absolute',
                        left:0,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:8
                    }}>
                    <Icon name="document-text-outline" size={24} color={'#fff'} type='ionicon'></Icon>
                    </TouchableOpacity>
                </View>
                <View style={[styles.elevation,
                    {
                        backgroundColor:'#fff',
                        margin:8,
                        marginTop:16,
                        height:70,
                        borderRadius:12,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'relative'
                        }]}>
                    <Text>gg</Text>
                    <TouchableOpacity style={{
                        backgroundColor:'#3964bc',
                        height:80,
                        width:50,
                        position:'absolute',
                        left:0,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:8
                    }}>
                    <Icon name="document-text-outline" size={24} color={'#fff'} type='ionicon'></Icon>
                    </TouchableOpacity>
                </View>
               
                <View style={{height:20}}></View>
                </ScrollView>

        </View>
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
        elevation: 4,
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