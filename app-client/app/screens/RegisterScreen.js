import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import colors from '../config/colors';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import MainTextInput from '../components/MainTextInput';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithCustomToken, createUserWithEmailAndPassword } from 'firebase/auth';
import {IP_ADDRESS, PORT} from "@env"

export default function RegisterScreen({ navigation }) {

  const [signingIn, setSigningIn] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  async function onSubmitPressed(){
    try {
      
      const user = await createUserWithEmailAndPassword(auth, email, password)

      const response = await fetch(`http://localhost:3000/auth`, { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUser: true,
          firstName: name,
          email: email,
          firebaseToken: user._tokenResponse.idToken
        })
      }); 
      storeIdToken(user._tokenResponse.idToken);         
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error creating user:', error); // error handling here
    }
  }

  const changeDisplay = () => {
    if(signingIn) {
      return <SignInView navigation={navigation}/>
    } else {
      return <RegisterView navigation={navigation}/>
    }
  }
    
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Pressable 
          onPress={() => Keyboard.dismiss()} style={styles.pressableContainer}>

          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back-circle-outline" size={42} color="black" />
          </Pressable>

        <View style={styles.contentContainer}>
          <Text 
            style={styles.header}>
              BITE BUDDY</Text>
          <Text 
            style={[styles.lightText, {marginBottom: 16}]}>
              Sign up to continue</Text>

          <View style={{alignItems: 'center'}}>
          <MainTextInput
            label={'Name'}
            stateSetter={setName}
            keyboardType={'default'}
            password={false} />

          <MainTextInput
            label={'Email'}
            stateSetter={setEmail}
            keyboardType={'email-address'}
            password={false} />
      
          <MainTextInput
            label={'Password'}
            stateSetter={setPassword}
            keyboardType={'default'} 
            password={true}/>

          <MainTextInput
            label={'Confirm Password'}
            stateSetter={setConfPassword}
            keyboardType={'default'} 
            password={true}/>
          </View>

          <TouchableHighlight 
            style= {styles.bottomButton} 
            onPress={onSubmitPressed} 
            underlayColor={colors.primaryDark}>
            <Text 
              style={styles.bottomButtonText}>
                SIGN UP</Text>
          </TouchableHighlight>

          <View style={styles.seperatorContainer}>
            <View style={styles.seperatorLine}/>
            <Text style={[styles.lightText, {fontSize: 16}]}>Or sign up with</Text>
            <View style={styles.seperatorLine}/>
          </View>

          <View style={styles.socialIconContainer}>
            <AntDesign name="instagram" size={64} color="black" onPress={() => console.log('instagram')} />
            <AntDesign name="apple1" size={56} color="black" onPress={() => console.log('apple')}/>
            <AntDesign name="google" size={62} color="black" onPress={() => console.log('google')}/>
          </View>

        <View style={styles.bottomPromptContainer}>
         <Text style={[styles.lightText, {fontSize: 16}]}>Already have an account? </Text>
         <Text style={styles.pressableText} onPress={() => navigation.navigate("Sign In")}>Login here</Text>
        </View>
         

        </View>

        

          
        
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton:{
    marginTop: Dimensions.get('screen').height * 0.05,
    marginLeft: '10%'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pressableContainer:{
    height: Dimensions.get('screen').height,
    backgroundColor: 'white',
  },
  contentContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('screen').height * 0.05
    
  },
  header:{
    color: colors.primary,
    fontFamily: 'Open Sans',
    fontSize: 50,
    alignSelf: 'center'
  },
  lightText:{
    color: colors.primary,
    fontFamily: 'Open Sans SemiBold',
    fontSize: 20
  },  
  viewSelectButton:{
    width: 130,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 0,
    alignSelf: 'center',
  },
  viewChangeText:{
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 16
  },
  bottomButton:{
    width: 312,
    height: 60,
    borderRadius: 50,
    marginTop: 46,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomButtonText: {
    color: 'white', 
    fontFamily: 'Open Sans', 
    fontSize: 24
  },
  seperatorContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  seperatorLine:{
    height: 1,
    width: 25,
    backgroundColor: colors.primary,
    marginHorizontal: 5
  },
  socialIconContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginVertical: 18,
  },
  bottomPromptContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  pressableText:{
    fontFamily: 'Open Sans',
    fontSize: 16,
  }
});