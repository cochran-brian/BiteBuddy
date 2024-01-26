import { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import Slider from '@react-native-community/slider';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateScreen({ navigation }) {

  const [slideValue, setSlideValue] = useState(0);

  const fetchData = async (latitude, longitude, radius, token) => {
    try {
      const response = await fetch('http://10.20.224.199:3000/restaurants', { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude,
          radius: radius
        })
      }); 
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

  const storeData = async (data, latitude, longitude, radius, token) => {
    try {
      const response = await fetch('http://10.20.225.198:3000/storage', { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: data,
          latitude: latitude,
          longitude: longitude,
          radius: radius
        })
      }); 
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

  const changeScreens = (data, uid) => {
    navigation.navigate('Survey', {
      data: data,
      uid: uid
    })
  }

  const getCustomToken = async (latitude, longitude, radius) => {
    try {
      const customToken = await AsyncStorage.getItem('customToken');
      if (customToken) {
        const { data } = await fetchData(latitude, longitude, radius, customToken);
        console.log(data)
        const { uid } = await storeData(data, latitude, longitude, radius, customToken);
        console.log(uid)
        return { data: data, uid: uid };
      }
    } catch (error) {
      console.error('Error retrieving custom token:', error);
    }
  };

  const handlePress = async (latitude, longitude, radius) => {
    const result = await getCustomToken(latitude, longitude, radius);
    changeScreens(result.data, result.uid);
  }
    
    return(
        <View 
          style={styles.container}>
              <Text 
                style={styles.header}>
                  CREATE A BITE</Text>

              <View 
                style={{marginTop: 80}}>
                <Text 
                  style={styles.promptText}>
                    Search Radius</Text>
                <Slider
                  step={1}
                  minimumValue={5}
                  maximumValue={50}
                  onValueChange={(val) => setSlideValue(val)}
                />
                <Text 
                  style={styles.slider}>
                    {slideValue} mi</Text>
              </View>

              <View 
                style={styles.buttonContainer}>
              <TouchableHighlight 
              style= {styles.bottomButton} 
              onPress={() => {
                handlePress("42.11673643618475", "-88.03444504789003", "10000");
              }} 
              underlayColor={colors.primaryDark}>
              <Text 
                style={styles.buttonText}>
                  CREATE BITE</Text>
            </TouchableHighlight>
              </View>

          </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    header:{
      color: 'black',
      fontFamily: 'Open Sans',
      fontSize: 45,
      marginTop: 80,
      alignSelf: 'center'
    },
    buttonContainer: {
      flex: 1, 
      justifyContent: 'flex-end'
    },
    bottomButton:{
      width: 310,
      height: 54,
      borderRadius: 50,
      marginBottom: 38,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      color: 'white', 
      fontFamily: 'Open Sans', 
      fontSize: 20
    },
    promptText:{
      fontFamily: 'Open Sans SemiBold',
      fontSize: 22,
      width: 375,
      textAlign: 'left'
    },
    slider: {
      alignSelf: 'center', 
      fontFamily: 'Open Sans', 
      fontSize: 18
    }
});
