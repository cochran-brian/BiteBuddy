import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import colors from '../config/colors';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import SurveyCard from '../components/SurveyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/config'


export default function RecentScreen({ navigation }) {

    const [carouselIndex, setCarouselIndex] = useState(0);
    const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    // const idToken = await AsyncStorage.getItem('idToken');
    // console.log("ID token found", idToken);
    // if (idToken) {
      try {
        console.log("fetching data...")
        const response = await fetch(`http://localhost:4000/recents`, { // apparently "localhost" makes the server host the phone instead of the computer
          method: "GET",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.currentUser.getIdToken()}`
          }
        }); 
        const result = await response.json();
        var sortedResult = [];
        if(result.recents) {
          sortedResult = result.recents.sort((a, b) => {
            return b.timestamp - a.timestamp;
          })
        }
        setData(sortedResult)
      } catch (error) {
        console.error('Error fetching data:', error); // error handling here
      }
    // }

  }

    renderItem = ({item, index}) => {
        return (
            <SurveyCard
                name = {item.topRestaurant.name}
                imageUri={item.topRestaurant.image_url}
                address={item.topRestaurant.address}
                rating={item.topRestaurant.rating}
                date={new Date(item.timestamp).toDateString()}
                yelp_url={item.topRestaurant.yelp_url}
            />
        );
    }

  return (
    <View style={styles.container}>
        <SafeAreaView>
            <Text style={styles.header}>
                 BITE BUDDY</Text>
        </SafeAreaView>
     <View style={styles.subContainer}>

     {data.length > 0 ? (
      <>
        <Carousel
                ref={(c) => { this._carousel = c; }}
                data={data}
                renderItem={this.renderItem}
                sliderWidth={400}
                itemWidth={320}
                containerCustomStyle={{flexGrow: 0, marginTop: 8}}
                onSnapToItem={(index) => setCarouselIndex(index)}
        />
        <Pagination
          containerStyle={{paddingVertical: 14}}
          activeDotIndex={carouselIndex}
          dotsLength={data.length}
        />
      </>
     ) : (
      <Text>No recent Bites</Text> // INSERT LOADER HERE
     )}

     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height - 280
  },
  header: {
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: 5,
    alignSelf: 'center'
  },
  subHeader: {
    fontFamily: 'Open Sans',
    fontSize: 20,
    marginBottom: 12
  }
  
});