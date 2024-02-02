import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable, SafeAreaView } from 'react-native';
import colors from '../config/colors';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection, getDocs } from "firebase/firestore"
import SurveyCard from '../components/SurveyCard';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SurveySceen({ route, navigation }) {

  const { data, uid } = route.params;
  var localRatings = new Array(data.length);

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

const storeRatings = async (ratings, uid, token) => {
  try {
    const response = await fetch(`http://${process.env.IP_ADDRESS}:${process.env.PORT}/survey`, { // apparently "localhost" makes the server host the phone instead of the computer
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ratings: ratings,
        token: token,
        uid: uid
      })
    }); 
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error storing data:', error); // error handling here
  }
}

rating = async (rating) => {

  localRatings[this._carousel.currentIndex] = rating

  if(this._carousel.currentIndex >= dataSubset.length - 1) { // LAST CARD
    // const userRatingsDocRef =  doc(collection(db, uid), 'ratings');
    // await setDoc(userRatingsDocRef, {
    //   survey_code: uid,
    // });
    // const subcollectionRef = collection(userRatingsDocRef, 'user_ratings');
    // const subDocRef = doc(subcollectionRef, userName);
    // await setDoc(subDocRef, {
    //   ratings_array: localRatings
    // });

    const idToken = await AsyncStorage.getItem('idToken');
    await storeRatings(localRatings, uid, idToken); // RIGHT NOW ONLY AUTHENTICATED USERS WILL HAVE NAME
    // NEED TO CHANGE THIS WHEN WE MAKE THE WEBSITE

    // navigation.navigate('Waiting', {
    //   data: dataSubset,
    //   nonSurveyData: nonSurveyData,
    //   uid: uid,
    //   name: userName,
    // })
    navigation.navigate('Waiting')
  }
}

    return(
      <>
      {/* {!done ? (
        <View 
          style={[styles.container, {justifyContent: 'center'}]}>
          <Text 
            style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
        </View>
      ) : ( */}
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>BITE BUDDY</Text>

            <View style={{height: 490, marginTop: 20}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={dataSubset}
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
                rating(1)
                this._carousel.snapToNext()
            }}>
                <Text style={styles.emojis}>😐</Text>
              </Pressable>
              <Pressable style={styles.button} 
              onPress={
                () => {
                  rating(2)
                  this._carousel.snapToNext()
                }}>
                <Text style={styles.emojis}>😁</Text>
              </Pressable>
            </View>
            
          </SafeAreaView>
        {/* )
      } */}
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
