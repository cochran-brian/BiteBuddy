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



const homeName = 'Home'
const nearMeName = 'Food Nearby'
const createName = 'Create'
const recentName = 'Recents'
const profileName = 'Profile'

const Tab = createBottomTabNavigator();

function MainNavContainer(){
    return(
     <NavigationContainer>
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
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Nearby" component={HomeScreen}/>
            <Tab.Screen name="Create" component={CreateScreen} options={({ navigation }) =>({
                tabBarButton: () => (<TabNavButton onPress={() => navigation.navigate('Create')}/>),
                })}/>
            <Tab.Screen name="Recents" component={HomeScreen}/>
            <Tab.Screen name="Profile" component={HomeScreen}/>

            <Tab.Screen
                name="Auth"
                component={AuthScreen}
           />
            <Tab.Screen
                name="Join"
                component={JoinBiteScreen}
            />
            <Tab.Screen
                name="Survey"
                component={SurveyScreen}
            />
            <Tab.Screen
                name="Result"
                component={ResultScreen}
            />
            <Tab.Screen
                name="Waiting"
                component={WaitingScreen}
            />
        </Tab.Navigator>
    </NavigationContainer>
    )
}

export default MainNavContainer;