import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable, SafeAreaView, Image, Share } from 'react-native';
import colors from '../config/colors';
import { Feather } from '@expo/vector-icons';
import SimplePlaceView from '../components/SimplePlaceView';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ResultScreen({route, navigation}) {

  const { uid, latitude, longitude, radius } = route.params;
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    getRecommendation();
  }, [])

  const getRecommendation = async () => {
    try {
      console.log("fetching recommendation...")
      const response = await fetch(`http://localhost:4000/results`, { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          uid: uid,
          latitude: latitude,
          longitude: longitude,
          radius: radius
        })
      }); 
      const result = await response.json();
      console.log(result);
      setRecommendations(result);
    } catch (error) {
      console.error('Error fetching data: ' + error); // error handling here
    }
  }

  const shareResults = async () => {
    try {
      const result = await Share.share({
        message: "Check out our group's favorite restaurant!",
        url: recommendations?.topRestaurant?.website
      })
    } catch(error) {
      console.error(error);
    }
  }

    const handleExit = async () => {
      const idToken = await AsyncStorage.getItem('idToken');
      console.log("ID token found", idToken);
      if (idToken) {
      try {
        console.log("exiting...")
        const response = await fetch(`http://localhost:4000/exit`, { // apparently "localhost" makes the server host the phone instead of the computer
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
          },
          body: JSON.stringify({
            uid: uid,
            topRestaurant: recommendations.topRestaurant,
            similarRestaurants: recommendations.similarRestaurants,
          })
        }); 
        const result = await response.json();
        console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

      // store the results with the user profile

      // authenticated host only deletes bite?
      // delete storage endpoint and include in more unique endpoints?
      // delete the bite
      navigation.navigate('Home')
    }
    

    return(
      <>
      {!recommendations ? (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text 
            style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
        </View>
      ) : (
        <View 
          style={styles.container}>
            <SafeAreaView 
              style={{margin: '10%', marginTop: 10, marginBottom: '7%'}}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Image 
                  source={require('../assets/crown.png')}
                  style={{height: 54, width: 54, marginBottom: 6, marginRight: 6}}/> 
                  {/* Image courtesy of zky.icon via flaticon.com */}
                <Text 
                  style={styles.sectionTitle}>GROUP FAVORITE</Text>
              </View>
              <SimplePlaceView
                name={recommendations.topRestaurant.name}
                address={recommendations.topRestaurant.location.address1}
                rating={recommendations.topRestaurant.rating}
                image_url={recommendations.topRestaurant.image_url}
                yelp_url={recommendations.topRestaurant.url}
                numReviews={recommendations.topRestaurant.review_count}/>
            </SafeAreaView>

            <View 
              style={{height: 2, width: '90%',backgroundColor: 'black'}}/>

            <View 
              style={{margin: '10%', marginTop: 16, marginBottom: '7%', alignItems: 'center'}}>
            <Text 
              style={[styles.sectionTitle, {fontSize: 22}]}>SOMEWHERE SIMILAR</Text>
              <SimplePlaceView
                name={recommendations.similarRestaurants[0].name}
                address={recommendations.similarRestaurants[0].location.address1}
                rating={recommendations.similarRestaurants[0].rating}
                image_url={recommendations.similarRestaurants[0].image_url}
                yelp_url={recommendations.similarRestaurants[0].url}
                numReviews={recommendations.similarRestaurants[0].review_count}/>
            </View>

          <View 
            style={{flex: 1}}/>
          <View 
            style={{flexDirection: 'row'}}>
              <TouchableHighlight 
                style={[styles.biteButtons, {width: '60%', marginRight: 12}]} 
                underlayColor={colors.primaryDark} 
                onPress={() => handleExit()}>
                <Text 
                  style={styles.buttonText}>BACK</Text>
              </TouchableHighlight>
              <TouchableHighlight 
                style={[styles.biteButtons, {width: 95}]} 
                underlayColor={colors.primaryDark}
                onPress={() => shareResults()}>
              <Feather 
                name="share" 
                size={32} 
                color="white"
                />
              </TouchableHighlight>
          </View>
        </View>
      )}</>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    header:{
      color: colors.primary,
      fontFamily: 'Open Sans',
      fontSize: 45,
      marginTop: 80,
      alignSelf: 'center'
    },
    sectionTitle:{
        color: 'black',
        fontFamily: 'Open Sans',
        fontSize: 24,
        marginBottom: 12
      },
    biteButtons:{
      height: 54,
      borderRadius: 50,
      marginBottom: 32,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText:{
      color: 'white',
      fontSize: 22,
      fontFamily: 'Open Sans',
    },
});

