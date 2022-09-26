import { StyleSheet, Modal, Pressable, Text, View, ActivityIndicator, TouchableOpacity , Image} from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect, useMemo } from 'react';
import {  getMenu } from '../features/menuSlice';
import { useDispatch ,useSelector } from "react-redux";
import WrapElt from '../components/WrapElt';
import { string } from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

import { getFer, getAbs } from '../features/calendarSlice';
import FormAdd from '../components/FormAdd';
import {Calendar, LocaleConfig} from 'react-native-calendars';




LocaleConfig.locales['F'] = {
  monthNames: [
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
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: "Aujourd'hui"
};
LocaleConfig.locales['E'] = {
    monthNames:  ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: "Today"
  };


export default function PlanningScreen({navigation}) {
    
    const dispatch = useDispatch()
    const [currentYear, setCurrentYear] = useState(new Date().toISOString().slice(0,4))
    const [year, setYear] = useState(currentYear)

    const [daysFree, setDaysFree] = useState({})
    const jfer = useSelector((state) => state.calendar.Jfer);
    const [jferState, setJferState] = useState(jfer)

    const [initialDate, setInitialDate] = useState(new Date())

    const user = useSelector((state) => state.auth.userInfo);


    const handleNavigate = (name) => {

        navigation.navigate(name)
      };

      const [typeOfDay, setTypeOfDay] = useState('')
      LocaleConfig.defaultLocale = user.LAN;  
      
  
  const isLoading = useSelector((state) => state.calendar.isLoading);



  const abs = useSelector((state) => state.calendar.Abs);


  const [nyear, setNyear] = useState([])
  const [nyearAbs, setNyearAbs] = useState([])

  useEffect(() => { 
    dispatch(getFer(year))
        .unwrap()
        .then((response) => {
            setNyear(response)
        })
        .catch((error) => {
        // ToastAndroid.show(error, ToastAndroid.showWithGravity);
        });                   
  }, [year])


useEffect(() => { 
    dispatch(getAbs(year))
        .unwrap()
        .then((response) => {
            setNyearAbs(response)
            console.log("abs diff year",response)
        })
        .catch((error) => {
        // ToastAndroid.show(error, ToastAndroid.showWithGravity);
        });                   
  }, [year])
  const [dateString, setDateString] = useState("");
  const [msgDate, setMsgDate] = useState("Jour de travail");

  useEffect(() => { 
   if(dateString.slice(0,4) == year){
        for (let i = 0; i < jferState.length; i++) {
            const element = jferState[i];
    
            const sc = element.XSJFEEMP_DATF.toString().slice(0,4)+ '-'+
                        element.XSJFEEMP_DATF.toString().slice(4,6)+ '-'+
                        element.XSJFEEMP_DATF.toString().slice(6,8)

            if(sc == dateString){
                setMsgDate(element.XSJFEEMP_LIB);
               console.log("selected date is vacc",msgDate);
               break
            }
            setMsgDate("Jour de travail");
        }

        
        
        
    }

  }, [dateString])


  const marked = useMemo(() => {
    const obj = {}
    // diff year jferie
    for (let i = 0; i < nyear.length; i++) {
        const element = nyear[i];
        const sc = element.XSJFEEMP_DATF.toString().slice(0,4)+ '-'+
                    element.XSJFEEMP_DATF.toString().slice(4,6)+ '-'+
                    element.XSJFEEMP_DATF.toString().slice(6,8)


        obj[sc]={
            selected: true, 
            selectedColor: element.XSJFEEMP_COU,
          }
    }
      // diff year abs
      for (let i = 0; i < nyearAbs.length; i++) {
        const element = nyearAbs[i];
        if (element.SABDN_DATV === element.SABDN_FINV){
            const date = 
                element.SABDN_DATV.toString().slice(0,4)+ '-'+
                element.SABDN_DATV.toString().slice(4,6)+ '-'+
                element.SABDN_DATV.toString().slice(6,8)
                
            obj[date]={
                selected: true, 
                selectedColor: element.SGAB_COU,
                dotColor: element.SGAB_COD == 'MA'?'green' : 'purple',
                marked: true,
                }
        }else{
           
                const d =   element.SABDN_DATV.toString().slice(0,4)+ '-'+
                            element.SABDN_DATV.toString().slice(4,6)+ '-'+
                            element.SABDN_DATV.toString().slice(6,8)

                const f =   element.SABDN_FINV.toString().slice(0,4)+ '-'+
                            element.SABDN_FINV.toString().slice(4,6)+ '-'+
                            element.SABDN_FINV.toString().slice(6,8)
                
                const dd = parseInt(element.SABDN_DATV.toString().slice(6,8)) 
                const ff = parseInt(element.SABDN_FINV.toString().slice(6,8)) 
                
                for(let i=0; i< ff-dd +1; i++){
                    const nd =  
                        element.SABDN_DATV.toString().slice(0,4)+ '-'+
                        element.SABDN_DATV.toString().slice(4,6)+ '-'+
                        String(dd+i)
                
                    obj[nd]={
                        selected: true, 
                        selectedColor: element.SGAB_COU,
                        marked: true, 
                        dotColor: element.SGAB_COD == 'MA'?'green' : 'purple',
                        }

                }


                }

    }
    // curr year jferie
    for (let i = 0; i < jferState.length; i++) {
        const element = jferState[i];
        const sc = element.XSJFEEMP_DATF.toString().slice(0,4)+ '-'+
                    element.XSJFEEMP_DATF.toString().slice(4,6)+ '-'+
                    element.XSJFEEMP_DATF.toString().slice(6,8)


        obj[sc]={
            selected: true, 
            selectedColor: element.XSJFEEMP_COU,
          }
    }
    // curr year abs
    for (let i = 0; i < abs.length; i++) {
        const element = abs[i];
        if (element.SABDN_DATV === element.SABDN_FINV){
            const date = 
                element.SABDN_DATV.toString().slice(0,4)+ '-'+
                element.SABDN_DATV.toString().slice(4,6)+ '-'+
                element.SABDN_DATV.toString().slice(6,8)
                
            obj[date]={
                selected: true, 
                selectedColor: element.SGAB_COU,
                marked:true,
                dotColor: element.SGAB_COD == 'MA'?'green' : 'purple',
                }
        }else{
           
                const d =   element.SABDN_DATV.toString().slice(0,4)+ '-'+
                            element.SABDN_DATV.toString().slice(4,6)+ '-'+
                            element.SABDN_DATV.toString().slice(6,8)

                const f =   element.SABDN_FINV.toString().slice(0,4)+ '-'+
                            element.SABDN_FINV.toString().slice(4,6)+ '-'+
                            element.SABDN_FINV.toString().slice(6,8)
                
                const dd = parseInt(element.SABDN_DATV.toString().slice(6,8)) 
                const ff = parseInt(element.SABDN_FINV.toString().slice(6,8)) 
                
                for(let i=0; i< ff-dd +1; i++){
                    const nd =  
                        element.SABDN_DATV.toString().slice(0,4)+ '-'+
                        element.SABDN_DATV.toString().slice(4,6)+ '-'+
                        String(dd+i)
                
                    obj[nd]={
                        selected: true, 
                        selectedColor: element.SGAB_COU,
                        marked: true, 
                        dotColor: element.SGAB_COD == 'MA'?'green' : 'purple',
                        }

                }


                }

    } 
    return obj  
  },[nyear,year]);
 


const [selectedDate, setSelectedDate] = useState(new Date().toString().slice(4,16))

  const onDateChange = (date) => {
    setSelectedDate(date)
  };
 


  

  return (
        <WrapElt color={'#fff'}>
            <View style={{flex:1,backgroundColor:'#fff',width:'100%'}}>
  
            <View style={{ height:80,marginLeft:10}} >
            <TouchableOpacity onPressOut={() =>handleNavigate('Root')} style={{
                backgroundColor:'#fff',
                width:30,
                height:30,
                padding:4, 
                borderRadius:8, 
                alignItems: "center",
                justifyContent:'center',
                position:"absolute",
                top:16
            }} >
                <Icon name="left" size={18} color='#000' type='antdesign' ></Icon>
            </TouchableOpacity>
    

            {isLoading? 
                <View style={{
                    position:'absolute',top:40,left:'45%'
                    }}>
                    <ActivityIndicator size="large" color="#3964bc"/>
                </View> : 
                <View></View>
            }
    
    
            </View>
<View >

            <View style={{backgroundColor:'#fff',height:'42%',position:'relative'}}>
            
            <Calendar 
                firstDay={1}
            hideExtraDays={true}
                theme={{
                    arrowColor: '#000',
                    calendarBackground: '#fff',
                    monthTextColor: '#000',
                    dayTextColor: '#000',
                    selectedDayTextColor: 'gray',
                    todayTextColor: 'orange',
                    textSectionTitleColor: '#000',
                    selectedDayTextColor: '#000',
                }}
                // Collection of dates that have to be marked. Default = {}
                markedDates={marked}
                onDayPress={day => {
                    setSelectedDate(new Date(day.dateString).toString().slice(4,16));
                    console.log(day.dateString)
                    setDateString(day.dateString);
                  }}

                  onMonthChange={month => {
                    if (month.year != year){
                        setYear(month.year)
                        console.log('year changed', month);
                    }
                    console.log('month changed', month);
                  }}
                />
          {  /*<CalendarPicker  
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

        

                />*/}
                
          
            {/*<TouchableOpacity style={[styles.addBtn,styles.elevation]} >
                <Icon name="add" size={18} color='white' type='ionicon' ></Icon>
                </TouchableOpacity>*/}
            </View>
            
            </View>
            
    
            <View style={[styles.elevation,{
                backgroundColor:'#3964bc',
                padding:8,
                marginTop:70,
                flex:1,
                position:'relative',
                borderTopRightRadius:  12,
                borderTopLeftRadius:  12,
                borderBottomRightRadius:  12,
                borderBottomLeftRadius:  12,
                margin:4
                }]}>
                    <View style={{
                        backgroundColor:'#3964bc',
                        position:'absolute',
                        top:-14,
                        right:'47%',
                        height:7,
                        width:'10%',
                        borderRadius:8,
                        opacity:0.4
                        }}>
                        
                    </View>
                        
                    <TouchableOpacity  style={{
                        backgroundColor:'#3964bc',
                        width:25,
                        height:25,
                        padding:4, 
                        borderRadius:50, 
                        alignItems: "center",
                        justifyContent:'center',
                        position:"absolute",
                        top:10,
                        right:10,
                        opacity:0.6
                    }} >
                        <Icon name="right" size={18} color='#fff' type='antdesign' ></Icon>
                    </TouchableOpacity>
            <View style={{padding:20,flex:1}}>

                <View style={{height:'50%',marginTop:20}}>
                    <Text style={{color:'#fff',fontSize:20,fontWeight:'600'}}>
                        {user.LAN== 'F' ?'Jour sélectionné'  :'Selected date'}
                        </Text>
                        <View style={{
                            flexDirection:'row',
                            marginTop:12,
                            marginLeft:8 ,
                            backgroundColor:'#fff',
                            padding:6,
                            borderRadius:6,
    
                        }}>
                            
                            <Text style={{color:'#000',marginLeft:10}}>{selectedDate}</Text>
                        </View>
                        <Text style={{color:'#fff',fontSize:20,fontWeight:'600',marginTop:10}}>
                        {user.LAN== 'F' ?'Description'  :'Description'}
                        </Text>
                        <View style={{
                            flexDirection:'row',
                            marginTop:12,
                            marginLeft:8 ,
                            backgroundColor:'#fff',
                            padding:6,
                            borderRadius:6,
    
                        }}>
                            <Text style={{color:'#000',marginLeft:10}}>{msgDate}</Text>
                        </View>
                </View>
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