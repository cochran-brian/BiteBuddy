import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import Slider from '@react-native-community/slider';
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore"



export default function CreateScreen({navigation}) {


  const [slideValue, setSlideValue] = useState(0);
  const [locationLong, setLocationLong] = useState('-88.06476939999999');
  const [locationLat, setLocationLat] = useState('42.095271881586406');
  const [places, setPlaces] = useState(null);
  const[imgArray, setImgArray] = useState([]);
  const [imgRefArray, setImgRefArray] = useState([]);
  const [done, setDone] = useState(undefined);

  async function fetchData(){
    console.log("fetching data")
    var data = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+locationLat+'%2C'+locationLong+'&radius='+(slideValue * 1609.34)+'&type=restaurant&key='+process.env.GOOGLE_MAPS_API_KEY)
    data = await data.json();
    //sconsole.log(data.results);
    setPlaces(data.results);
  }

  // async function fetchImages(){
  //   console.log("fetching images")
  //   const promises = imgRefArray.map(async ref => {
  //     try {
  //       const response = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+ref+'&key='+process.env.GOOGLE_MAPS_API_KEY);
  //       return response.url;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })

  //   const urls = await Promise.all(promises);
  //   await setImgArray(urls.filter(url => url !== null));
  //   console.log(imgArray);
  // }

  // async function addDocuments(){
  //   console.log("adding documents")
  //   const addDocument = async () => {
  //     console.log("adding one doc")
  //     const reference = collection(db, "restaurants")
  //       try {
  //         const doc = await addDoc(reference, {
  //           name: places[index].name,
  //           address: places[index].address,
  //           rating: places[index].rating,
  //           imageURL: imgArray[index],
  //           isOpen: places[index].opening_hours.open_now
  //         })
  //         console.log(doc)
  //       } catch (error) {
  //         console.error(error);
  //       }
  //   }
  //   for(var i = 0; i < places.length; i++) {
  //     addDocument(i);
  //   }
  // }

  // async function fetchSend(){
  //   await fetchData();
  //   await fetchImages();
  //   await addDocuments();
  //   //setDone(true);
  // }



  useEffect(() => {
    if(!places) return;

    const limitedIterations = 10;
    const references = places.slice(0, limitedIterations).map(place => {
     return place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null;
    })
    
    const filteredReferences = references.filter(reference => reference !== null);
    
    setImgRefArray(filteredReferences);

  }, [places])

  useEffect(() => {
    if(!imgRefArray || imgRefArray.length === 0) return;

    const fetchImages = async () => {
      const promises = imgRefArray.map(async ref => {
        try {
          const response = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+ref+'&key='+process.env.GOOGLE_MAPS_API_KEY);
          return response.url;
        } catch (error) {
          console.error(error);
        }
      })

      const urls = await Promise.all(promises);
      setImgArray(urls.filter(url => url !== null));
    }
    fetchImages();
  }, [imgRefArray])
  
  useEffect(() => {
    if(!imgArray || imgArray.length === 0) return;

    const addDocument = async (index) => {
      const reference = collection(db, "restaurants")
      try {
        const doc = await addDoc(reference, {
          name: places[index].name,
          address: places[index].vicinity,
          rating: places[index].rating,
          imageURL: imgArray[index],
          isOpen: places[index].opening_hours.open_now
        })
      } catch (error) {
        console.error(error);
      }
    }

    for(var i = 0; i < places.length; i++) {
      addDocument(i);
    }
  }, [imgArray])

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
