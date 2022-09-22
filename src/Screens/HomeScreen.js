import { StyleSheet, Animated, ActivityIndicator, Text, View, FlatList, TouchableOpacity , Image, SafeAreaView} from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect, useRef } from 'react';
import {  getMenu } from '../features/menuSlice';

import { useDispatch ,useSelector } from "react-redux";
import WrapElt from '../components/WrapElt';
import { string } from 'yup';
import { getFer, getAbs } from '../features/calendarSlice';
import { logout } from '../features/authSlice';
import { Avatar } from "@rneui/themed";
import { ScrollView } from 'react-native-gesture-handler';

import {StackActions} from '@react-navigation/native';

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

      const Load = useSelector((state) => state.auth.loading);
  useEffect(() => {
    dispatch(getFer(date.toISOString().slice(0,4)))
      .unwrap()
      .then((response) => {
        console.log('gg',response)
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


  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  function out() {
    console.log("logout")
    dispatch(logout())
    console.log('user data',user)
  };
  return (
    Load || isLoading? 
    <View style={{flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
        }}>
        <ActivityIndicator size="large" color="#8cd3ff"/>
    </View> :
    
        <WrapElt color={'#fafafa'}>

{/*
<SafeAreaView style={{ 
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    width:'100%'}}>

        <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        

        <View style={{ flexGrow: 1, marginTop: 50 }}>
            {
            // Tab Bar Buttons....
            }

            {TabButton(currentTab, setCurrentTab, "Home")}
            {TabButton(currentTab, setCurrentTab, "Planning")}
            {TabButton(currentTab, setCurrentTab, "Notifications")}
            {TabButton(currentTab, setCurrentTab, "Settings")}

        </View>

        <View>
            {TabButton(currentTab, setCurrentTab, "Logout",)}
        </View>

        </View>
            {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Icon name={showMenu ? 'close' : 'menu'} type='ionicons' style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,

            }}></Icon>

          </TouchableOpacity>



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


          

        </Animated.View>

      </Animated.View>


      </SafeAreaView>*/}


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

            <TouchableOpacity onPress={out}
             style={{
                        backgroundColor:'#fafafa',
                        height:30,
                        width:30,           
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:20,
                        top:20
                        }}>
                        <Icon name="logout" size={20} color={'#000'} type='antdesign'></Icon>
                       
                    </TouchableOpacity>
                 <TouchableOpacity onPress={() => navigation.openDrawer()}
                   style={{
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
                    <Text>Suivre mes demandes</Text>
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
                    <Text>Valider une action</Text>
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


// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
    return (
  
      <TouchableOpacity onPress={() => {
        if (title == "Logout") {
          // Do your Stuff...
        } else {
          setCurrentTab(title)
        }
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15
        }}>
  
          <Image source={image} style={{
            width: 25, height: 25,
            tintColor: currentTab == title ? "#5359D1" : "white"
          }}></Image>
  
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white"
          }}>{title}</Text>
  
        </View>
      </TouchableOpacity>
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