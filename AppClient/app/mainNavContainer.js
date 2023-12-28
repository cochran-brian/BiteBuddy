import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';
import TabNavButton from './components/TabNavButton';
import colors from './config/colors';

import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import SurveyScreen from './screens/SurveyScreen';
import ResultScreen from './screens/ResultScreen';
import JoinBiteScreen from './screens/JoinBiteScreen';
import WaitingScreen from './screens/WaitingScreen';
import AuthScreen from './screens/AuthScreen';
import ScreenHandler from './ScreenHandler';



const homeName = 'Home'
const nearMeName = 'Food Nearby'
const createName = 'Create'
const recentName = 'Recents'
const profileName = 'Profile'

const Tab = createBottomTabNavigator();

function MainNavContainer(){
    return(
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({route}) => ({
                tabBarIcon: ({ focused, color, size}) =>{
                    let iconName;
                    let rn = route.name;

                    if(rn == "Home"){
                    iconName = focused ? "home" : "home-outline"
                    }else if (rn == "Nearby"){
                    iconName = focused ? "trophy" : "trophy-outline"
                    }else if (rn == "Create"){
                    iconName = focused ? "pencil" : "pencil-outline"
                    }else if (rn == "Recents"){
                    iconName = focused ? "person" : "person-outline"
                    }else if (rn == "Profile"){
                    iconName = focused ? "people" : "people-outline"
                    }else{
                        return null
                    }
                    return <Ionicons name = {iconName} size = {24} color = {colors.primary}/>;
                },
                headerShown: false,
                

            })}
            
        >
            <Tab.Screen name="Home" component={ScreenHandler}/>
            <Tab.Screen name="Nearby" component={ScreenHandler}/>
            <Tab.Screen name="Create" component={ScreenHandler} options={({ navigation }) =>({
                tabBarButton: () => (<TabNavButton onPress={() => navigation.navigate('Create')}/>),
                })}/>
            <Tab.Screen name="Recents" component={ScreenHandler}/>
            <Tab.Screen name="Profile" component={ScreenHandler}/>

        </Tab.Navigator>
   
    )
}

export default MainNavContainer;