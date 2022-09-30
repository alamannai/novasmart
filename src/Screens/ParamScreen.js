import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Dimensions, Image  } from 'react-native'
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
    const lang = useSelector((state) => state.app.lang);
    const [lan, setLan] = useState(lang)

    //useEffect(() => {
      //setLan(lang)
    //},[ isSelected1, isSelected2])
    const url = localStorage.getItem("uri");

    const [isSelected1, setSelection1] = useState(lang=='E'?true:false);
    const [isSelected2, setSelection2] = useState(lang=='F'?true:false);

  
    return(
        <WrapElt color={'#f5f5f5'}>
                <View style={{
                    flex:1,
                    width:'100%',
                    backgroundColor:'#f5f5f5',
                    position:'relative',
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                         {/*  <Image source={require('../../assets/glb.jpg')} style={styles.imageRev} /> 
                    <View style={[styles.elevation,{
                        backgroundColor:'#d3d3d3',
                        //marginBottom:10,
                        //borderRadius:12,
                        padding:6,
                        width:'60%',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:'30%',
                        borderTopRightRadius:  55,
                        borderTopLeftRadius:  55,
                        
                        }]}>*/}
                    <Text style={{color:'#1c1c1c',marginBottom:20,fontSize:18,fontWeight:'700'}}>
                                        {lan == 'F'? "Parametres" : "Settings"} 
                                        </Text> 
                
                                        
                    
         

                    <View style={[styles.elevation,{
                        flexDirection: "column", 
                        width:'85%',
                        
                        //position:'absolute',
                        //bottom:0,
                        //margin:18,
                        //borderTopRightRadius:  40,
                        //borderTopLeftRadius:  40,
                        backgroundColor:'#fff',
                        padding:20,

                        //borderRadius:8,
                        backgroundColor: '#fff'
                        }]}>
                            <TouchableOpacity onPress={() => goBack()}
                        style={{
                            position:'absolute',
                            right:10,
                            top:20,
                            height:40,
                            width:40,
                            zIndex:1,
                            opacity:0.4,}}>
           
                            <Icon name="close" size={16} color={'#1c1c1c'} type='antdesign'></Icon>
                            

              </TouchableOpacity>

                    <Text style={{color:'#000',marginBottom:10,fontSize:16,fontWeight:'500'}}>
                        URI  :
                    </Text> 
                    <View style={{

                        marginTop:10,
                        //backgroundColor:"#f5f5f5",
                        borderRadius:8,
                        padding:4,
                        alignItems:'center',
                        justifyContent:'center'
                        }}>
                        <Text style={{color:'#000',marginBottom:10,fontSize:16,fontWeight:'600',fontStyle:'italic'}}>
                            {url? url :lan == 'F'? "Entrez votre URL" : "Enter your URL"}
                        </Text> 
                    </View>
                    
                    <View style={{position:'relative'}}>
                    <TextInput
                        label={'https://...'}
                        returnKeyType="next"
                        onChangeText={text => setUri(text)}
                        
                    />
                        
                        <TouchableOpacity onPress={() =>{
                            dispatch(addURI({uri}))
                            goBack()
                        }}
                            style={{
                            padding:2,
                            //margin:8,
                            height:40,
                            //width:60,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:6,
                            backgroundColor:'#00adef',
                            marginTop:10,
                            //alignSelf:'flex-end'
                            }}>
                                 <Icon name="plus" size={16} color={'#fff'} type='antdesign'></Icon>
                            
                        </TouchableOpacity>
                <View style={{marginBottom:10}} >
            {    /*  <Text style={{color:'#fff',alignSelf:'flex-start',margin:20}}>C</Text>*/ }
                    <View style={{flexDirection:'row',marginTop:20,}}>
                        <View style={{width:'50%',justifyContent:'center'}}>
                            <Text style={{fontSize: 14,marginRight:8,alignSelf:'flex-start'}} >
                                {lan == 'F'?"Anglais" : "English"}
                            </Text>
                    </View>
                    <View style={{width:'50%',alignItems:'center'}}
                    >
                        
                        <Checkbox  
                            disabled={false} 
                            value={isSelected1} 
                            onValueChange={() => {
                                setSelection1(true)
                                setSelection2(false)
                                setLan('E')
                                const lan = 'E'
                                dispatch(modLan({lan}))
                                console.log("lan E :",lan)
                            }
                            } />
                    </View>
                   
                    </View>
                    <View style={{flexDirection:'row',marginTop:10,}}>
                        <View style={{width:'50%',justifyContent:'center'}}>
                            <Text style={{fontSize: 14,marginRight:8,alignSelf:'flex-start'}} >
                                {lan == 'F'?"Français" : "French"}
                            </Text>
                    </View>
                    <View style={{width:'50%',alignItems:'center'}}
                    >
                        
                        <Checkbox  
                            disabled={false} 
                            value={isSelected2} 
                            onValueChange={() => {
                                setSelection2(true)
                                setSelection1(false)
                                setLan('F')
                                const lan = 'F'
                                dispatch(modLan({lan}))
                                console.log("lan F :",lan)
                                }} />
                    </View>
                   
                    </View>
   



                </View>

                
                    </View>
                
                 
                        { /*
                        <TouchableOpacity onPress={() =>{
                            dispatch(addURI({uri}))
                            goBack()
                        }}
                            style={{
                                position:'absolute',
                                bottom:0,
                                right:-8,
                                backgroundColor:"#00adef",
                            padding:2,
                            margin:8,
                            height:40,
                            width:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:8,
                            zIndex:10
                            }}>
                                 <Icon name="plus" size={18} color={'#fff'} type='antdesign'></Icon>
                            
                        </TouchableOpacity>*/}

                    </View>
              
                

                </View>
        </WrapElt>
    

    );
}



const styles = StyleSheet.create({

    elevation: {
        elevation: 6,
        shadowColor: 'gray',
        shadowOpacity:0.2,
        shadowOffset: { width: 0, height: 0 },
    },
    imageRev: {
        width: '100%',
        position:'absolute',
        //height:200,
        //backgroundColor:'white',
        bottom:0,
        opacity:0.2,
      }, 

})