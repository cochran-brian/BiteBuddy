import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Pressable, Dimensions, Touchable, TouchableWithoutFeedback, Keyboard, TextInput, Button } from 'react-native';
import colors from '../config/colors';
import { Slider } from '@miblanchard/react-native-slider';
import { Rating } from '@kolking/react-native-rating';
import DropdownSelect from 'react-native-input-select';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import {IP_ADDRESS, PORT, LOCATION_IQ_KEY} from "@env"
import LocationTextCard from '../components/LocationTextCard';
import * as Location from 'expo-location';

export default function CreateScreen({ navigation }) {

  const [slideValue, setSlideValue] = useState(10); // Value displayed on slider
  const [searchedLocation, setSearchedLocation] = useState(''); // String entered by user
  const [dropDownPicked, setDropDownPicked] = useState([]) // Array of the values from dropdown selections
  const [plPicked, setPlPicked] = useState(0) // 0-None Selected, 1-$, 2-$$, 3-$$$,
  const [rating, setRating] = useState(0) //Rating selected on stars (/5)

  const [showAutofillModal, setAutofillModal] = useState(false);
  const [autofillDropdownPicked, setAutofillDropdownPicked] = useState('none');
  const [addressPicked, setAddressPicked] = useState('none');
  const [locationLocked, setLocationLocked] = useState(false);

  const [location, setLocation] = useState(null);

  //TODO make it so the inputText is not editable/ greyed out after location is picked

  const dropDownData =  [
    {label: 'American 🇺🇸', value: 'American'},
    {label: 'Italian 🇮🇹', value: 'Italian'},
    {label: 'Mexican 🇲🇽', value: 'Mexican'},
    {label: 'Japanese 🇯🇵', value: 'Japanese'},
    {label: 'Chinese 🇨🇳', value: 'Chinese'},
    {label: 'Indian 🇮🇳', value: 'Indian'},
    {label: 'German 🇩🇪', value: 'German'},
    {label: 'French 🇫🇷', value: 'French'},
  ]

  const [autoFillData, setAutoFillData] = useState([]);

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const onPlPress = (num) => {
    setPlPicked(num);
  }

  const autoFill = async (input) => {
    setAutoFillData([]);
    const response = await fetch('https://api.locationiq.com/v1/autocomplete?key='+LOCATION_IQ_KEY+'&q='+input+'&limit=5')
    const result = await response.json()

    var options = [];

    result.forEach(location => {
      options.push({label: location.display_name, value: {coords: {latitude: location.lat, longitude: location.lon}, name: location.display_name}})
    });

    
    setAutoFillData(options);
    setAutofillModal(true);
  }

  // const onAutofillPicked = (name) => {
  //   console.log(name);
  //   setSearchedLocation(name);
  //   setLocation(autofillDropdownPicked)
  //   setLocationLocked(true);
  // }

  const changeScreens = () => {
    console.log(location)
    navigation.navigate('Survey', {
      latitude: location.latitude,
      longitude: location.longitude,
      radius: slideValue * 1609.34, // conversion to meters
      categories: dropDownPicked,
      priceLevel: plPicked
    })
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
                  {/* <FontAwesome5 name="search-location" size={32} color="black" style={{marginLeft: 10}} /> */}
                  {locationLocked? 
                  <>
                  <LocationTextCard name={searchedLocation}/>
                  <Pressable style={{marginRight: 4, marginLeft: 0}} onPress={() => {
                    setLocationLocked(false)
                    setSearchedLocation('')}}>
                      <MaterialIcons name="clear" size={24} color="black" />
                  </Pressable>
                  </> 
                  : 
                  <>
                  <TextInput
                    inputMode='search'
                    onSubmitEditing={() => autoFill(searchedLocation)}
                    placeholder='Search'
                    onChangeText={(text) => {
                      setSearchedLocation(text)
                    }} 
                    value={searchedLocation}
                    style={styles.inputContent}/>
                  <TouchableHighlight style={styles.locationSearch} onPress={() => autoFill(searchedLocation)}>
                    <FontAwesome5 name="search-location" size={32} color="white"/>
                  </TouchableHighlight>
                  </>
                  }
                  
                </View>
               
               <View style={{height: 0}}>
                <DropdownSelect 
                  dropdownStyle={{width: 0, height: 0, opacity: 0}}
                  listFooterComponent={<Button style={styles.cancelButton} title="Cancel" onPress={() => setAutofillModal(false)}/>}
                  disabled={true}
                  isMultiple={false}
                  options={autoFillData}
                  selectedValue={autofillDropdownPicked}
                  checkboxLabelStyle={{fontFamily: 'Open Sans Medium', marginVertical: 8, marginRight: 18}}
                  checkboxStyle={{borderRadius: 20, height: 10, width: 10}}
                  onValueChange={(itemValue) => {
                    setAutofillDropdownPicked(itemValue.coords);
                    setAutofillModal(false);
                    setSearchedLocation(itemValue.name);
                    setLocation(itemValue.coords)
                    setLocationLocked(true);
                  }}
                  modalProps={{visible: showAutofillModal}}
                />
                </View>
               
               </View>

               <View>
                <Text style={styles.promptText}>
                    Search Radius</Text>
                <Slider
                  containerStyle={{width: Dimensions.get('screen').width * 0.85, alignSelf: 'center'}}
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
                <View>
                  <Text style={styles.promptText}>
                      Cuisine</Text>
                 <DropdownSelect
                    placeholder='Any'
                    placeholderStyle={[styles.header, {fontSize: 16, marginTop: 0}]}
                    options={dropDownData}
                    isMultiple={true}
                    dropdownStyle={styles.dropDown}
                    dropdownContainerStyle={{height: 34,  alignSelf: 'center'}}
                    selectedValue={dropDownPicked}
                    onValueChange={(itemValue) => setDropDownPicked(itemValue)}
                    primaryColor={colors.primary}
                    checkboxComponentStyles={{checkboxLabelStyle: styles.dropDownText}}
                    multipleSelectedItemStyle={{fontFamily: 'Open Sans', height: 34, borderRadius: 18}}
                    dropdownIconStyle={{top: 34, right: 12}}
                  />
                </View>
                <View>
                  <Text style={styles.promptText}>
                        Price Level</Text>
                  <View style={styles.plButtonContainer}>
                    <Pressable style={plPicked == 1? styles.curPLButton : styles.plButton} onPressIn={() => onPlPress(1)}>
                      <Text style={plPicked == 1? styles.curPlText : styles.plText}>$</Text></Pressable>
                    <Pressable style={plPicked == 2? styles.curPLButton : styles.plButton} onPressIn={() => onPlPress(2)}>
                      <Text style={plPicked == 2? styles.curPlText : styles.plText}>$$</Text></Pressable>
                    <Pressable style={plPicked == 3? styles.curPLButton : styles.plButton} onPressIn={() => onPlPress(3)}>
                      <Text style={plPicked == 3? styles.curPlText : styles.plText}>$$$</Text></Pressable>
                  </View>
                </View>

                {/* <View>
                  <Text style={[styles.promptText, {marginTop: -8}]}>
                          Min Rating</Text>
                  <Rating
                        size={52}
                        rating={rating}
                        spacing={10}
                        onChange={(rating) => setRating(rating)}
                        fillColor={colors.primary}
                        touchColor={colors.primary}
                        style={styles.ratingsStyle}/>
                </View> */}
              </View>
            
              <View 
                style={styles.buttonContainer}>
              <TouchableHighlight 
              style= {styles.bottomButton} 
              onPress={() => {
                changeScreens();
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
      flex: 5,
      marginTop: 4,
      paddingVertical: 8,
      // backgroundColor: 'pink',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    header:{
      color: colors.primary,
      fontFamily: 'Open Sans',
      fontSize: 45,
      marginTop: 60,
      alignSelf: 'center'
    },
    buttonContainer: {
      flex: 1, 
      justifyContent: 'flex-end',
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
      borderWidth: 2,
      borderRadius: 60,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      height: 54,
      marginTop: 6
    },
    locationSearch:{
      width: Dimensions.get('screen').width * 0.15,
      height: 52,
      backgroundColor: colors.primary,
      borderTopRightRadius: 20, 
      borderBottomRightRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContent:{
      fontFamily: 'Open Sans',
      width: Dimensions.get('screen').width * 0.65,
      height: 52,
      fontSize: 18,
      marginLeft: 18
    },
    promptText:{
      fontFamily: 'Open Sans SemiBold',
      fontSize: 20,
      width: 375,
      textAlign: 'left'
    },
    sliderText: {
      alignSelf: 'center',
      marginLeft: -Dimensions.get("screen").width * 0.05,
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
      height: 74,
      marginTop: 6,
      borderRadius: 28,
    },
    dropDownText:{
      fontFamily: 'Open Sans',
      fontSize: 16,
      color: colors.primary,
    },
    plButtonContainer: {
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginHorizontal: 14,
      marginTop: 8,
      marginBottom: 32,
    },
    plButton:{
      width: 100, 
      height: 74,
      borderRadius: 26,
      borderColor: colors.primary,
      borderWidth: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    curPLButton:{
     backgroundColor: colors.primary,
     width: 100, 
     height: 74,
     borderRadius: 26,
     justifyContent: 'center',
     alignItems: 'center'
    },
    plText:{
      fontSize: 24,
      fontFamily: 'Open Sans',
      color: colors.primary
    },
    curPlText:{
      fontSize: 24,
      fontFamily: 'Open Sans',
      color: 'white'
    },
    ratingsStyle:{
      alignSelf:"center",
    },
});
