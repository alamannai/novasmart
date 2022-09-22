import { StyleSheet, Modal, ActivityIndicator, Text, View, FlatList, TouchableOpacity , Image} from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import {  getMenu } from '../features/menuSlice';
import { useDispatch ,useSelector } from "react-redux";
import WrapElt from '../components/WrapElt';
import TextInput from '../components/TextInput'
import { string } from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { getMotifAbs } from '../features/calendarSlice';

import FormAdd from '../components/FormAdd';
import DropDownPicker from 'react-native-dropdown-picker';

import {Calendar, LocaleConfig} from 'react-native-calendars';



export default function AskVacc({navigation}) {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.userInfo);


    const handleNavigate = (name) => {

        navigation.navigate(name)
      };


      const [daysFree, setDaysFree] = useState([])
      
  const jfer = useSelector((state) => state.calendar.Jfer);


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
  ]);



  useEffect(() => {
    dispatch(getMotifAbs())
      .unwrap()
      .then((response) => {
        console.log('--------------getting motifs-----------',response)
        for (let i = 0; i < response.length; i++) {
            const element = response[i];
            setItems(items => [ ...items, element])
            }


      })
      .catch((error) => {
        // ToastAndroid.show(error, ToastAndroid.showWithGravity);
      });
  }, [])
  const isLoading = useSelector((state) => state.calendar.isLoading);


  const [selectedDate, setSelectedDate] = useState('')

  const onDateChange = (date) => {
    setSelectedDate(date)

  };

  ///// start mission date  picker
const [mydate, setMydate] = useState(new Date());
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);
const changeSelectedDate = (event, selectedDate) => {
const currentDate = selectedDate || mydate;
if (Platform.OS === 'android') {
  setShow(false);
}
setMydate(currentDate);

};

const showMode = (currentMode) => {
setShow(true);
setMode(currentMode);
};
const displayDatepicker = () => {
showMode('date');
};

const [valStart, setValStart] = useState(false);
const [day, setDay] = useState(false);


  return (isLoading? 
    <View style={{flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
        }}>
        <ActivityIndicator size="large" color="#8cd3ff"/>
    </View> :
        <WrapElt color={'#3964bc'}>
            <View style={{flex:1,backgroundColor:'#3964bc',width:'100%'}}>
  
            <View style={{ height:80,marginLeft:10}} >
            <TouchableOpacity onPressOut={() =>handleNavigate('home')} style={{
                backgroundColor:'#3964bc',
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
            
    
            <View style={[styles.elevation,{
                backgroundColor:'#fff',
                padding:8,
                marginTop:40,
                flex:1,
                position:'relative',
                borderTopRightRadius:  12,
                borderTopLeftRadius:  12,
                borderBottomRightRadius:  12,
                borderBottomLeftRadius:  12,
                margin:4
                }]}>
                    <View style={{
                        backgroundColor:'#fff',
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
            <Text style={{marginLeft:20,fontSize:28,fontWeight:'700',color:'#3964bc',marginTop:8}} >
                    {user.LAN == 'F'?'Demande un congé':'Ask for leave '}
                </Text>

                <Text style={{fontSize:16,color:'#000',marginTop:20}} >
                    {user.LAN == 'F'?'Motif :':'Reason :'}
                </Text>

            <View>
      
                <FlatList 
                    horizontal={true} 
                    data={items} 
                    renderItem={({item}) => 
                    <TouchableOpacity
                        
                            style={{
                            backgroundColor:item.SGAB_COU,
                            padding:2,
                            margin:8,
                            height:40,
                            
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12
                            }}>
                            <Text style={{paddingHorizontal:8,color:"#1c1c1c"}} >{item.SABL_LIB}</Text>  
                        </TouchableOpacity>
     
       
       
   
                } /> 
                <Text style={{fontSize:16,color:'#000',marginTop:20}} >
                    {user.LAN == 'F'?`Type d'absence :`:'Reason :'}
                </Text>
                <ScrollView horizontal={true}>
                <TouchableOpacity
                        
                        style={{
                        backgroundColor:'#f5f5f5',
                        padding:2,
                        margin:8,
                        height:40,
                        
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:12
                        }}>
                        <Text style={{paddingHorizontal:8,color:"#1c1c1c"}} >{user.LAN == 'F'?'Jour':'Day'}</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity
                        
                        style={{
                        backgroundColor:'#f5f5f5',
                        padding:2,
                        margin:8,
                        height:40,
                        
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:12
                        }}>
                        <Text style={{paddingHorizontal:8,color:"#1c1c1c"}} >{user.LAN == 'F'?'Plusieurs jours':'Several days'}</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity
                        
                        style={{
                        backgroundColor:'#f5f5f5',
                        padding:2,
                        margin:8,
                        height:40,
                        
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:12
                        }}>
                        <Text style={{paddingHorizontal:8,color:"#1c1c1c"}} >{user.LAN == 'F'?'Matin':'Morning'}</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity
                        
                        style={{
                        backgroundColor:'#f5f5f5',
                        padding:2,
                        margin:8,
                        height:40,
                        
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:12
                        }}>
                        <Text style={{paddingHorizontal:8,color:"#1c1c1c"}} >{user.LAN == 'F'?'Aprés-midi':'Afternoon'}</Text>  
                    </TouchableOpacity>
                </ScrollView>
                {day?<View></View>:
                <Text style={{fontSize:16,color:'#000',marginTop:40}} >
                    {user.LAN == 'F'?`Choisi le jour :`:'Choose the day :'}
                </Text>
                }
                {valStart?
                    <View style={{marginTop:20,marginBottom:30}}>
                      <Text style={{color:'#000'}}>{mydate.toISOString().slice(0,10)}</Text>
                    </View>

                :
                <View style={{flexDirection:'row',width:'100%' , marginTop:16}}>
                    <TouchableOpacity onPress={displayDatepicker} style={{
                        width:50,
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        backgroundColor:'#fff',
                        alignItems: "center",
                        marginHorizontal:30,
                        justifyContent:'center',}}>
                            <Icon name="calendar" size={18} type='antdesign' color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity  
                    style={{
                        width:100,
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        backgroundColor:'#00008B',
                        alignItems: "center",
                        position:'absolute',
                        bottom:0,
                        right:20,
                        justifyContent:'center',}}>
                            <Icon name="save" size={18} type='antdesign' color={'#fff'} />
                    </TouchableOpacity>
                    </View>
}

                <Text style={{fontSize:16,color:'#000',marginTop:40}} >
                    {user.LAN == 'F'?`Message réçu :`:'Received message :'}
                </Text>
           

            </View>
                        <TouchableOpacity  style={{
                            backgroundColor:'#798571',
                            width:40,
                            height:40,
                            padding:4, 
                            borderRadius:10, 
                            alignItems: "center",
                            justifyContent:'center',
                            position:'absolute',
                            right:15,
                            top:30
                            
                        }} >
                                 <Icon name="send" size={18} color='white' type='feather' ></Icon>
                            </TouchableOpacity>
                 
            </View>

                
            </View>
             

        </View>

        {show ? 
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydate}
                     mode={mode}
   
                     display="default"
                     onChange={changeSelectedDate}
                     timeZoneOffsetInMinutes={0}
                     minimumDate={new Date()}

            />:<View></View>
         }

   
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