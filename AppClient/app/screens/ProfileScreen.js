import { useState, useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function ProfileScreen({ navigation }) {

    const logOut = async () => {
        try {
            await signOut(auth);
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
            source={{url: 'https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg'}}/>
            <View style={styles.profileTextContainer}>

            </View>
         </View>

         <View style={styles.settingsContainer}>
            <View style={styles.settingsSubContainer}>
                <TouchableHighlight onPress={() => logOut()}><Text>Sign out</Text></TouchableHighlight>
            </View>
         </View>
        
        <View style={styles.footerContainer}>

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
      profileContainer:{
        width: '100%',
        flex: 1.5,
        backgroundColor: 'orange',
        flexDirection: 'row',
        alignItems: 'center'
      },
      image:{
        width: 110,
        height: 110,
        borderRadius: 55,
      },
      profileTextContainer:{

      },
      settingsContainer:{
        backgroundColor: 'lightblue',
        width: '100%',
        flex: 4
      },
      settingsSubContainer:{
        backgroundColor: 'skyblue',
        width: '100%',
        marginTop: 90,
        flex: 1,
      },
      footerContainer:{
        backgroundColor: 'pink',
        width: '100%',
        flex: 1,
      }
  });