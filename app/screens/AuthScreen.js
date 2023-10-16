import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import colors from '../config/colors';

export default function AuthScreen() {

  const [signingIn,setSigningIn] = useState(true);
  const [email, setEmail] = useState("");

  const [fontsLoaded] = useFonts({
      'Open Sans': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

    if(!fontsLoaded){
        return null;
    }

    
  return (
    

    // <KeyboardAvoidingView behavior='padding'>
    <Pressable styles={styles.container} onPress={() => Keyboard.dismiss()}>
      
      <Text style={styles.header}>BITE BUDDY</Text>
        <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => setSigningIn(true)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.primary : colors.neutral, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
                <Text style={[styles.viewChangeText, {color: signingIn? 'white' : 'black'}]}>Log In</Text>
              </Pressable>
              <Pressable onPress = {() => setSigningIn(false)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.neutral : colors.primary, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
                <Text style={[styles.viewChangeText, {color: signingIn? 'black' : 'white'}]}>Sign Up</Text>
              </Pressable>
        </View>
      
        
        <View style={[styles.viewTextInput, {marginTop: 123}]}>
          <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder='Enter email' autoCapitalize='none' keyboardType='email-address' />
        </View>
        <View style={[styles.viewTextInput, {marginTop: 11}]}>
          <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder='Enter phone number' autoCapitalize='none' keyboardType='phone-pad' />
        </View>
        <View style={[styles.viewTextInput, {marginTop: 11}]}>
          <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder='Enter password' autoCapitalize='none' keyboardType='default' />
        </View>
        
        
      </Pressable>
      // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: 80,
  },
  viewSelectButton:{
    width: 136,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:94,
    marginBottom: 0
  },
  viewChangeText:{
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 16
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
});