import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View, Dimensions, Image  } from 'react-native'
import {  getMenu } from '../features/menuSlice';
import { Text } from 'react-native-paper'
import Background from '../components/Background'
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
import { ScrollView } from 'react-native-gesture-handler';

const loginSceenLang = [{
  id:1,
  name:'f',
  elt: [
      {
          btn : ['Connexion','Mémoriser','Mot de passe oublié']
      },
      {
          input:['Identifiant', 'Mot de passe']
      },
      {
          text : 'Bienvenu sur NovaSmart HR '
      }
  ]
},
{
  id:2,
  name:'e',
  elt: [
      {
          btn : ['Login', 'Remember me','Forget my password']
      },
      {
          input:['Username', 'Password']
      },
      {
          text : 'Welcome to NovaSmart HR '
      }
  ]
}
]


export default function LoginScreen({ navigation }) {
  const [values, setValues] = useState({});
    const [lang, setLang] = useState('e')

    const dispatch = useDispatch();
    const [isSelected, setSelection] = useState(false);

    const validationSchema = Yup.object().shape({
      username: Yup.string().required("Username Required"),
      password: Yup.string().required("Password Required"),
    });
 
  
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validateOnChange: false,
      validationSchema,
      onSubmit: () => {
        handleLogin();
      },
    });
    const err = useSelector((state) => state.auth.error);

    const [alert, setAlert] = useState('');


    const handleLogin = () => {
      console.log("---------------Login ------------------")
      console.log(formik.values)
      dispatch(login(formik.values))
        .then((response) => {
          if(response.payload.connecte){
            console.log('---------success login----------')
            navigation.navigate("Root");
          }else{
            console.log('status :',response.payload)
            setAlert("Invalid username or password !")
          }
            
        })
        .catch((error) => {
          // ToastAndroid.show(error, ToastAndroid.showWithGravity);
        });
    };

    const [secure, setSecure] = useState(true);

    const [showSettings, setShowSettings] = useState(false);

    const handleShowForm = () => {
      navigation.navigate('param')
    };

    const {width, height} = Dimensions.get("window");
    return(
        <View style={styles.background}>

    <View style={{marginBottom:"10%"}}>
      <Image source={require('../../assets/gg.jpg')} style={styles.imageRev} />
      </View>
          {alert.length == 0?<View></View> :
          
          <View style={{backgroundColor:'#DC143C',padding:4, borderRadius:8,width:'80%',alignItems:'center',alignSelf:'center'}}>
          <Text style={{color:'#fff',margin:4}}>{alert}</Text>
          
        </View>
          
          
          }
          <View style={{padding:'8%',marginTop:20}}>
          <ScrollView contentContainerStyle={{alignItems:'center'}}>
         
          <View style={{width:'100%',marginTop:'10%', alignItems:'flex-end',position:'relative'}}>
          <BtnIcon event={handleShowForm} />

   
              


          </View>


          <Logo />
             <Header>{lang === 'e'? loginSceenLang[1].elt[2].text : loginSceenLang[0].elt[2].text}</Header>
             <View style={{flexDirection: "column", width:'100%' ,justifyContent: "space-between"}}>
             <View style={{position:'relative'}}>
              <TextInput
                  label={lang === 'e'? loginSceenLang[1].elt[1].input[0] : loginSceenLang[0].elt[1].input[0]}
                  returnKeyType="next"
                  value={formik.values.username}
                  onChangeText={formik.handleChange("username")}
              />
              <View 
              style={{
                position:'absolute',
                right:10,
                top:'40%',
                height:40,
                zIndex:1}}>
                  <Icon name="user" size={22} color={'#000'} type='feather'></Icon>


              </View>
              </View>
              {formik.errors.username? 
                <Text style={{color:'red',fontWeight:'600',fontSize:14, marginLeft:10}}>{formik.errors.username }</Text>
              :  
                <View></View>
            }

             </View>
             <View style={{flexDirection: "column", width:'100%' ,justifyContent: "space-between"}}>
              <View style={{position:'relative'}}>
              <TextInput
                  label={lang === 'e'? loginSceenLang[1].elt[1].input[1] : loginSceenLang[0].elt[1].input[1]}
                  returnKeyType="done"
                  value={formik.values.password}
                  onChangeText={formik.handleChange("password")}
                  secureTextEntry={secure}
              />
              <Pressable onPress={ () =>{ setSecure(!secure)}} 
              style={{
                position:'absolute',
                right:10,
                top:'40%',
                height:40,
                zIndex:1}}>
                  {secure? 
                  <Icon name="eye" size={22} color={'#000'} type='feather'></Icon>
                  :
                  <Icon name="eye-off" size={22} color={'#000'} type='feather'></Icon>
                  }

              </Pressable>
              
              
              </View>
              {formik.errors.password? 
                <Text style={{color:'red',fontWeight:'600',fontSize:14, marginLeft:10, marginBottom:20}}>{formik.errors.password}</Text>
                :
                <View></View>
            }

              
             </View>
            
            <View style={{flexDirection:'row', width:'100%',padding:4, marginBottom:24}}>


              <View style={{width:'50%',flexDirection:'row'}}>
                <Checkbox disabled={false} value={isSelected} onValueChange={(newValue) => setSelection(newValue)} />
                <Text style={{fontSize: 13,marginLeft:4}} >
                  {lang === 'e'? loginSceenLang[1].elt[0].btn[1] : loginSceenLang[0].elt[0].btn[1]}
                </Text>
              </View>


              <View style={styles.forgotPassword}>
                    <TouchableOpacity>
                      <Text style={styles.forgot}>
                        {lang === 'e'? loginSceenLang[1].elt[0].btn[2] : loginSceenLang[0].elt[0].btn[2]}
                        </Text>
                    </TouchableOpacity>
              </View>
            </View>
            
            

            
                <TouchableOpacity onPressIn={() => {formik.handleSubmit()}} style={styles.button}>
                  <Text style={{color:'#fff',fontWeight:'600'}}>
                  {lang === 'e'? loginSceenLang[1].elt[0].btn[0] : loginSceenLang[0].elt[0].btn[0]}
                  </Text>
                </TouchableOpacity>
      
            
        
                </ScrollView>
                </View>
        </View>
    );
}



const styles = StyleSheet.create({
  forgotPassword: {
    width:'50%',
    height:'100%',
    alignItems:'flex-end',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  button:{
    width:'40%',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    
    borderRadius:12,
    backgroundColor:'#3964bc'
  }  ,
  image: {
    width: '100%',
    height: 120,
    position:'absolute',
    bottom:0,
    zIndex:-1
  },
  imageRev: {
    width: '100%',
    height: 80,

    position:'absolute',
    rotation:180

  }, 
   background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
    position:'relative'
  },
})