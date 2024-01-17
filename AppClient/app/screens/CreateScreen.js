import { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import Slider from '@react-native-community/slider';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection } from "firebase/firestore"
import axios from 'axios';


export default function CreateScreen({ navigation }) {

  const [slideValue, setSlideValue] = useState(0);
  const [locationLong, setLocationLong] = useState('-88.06476939999999');
  const [locationLat, setLocationLat] = useState('42.095271881586406');

  fetchData = async (latitude, longitude, radius) => {
    try {
      const response = await fetch('http://10.0.0.225:3000/fetchData', { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
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

  storeData = async (data, latitude, longitude, radius) => {
    try {
      const response = await fetch('http://10.0.0.225:3000/storeRestaurants', { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
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

  changeScreens = (data, code) => {
    navigation.navigate('Survey', {
      allData: data,
      code: code
    })
  }

  handlePress = async (latitude, longitude, radius) => {
    const { data } = await fetchData(latitude, longitude, radius);
    const { code } = await storeData(data, latitude, longitude, radius);
    changeScreens(data, code);
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
                    HOW FAR ARE YOU WILLING TO TRAVEL?</Text>
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
                  style={styles.bottomButton} 
                  underlayColor={colors.primaryDark} 
                  onPress={() => {
                    handlePress("42.11673643618475", "-88.03444504789003", "10000");
                  }}>

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
      width: 344,
      height: 54,
      borderRadius: 10,
      marginBottom: 14,
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
      fontFamily: 'Open Sans',
      fontSize: 20,
      width: 375,
      textAlign: 'center'
    },
    slider: {
      alignSelf: 'center', 
      fontFamily: 'Open Sans', 
      fontSize: 18
    }
});
