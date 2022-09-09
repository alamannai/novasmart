import React , { useState }from "react";
import { StyleSheet, Text, Button, TouchableOpacity,SafeAreaView,TextInput,ScrollView, KeyboardAvoidingView, View, Dimensions } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import CurrencyInput from 'react-native-currency-input';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Icon } from '@rneui/themed';
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

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
    const [selectedItem, setSelectedItem] = useState(null);
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

const [values, setValues] = useState({});

const dispatch = useDispatch();



const formik = useFormik({

  initialValues: {
    latitude: 40.767110,
    longitude : -73.979704,
    start:'' ,
    end: '',
    price: '10',
    carId :''
  },
  validateOnChange: false,
  onSubmit: () => {
    handleSubmit();
  },

});

const handleSubmit = () => {

  console.log("submit")

  console.log(formik.values)

    .unwrap()

    .then((response) => {

      navigation.navigate("Home");

    })

    .catch((error) => {

      // ToastAndroid.show(error, ToastAndroid.showWithGravity);

    });

};




  return (
    <View style={{flex:1}}>

        <MapView style={styles.map} initialRegion={INITIAL_POSITION} provider={PROVIDER_GOOGLE} />
        
       
        



         <ScrollView style={{ 
            flex:1,flexDirection:'column', margin:8,padding:4,alignSelf:'center',width:'95%' ,
            borderRadius:8,position:'relative',
                        backgroundColor:'gray'}} >




         <View style={{
                    backgroundColor:'#fff',
                    padding:6,
                    margin:4,
                    marginTop:12,
                    borderRadius:6,
                    shadowColor:'black',
                    textShadowOffset:{width: 2, height: 2},
                    shadowOpacity:0.5,
                    shadowRadius:4,
                    elevation:4,
                }} >
                <TextInput placeholder="Enter " style={{padding:4}}
            />
            </View> 

            <View style={{flexDirection:'row',marginTop:12,margin:4,backgroundColor:'#fff'}}>
                <View style={{flexDirection:'column',padding:6,margin:4}}>
                    
                    <Text style={{marginRight:10}}>Start Mission :</Text>

                    <View style={{flexDirection:'row',width:'100%' , marginTop:6}}>
                    <TouchableOpacity onPress={displayDatepicker}  style={{
                        width:30,
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        backgroundColor:'#00008B',
                        alignItems: "center",
                        marginHorizontal:8,
                        justifyContent:'center',}}>
                            <Icon name="calendar" size={18} type='ionicons' color={'#fff'}  ></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={displayTimepicker} style={{
                        width:30,
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        backgroundColor:'#00008B',
                        alignItems: "center",
                        justifyContent:'center',}}>
                            <Icon name="time" size={18} type='ionicons' color={'#fff'} ></Icon>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'column',padding:6,margin:4,marginHorizontal:100}}>
                    
                    <Text style={{marginRight:10}}>End Mission </Text>

                    <View style={{flexDirection:'row',width:'100%' , marginTop:6}}>
                    <TouchableOpacity onPress={displayDatepicker}  style={{
                        width:30,
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        backgroundColor:'#00008B',
                        alignItems: "center",
                        marginHorizontal:8,
                        justifyContent:'center',}}>
                            <Icon name="calendar" size={18} type='ionicons' color={'#fff'}  ></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={displayTimepicker} style={{
                        width:30,
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        backgroundColor:'#00008B',
                        alignItems: "center",
                        justifyContent:'center',}}>
                            <Icon name="time" size={18} type='ionicons' color={'#fff'}  ></Icon>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            
                    
            <View style={{flexDirection:'row',marginTop:12,margin:4, padding:8,backgroundColor:'#fff',marginBottom:8, alignItems:'center'}}>
                <Text style={{width:'50%'}}>Price : </Text>
                <CurrencyInput
                value={valueCur}
                onChangeValue={setValueCur}
                prefix="$"
                placeholder="Enter price"
                style={{borderWidth: 1,alignSelf:'center',padding:4,paddingLeft:8,width:'50%'}}
                delimiter=","
                separator="."
                precision={2}
                onChangeText={(formattedValue) => {
                  console.log(formattedValue); // $0
                }}
              />
            </View>



            <View style={{flexDirection:'row',margin:4, padding:8,backgroundColor:'#fff',marginBottom:8, alignItems:'center'}}>
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




            <View style={{flexDirection:'row',margin:4, padding:8,backgroundColor:'#fff',marginBottom:8, alignItems:'center',justifyContent:'flex-end'}}>
            <TouchableOpacity onPress={handleSubmit}  style={{
                        width:70,
                        height:30,
                        padding:2, 
                        borderRadius:8, 
                        backgroundColor:'#00008B',
                        alignItems: "center",
                        justifyContent:'center',}}>
                            <Text style={{color:'#fff'}}>Submit</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>  
           
           


        {isDisplayDate && (
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydate}
                     mode={displaymode}
                     is24Hour={true}
                     display="default"

            />
         )}
  
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    },
    container: {
      flex: 1,
      padding: 18,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

//Create an ad form