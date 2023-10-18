import colors from '../config/colors';
import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthScreen({navigation}) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
     'Open Sans': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
 });

    if(!fontsLoaded){
        return null;
    }

    
  return (
    

    <View style={styles.container}>
        <View style={[styles.viewTextInput, {marginTop: 123}]}>
          <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder='Enter email' autoCapitalize='none' keyboardType='email-address' />
        </View>
        <View style={[styles.viewTextInput, {marginTop: 11}]}>
          <TextInput style={styles.textInput} onChangeText={(password) => setPassword(password)} placeholder='Enter password' autoCapitalize='none' keyboardType='default' />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center'
  },
  viewTextInput:{
    width: 270,
    height: 54,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    background: 'white',
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
    marginBottom: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});