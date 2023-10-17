import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHandler from './app/ScreenHandler.js'
import { auth } from './firebase/config.js';
import HomeScreen from './app/screens/HomeScreen.js';

//import { useFonts } from 'expo-font';

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Open-Sans': require('app/assets/fonts/OpenSans-ExtraBold.ttf'),
  // });


  // if(fontsLoaded) {
  //   return(
  //   <ScreenHandler/>
  //   );
  // }
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
