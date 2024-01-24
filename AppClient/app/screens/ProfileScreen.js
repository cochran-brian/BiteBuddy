import { useState, useEffect } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
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
            <TouchableHighlight onPress={() => logOut()}><Text>Sign out</Text></TouchableHighlight>
        </View>
    );
      
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });