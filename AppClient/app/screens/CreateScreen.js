import { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Pressable, Dimensions } from 'react-native';
import colors from '../config/colors';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slider } from '@miblanchard/react-native-slider';
import { Makiko } from 'react-native-textinput-effects'

export default function CreateScreen({ navigation }) {

  const [slideValue, setSlideValue] = useState(0);

  const fetchData = async (latitude, longitude, radius, token) => {
    try {
      console.log("fetching data...")
      const response = await fetch(`http://${process.env.IP_ADDRESS}:${process.env.PORT}/restaurants`, { // apparently "localhost" makes the server host the phone instead of the computer
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
      console.log("result", result)
      return result.data;
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

  const storeData = async (data, latitude, longitude, radius, token) => {
    try {
      console.log("storing data")
      const response = await fetch(`http://${process.env.IP_ADDRESS}:${process.env.PORT}/storage`, { // apparently "localhost" makes the server host the phone instead of the computer
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

  const getIdToken = async (latitude, longitude, radius) => {
    try {
      console.log("getting ID token...")
      const idToken = await AsyncStorage.getItem('idToken');
      console.log("ID token found", idToken);
      if (idToken) {
        const data = await fetchData(latitude, longitude, radius, idToken);
        console.log(data)
        const uid = await storeData(data, latitude, longitude, radius, idToken);
        console.log(uid)
        return { data: data, uid: uid };
      }
    } catch (error) {
      console.error('Error retrieving custom token:', error);
    }
  };

  const handlePress = async (latitude, longitude, radius) => {
    console.log("button pressed")
    const result = await getIdToken(latitude, longitude, radius);
    changeScreens(result.data, result.uid);
  }
    
    return(
        <View 
          style={styles.container}>
              <Text 
                style={styles.header}>
                  CREATE A BITE</Text>

              <View 
                style={styles.contentContainer}>
               <View>
                <Text style={styles.promptText}>
                    Location</Text>
                {/* <Makiko
                  
                /> */}
               </View>

               <View>
                <Text style={styles.promptText}>
                    Search Radius</Text>
                <Slider
                  containerStyle={{width: Dimensions.get('screen').width * 0.85}}
                  step={1}
                  minimumValue={5}
                  maximumValue={50}
                  value={slideValue}
                  onValueChange={val => setSlideValue(val)}
                  renderThumbComponent={() => <View style={styles.sliderThumb}/>}
                  renderBelowThumbComponent={() => 
                    <Text style={styles.sliderText}>{slideValue} miles</Text>}
                  trackStyle={{height: 8}}
                  trackClickable={false}
                />
                </View>
                
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
    contentContainer:{
      flex: 3,
      marginTop: 80,
      backgroundColor: 'pink',
      justifyContent: 'space-around'
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
    sliderText: {
      alignSelf: 'center',
      marginLeft: -36,
      fontFamily: 'Open Sans', 
      fontSize: 18
    },
    sliderThumb:{
      width: 40,
      height: 24,
      borderRadius: 14,
      backgroundColor: colors.primary
    }
});
