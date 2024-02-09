import { useState, useEffect } from 'react';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { auth } from '../firebase/config';
import colors from '../config/colors';
import Carousel from 'react-native-snap-carousel';
import SimplePlaceView from '../components/SimplePlaceView';
import { Pagination } from 'react-native-snap-carousel';
//import { ThreeDots, TailSpin } from 'react-loader-spinner';
import {IP_ADDRESS, PORT} from "@env"

export default function HomeScreen({ navigation }) {

  const [radius, setRadius] = useState(1500);
  const [locationLat, setLocationLat] = useState('42.095271881586406'); 
  const [locationLong, setLocationLong] = useState('-88.06476939999999'); 
  const [data, setData] = useState([]);

  const[carouselIndex, setCarouselIndex] = useState(0);

  // const[imgArray, setImgArray] = useState([]);
  // const [imgRefArray, setImgRefArray] = useState([]);

  // const locateUser = async () => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     const loc = JSON.stringify(position);
  //     setLocation({lat: loc.coords.latitude, long: loc.coords.longitude});
  //   })
  // }

  useEffect(() => {
    setData([0]) // TEMPORARILY HERE SO THAT THE HOME SCREEN LOADS WITHOUT GETTING THE ACTUAL API DATA
    //fetchData("42.11673643618475", "-88.03444504789003", "10000");
    // setTimeout(() => {
      
    // }, 500);
  }, []); 


  renderCarouselItem = ({item, index}) => {
    return (
      <View style={styles.sponsorCard}>
        <Text>TEST Sponsor</Text>
      </View>
    );
}
  
const fetchData = async (latitude, longitude, radius) => {
  try {
    console.log(process.env.PORT, process.env.IP_ADDRESS)
    console.log("fetching data...")
    const response = await fetch(`http://localhost:3000/restaurants`, { // apparently "localhost" makes the server host the phone instead of the computer
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`
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
    setData(result.data.businesses);
  } catch (error) {
    console.error('Error fetching data:', error); // error handling here
  }
}


  return (
    <>
    {data.length == 0 ?(
      <View 
        style={[styles.container, {justifyContent: 'center'}]}>
        <Text 
          style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
      </View>
    ):(
   <View 
    style={styles.container}>
     <SafeAreaView>
      <Text style={styles.header}>
        BITE BUDDY</Text>
     </SafeAreaView>
   <ScrollView showsVerticalScrollIndicator={false} width={'100%'}>

   <View style={{height: 150, marginTop: 20}}>
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={[1,2,3,4,5]}
        renderItem={this.renderCarouselItem}
        sliderWidth={400}
        itemWidth={320}
        containerCustomStyle={{flexGrow: 0}}
        onSnapToItem={(index) => setCarouselIndex(index)}
      />
      <Pagination
        containerStyle={{paddingVertical: 10}}
        activeDotIndex={carouselIndex}
        dotsLength={5}
      />
    </View>

    <View 
      style={[styles.recBox, {marginTop: 10}]}>
      <Text 
        style={{fontFamily: 'Open Sans', fontSize: 28}}>
          Food nearby</Text>

      <View style={styles.listContainer}>
        <FlatList
          horizontal= {true}
          showsHorizontalScrollIndicator={false}
          style={{width: Dimensions.get('screen').width, paddingLeft: 40}}
          contentContainerStyle={{paddingRight: 42}}
          data={[1, 2, 3, 4, 5]}
          renderItem={() => {
            return(
            <View style={styles.restaurantCard}>
              <Text>TEST Restaurant</Text>
            </View>
            )}}
        />
      </View>
    </View>

    <View 
      style={[styles.recBox, {marginTop: 58}]}>
      <Text 
        style={{fontFamily: 'Open Sans', fontSize: 28}}>
          For you</Text>

      <View style={styles.listContainer}>
        <FlatList
          horizontal= {true}
          showsHorizontalScrollIndicator={false}
          style={{width: Dimensions.get('screen').width, paddingLeft: 40}}
          contentContainerStyle={{paddingRight: 42}}
          data={[1, 2, 3, 4, 5]}
          renderItem={() => {
            return(
            <View style={styles.restaurantCard}>
              <Text>TEST Restaurant</Text>
            </View>
            )}}
        />
      </View>
    </View>
    </ScrollView>
   </View>
   )}
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: 5,
    alignSelf: 'center'
  },
  sponsorCard: {
    width: '100%', 
    height: 120, 
    borderRadius: 14, 
    backgroundColor: 'lightgrey', 
    marginRight: 10
  },
  recBox: {
    width: Dimensions.get('screen').width - 80,
    height: '30%',
    marginTop: 44,
    marginLeft: 40,
    marginRight: 40,
  },
  dividerLineContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 15, 
    alignSelf: 'center'
  },
  dividerLine: {
    height: 3, 
    width: 90, 
    backgroundColor: 'black'
  },
  listContainer: {
    marginTop: 14, 
    height: 220, 
    marginLeft: -40
  },
  restaurantCard: {
    width: 150, 
    height: 210, 
    borderRadius: 14, 
    backgroundColor: 'lightgrey', 
    marginRight: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Open Sans',
  },
});