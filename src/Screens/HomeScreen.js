import { StyleSheet, Modal, Pressable, Text, View, FlatList, TouchableOpacity , Button } from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import {  getMenu } from '../features/menuSlice';

import { useDispatch ,useSelector } from "react-redux";
import WrapElt from '../components/WrapElt';
import { string } from 'yup';



const userData= {
  last: '31/08/2022',
  nbeVacc: '3'
}

export default function HomeScreen() {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.userInfo);
    const menu = useSelector((state) => state.menu.menu);




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
  

    

  return (
        <WrapElt>
            <View style={{height:'15%',width:'100%',backgroundColor:'#fafafa'}}>
            <Text >Hello ,{user.SCIV_PRE}</Text>
            </View>
        <View style={{height:'15%',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity  onPress={showPicker}   style={{
                width:30,
                height:30,
                padding:2, 
                borderRadius:8, 
                backgroundColor:'#00008B',
                alignItems: "center",
                marginHorizontal:12,
                justifyContent:'center',}}>

                <Icon name="calendar" size={18} type='ionicon' color={'#fff'}  />

            </TouchableOpacity>



        </View>

        {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode={'time'}
          dateFormat={"shortdate"}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
            

        <FlatList  style={{backgroundColor:'#fafafa',width:'100%',alignContent: "space-between"}} 
        data={menu} 
        renderItem={({item}) =>  
        <TouchableOpacity style={[styles.elevation,{
            backgroundColor:"skyblue",
            margin:16,
            width:'40%',
            height:120,
            padding:6,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:6
            }]}>
            <Text style={{margin:2,color:'#fff', fontSize:12}}>{item.ZMOD_DES}</Text>
        </TouchableOpacity>
    } 
        />
    

    
{ /*   <View>
    <View style={{ height:80, paddingVertical: 10, position:'relative'}} >

<Text style={styles.headerText}>Calendar :</Text>
    {bookVacc? 
    <View></View> 
    : 
    <TouchableOpacity style={[styles.addBtn,,styles.elevation]} onPress={() => setBookVacc(!bookVacc)}>
        <Icon name="pencil-outline" size={18} color='white' type='ionicon' ></Icon>
    </TouchableOpacity>
    }
    
</View>

<View style={[styles.calenderElt] }>
<CalendarPicker onDateChange={setSelectedStartDate} />
</View>

<Modal
animationType="slide"
transparent={true}
visible={bookVacc}

>
<View  style={{
        height:'40%',
        backgroundColor:'white',
        marginTop: 140,
        padding:10,
        margin:8,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 8
        
    }}>
    <View style={styles.modalView}>
        <Text style={styles.headerText}>Pick you vacation :</Text>
        <Pressable
        style={styles.hideModal}
        onPress={() => setBookVacc(!bookVacc)}
        >
            <Icon name="closecircleo" size={18} type='antdesign' ></Icon>
        </Pressable>
        <Text style={[styles.h2Text,{marginTop:20}]}>Date Start : </Text>
        <Text style={styles.h2Text}>Date End : </Text>
        <Text style={styles.h2Text}>Reason : </Text>
        <Text style={styles.h2Text}>Time Start : </Text>
        <Text style={styles.h2Text}>Time End : </Text>
        <TouchableOpacity style={{
        width:90,
        padding:2, 
        margin:8,
        marginTop:12,
        borderRadius:15, 
        borderColor:'green',
        borderWidth: 1 , 
        alignItems: "center",
        justifyContent:'center',
        marginLeft:10,
        marginTop:14
        
        }}>
        <Text style={{fontSize: 13,color:'green'}} >Send</Text>
    </TouchableOpacity>
    </View>
</View>
</Modal>


<View style={{flexDirection:'row', marginTop:18}}>
<Text style={styles.h2Text}>Last vacation :</Text>
<Text style={{paddingHorizontal:20,paddingVertical:10,color:'gray'}}>{userData.last}</Text>
</View>

<View style={{flexDirection:'row'}}>
<Text style={styles.h2Text}>Days of Vacation this month :</Text>
<Text style={{paddingHorizontal:20,paddingVertical:10,color:'gray'}}>{userData.nbeVacc}</Text>
</View>

<View style={{marginLeft:24}}>
<TouchableOpacity style={{ 
    marginTop:20, 
    borderRadius:15, 
    borderColor:'purple',
    borderWidth: 1 , 
    alignItems: "center",
    justifyContent:'center',
    margin:4, 
    width:200, 
    padding:4}}
>
    <Text style={{fontSize: 12,}}>Check vacation's History</Text> 
</TouchableOpacity>    
</View>  
    </View>
   
*/ }
   
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
    }   ,  elevation: {
        elevation: 8,
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