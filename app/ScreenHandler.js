import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const ScreenHandler = () => {
    return(
    <NavigationContainer>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
        />
    </NavigationContainer>
)};

export default ScreenHandler;