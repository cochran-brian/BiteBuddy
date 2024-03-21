import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavContainer from './mainNavContainer';
import SignInScreen from './screens/SignInScreen';
import SurveyScreen from './screens/SurveyScreen';
import ResultScreen from './screens/ResultScreen';
import JoinBiteScreen from './screens/JoinBiteScreen';
import WaitingScreen from './screens/WaitingScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useFonts } from 'expo-font';
import { auth } from './firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

const ScreenHandler = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    onAuthStateChanged(auth, async (user) => {
        setIsAuthenticated(!!user);
    });

    return(
    <NavigationContainer>
     <Stack.Navigator>
        {auth.currentUser? 
        <>
        <Stack.Screen
            name="MainTabs"
            component={MainNavContainer}
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
        <Stack.Screen
            name="Waiting"
            component={WaitingScreen}
            options={{headerShown: false}}
        />
        </>:
        <>
        <Stack.Screen
            name="Sign In"
            component={SignInScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
        />
        </>
        }
        
     </Stack.Navigator>
    </NavigationContainer>
    )
};

export default ScreenHandler;