import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable, SafeAreaView } from 'react-native';
import colors from '../config/colors';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection, getDocs } from "firebase/firestore"
import SurveyCard from '../components/SurveyCard';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP_ADDRESS, PORT} from "@env"


export default function SurveySceen({ route, navigation }) {

  const { latitude, longitude, radius } = route.params;
  const [data, setData] = useState([])
  const [uid, setUid] = useState(null)
  var ratings = [];

  renderItem = ({item, index}) => {
    console.log(item);
    return (
        <SurveyCard
            name = {item.name}
            imageUri={item.image_url}
            address={item.address}
            rating={item.rating}
        />
    );
}

useEffect(() => {
  getIdToken(latitude, longitude, radius);
}, [])

const fetchData = async (latitude, longitude, radius, token) => {
  try {
    console.log(PORT, IP_ADDRESS)
    console.log("fetching data...")
    const response = await fetch(`http://localhost:3000/restaurants`, { // apparently "localhost" makes the server host the phone instead of the computer
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
    return result.data.businesses;
  } catch (error) {
    console.error('Error fetching data:', error); // error handling here
  }
}

const storeData = async (data, latitude, longitude, radius, token) => {
  try {
    console.log("Storing data...")
    const response = await fetch(`http://localhost:3000/storage`, { // apparently "localhost" makes the server host the phone instead of the computer
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

const getIdToken = async (latitude, longitude, radius) => {
  try {
    console.log("getting ID token...")
    const idToken = await AsyncStorage.getItem('idToken');
    console.log("ID token found", idToken);
    if (idToken) {
      try {
        const data = await fetchData(latitude, longitude, radius, idToken);
        const response = await storeData(data, latitude, longitude, radius, idToken);
        setData(data)
        console.log(response.uid)
        setUid(response.uid);
      } catch (error) {
        console.error("Error fetching or storing data: ", error);
      }
    }
  } catch (error) {
    console.error('Error retrieving custom token:', error);
  }
};


const storeRatings = async (ratings, uid, token) => {
  try {
    console.log(uid)
    const response = await fetch(`http://localhost:3000/survey`, { // apparently "localhost" makes the server host the phone instead of the computer
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ratings: ratings,
        uid: uid
      })
    }); 
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error storing data:', error); // error handling here
  }
}

const rating = async (rating) => {
  // localRatings[this._carousel.currentIndex] = rating
  ratings.push(rating);
  if(this._carousel.currentIndex >= data.length - 1) { // LAST CARD

    const idToken = await AsyncStorage.getItem('idToken');
    console.log(uid)
    await storeRatings(ratings, uid, idToken); // RIGHT NOW ONLY AUTHENTICATED USERS WILL HAVE NAME
    // NEED TO CHANGE THIS WHEN WE MAKE THE WEBSITE

    navigation.navigate('Waiting', {
      uid: uid
    })
  }
}

    return(
      <>
      {data.length === 0 ? (
        <View 
          style={[styles.container, {justifyContent: 'center'}]}>
          <Text 
            style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>BITE BUDDY</Text>

            <View style={{height: 490, marginTop: 20}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={this.renderItem}
              sliderWidth={400}
              itemWidth={320}
              containerCustomStyle={{flexGrow: 0}}
              scrollEnabled={false}
            />
            </View>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Pressable style={styles.button} 
              onPress={() => {
                rating(0)
                this._carousel.snapToNext()
              }}>
                <Text style={styles.emojis}>😢</Text>
              </Pressable>
              <Pressable style={styles.button} 
              onPress={
                () => {
                rating(2)
                this._carousel.snapToNext()
            }}>
                <Text style={styles.emojis}>😐</Text>
              </Pressable>
              <Pressable style={styles.button} 
              onPress={
                () => {
                  rating(5)
                  this._carousel.snapToNext()
                }}>
                <Text style={styles.emojis}>😁</Text>
              </Pressable>
            </View>
            
          </SafeAreaView>
        )
      }
      </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center'
    },
    header:{
        color: 'black',
        fontFamily: 'Open Sans',
        fontSize: 45,
        marginTop: 10,
        alignSelf: 'center'
    },
    button:{
      width: 90, 
      height: 90, 
      borderRadius: 50, 
      margin: 10,
      marginTop:32,
      backgroundColor: 'white', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    emojis:{
      fontSize: 80,
    },
});
