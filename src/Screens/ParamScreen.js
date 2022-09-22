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


export default function ParamScreen({ navigation: { goBack } }) {

    return(
        <WrapElt color={'#3964bc'}>
                <View style={{
                    flex:1,
                    width:'100%',
                    backgroundColor:'#3964bc',
                    position:'relative',
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
   
                    <Text style={{color:'#fff'}}>Param Screen</Text> 
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

                    <View style={{flexDirection: "column", width:'80%' }}>
                    <View style={{position:'relative'}}>
                    <TextInput
                        label={'URI'}
                        returnKeyType="next"

                    />
                    <View 
                    style={{
                        position:'absolute',
                        right:10,
                        top:'40%',
                        height:40,
                        zIndex:1}}>
            


                    </View>
                    </View>

                    </View>

                </View>
        </WrapElt>
    

    );
}



const styles = StyleSheet.create({

})