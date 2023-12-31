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

  const data = [];
  const code = 0;

  async function fetchData(){
    try {
        const response = await fetch('http://10.0.0.225:3000/fetchData', {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: "42.11673643618475",
            longitude: "-88.03444504789003",
            radius: "10000"
          })
        }); // apparently "localhost" makes the server host the phone instead of the computer
        const result = await response.json();
        console.log(result);
        data = result.data;
        code = result.code;
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    navigation.navigate('Survey', {
      allData: data,
      code: code
    })
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
                    fetchData();
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
