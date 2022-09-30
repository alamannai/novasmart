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
import * as Yup from "yup";
import FormAdd from '../components/FormAdd';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFormik } from "formik";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Autocomplete from 'react-native-autocomplete-input';
import  Dropdown  from 'react-native-element-dropdown';
import Checkbox from "expo-checkbox";
import  Animated, { FadeIn, FadeInDown, FadeOut, LightSpeedInRight, SlideInDown, SlideInUp, ZoomIn, ZoomInRight,  }  from 'react-native-reanimated'; 

export default function AskVacc({navigation}) {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.userInfo);


    const handleNavigate = (name) => {
        setDay(true);
        setMday(true);
        setMn(true);
        setAf(true);
        navigation.navigate(name)
      };


      const [typeA,setTypeA] =useState ([
        {
            id: "md",
            label : user.LAN == 'F'?'Plusieurs jours':'Several days'},
        {
            id: "dy",
            label : user.LAN == 'F'?'Jour':'Day'},
        
        //{
          //  id: "mn",
           // label : user.LAN == 'F'?'Matin':'Morning'},
      //  {
          //  id: "af",
           // label : user.LAN == 'F'?'Aprés-midi':'Afternoon'},
       ]
       )

      const [daysFree, setDaysFree] = useState([])
      
  const jfer = useSelector((state) => state.calendar.Jfer);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [items, setItems] = useState([
  ]);



  useEffect(() => {
    dispatch(getMotifAbs())
      .unwrap()
      .then((response) => {
        console.log('--------------getting motifs-----------',response)

            setItems(response)
            


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

  const [thisDateOne, setThisDateOne] = useState('')

  ///// 1 day date  picker
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

 ///// start vacc time  
 const [mydatetime, setMydatetime] = useState(new Date());
 const [modetime, setModetime] = useState('date');
 const [showtime, setShowtime] = useState(false);
 const changeSelectedDatetime = (event, selectedDatetime) => {
 const currentDatetime = selectedDatetime || mydatetime;
 if (Platform.OS === 'android') {
 setShowtime(false);
 }
 setMydatetime(currentDatetime);

 };

 const showModetime = (currentModetime) => {
 setShowtime(true);
 setModetime(currentModetime);
 };
 const displayDatepickertime = () => {
 showModetime('time');
 };

     
///// end vacc time 
const [mydatetimeend, setMydatetimeend] = useState(new Date());
const [modetimeend, setModetimeend] = useState('date');
const [showtimeend, setShowtimeend] = useState(false);
const changeSelectedDatetimeend = (event, selectedDatetimeend) => {
const currentDatetimeend = selectedDatetimeend || mydatetimeend;
if (Platform.OS === 'android') {
setShowtimeend(false);
}
setMydatetimeend(currentDatetimeend);

};

const showModetimeend = (currentModetimeend) => {
setShowtimeend(true);
setModetimeend(currentModetimeend);
};
const displayDatepickertimeend = () => {
showModetimeend('time');
};
  ///// several days start date  picker
  const [mydatesc, setMydatesc] = useState(new Date());
  const [modesc, setModesc] = useState('date');
  const [showsc, setShowsc] = useState(false);
  const changeSelectedDateSc = (event, selectedDatesc) => {
  const currentDatesc = selectedDatesc || mydatesc;
  if (Platform.OS === 'android') {
    setShowsc(false);
  }
  setMydatesc(currentDatesc);
  
  };
  
  const showModesc = (currentModesc) => {
    setShowsc(true);
    setModesc(currentModesc);
  };

  const displayDatepickerSc = () => {
    showModesc('date');
  };



   ///// several days end date  picker
   const [mydateec, setMydateec] = useState(new Date());
   const [modeec, setModeec] = useState('date');
   const [showec, setShowec] = useState(false);
   const changeSelectedDateEc = (event, selectedDateec) => {
   const currentDateec = selectedDateec || mydateec;
   if (Platform.OS === 'android') {
     setShowec(false);
   }
   setMydateec(currentDateec);
   
   };
   
   const showModeec = (currentModeec) => {
     setShowec(true);
     setModeec(currentModeec);
   };
 
   const displayDatepickerEc = () => {
     showModeec('date');
   };


    ///// several days start time  
    const [mydatesctime, setMydatesctime] = useState(new Date());
    const [modesctime, setModesctime] = useState('time');
    const [showsctime, setShowsctime] = useState(false);

    const changeSelectedDateSctime = (event, selectedDatesctime) => {
    const currentDatesctime = selectedDatesctime || mydatesctime;
    if (Platform.OS === 'android') {
      setShowsctime(false);
    }
    setMydatesctime(currentDatesctime);
    
    };
    
    const showModesctime = (currentModesctime) => {
      setShowsctime(true);
      setModesctime(currentModesctime);
    };
  
    const displayDatepickerSctime = () => {
      showModesctime('time');
    };

  ///// several days end time  
    const [mydateectime, setMydateectime] = useState(new Date());
    const [modeectime, setModeectime] = useState('time');
    const [showectime, setShowectime] = useState(false);

    const changeSelectedDateEctime = (event, selectedDateectime) => {
        const currentDateectime = selectedDateectime || mydateectime;
        if (Platform.OS === 'android') {
          setShowectime(false);
        }
        setMydateectime(currentDateectime);
        
        };
        
        const showModeectime = (currentModeectime) => {
          setShowectime(true);
          setModeectime(currentModeectime);
        };
      
        const displayDatepickerEctime = () => {
          showModeectime('time');
        };

const [valStart, setValStart] = useState(false);
const [day, setDay] = useState(true);
const [mday, setMday] = useState(false);

const [mn, setMn] = useState(true);
const [af, setAf] = useState(true);

const [typeselected, setTypeselected] = useState('md');

const showDay = (id) => {
    setTypeselected(id)
    if(id === "dy"){
        setMday(true);
        setMn(true);
        setAf(true);
        setDay(false);
        
    }
    if(id === "md"){
        setDay(true);
        setMn(true);
        setAf(true);
        setMday(false);
    }
    if(id === "mn"){
        setDay(true);
        setMday(true);
        setAf(true);
        setMn(!mn);
    }
    if(id === "af"){
        setDay(true);
        setMday(true);
        setMn(true);
        setAf(!af);
    }
    };

    
    const [filteredItems, setFilteredItems] = useState([]);
    // For Selected Data
    const [selectedValue, setSelectedValue] = useState({});

    const findItem = (query) => {
        // Method called every time when we change the value of the input
        if (query) {
            const regex = new RegExp(`${query.trim()}`, 'i');
            const filtered = items.filter((item) => item.SABL_LIB.search(regex) >= 0)
            console.log(filtered)
            const tabs = []
            for (let i = 0; i < filtered.length; i++) {
                const element = filtered[i]
                tabs.push(element)
                
            }
            setFilteredItems(tabs);
            setMotifId('')
          } else {
            // If the query is null then return blank
            setFilteredItems([]);
          }
        
      };
      const [val, setVal] = useState('');





            const validationSchema = Yup.object().shape({
                motif: Yup.string().required("Required"),
                startDate: Yup.date().required("required"),
                endDate: Yup.date().required("required"),
              });
              
              const formik = useFormik({
                initialValues: {
                    motif: "",
                    startDate: "",
                    endDate: "",
                },
                validateOnChange: false,
                validationSchema,
                onSubmit: () => {
                  handleSub();
                },
              });

              const [motifId, setMotifId] = useState('');

              const chooseMotif = (id) => {  

                setMotifId(id);
                formik.setFieldValue("motif",id)
            
              
            };


            const handleSub = () => {
                console.log(mydate)
                

                console.log(formik.values)
              };


              useEffect(() => {
                
                if(isSelected){
                    const startDate = mydate.toISOString().slice(0,10)+"T"+"00:00:00"+mydate.toISOString().slice(19)
                    const endDate = mydate.toISOString().slice(0,10)+"T"+"23:00:00"+mydate.toISOString().slice(19)
                    formik.setFieldValue("startDate",startDate)    
                    formik.setFieldValue("endDate",endDate) 
                }else{
                    const startDate = mydate.toISOString().slice(0,10)+"T"+mydatetime.toISOString().slice(11)
                    const endDate = mydate.toISOString().slice(0,10)+"T"+mydatetimeend.toISOString().slice(11)
                    formik.setFieldValue("startDate",startDate)    
                    formik.setFieldValue("endDate",endDate) 
                }
                 
              }, [mydate,mydatetime,mydatetimeend,isSelected])
            
              
    const [isSelected, setSelection] = useState(false);

  return (isLoading? 
    <View style={{flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
        }}>
        <ActivityIndicator size="large" color="#8cd3ff"/>
    </View> :
        <WrapElt color={'#f5f5f5'}>
            <View style={{flex:1,backgroundColor:'#f5f5f5',width:'100%',position:'relative'}}>
  
            <View style={{ height:80,marginLeft:10}} >
            <TouchableOpacity onPressOut={() =>navigation.goBack()} style={{
                backgroundColor:'#f5f5f5',
                width:30,
                height:30,
                padding:4, 
                borderRadius:8, 
                alignItems: "center",
                justifyContent:'center',
                position:"absolute",
                top:16
            }} >
                <Icon name="left" size={18} color='#1c1c1c' type='antdesign' ></Icon>
            </TouchableOpacity>
    

          
    
    
            </View>
            
    
            <Animated.View entering={SlideInDown.duration(400)} 
              style={[styles.elevation,{
                backgroundColor:'#fff',
                padding:8,
                //marginTop:'10%',
                flex:1,
                position:'relative',
                borderTopRightRadius:  30,
                borderTopLeftRadius:  30,
                //borderBottomRightRadius:  12,
                //borderBottomLeftRadius:  12,
                }]}>
                    <View style={{
                        backgroundColor:'#d3d3d3',
                        position:'absolute',
                        top:14,
                        right:'47%',
                        height:7,
                        width:'10%',
                        borderRadius:8,
                        opacity:0.6
                        }}>
                        
                    </View>
                    <View >
            <Text style={{marginLeft:20,marginTop:30,fontSize:26,fontWeight:'700',color:'#1c1c1c'}} >
                    {user.LAN == 'F'?'Demande un congé':'Ask for leave '}
                </Text>
                
            </View>
            <TouchableOpacity  onPress={handleSub}
                        style={{
                            backgroundColor:'#00adef',
                            width:55,
                            height:40,
                            padding:4, 
                            borderRadius:10, 
                            alignItems: "center",
                            justifyContent:'center',
                            position:'absolute',
                            right:25,
                            top:20
                            
                        }} >
                                 <Icon name="send" size={18} color='#fff' type='feather' ></Icon>
                            </TouchableOpacity>
            <View style={{padding:20,flex:1}}>

            
                <ScrollView>
                <Text style={{fontSize:16,color:'#000',marginTop:16}} >
                    {user.LAN == 'F'?'Motif :':'Reason :'}
                </Text>

    
  


                <View style={styles.container}>
                    <TextInput
                        onChangeText={(text) => findItem(text)}
                       />

                    <TouchableOpacity
                 
                        style={{
                        backgroundColor:"gray",
                        padding:2,
                        height:16,
                        width:16,
                        position:'absolute',
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:12,
                        opacity:0.6,
                        top:22,
                        right:6,
                        zIndex:3
                        }}>
                            <Icon name="close" size={10} color='#fff' type='antdesign' ></Icon>
                    </TouchableOpacity>
                </View>

                    
                <FlatList 
                    horizontal={true} 
                    data={filteredItems} 
                    renderItem={({item}) => 
                    <TouchableOpacity
                    onPress={() => chooseMotif(item.SABS_COD)}
                            style={{
                            backgroundColor:motifId == item.SABS_COD?"#00adef" :"#f5f5f5",
                            padding:2,
                            margin:8,
                            height:40,
                            
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12
                            }}>
                            <Text style={{paddingHorizontal:8,color:motifId == item.SABS_COD?"#fff" :"#1c1c1c"}} >{item.SABL_LIB}</Text>  
                        </TouchableOpacity>
     
       
       
   
                } />
                {filteredItems.length == 0 ? <Text style={{color:'red',fontSize:12}}>{user.LAN =="F" ?"Cherche un motif ":""}</Text>:<View></View>}
                <Text style={{fontSize:16,color:'#000',marginTop:20}} >
                    {user.LAN == 'F'?`Type d'absence :`:'Reason :'}
                </Text>

              <FlatList 
                    horizontal={true} 
                    data={typeA} 
                    renderItem={({item}) => 
                    <TouchableOpacity
                            onPress={() => showDay(item.id)}
                            style={{
                            backgroundColor: typeselected == item.id? '#00adef' : '#f5f5f5',
                            padding:2,
                            margin:8,
                            height:40,
                            
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12
                            }}>
                            <Text style={{paddingHorizontal:8,color: typeselected == item.id?"#fff" :"#1c1c1c"}} >{item.label}</Text>  
                        </TouchableOpacity>
     
   
                } />
                {/*<View style={{marginTop:20}}>
                <DropDownPicker
                                open={open}
                                value={value}
                                items={typeA}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setTypeA}

                                />
                </View>*/}

                           
                {/** Form 1 day */}
                {day?<View></View>:
                <Animated.View entering={FadeIn.duration(800)} >
                <View style={{width:'50%',flexDirection:'row',marginTop:10}}>
                <Checkbox disabled={false} value={isSelected} onValueChange={(newValue) => setSelection(newValue)} />
                <Text style={{fontSize: 13,marginLeft:4}} >
                  {user.LAN == 'F'?"Journée entiere" : "Full day"}
                </Text>
              </View>

                <Text style={{fontSize:16,color:'#000',marginTop:30}} >
                    {user.LAN == 'F'?` Le : `:'The : '}
                    
                </Text>

                <View style={{
                    flexDirection:'row',
                    width:'100%' , 
                    marginTop:16,
                    backgroundColor:"#f5f5f5",
                    borderRadius:8,
                    padding:4,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                <TouchableOpacity onPress={displayDatepicker} style={{
                    height:30,
                    padding:2, 
                    borderRadius:8, 
                    alignItems: "center",
                    marginHorizontal:30,
                    justifyContent:'center',}}>
                        <Text style={{fontSize:14}}>{mydate.toISOString().slice(0,10)} </Text>
                </TouchableOpacity>
                {isSelected?<View></View>:
                <View style={{flexDirection:'row'}}>
                 <TouchableOpacity  onPress={displayDatepickertime}
                    style={{
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        alignItems: "center",
                        marginHorizontal:30,
                        justifyContent:'center',}}>
                            <Text style={{fontSize:14}}>{mydatetime.toISOString().slice(11,16)}</Text> 
                </TouchableOpacity>
                <TouchableOpacity  onPress={displayDatepickertimeend}
                    style={{
                        width:50,
                        height:30,
                        padding:2, 
                        borderRadius:8, 

                        alignItems: "center",
                        marginHorizontal:30,
                        justifyContent:'center',}}>
                            <Text style={{fontSize:14}}>{mydatetimeend.toISOString().slice(11,16)} </Text>
                </TouchableOpacity>
                    </View>
              }
                </View>
              {  /*<View style={{
                    marginTop:20,
                    flexDirection:'row',
                    backgroundColor:"#f5f5f5",
                    borderRadius:8,
                    padding:4,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <Text style={{fontSize:16}}>{mydate.toISOString().slice(0,10)} </Text> 
                    {isSelected? <View></View> :
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:16}}> / {mydatetime.toISOString().slice(11,16)} - </Text> 
                            <Text style={{fontSize:16}}>{mydatetimeend.toISOString().slice(11,16)} </Text>
                        </View>
                    
                    } 
                </View>*/}
                </Animated.View>
                }
            {/** Form several days */}
            {mday?<View></View>:
                <Animated.View entering={FadeIn.duration(800)}>
                <Text style={{fontSize:16,color:'#000',marginTop:20}} >
                    {user.LAN == 'F'?`De : `:'From : '}   
                </Text>
                <View style={{
                    flexDirection:'row',
                    width:'100%' , 
                    marginTop:16,
                    backgroundColor:"#f5f5f5",
                    borderRadius:8,
                    padding:4,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                <TouchableOpacity onPress={displayDatepickerSc} style={{
                    width:80,
                    height:30,
                    padding:2, 
                    borderRadius:8, 
                    alignItems: "center",
                    marginHorizontal:30,
                    justifyContent:'center',}}>
                        <Text style={{fontSize:14}}>{mydatesc.toISOString().slice(0,10)} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={displayDatepickerSctime} style={{
                    width:80,
                    height:30,
                    padding:2, 
                    borderRadius:8, 
                    alignItems: "center",
                    marginHorizontal:30,
                    justifyContent:'center',}}>
                        <Text style={{fontSize:14}}>{mydatesctime.toISOString().slice(11,16)}</Text> 
                </TouchableOpacity>

                </View>
                <Text style={{fontSize:16,color:'#000',marginTop:20}} >
                    {user.LAN == 'F'?`A : `:'To : '}       
                </Text>
                <View style={{
                    flexDirection:'row',
                    width:'100%' ,
                     marginTop:16,
                     backgroundColor:"#f5f5f5",
                     borderRadius:8,
                     padding:4,
                     alignItems:'center',
                     justifyContent:'center'
                     }}>
                <TouchableOpacity onPress={displayDatepickerEc} style={{
                    width:80,
                    height:30,
                    padding:2, 
                    borderRadius:8, 
                    alignItems: "center",
                    marginHorizontal:30,
                    justifyContent:'center',}}>
                        <Text style={{fontSize:14}}>{mydateec.toISOString().slice(0,10)} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={displayDatepickerEctime} style={{
                    width:80,
                    height:30,
                    padding:2, 
                    borderRadius:8, 
                    alignItems: "center",
                    marginHorizontal:30,
                    justifyContent:'center',}}>
                         <Text style={{fontSize:14}}>{mydateectime.toISOString().slice(11,16)}</Text> 
                </TouchableOpacity>

                </View>
                </Animated.View>
                }
               

                
           

            </ScrollView>
                        
                 
            </View>

                
            </Animated.View>
             

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

        {showsc ? 
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydatesc}
                     mode={modesc}
   
                     display="default"
                     onChange={changeSelectedDateSc}
                     timeZoneOffsetInMinutes={0}
                     minimumDate={new Date()}

            />:<View></View>
         }

        {showec ? 
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydateec}
                     mode={modeec}
   
                     display="default"
                     onChange={changeSelectedDateEc}
                     timeZoneOffsetInMinutes={0}
                     minimumDate={new Date()}

            />:<View></View>
         }

        {showtime? 
                  <DateTimePicker
                     testID="dateTimePickertime"
                     value={mydatetime}
                     mode={modetime}

                     display="default"
                     onChange={changeSelectedDatetime}
                     timeZoneOffsetInMinutes={0}
            />:<View></View>
         }

        {showtimeend? 
                  <DateTimePicker
                     testID="dateTimePickertimeend"
                     value={mydatetimeend}
                     mode={modetimeend}

                     display="default"
                     onChange={changeSelectedDatetimeend}
                     timeZoneOffsetInMinutes={0}
       

            />:<View></View>
         }
         {showsctime? 
                  <DateTimePicker
                     testID="TimePickertimestart"
                     value={mydatesctime}
                     mode={modesctime}

                     display="default"
                     onChange={changeSelectedDateSctime}
                     timeZoneOffsetInMinutes={0}
       

            />:<View></View>
         }

            {showectime? 
                  <DateTimePicker
                     testID="TimePickertimeend"
                     value={mydateectime}
                     mode={modeectime}

                     display="default"
                     onChange={changeSelectedDateEctime}
                     timeZoneOffsetInMinutes={0}
       

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
      elevation: 6,
      shadowColor: 'gray',
      shadowOpacity:0.4,
      shadowOffset: { width: 0, height: 0 },
  },
    container: {
        height:60,
        marginTop: 10,
        marginBottom:20,
        position:'relative'
      },
      itemText: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
      },
      infoText: {
        textAlign: 'center',
        fontSize: 16,
      },
})