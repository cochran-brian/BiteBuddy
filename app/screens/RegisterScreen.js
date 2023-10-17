import colors from '../config/colors';
import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { db, auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from '@firebase/firestore';

export default function RegisterScreen({navigation}) {
  
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [fontsLoaded] = useFonts({
     'Open Sans': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
 });

    if(!fontsLoaded){
        return null;
    }

    async function onSubmitPressed(){
        try {
          const user = await createUserWithEmailAndPassword(auth, email, password)
          const data = {
              firstName,
              lastName,
              email,
              phoneNumber
          };
          try {
            const usersRef = collection(db, "users");
            const doc = await addDoc(usersRef, data);
          } catch(error) {
            alert(error);
            return;
          }
        } catch(error) {
          alert(error);
          return;
        }
        navigation.navigate("Home");
        alert("success!")
    }
    
  

    
  return (
    

    <KeyboardAvoidingView behavior='padding'>
        <View style={[styles.viewTextInput, {marginTop: 123}]}>
          <TextInput style={styles.textInput} onChangeText={(firstName) => setFirstName(firstName)} placeholder='Enter first name' autoCapitalize='true' keyboardType='none' />
        </View>
        <View style={[styles.viewTextInput, {marginTop: 11}]}>
          <TextInput style={styles.textInput} onChangeText={(lastName) => setLastName(lastName)} placeholder='Enter last name' autoCapitalize='true' keyboardType='none' />
        </View>
        <View style={[styles.viewTextInput, {marginTop: 11}]}>
          <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder='Enter email' autoCapitalize='none' keyboardType='email-address' />
        </View>
        <View style={[styles.viewTextInput, {marginTop: 11}]}>
          <TextInput style={styles.textInput} onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} placeholder='Enter phone number' autoCapitalize='none' keyboardType='phone-pad' />
        </View>
        <View style={[styles.viewTextInput, {marginTop: 11}]}>
          <TextInput style={styles.textInput} onChangeText={(password) => setPassword(password)} placeholder='Enter password' autoCapitalize='none' keyboardType='default' />
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
         <TouchableHighlight style= {styles.bottomButton} onPress={onSubmitPressed} underlayColor={colors.primaryDark}>
          <Text style={{color: 'white', fontFamily: 'Open Sans', fontSize: 20}}>SUBMIT</Text>
         </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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

