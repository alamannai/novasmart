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

import { getFer, getAbs } from '../features/calendarSlice';
import FormAdd from '../components/FormAdd';


export default function PlanningScreen({navigation}) {
    const dispatch = useDispatch()
    const [year, setYear] = useState(new Date().toISOString().slice(0,4))

    const [daysFree, setDaysFree] = useState([])
    const [notSame, setNotSame] = useState(false)
    const jfer = useSelector((state) => state.calendar.Jfer);
    const [jferState, setJferState] = useState(jfer)



  const onMonthChange = (date) => {
      console.log(date.toISOString().slice(0,4))

    
    };
/*
    useEffect(() => { 
        if(String(year) != String(currentYear.toISOString().slice(0,4))){
            setNotSame(true)
            console.log(String(year) + '--- /' + String(currentYear.toString().slice(0,4)))
            setYear(currentYear.toString().slice(0,4))
            dispatch(getFer(currentYear.toString().slice(0,4)))
                .then((response) => {
                    console.log(response)
                    setJferState(response)
                })
                .catch((error) => {
                    // ToastAndroid.show(error, ToastAndroid.showWithGravity);
                });
        }                
      },[])
      */

      useEffect(() => {
        dispatch(getFer(year.toString().slice(0,4)))
          .unwrap()
          .then((response) => {
            //console.log('gg',response)
          })
          .catch((error) => {
            // ToastAndroid.show(error, ToastAndroid.showWithGravity);
          });
      }, [])

    const user = useSelector((state) => state.auth.userInfo);


    const handleNavigate = (name) => {

        navigation.navigate(name)
      };

      const [typeOfDay, setTypeOfDay] = useState('')
    
      
  
  const isLoading = useSelector((state) => state.calendar.isLoading);



  const abs = useSelector((state) => state.calendar.Abs);

  useEffect(() => { 
    for (let i = 0; i < jferState.length; i++) {
        const element = jferState[i];
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
        if (element.SABDN_DATV === element.SABDN_FINV){
            const date =  new Date(
                element.SABDN_DATV.toString().slice(0,4)+ '-'+
                element.SABDN_DATV.toString().slice(4,6)+ '-'+
                element.SABDN_DATV.toString().slice(6,8)
                
                
            )
            setDaysFree(daysFree => [...daysFree, {
                date: date, 
                style:{backgroundColor: element.SGAB_COU},
                textStyle: {color: '#1c1c1c',height:'50%'},
            }]
                )
        }else{
            if(element.SABDN_FINV.toString().slice(4,6) == element.SABDN_DATV.toString().slice(4,6))
            {
                const d = parseInt(element.SABDN_DATV.toString().slice(6,8)) 
                const f = parseInt(element.SABDN_FINV.toString().slice(6,8)) 
                console.log("debut",d,"fin",f)
                
                for(let i=0; i< f-d +1; i++){
                    const date =  new Date(
                        element.SABDN_DATV.toString().slice(0,4)+ '-'+
                        element.SABDN_DATV.toString().slice(4,6)+ '-'+
                        String(d+i)
                    )
                    setDaysFree(daysFree => [...daysFree, {
                        date: date, 
                        style:{backgroundColor: element.SGAB_COU},
                        textStyle: {color: '#1c1c1c'},
                    }])

                }
                console.log("true")
            }else{
                console.log("false")
            }
              
        }
        
          console.log( element.SABDN_FINV.toString().slice(6,8),element.SABDN_DATV.toString().slice(6,8))
    }                     
  }, [])


const [selectedDate, setSelectedDate] = useState(new Date())

  const onDateChange = (date) => {
    const pickDate = date.toISOString().slice(0,10).replace('-' ,'').replace('-' ,'')
    setSelectedDate(date)
    console.log("ff",pickDate)

  };
 


  

  return (
    isLoading? 
    <View style={{flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
        }}>
        <ActivityIndicator size="large" color="#6EC1E4"/>
    </View> :
    
        <WrapElt color={'#6EC1E4'}>
            <View style={{flex:1,backgroundColor:'#6EC1E4',width:'100%'}}>
  
            <View style={{ height:80,marginLeft:10}} >
            <TouchableOpacity onPressOut={() =>handleNavigate('home')} style={{
                backgroundColor:'#6EC1E4',
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

            <View style={{backgroundColor:'#6EC1E4',padding:8,height:'42%'}}>
            <CalendarPicker  
                startFromMonday={true}
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
                    ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam','Dim']
                    :
                    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun']
                }
                textStyle={{
                    color: '#fff',
                  }}
                todayTextStyle={{
                    fontWeight:'bold',
                    color:'#1c1c1c',
                  }}

                  customDatesStyles={daysFree}
                  onDateChange={onDateChange}

              //   onMonthChange={onMonthChange}
        

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
                    <Text>Selected date : </Text>
                    <Text> {selectedDate.toString().slice(3,15)}</Text>
                    <Text>Type of the day :{typeOfDay}</Text>
                    <Text>year :{year}</Text>
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