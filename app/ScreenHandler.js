import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const ScreenHandler = () => {

    return(
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
        />
     </Stack.Navigator>
    </NavigationContainer>
);
};

export default ScreenHandler;