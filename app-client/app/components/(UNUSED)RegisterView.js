import colors from '../config/colors';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection } from "firebase/firestore"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegisterView({navigation}) {
  
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleSubmit(){
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)


      const response = await fetch('http://10.0.0.225:3000/auth', { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          firebaseToken: user
        })
      }); 
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating user:', error); // error handling here
    }




    //   const data = {
    //       firstName,
    //       lastName,
    //       email,
    //       phoneNumber
    //   };
    //   try {
    //     const usersRef = doc(collection(db, 'users'), data.email);
    //     await setDoc(usersRef, data);
    //   } catch(error) {
    //     alert(error);
    //     return;
    //   }
    // } catch(error) {
    //   alert(error);
    //   return;
    // }
    navigation.navigate("Home");
    // alert("success!")
  }
    
  return (
    <View style={styles.container}>
        <View style={[styles.viewTextInput, {marginTop: 125}]}>
          <TextInput
            style={styles.textInput}
            onChangeText={(firstName) => setFirstName(firstName)}
            placeholder='Enter first name' 
            autoCapitalize='words' 
            keyboardType='default' />
        </View>
        <View 
          style={styles.viewTextInput}>
          <TextInput 
            style={styles.textInput} 
            onChangeText={(lastName) => setLastName(lastName)} 
            placeholder='Enter last name' 
            autoCapitalize='words' 
            keyboardType='default' />
        </View>
        <View 
          style={styles.viewTextInput}>
          <TextInput 
            style={styles.textInput} 
            onChangeText={(email) => setEmail(email)} 
            placeholder='Enter email' 
            autoCapitalize='none' 
            keyboardType='email-address' />
        </View>
        <View 
          style={styles.viewTextInput}>
          <TextInput 
            style={styles.textInput} 
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} 
            placeholder='Enter phone number' 
            autoCapitalize='none' 
            keyboardType='phone-pad' />
        </View>
        <View 
          style={styles.viewTextInput}>
          <TextInput 
            style={styles.textInput} 
            onChangeText={(password) => setPassword(password)} 
            placeholder='Enter password' 
            autoCapitalize='none' 
            keyboardType='default' />
        </View>

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
    justifyContent: 'center',
    height: '75%'
  },
  viewTextInput:{
    width: 275,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
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
    width: 350,
    height: 50,
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

