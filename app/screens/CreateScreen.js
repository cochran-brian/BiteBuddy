import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import Slider from '@react-native-community/slider';
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore"

export default function CreateScreen({navigation}) {

  const iterationLimit = 10;

  const [slideValue, setSlideValue] = useState(0);
  const [locationLong, setLocationLong] = useState('-88.06476939999999');
  const [locationLat, setLocationLat] = useState('42.095271881586406');

  async function fetchData(){
    var data = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+locationLat+'%2C'+locationLong+'&radius='+(slideValue * 1609.34)+'&type=restaurant&key='+process.env.GOOGLE_MAPS_API_KEY)
    data = await data.json();

    promises = await data.results.slice(0, iterationLimit).map(async (place) => {
      try{
        const response = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+place.photos[0].photo_reference+'&key='+process.env.GOOGLE_MAPS_API_KEY);
        return {
            name: place.name,
            address: place.vicinity, 
            rating: place.rating,
            imageURL: response.url,
            //isOpen: place.opening_hours
          }
      } catch (error) {
        console.error(error);
      }
      
    })

    data = await Promise.all(promises);

    const reference = collection(db, "restaurants")
    data.map(async (place) => {
      try {
        await addDoc(reference, place);
      } catch (error) {
        console.error(error);
      } 
    })
  }

    return(
        <View style={styles.container}>
              <Text style={styles.header}>CREATE A BITE</Text>


              <View style={{marginTop: 80}}>
                <Text style={styles.promptText}>HOW FAR ARE YOU WILLING TO TRAVEL?</Text>
                <Slider
                  step={1}
                  minimumValue={5}
                  maximumValue={50}
                  onValueChange={(val) => setSlideValue(val)}
                />
                <Text style={{alignSelf: 'center', fontFamily: 'Open Sans', fontSize: 18}}>{slideValue} mi</Text>
              </View>

              <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <TouchableHighlight style= {styles.bottomButton} underlayColor={colors.primaryDark} onPress={() => fetchData()}>
                <Text style={{color: 'white', fontFamily: 'Open Sans', fontSize: 20}}>CREATE BITE</Text>
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
    bottomButton:{
        width: 344,
        height: 54,
        borderRadius: 10,
        marginBottom: 14,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
      },
      promptText:{
        fontFamily: 'Open Sans',
        fontSize: 20,
        width: 375,
        textAlign: 'center'
      }
});
