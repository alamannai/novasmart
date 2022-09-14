import { StyleSheet, Modal, Pressable, Text, View, FlatList, TouchableOpacity , Image} from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import {  getMenu } from '../features/menuSlice';

import { useDispatch ,useSelector } from "react-redux";
import WrapElt from '../components/WrapElt';
import { string } from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { getFer } from '../features/calendarSlice';


export default function PlanningScreen({navigation}) {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.userInfo);


    const handleNavigate = (name) => {

        navigation.navigate(name)
      };


      const [daysFree, setDaysFree] = useState([])
      
  const jfer = useSelector((state) => state.calendar.Jfer);

  return (
        <WrapElt>
            <View style={{flex:1,padding:12,backgroundColor:'#fafafa',width:'100%'}}>
  
            <View style={{ height:80}} >
            <TouchableOpacity onPressOut={() =>handleNavigate('home')} style={{
                backgroundColor:'#fafafa',
                width:30,
                height:30,
                padding:4, 
                borderRadius:8, 
                alignItems: "center",
                justifyContent:'center',
                position:"absolute",
                top:16
            }} >
                <Icon name="left" size={18} color='#8cd3ff' type='antdesign' ></Icon>
            </TouchableOpacity>
    

            <TouchableOpacity style={[styles.addBtn,styles.elevation]} >
                <Icon name="add" size={18} color='white' type='ionicon' ></Icon>
            </TouchableOpacity>
    
    
            </View>
<View >

            <View style={{backgroundColor:'#8cd3ff',padding:8,borderRadius:8}}>
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

                  disabledDates={daysFree}
                  disabledDatesTextStyle={{
                    backgroundColor:'red',
                  }}
                />
            </View>
            </View>
            <ScrollView style={{marginTop:20}}>
            <View style={{backgroundColor:'#99edc3',padding:8,borderRadius:8,marginTop:10,height:80,position:'relative'}}>
                <Text>test free</Text>
                <Text>{jfer[0].XSJFEEMP_DATF}</Text>
                <TouchableOpacity style={[styles.addBtn,styles.elevation,{backgroundColor:'#fff'}]} >
                    <Icon name="pushpino" size={16} color='#000' type='antdesign' ></Icon>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#f1ee8e',padding:8,borderRadius:8,marginTop:10,height:160}}>
                <Text>test cong</Text>
            </View>
            <View style={{backgroundColor:'#d21404',padding:8,borderRadius:8,marginTop:10,height:160}}>
                <Text>test abs</Text>
            </View>
            <View style={{backgroundColor:'#0a1172',padding:8,borderRadius:8,marginTop:10,height:160}}>
                <Text>test work days</Text>
            </View>
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
        borderWidth:1,
        padding:12,
        borderColor:'#d3d3d3'
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


  pickedDateContainer: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,}
})