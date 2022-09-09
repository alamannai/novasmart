import { StyleSheet, Modal, Pressable, Text, View, SafeAreaView, TouchableOpacity , Button } from 'react-native';
import { Icon } from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Nav  from '../navigation/Nav';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';

import  CarItemCard  from './CarItemCard'

import  FormAddCar  from './FormAddCar'



export default function CarScreen() {
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm)
      };
    

  return (

    <SafeAreaView style={{flex:1, backgroundColor:'#fafafa'}}>
        <View
      style={{
        backgroundColor: '#FAFAFA',
        alignItems: 'center',
        justifyContent: 'center',
        height:50,

      }}>
      <StatusBar style="dark"  />
    </View>
    <Nav title={ 'My Cars' } status={true} /> 
    <View style={{height:'7%',justifyContent:'center',flexDirection:'row'}}>
    <View style={{flex:1, width:'50%',alignItems:'flex-start', paddingTop:10,paddingLeft:30}}>
    <Text style={{fontWeight:'600',color:'gray'}}> 3 Cars</Text>
    </View>
    {showForm? <View></View> :
    
    <View style={{flex:1, width:'50%',alignItems:'flex-end', paddingTop:10,paddingRight:30}}>
    <TouchableOpacity onPress={handleShowForm} style={{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'orange',
        height:30,
        width:30,
        borderRadius:8
            }}>
                    <Icon name="add" size={22} color={'#fff'} type='ionicon'></Icon>
            </TouchableOpacity>
        </View>
    
    }
        
      
        
    </View>
    
        <ScrollView style={{flex:1 ,}}>
             { /** Car item */}

             {showForm?
      
             <FormAddCar event={handleShowForm} />
                :
                <View>
                    <CarItemCard />
                    <CarItemCard />
                    <CarItemCard />
                    <View style={{height:60}}>

                    </View>
                </View>

            }
            
        </ScrollView>
   
  
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    card: {
        position:'relative',
        backgroundColor: 'white',
        borderRadius: 30,
        padding:10,
        height:350,
        width: '90%',
        alignSelf:'center',
        margin:6,
        marginTop:40,
        marginBottom:10
      },
    elevation: {
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity:0.2,
        shadowOffset: { width: 0, height: 0 },

  },
})