import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
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

import { StatusBar } from 'expo-status-bar';

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


const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(4).label("Username"),
  password: Yup.string().required().min(1).label("Password"),
});

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
            dispatch( getMenu())
              .then((res) => { 
                console.log('menu res',res)
              })
            navigation.navigate("home");
          }else{
            console.log('status :',response.payload)
            setAlert("Invalid username or password !")
          }
            
        })
        .catch((error) => {
          // ToastAndroid.show(error, ToastAndroid.showWithGravity);
        });
    };



    return(
        <Background>
          {alert.length == 0?<View></View> :
          
          <View style={{backgroundColor:'#DC143C',padding:4, borderRadius:8,width:'100%',alignItems:'center'}}>
          <Text style={{color:'#fff',margin:4}}>{alert}</Text>
          
        </View>
          
          
          }
         
          <View style={{width:'100%',marginTop:8, alignItems:'flex-end'}}>
          <BtnIcon />
          </View>


          <Logo />
             <Header>{lang === 'e'? loginSceenLang[1].elt[2].text : loginSceenLang[0].elt[2].text}</Header>
             <View style={{flexDirection: "column", width:'100%' ,justifyContent: "space-between"}}>
              <TextInput
                  label={lang === 'e'? loginSceenLang[1].elt[1].input[0] : loginSceenLang[0].elt[1].input[0]}
                  returnKeyType="next"
                  value={formik.values.username}
                  onChangeText={formik.handleChange("username")}
              />
              {formik.errors.username? 
                <Text style={{color:'red',fontWeight:'600',fontSize:14, marginLeft:10}}>{formik.errors.username }</Text>
              :  
                <View></View>
            }

             </View>
             <View style={{flexDirection: "column", width:'100%' ,justifyContent: "space-between"}}>
              <TextInput
                  label={lang === 'e'? loginSceenLang[1].elt[1].input[1] : loginSceenLang[0].elt[1].input[1]}
                  returnKeyType="done"
                  value={formik.values.password}
                  onChangeText={formik.handleChange("password")}
                  secureTextEntry
              />
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
            
            

            
                <TouchableOpacity onPress={() => {formik.handleSubmit()}} style={styles.button}>
                  <Text style={{color:'#fff',fontWeight:'600'}}>
                  {lang === 'e'? loginSceenLang[1].elt[0].btn[0] : loginSceenLang[0].elt[0].btn[0]}
                  </Text>
                </TouchableOpacity>
 
        </Background>
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
    borderWidth:1,
    width:'40%',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderColor:'purple',
    borderRadius:12,
    backgroundColor:'purple'
  }
})