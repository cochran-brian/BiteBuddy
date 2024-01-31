import { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Pressable, Dimensions, Touchable, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import colors from '../config/colors';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slider } from '@miblanchard/react-native-slider';
import DropdownSelect from 'react-native-input-select';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CreateScreen({ navigation }) {

  const [slideValue, setSlideValue] = useState(5);
  const [searchedLocation, setSearchedLocation] = useState('');
  const [dropDownPicked, setDropDownPicked] = useState([])


  const dropDownData =  [
    {label: 'American 🇺🇸', value: 'AMR'},
    {label: 'Italian 🇮🇹', value: 'ITA'},
    {label: 'Mexican 🇲🇽', value: 'MEX'},
    {label: 'Japanese 🇯🇵', value: 'JAP'},
    {label: 'Chinese 🇨🇳', value: 'CHI'},
    {label: 'Indian 🇮🇳', value: 'IND'},
    {label: 'German 🇩🇪', value: 'GER'},
    {label: 'French 🇫🇷', value: 'FRN'},
  ]

  const fetchData = async (latitude, longitude, radius, token) => {
    try {
      console.log(process.env.PORT, process.env.IP_ADDRESS)
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
          radius: radius,
          //categories: dropDownPicked ? [...dropDownPicked] : []
        })
      }); 
      const result = await response.json();
      console.log("result", result)
      return result.data.businesses;
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                <View style={styles.textInput}>
                  <FontAwesome5 name="search-location" size={32} color="black" style={{marginLeft: 10}} />
                  <TextInput
                    onChangeText={(text) => setSearchedLocation(text)} 
                    style={styles.inputContent} />
                </View>
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
                  <Text style={styles.promptText}>
                      Cuisine</Text>
                 <DropdownSelect
                    placeholder='Any'
                    options={dropDownData}
                    isMultiple={true}
                    dropdownStyle={styles.dropDown}
                    selectedValue={dropDownPicked}
                    onValueChange={(itemValue) => setDropDownPicked(itemValue)}
                    primaryColor={colors.primary}
                    checkboxComponentStyles={{checkboxLabelStyle: styles.dropDownText}}
                  />
                <View>

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
          </TouchableWithoutFeedback>
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
      justifyContent: 'space-around',
      alignItems: 'flex-start'
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
    textInput:{
      borderWidth: 4,
      borderRadius: 60,
      flexDirection: 'row',
      alignItems: 'center',
      height: 54,
      marginTop: 6
    },
    inputContent:{
      fontFamily: 'Open Sans',
      width: Dimensions.get('screen').width * 0.75,
      height: 52,
      fontSize: 16,
      marginLeft: 8
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
    },
    dropDown:{
      width: Dimensions.get('screen').width * 0.85,
      marginTop: -28,

    },
    dropDownText:{
      fontFamily: 'Open Sans',
      fontSize: 16,
      color: colors.primary,
    
    }
});
