import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import ScreenHandler from './app/ScreenHandler.js'
import { auth } from './app/firebase/config.js';
import HomeScreen from './app/screens/HomeScreen.js';
import MainNavContainer from './app/mainNavContainer.js';
import { NavigationContainer } from '@react-navigation/native';
//import model from "./app/model.js";

export default function App() {

  const [fontsLoaded] = useFonts({
    'Open Sans': require('./app/assets/fonts/OpenSans-ExtraBold.ttf'),
    'Open Sans Light': require('./app/assets/fonts/OpenSans-Regular.ttf'),
  });

  if(!fontsLoaded){
    return null;
  }

  //model();
    return(
      <NavigationContainer>
         <MainNavContainer/>
      </NavigationContainer>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
