import { StyleSheet, Modal, Pressable, Text, View, ActivityIndicator, TouchableOpacity , Image} from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import {  getMenu } from '../features/menuSlice';
import { useDispatch ,useSelector } from "react-redux";
import WrapElt from '../components/WrapElt';
import { string } from 'yup';
import { ScrollView } from 'react-native-gesture-handler';


import FormAdd from '../components/FormAdd';

export default function PlanningScreen({navigation}) {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.userInfo);


    const handleNavigate = (name) => {

        navigation.navigate(name)
      };


      const [daysFree, setDaysFree] = useState([])
      
  
  const isLoading = useSelector((state) => state.calendar.isLoading);

  const jfer = useSelector((state) => state.calendar.Jfer);
  const abs = useSelector((state) => state.calendar.Abs);
  useEffect(() => {
    for (let i = 0; i < jfer.length; i++) {
        const element = jfer[i];
        const date =  new Date(
            element.XSJFEEMP_DATF.toString().slice(0,4)+ '-'+
            element.XSJFEEMP_DATF.toString().slice(4,6)+ '-'+
            element.XSJFEEMP_DATF.toString().slice(6,8)
            
        )
        setDaysFree(daysFree => [...daysFree, {
            date: date, 
            style:{backgroundColor: element.XSJFEEMP_COU},
            textStyle: {color: '#1c1c1c'},
        }]
            )
    }                     
  }, [])
  
  useEffect(() => {
    for (let i = 0; i < abs.length; i++) {
        const element = abs[i];
        const date =  new Date(
            element.SABDN_DATV.toString().slice(0,4)+ '-'+
            element.SABDN_DATV.toString().slice(4,6)+ '-'+
            element.SABDN_DATV.toString().slice(6,8)
            
        )
        setDaysFree(daysFree => [...daysFree, {
            date: date, 
            style:{backgroundColor: element.SGAB_COU},
            textStyle: {color: '#fff'},
        }]
            )
    }                     
  }, [])
    
  return (
    isLoading? 
    <View style={{flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
        }}>
        <ActivityIndicator size="large" color="#3e77b6"/>
    </View> :
    
        <WrapElt color={'#55aaff'}>
            <View style={{flex:1,backgroundColor:'#55aaff',width:'100%'}}>
  
            <View style={{ height:80,marginLeft:10}} >
            <TouchableOpacity onPressOut={() =>handleNavigate('home')} style={{
                backgroundColor:'#55aaff',
                width:30,
                height:30,
                padding:4, 
                borderRadius:8, 
                alignItems: "center",
                justifyContent:'center',
                position:"absolute",
                top:16
            }} >
                <Icon name="left" size={18} color='#fff' type='antdesign' ></Icon>
            </TouchableOpacity>
    

            
    
    
            </View>
<View >

            <View style={{backgroundColor:'#55aaff',padding:8,height:'42%'}}>
            <CalendarPicker  
                todayBackgroundColor='#fafafa'
                previousTitle={user.LAN== 'F' ?'Avant' : 'Previous'}
                nextTitle={user.LAN== 'F' ?'Aprés' : 'Next'}
                months={user.LAN== 'F' ? 
                [
                    'Janvier',
                    'Février',
                    'Mars',
                    'Avril',
                    'Mai',
                    'Juin',
                    'Juillet',
                    'Août',
                    'Septembre',
                    'Octobre',
                    'Novembre',
                    'Décembre'
                  ]
                    : 
                    ['January','February','March','April','May','June','July','August','September','October','November','December']
                }
                weekdays={user.LAN== 'F' ? 
                    ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
                    :
                    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                }
                textStyle={{
                    color: '#fff',
                  }}
                todayTextStyle={{
                    fontWeight:'bold',
                    color:'#1c1c1c',
                  }}

                  customDatesStyles={daysFree}
                  enableDateChange={false}

                />
                
          
            {/*<TouchableOpacity style={[styles.addBtn,styles.elevation]} >
                <Icon name="add" size={18} color='white' type='ionicon' ></Icon>
                </TouchableOpacity>*/}
            </View>
            
            </View>
            
    
            <View style={[styles.elevation,{
                backgroundColor:'#fff',
                padding:8,
                marginTop:40,
                flex:1,
                position:'relative',
                borderTopRightRadius:  30,
                borderTopLeftRadius:  30,
                }]}>
                    <View style={{
                        backgroundColor:'#f5f5f5',
                        position:'absolute',
                        top:-14,
                        right:'47%',
                        height:7,
                        width:'10%',
                        borderRadius:8,
                        opacity:0.4
                        }}>
                        
                    </View>
                        
                  
            <View style={{padding:20,flex:1}}>

                <View style={{height:'50%',marginTop:20}}>
                    <Text> add some content </Text>
                    <Text> add some content </Text>
                    <Text> add some content </Text>
                    <Text> add some content </Text>
                    <Text> add some content </Text>
                    <Text> add some content </Text>
                </View>

                              {  /*
                        <TouchableOpacity  style={{
                            backgroundColor:'#d67229',
                            width:60,
                            height:60,
                            padding:4, 
                            borderRadius:10, 
                            alignItems: "center",
                            justifyContent:'center',
                            position:'absolute',
                            right:20,
                            bottom:30
                            
                        }} >
                                <Icon name="add" size={22} color='#fff' type='ionicons' ></Icon>
                            </TouchableOpacity>
                 */}
            </View>

                
            </View>
             

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
        borderWidth:1,
        padding:12,
        borderColor:'#d3d3d3'
    },
    addBtn:{
        width:30,
        height:30,
        padding:4, 
        borderRadius:8, 
        backgroundColor:'orange',
        alignItems: "center",
        justifyContent:'center',
        right:18,
        position:"absolute",
        top:16
    }   ,  
    elevation: {
        elevation: 2,
        shadowColor: '#999999',
        shadowOpacity:0.8,
        shadowOffset: { width: 0, height: 0 },
    },


  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,}
})