import { useState, useEffect } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, Modal, StyleSheet, Text, TouchableHighlight, View, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Feather, Entypo } from '@expo/vector-icons';
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker'

export default function ProfileScreen({ navigation }) {

  const user = auth.currentUser;
  const [modalVisible, setmodalVisible] = useState(false)
  const [location, setlocation] = useState('')
  const [location_enabled, setlocation_enabled] = useState(false) //Switch value
  const [pfp, setpfp] = useState(null); //uri of the user's selected profile image
  

  var username = '';
  if(user){
    username = user.email.substring(0, user.email.indexOf('@'));
  }else{
    username = 'Guest';
  }

    const logOut = async () => {
        try {
            await signOut(auth);
            alert('Successfully Logged Out')
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
              <Text style={styles.thirdHeader}>{location}</Text>
           

            
         </View>

         <View style={styles.settingsContainer}>
          <Text style={styles.settingsHeader}>Settings</Text>
         </View>
         <View style={styles.settingsSubContainer}> 
           <View 
             style={styles.locationToggle}>
            <View style={{flexDirection: 'row'}}>
             <Text 
               style={styles.toggleText}>
                 SAVE</Text>
             <Switch value={location_enabled} onValueChange={() => setlocation_enabled(!location_enabled)}/>
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
      fontSize: 34,
    },
    thirdHeader:{
      fontFamily: 'Open Sans',
      fontSize: 20,
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
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 12
    },
    image:{
      width: 150,
      height: 150,
      borderRadius: 75,
      marginLeft: 44
    },
    settingsContainer:{
      width: '100%',
      flex: 0.6,
      justifyContent: 'flex-end',
    },
    settingsSubContainer:{
      backgroundColor: '#d9d9d9',
      width: '100%',
      flex: 2,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    locationToggle:{
      width: Dimensions.get('screen').width * 0.7,
      height: 54,
      borderRadius: 50,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    toggleText: {
      color: 'white', 
      fontFamily: 'Open Sans', 
      fontSize: 18
    },
    signOutButton:{
      width: 292,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#e3242b',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bottomButtonText: {
      color: 'white', 
      fontFamily: 'Open Sans', 
      fontSize: 24
    },
    footerContainer:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    footerText:{
      fontSize: 20,
      color: 'grey',
      fontFamily: 'Open Sans',
      marginBottom: 18,
    }
  });