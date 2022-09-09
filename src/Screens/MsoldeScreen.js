import React , { useState }from "react";

import { StyleSheet, Text, Button, TouchableOpacity,Platform,KeyboardAvoidingView , View, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from 'react-native-date-picker'
import { Formik } from 'formik';
import BookingNavigation from "./BookingNavigation";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import CurrencyInput from 'react-native-currency-input';

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height ;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO ;
const INITIAL_POSITION = {
  latitude : 40.767110,
  longitude : -73.979704,
  latitudeDelta : LATITUDE_DELTA,
  longitudeDelta : LONGITUDE_DELTA,
}

const carData = [
    {
        id : 1 ,
        name : 'Polo 7',
        desc : 'model 2020',
        ref : '2486'
    },
    {
        id : 2 ,
        name : 'BMW',
        desc : 'model 2022',
        ref : '2486'
    },
    {
        id : 3 ,
        name : 'Renault',
        desc : 'model 2016',
        ref : '2486'
    },
]


export default function PublishAdScreen({navigation}) {
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
 };
 const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
 };
 const displayDatepicker = () => {
    showMode('date');
 };
 const displayTimepicker = () => {
  showMode('time');
};

const submitEvent = () => {
  console.log('Adsubmitted');  

};

const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [items, setItems] = useState([
  {label: 'Polo 7', value: 'Polo 7'},
  {label: 'BMW', value: 'BMW'}
]);

const [valueCur, setValueCur] = React.useState(0);
  return (
    <SafeAreaView style={{ flex: 1  }}>
       
        <MapView style={styles.map} initialRegion={INITIAL_POSITION} provider={PROVIDER_GOOGLE} />

        <View style={{ flex:1, margin:8 ,flexDirection:'column', borderRadius:18, backgroundColor:'#f5f5f5'}} >
         
        <Formik
            initialValues={{ carData }}
            onSubmit={submitEvent}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
         <View style={{ flex:1, position:'relative'}}> 
         <View  style={styles.searchContainer}>
         <TextInput placeholder="Enter Location" />
            </View> 
            <View style={{position:'absolute',flexDirection:'row', left:10, top:70, width:'40%'}}>
              <Text style={{marginRight:10}}>Start Mission :</Text>

         <Button onPress={displayDatepicker} title="Date" />
         <Button onPress={displayTimepicker} title="Time" />
         <Text style={{marginLeft:10}}>datetime</Text>
            </View >
            <View style={{position:'absolute',flexDirection:'row', left:10, top:120, width:'40%',alignItems:'center'}}>
              <Text style={{marginRight:10}}>End Mission :</Text>

         <Button onPress={displayDatepicker} title="Date" />
         <Button onPress={displayTimepicker} title="Time" />
         <Text style={{marginLeft:10}}>datetime</Text>
            </View >
            <View style={{flexDirection:'row', position:'absolute', bottom:70 , justifyContent:'center',alignItems:'center'}}>
            <Text>Price :</Text>
            <View style={styles.priceContainer}>
              <CurrencyInput
                value={valueCur}
                onChangeValue={setValueCur}
                prefix="$"
                placeholder="Enter price"
               
                delimiter=","
                separator="."
                precision={2}
                onChangeText={(formattedValue) => {
                  console.log(formattedValue); // $0
                }}
              />
              </View>
            </View>
           
            <View style={{position:'absolute',marginLeft:8, bottom:10, width:'50%'}}>

              <DropDownPicker
                  open={open}
                  value={value}

                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder={'pick a car'}
                />
              </View>
             
               {isDisplayDate && (
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydate}
                     mode={displaymode}
                     is24Hour={true}
                     display="default"

            />
         )}
     
               
        <TouchableOpacity  onPress={handleSubmit} 
        style={styles.submitBtn}>
            <Text style={{color:'#fff'}}>Submit</Text>
        </TouchableOpacity>
        </View> 
            )}
        </Formik>
           
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent:'center'
    },
    map: {
      width: Dimensions.get('window').width,
      height: '50%',
    },
    searchContainer:{
        position:'absolute',
        width:"80%",
        backgroundColor: "white",
        shadowColor:'black',
        textShadowOffset:{width: 2, height: 2},
        shadowOpacity:0.5,
        shadowRadius:4,
        elevation:4,
        padding:8,
        borderRadius:8,
        marginLeft:12,
        marginTop:10
      },

      priceContainer:{
        width:"80%",
        backgroundColor: "white",
        shadowColor:'black',
        textShadowOffset:{width: 2, height: 2},
        shadowOpacity:0.5,
        shadowRadius:4,
        elevation:4,
        padding:6,
        borderRadius:8,
        marginLeft:12,

      },
      input:{
        padding:4

      },
      submitBtn:{
        width:'25%',
        height:30,
        position:'absolute',
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'blue',
        bottom:10,
        right:6
    }
})

//Create an ad form