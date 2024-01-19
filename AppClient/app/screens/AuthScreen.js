import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import colors from '../config/colors';
import SignInView from "../components/SignInView";
import RegisterView from '../components/RegisterView';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import MainTextInput from '../components/MainTextInput';

export default function AuthScreen({ navigation }) {

  const [signingIn, setSigningIn] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitPressed(){
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert(error);
      return;
    }
    navigation.navigate("Home");
    alert("success!")
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
              <AntDesign name="arrowleft" size={34} color="black" />
            </Pressable>
        <View style={styles.contentContainer}>
          <Text 
            style={styles.header}>
              BITE BUDDY</Text>
          <Text 
            style={[styles.lightText, {marginBottom: 16}]}>
              Login to continue</Text>
              
            {/* <View 
              style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Pressable 
                    onPress={() => setSigningIn(true)} 
                    style={[styles.viewSelectButton, 
                      {backgroundColor: signingIn ? colors.primary : colors.neutral, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}>
                    <Text 
                      style={[styles.viewChangeText, 
                        {color: signingIn ? 'white' : 'black'}]}>
                        Log In</Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => setSigningIn(false)} 
                    style={[styles.viewSelectButton,
                      {backgroundColor: signingIn ? colors.neutral : colors.primary, borderTopRightRadius: 20, borderBottomRightRadius: 20}]}>
                    <Text 
                      style={[styles.viewChangeText, 
                        {color: signingIn ? 'black' : 'white'}]}>
                        Sign Up</Text>
                  </Pressable>
            </View> */}

          <View style={{alignItems: 'center'}}>
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
          </View>

          <TouchableHighlight 
            style= {styles.bottomButton} 
            onPress={onSubmitPressed} 
            underlayColor={colors.primaryDark}>
            <Text 
              style={styles.bottomButtonText}>
                LOGIN</Text>
          </TouchableHighlight>

          <View style={styles.seperatorContainer}>
            <View style={styles.seperatorLine}/>
            <Text style={[styles.lightText, {fontSize: 16}]}>Or login with</Text>
            <View style={styles.seperatorLine}/>
          </View>

        </View>

        {/* <View style={{flex: 1}}/> */}

          
        
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton:{
    marginTop: '20%',
    marginLeft: '10%'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pressableContainer:{
    height: Dimensions.get('screen').height,
    backgroundColor: 'white'
  },
  contentContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  header:{
    color: colors.primary,
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: '30%',
    alignSelf: 'center'
  },
  lightText:{
    color: colors.primary,
    fontFamily: 'Open Sans Medium',
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
});