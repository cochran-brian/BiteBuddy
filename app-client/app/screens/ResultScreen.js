import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable, SafeAreaView, Image, Share } from 'react-native';
import colors from '../config/colors';
import { Feather } from '@expo/vector-icons';
import SimplePlaceView from '../components/SimplePlaceView';


export default function ResultScreen({route, navigation}) {

  const { uid, latitude, longitude, radius } = route.params;
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    getRecommendation();
  }, [])

  const getRecommendation = async () => {
    try {
      console.log("fetching recommendation...")
      const response = await fetch(`http://localhost:3000/results`, { // apparently "localhost" makes the server host the phone instead of the computer
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
      console.error('Error fetching data:', error); // error handling here
    }
  }

  async function shareResults() {
    try {
      const result = await Share.share({
        message: "Check out our group's favorite restaurant!",
        url: recommendations?.topRestaurant?.website
      })
    } catch(error) {
      console.error(error);
    }
    
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
              style={{margin: '10%', marginTop: 10, marginBottom: '7%', alignItems: 'center'}}>
              <Image 
                source={require('../assets/crown.png')}/> 
                {/* Image courtesy of zky.icon via flaticon.com */}
              <Text 
                style={styles.sectionTitle}>GROUP FAVORITE</Text>
              <SimplePlaceView
                name={recommendations.topRestaurant.name}
                address={recommendations.topRestaurant.address}
                rating={recommendations.topRestaurant.rating}
                imageUri={recommendations.topRestaurant.image_url}/>
                {/* <Text>{recommendations.topRestaurant}</Text> */}
            </SafeAreaView>

            <View 
              style={{height: 2, width: '90%',backgroundColor: 'black'}}/>

            <View 
              style={{margin: '10%', marginTop: 16, marginBottom: '7%', alignItems: 'center'}}>
            <Text 
              style={[styles.sectionTitle, {fontSize: 22}]}>SOMEWHERE SIMILAR</Text>
              <SimplePlaceView
                name={recommendations.similarRestaurants[0].name}
                address={recommendations.similarRestaurants[0].address}
                rating={recommendations.similarRestaurants[0].rating}
                imageUri={recommendations.similarRestaurants[0].image_url}/>
            </View>

            <View 
              style={{margin: '10%', marginTop: 0, marginBottom: '7%', alignItems: 'center'}}>
            <Text 
              style={[styles.sectionTitle, {fontSize: 22}]}>LEAST LIKED</Text>
              {/* <SimplePlaceView
                name={bottom.name}
                address={bottom.address}
                rating={bottom.rating}
                imageUri={bottom.image_url}/> */}
            </View>

          <View 
            style={{flex: 1}}/>
          <View 
            style={{flexDirection: 'row', marginLeft: 15, marginBottom: 25}}>
              <TouchableHighlight 
                style={[styles.biteButtons, {width: '60%'}]} 
                underlayColor={colors.primaryDark} 
                onPress={() => {
                  navigation.navigate('Home')
                }}>
                <Text 
                  style={styles.buttonText}>BACK</Text>
              </TouchableHighlight>
              <TouchableHighlight 
                style={[styles.biteButtons, {width: 95}]} 
                underlayColor={colors.primaryDark}
                onPress={() => shareResults()}>
              <Feather 
                name="share" 
                size={38} 
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
      width: Dimensions.get('screen').width - 10,
      marginRight: 15,
      marginTop: 15,
      height: 80,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    buttonText:{
      color: 'white',
      fontSize: 20,
      fontFamily: 'Open Sans',
    },
});

