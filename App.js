import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHandler from './app/ScreenHandler.js'
import { auth } from './firebase/config.js';
import HomeScreen from './app/screens/HomeScreen.js';
import model from "./app/model.js";




export default function App() {

  model();

  if(auth.currentUser){
  return (
    <HomeScreen/>
  )}else{
    return(
      <ScreenHandler/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
