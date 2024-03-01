import { useState, useEffect } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Feather } from '@expo/vector-icons';
import colors from '../config/colors';

export default function ProfileScreen({ navigation }) {

  const user = auth.currentUser;

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

    return (
        <View style={styles.container}>
         <SafeAreaView>
            <Text style={styles.header}>
                BITE BUDDY</Text>
         </SafeAreaView>

         <View style={styles.profileContainer}>
            <Image 
            style={styles.image}
            source={{url: 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg'}}/>
            <View style={styles.profileTextContainer}>
              <Text style={styles.subheader}>
                {username}
              </Text>
              <Text style={styles.thirdHeader}>Palatine, IL</Text>
            </View>

            <Pressable onPress={() => console.log('Edit Pressed')}>
              <Feather name="edit" size={32} color="black" />
            </Pressable>
         </View>

         <View style={styles.settingsContainer}>
          <Text style={styles.settingsHeader}>Settings</Text>
         </View>
         <View style={styles.settingsSubContainer}>
          <TouchableHighlight 
              style= {styles.bottomButton} 
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
      fontSize: 28,
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
      marginBottom: 16
    },
    profileContainer:{
      width: '100%',
      flex: 1.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 12
    },
    image:{
      width: 110,
      height: 110,
      borderRadius: 55,
      marginLeft: 8
    },
    profileTextContainer:{
      marginRight: 16,
      marginLeft: 26
    },
    settingsContainer:{
      width: '100%',
      flex: 0.6,
      justifyContent: 'flex-end',
    },
    settingsSubContainer:{
      backgroundColor: '#d9d9d9',
      width: '100%',
      flex: 4,
      borderRadius: 14,
      alignItems: 'center'
    },
    bottomButton:{
      width: 292,
      height: 50,
      borderRadius: 50,
      marginTop: 46,
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