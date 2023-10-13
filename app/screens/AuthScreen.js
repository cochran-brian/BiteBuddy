import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import colors from '../config/colors';

export default function AuthScreen() {

  const [signingIn,setSigningIn] = useState(true);

  const [fontsLoaded] = useFonts({
      'OpenSans-ExtraBold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

    if(!fontsLoaded){
        return null;
    }

    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <View style={styles.container}>
        <Text style={styles.header}>BITE BUDDY</Text>
        <View style={{flexDirection: 'row'}}>
              <Pressable onPress={() => setSigningIn(true)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.primary : colors.neutral, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
                <Text style={[styles.viewChangeText, {color: signingIn? 'white' : 'black'}]}>Log In</Text>
              </Pressable>
              <Pressable onPress = {() => setSigningIn(false)} style={[styles.viewSelectButton,{backgroundColor: signingIn? colors.neutral : colors.primary, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
                <Text style={[styles.viewChangeText, {color: signingIn? 'black' : 'white'}]}>Sign Up</Text>
              </Pressable>
      </View>
     </View>

     
   </TouchableWithoutFeedback>
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
    fontFamily: 'OpenSans-ExtraBold',
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
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 16
  },
});