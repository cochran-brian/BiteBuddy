import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import CreateScreen from './screens/CreateScreen';
import SurveyScreen from './screens/SurveyScreen';
import ResultScreen from './screens/ResultScreen';
import JoinBiteScreen from './screens/JoinBiteScreen'
import { useFonts } from 'expo-font';
import { auth } from './firebase/config';

const Stack = createNativeStackNavigator();

const ScreenHandler = () => {

    const [loading, setLoading] = useState(true);
   // const [user, setUser] = useState(false);

    return(
    <NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Create"
            component={CreateScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Join"
            component={JoinBiteScreen}
            options={{headerShown: false}}
        />
         <Stack.Screen
            name="Survey"
            component={SurveyScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{headerShown: false}}
        />
     </Stack.Navigator>
    </NavigationContainer>
);
};

export default ScreenHandler;