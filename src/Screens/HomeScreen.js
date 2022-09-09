import { StyleSheet, Modal, Pressable, Text, View, SafeAreaView, TouchableOpacity , Button } from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Nav  from '../navigation/Nav';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";


const userData= {
  last: '31/08/2022',
  nbeVacc: '3'
}


export default function HomeScreen() {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [bookVacc, setBookVacc] = useState(false);



  return (

    <SafeAreaView style={{ flex: 1}}>
    <View
      style={{
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        height:50,

      }}>
      <StatusBar style="dark"  />
    </View>

    
    <Nav title={ 'home' } status={true} />  
   
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
   
    </SafeAreaView>
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
    },
    elevation: {
      elevation: 6,
      shadowColor: '#52006A',
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
      }
})