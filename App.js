import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHandler from './app/ScreenHandler.js'
import { auth } from './firebase/config.js';
import HomeScreen from './app/screens/HomeScreen.js';
import { configDotenv } from 'dotenv';



export default function App() {

  configDotenv();

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
