import { Keyboard, StyleSheet, Text, View, Pressable, TextInput, KeyboardAvoidingView, TouchableHighlight, ScrollView } from 'react-native';
import colors from '../config/colors';
import SignInView from "../components/SignInView";
import RegisterView from '../components/RegisterView';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';

export default function AuthScreen({ navigation }) {

  const [signingIn, setSigningIn] = useState(true);

  

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
            <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
              <AntDesign name="arrowleft" size={34} color="black" />
            </Pressable>
          <Text 
            style={styles.header}>
              BITE BUDDY</Text>
            <View 
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
            </View>
            {changeDisplay()}
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton:{
    marginTop: 80,
  },
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
    marginTop: 10,
    alignSelf: 'center'
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
  }
});