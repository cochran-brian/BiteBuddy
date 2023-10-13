import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHandler from './app/screenHandler';

import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Open-Sans': require('./app/assets/fonts/OpenSans-ExtraBold.ttf'),
});


  if(fontsLoaded) {
    return(
    <ScreenHandler/>
  );
}}

=======

export default function App() {
  return (
    <ScreenHandler/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
