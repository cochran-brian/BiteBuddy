import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight, ScrollView } from 'react-native';
import colors from '../config/colors';
import SignInView from "../components/SignInView";
import RegisterView from '../components/RegisterView';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AuthScreen({ navigation }) {

  const [signingIn, setSigningIn] = useState(true);

  if(!fontsLoaded){
      return null;
  }

  const changeDisplay = () => {
    if(signingIn) {
      return <SignInView navigation={navigation}/>
    } else {
      return <RegisterView navigation={navigation}/>
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
        <Pressable 
          onPress={() => Keyboard.dismiss()}>
          <Text 
            style={styles.header}>
              BITE BUDDY</Text>
            <View 
              style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Pressable 
                    onPress={() => setSigningIn(true)} 
                    style={[styles.viewSelectButton, 
                      {backgroundColor: signingIn ? colors.primary : colors.neutral}]}>
                    <Text 
                      style={[styles.viewChangeText, 
                        {color: signingIn ? 'white' : 'black'}]}>
                        Log In</Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => setSigningIn(false)} 
                    style={[styles.viewSelectButton,
                      {backgroundColor: signingIn ? colors.neutral : colors.primary}]}>
                    <Text 
                      style={[styles.viewChangeText, 
                        {color: signingIn ? 'black' : 'white'}]}>
                        Sign Up</Text>
                  </Pressable>
            </View>
            {changeDisplay()}
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header:{
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: 80,
    alignSelf: 'center'
  },
  viewSelectButton:{
    width: 130,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 0,
    alignSelf: 'center',
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 20
  },
  viewChangeText:{
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 16
  }
});