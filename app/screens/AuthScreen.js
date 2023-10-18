import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../config/colors';
import SignInScreen from "./SignInScreen";
import RegisterScreen from './RegisterScreen';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

  async function onSubmitPressed() {
    if(signingIn) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        alert(error);
        return;
      }
      navigation.navigate("Home");
      alert("success!")
    } else {
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
  }
    
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Pressable onPress={() => Keyboard.dismiss()}>
        
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
      </KeyboardAwareScrollView>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
         <TouchableHighlight style= {styles.bottomButton} onPress={onSubmitPressed} underlayColor={colors.primaryDark}>
          <Text style={{color: 'white', fontFamily: 'Open Sans', fontSize: 20}}>SUBMIT</Text>
         </TouchableHighlight>
        </View>
    </View>
  
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