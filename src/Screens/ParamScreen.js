import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Dimensions, ScrollView  } from 'react-native'
import {  getMenu } from '../features/menuSlice';
import { Text } from 'react-native-paper'
import WrapElt from '../components/WrapElt'
import Header from '../components/Header'
import BtnIcon from '../components/BtnIcon'
import TextInput from '../components/TextInput'
import Logo from '../components/Logo'
import { theme } from '../core/theme'
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { login, reset  } from "../features/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { addURI, modLan  } from "../features/appSlice";

export default function ParamScreen({ navigation: { goBack } }) {
    const dispatch = useDispatch();
    const [uri, setUri] = useState('');
    const [lan, setLan] = useState('');
    const url = localStorage.getItem("uri");
    const lang = localStorage.getItem("lan");
    return(
        <WrapElt color={'#00adef'}>
                <View style={{
                    flex:1,
                    width:'100%',
                    backgroundColor:'#00adef',
                    position:'relative',
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
   
                    <Text style={{color:'#fff',marginBottom:10,fontSize:22,fontWeight:'700'}}>Parametres</Text> 
                    <TouchableOpacity onPress={() => goBack()}
                        style={{
                            position:'absolute',
                            left:10,
                            top:20,
                            height:40,
                            width:40,
                            zIndex:1}}>
           
                            <Icon name="left" size={18} color={'#fff'} type='antdesign'></Icon>
                            

              </TouchableOpacity>

                    <View style={{
                        flexDirection: "column", 
                        width:'90%',

                        backgroundColor:'#fff',
                        padding:20,
                        borderRadius:8 
                        }}>

                    <Text style={{color:'#000',marginBottom:10,fontSize:16,fontWeight:'500'}}>
                        URI  :
                    </Text> 
                    <View style={{

                        marginTop:10,
                        backgroundColor:"#f5f5f5",
                        borderRadius:8,
                        padding:4,
                        alignItems:'center',
                        justifyContent:'center'
                        }}>
                        <Text style={{color:'#000',marginBottom:10,fontSize:16,fontWeight:'600',fontStyle:'italic'}}>
                            {url? url : "Set your URI"}
                        </Text> 
                    </View>
                    
                    <View style={{position:'relative'}}>
                    <TextInput
                        label={'https://...'}
                        returnKeyType="next"
                        onChangeText={text => setUri(text)}
                        style={{width:'85%'}}
                    />
                        <TouchableOpacity onPress={() =>{
                            dispatch(addURI({uri}))
                            goBack()
                        }}
                            style={{
                                position:'absolute',
                                top:20,
                                right:-8,
                                backgroundColor:"#00adef",
                            padding:2,
                            margin:8,
                            height:40,
                            width:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12,
                            zIndex:10
                            }}>
                                 <Icon name="reload1" size={18} color={'#fff'} type='antdesign'></Icon>
                            
                        </TouchableOpacity>

                <View  >
{    /*  <Text style={{color:'#fff',alignSelf:'flex-start',margin:20}}>C</Text>*/ }

                <ScrollView horizontal={true}>
                    <TouchableOpacity onPress={() =>{
                            setLan('E')
                            dispatch(modLan({lan}))
                        }}
                            style={{
                            backgroundColor:"#f5f5f5",
                            padding:2,
                            margin:8,
                            height:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12
                            }}>
                            <Text style={{paddingHorizontal:8,color:"#1c1c1c"}} >Anglais</Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{
                            setLan('F')
                            dispatch(modLan({lan}))
                        }}
                            style={{
                            backgroundColor:"#f5f5f5",
                            padding:2,
                            margin:8,
                            height:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12
                            }}>
                            <Text style={{paddingHorizontal:8,color:"#1c1c1c"}} >Français</Text>  
                        </TouchableOpacity>
                        </ScrollView>


                </View>

                
                    </View>
                   { /*<TouchableOpacity
                            style={{
                            padding:2,
                            margin:8,
                            height:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:12,
                            backgroundColor:'#3964bc'
                            }}>
                                 <Icon name="reload1" size={16} color={'#fff'} type='antdesign'></Icon>
                            
                        </TouchableOpacity>*/}

                    </View>

                </View>
        </WrapElt>
    

    );
}



const styles = StyleSheet.create({

})