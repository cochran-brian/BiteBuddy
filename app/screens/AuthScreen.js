import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../config/colors';
import SignInScreen from "./SignInScreen";
import RegisterScreen from './RegisterScreen';
import { useState } from 'react';

export default function AuthScreen({navigation}) {

  const [signingIn, setSigningIn] = useState(true);

  const [fontsLoaded] = useFonts({
     'Open Sans': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
 });

  if(!fontsLoaded){
      return null;
  }

  const changeDisplay = () => {
    if(signingIn) {
      return <SignInScreen navigation={navigation}/>
    } else {
      return <RegisterScreen navigation={navigation}/>
    }
  }

  

    
  return (
    

  //<KeyboardAvoidingView behavior='padding' style={styles.container}>
  <ScrollView>
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      
      <Text style={styles.header}>BITE BUDDY</Text>
        <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => setSigningIn(true)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.primary : colors.neutral, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
                <Text style={[styles.viewChangeText, {color: signingIn? 'white' : 'black'}]}>Log In</Text>
              </Pressable>
              <Pressable onPress = {() => setSigningIn(false)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.neutral : colors.primary, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
                <Text style={[styles.viewChangeText, {color: signingIn? 'black' : 'white'}]}>Sign Up</Text>
              </Pressable>
        </View>
        
        {changeDisplay()}
        
      </Pressable>
  </ScrollView>
    

     

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
    alignSelf: 'center'
  },
  viewSelectButton:{
    width: 136,
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:94,
    marginBottom: 0,
    alignSelf: 'center'
    
  },
  viewChangeText:{
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 16
  }
});