import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import BtnIcon from '../components/BtnIcon'
import TextInput from '../components/TextInput'
import Logo from '../components/Logo'
import { theme } from '../core/theme'





export default function LoginScreen({lng}) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [lang, setLang] = useState('en')
    const [password, setPassword] = useState({ value: '', error: '' })

    return(
        <Background >

            
            <Logo />
            
             <Header>Welcome to NovaSmart HR</Header>
             <TextInput
                label="Username"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                    <TouchableOpacity
                    
                    >
                    <Text style={styles.forgot}>Forgot your password ?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}>
                  <Text style={{color:'#fff'}}>Login</Text>
                </TouchableOpacity>
        </Background>
    );
}



const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
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