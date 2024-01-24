import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';
import TabNavButton from './components/TabNavButton';
import colors from './config/colors';
import { auth } from './firebase/config';

import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import NearbyScreen from './screens/NearbyScreen';
import RecentScreen from './screens/RecentScreen';
import ProfileScreen from './screens/ProfileScreen';


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
                tabBarStyle: {height: 85, alignItems: 'center'},
                tabBarLabelStyle: {fontFamily: 'Open Sans Light', fontSize: 12},
                tabBarActiveTintColor: colors.primary,
                tabBarIcon: ({ focused, color, size}) =>{
                    let iconName;
                    let rn = route.name;

                    if(rn == "Home"){
                    iconName = focused ? "ios-home" : "ios-home-outline"
                    }else if (rn == "Nearby"){
                    iconName = focused ? "ios-location-sharp" : "ios-location-outline"
                    }else if (rn == "Create"){
                    iconName = focused ? "pencil" : "pencil-outline"
                    }else if (rn == "Recents"){
                    iconName = focused ? "ios-time" : "ios-time-outline"
                    }else if (rn == "Profile"){
                    iconName = focused ? "ios-person" : "ios-person-outline"
                    }else{
                        return null
                    }
                    return <Ionicons style= {{marginTop: 5}} name = {iconName} size = {32} color = {colors.primary}/>;
                },
                headerShown: false,
                

            })}
            
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Nearby" component={NearbyScreen}/>
            <Tab.Screen name="Create" component={CreateScreen} options={({ navigation }) =>({
                tabBarButton: () => (<TabNavButton onPress={() => {
                    if(auth.currentUser){
                        navigation.navigate("Create")
                      } else {
                        navigation.navigate("Sign In");
                      }
            }}/>),
                })}/>
            <Tab.Screen name="Recents" component={RecentScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>

        </Tab.Navigator>
   
    )
}

export default MainNavContainer;