import colors from '../config/colors';
import { Keyboard, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import MainTextInput from './MainTextInput';

export default function SignInView({navigation}) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(){
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      const response = await fetch('http://10.0.0.225:3000/auth', { // apparently "localhost" makes the server host the phone instead of the computer
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebaseToken: user
      })
    }); 
    const result = await response.json();
    return result;
    } catch (error) {
      console.error('Error authenticating user:', error); // error handling here
    }
    navigation.navigate("Home");
  }

  return (
    <View 
      style={styles.container}>

        <View style={styles.emptyView}/>

        <MainTextInput
          label={'Email'}
          stateSetter={setEmail}
          keyboardType={'email-address'}
          password={false} 
          width={200}/>
        
        <MainTextInput
          label={'Password'}
          stateSetter={setPassword}
          keyboardType={'default'} 
          password={true}
          width={200}/>
        
        <View 
          style={styles.emptyView}/>

        <View 
          style={{flex: 1}}>
          <TouchableHighlight 
            style= {styles.bottomButton} 
            onPress={() => handleSubmit()} 
            underlayColor={colors.primaryDark}>
            <Text 
              style={styles.bottomButtonText}>
                SUBMIT</Text>
          </TouchableHighlight>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    height: '75%' ,
  },
  viewTextInput:{
    width: 270,
    height: 54,
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    background: 'white',
  },
  emptyView:{
    width: 270,
    flex: 1,
  },
  textInput:{
    fontFamily: 'Open Sans',
    width: '100%',
    height: '100%',
    fontSize: 14,
    fontWeight: 300,
    paddingLeft: 10,
  },
  bottomButton:{
    width: 344,
    height: 54,
    borderRadius: 10,
    //marginBottom: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomButtonText: {
    color: 'white', 
    fontFamily: 'Open Sans', 
    fontSize: 20
  }
});