import { useState, useEffect } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Feather, Entypo } from '@expo/vector-icons';
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function ProfileScreen({ navigation }) {

  const user = auth.currentUser;
  const [modalVisible, setmodalVisible] = useState(false)
  const [location, setlocation] = useState('Location Not Enabled')
  const [location_enabled, setlocation_enabled] = useState(false) //Switch value (bool)
  const [pfp, setpfp] = useState(null); //uri of the user's selected profile image
  

  var username = '';

  if(user){
    username = user.email.substring(0, user.email.indexOf('@'));
  }else{
    username = 'Guest';
  }

  
   const tryLocation = async () => {
    var { status } = await Location.requestForegroundPermissionsAsync();
    console.log('Location service -> access', status);
    if (status !== 'granted'){
      setlocation_enabled(false);
      setlocation('Location Error Occured')
      return;
    }

    var location = await Location.getCurrentPositionAsync({});
    const latitude = Number(JSON.stringify(location.coords.latitude));
    const longitude = Number(JSON.stringify(location.coords.longitude));
    const geocodeRequest = await Location.reverseGeocodeAsync({latitude: latitude, longitude: longitude})

    console.log('Geocode request -> ', JSON.stringify(geocodeRequest));
    setlocation(geocodeRequest[0].city + ', ' + geocodeRequest[0].region);
   }
  
  

    const logOut = async () => {
        try {
            await signOut(auth);
            console.log("user signed out")
        } catch (error) {
            console.error(error);
        }
    }

    const launchImagePick = async() => {
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
      })

      if(!result.canceled){
          setpfp(result.assets[0].uri);
      }
  }


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
         <SafeAreaView>
            <Text style={styles.header}>
                BITE BUDDY</Text>
         </SafeAreaView>

         <View style={styles.profileContainer}>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image 
            style={styles.image}
            source={{uri: pfp? pfp : 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg'}}/>
            <Pressable onPress={launchImagePick} style={{marginLeft: 12}}>
              <Feather name="edit" size={32} color="black" />
            </Pressable>
          </View>  
              <Text style={styles.subheader}>
                {username}
              </Text>
              <Text style={[styles.thirdHeader, {marginBottom: 32}]}>{location}</Text>
         </View>

         <View style={styles.settingsSubContainer}> 
         <View style={{flex: 1, justifyContent: 'center'}}>
           <View 
             style={styles.locationToggle}>
             <Text 
               style={styles.toggleText}>
                 LOCATION</Text>
             <Switch 
              value={location_enabled} 
              trackColor={{true: colors.primary}}
              onValueChange={(val) => {
                setlocation_enabled(val)
                if(val){
                  tryLocation();
                }else{
                  setlocation('Location Not Enabled')
                }}}
            />
           </View>
          </View>
          <TouchableHighlight 
              style= {styles.signOutButton} 
              onPress={() => logOut()} 
              underlayColor={'darkred'}> 
              <Text 
                style={styles.bottomButtonText}>
                  LOG OUT</Text>
            </TouchableHighlight>
        </View>
        
        <View style={styles.footerContainer}>
          {user?
           <Text style={styles.footerText}>Joined on {Date(user.createdAt).toString().substring(0, 15)}</Text>
          :
            <View/>
          }
         
        </View>
        </View>
        </TouchableWithoutFeedback>
    );
      
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingHorizontal: 34,
    },
    header: {
      color: 'black',
      fontFamily: 'Open Sans',
      fontSize: 50,
      marginTop: 5,
      alignSelf: 'center'
    },
    subheader:{
      fontFamily: 'Open Sans',
      fontSize: 38,
    },
    thirdHeader:{
      fontFamily: 'Open Sans',
      fontSize: 22,
      color: colors.primaryLight
    },
    settingsHeader:{
      fontFamily: 'Open Sans',
      justifyContent: 'flex-end',
      fontSize: 28,
      marginBottom: 8
    },
    profileContainer:{
      width: '100%',
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      width: 180,
      height: 180,
      borderRadius: 90,
      marginLeft: 44
    },
    settingsSubContainer:{
      backgroundColor: '#d9d9d9',
      width: '100%',
      flex: 1.25,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center'
    },
    locationToggle:{
      width: Dimensions.get('screen').width * 0.7,
      height: 54,
      borderRadius: 50,
      backgroundColor: 'white',
      borderColor: colors.primary,
      borderWidth: 3,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row'
    },
    toggleText: {
      color: colors.primary, 
      fontFamily: 'Open Sans', 
      fontSize: 20,
      marginLeft: 8,
    },
    signOutButton:{
      width: 210,
      height: 44,
      borderRadius: 50,
      marginBottom: 18,
      backgroundColor: '#e3242b',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bottomButtonText: {
      color: 'white', 
      fontFamily: 'Open Sans', 
      fontSize: 20
    },
    footerContainer:{
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0.75
    },
    footerText:{
      fontSize: 18,
      color: 'grey',
      fontFamily: 'Open Sans',
      marginTop: 12,
    }
  });