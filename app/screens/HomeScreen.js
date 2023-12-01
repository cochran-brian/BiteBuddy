import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { auth } from '../firebase/config';
import colors from '../config/colors';
import SimplePlaceView from '../components/SimplePlaceView';
//import { ThreeDots, TailSpin } from 'react-loader-spinner';

export default function HomeScreen({ navigation }) {

  const ITERATION_LIMIT = 2;

  const [radius, setRadius] = useState(1500);
  const [locationLat, setLocationLat] = useState('51.64361'); //42.095271881586406
  const [locationLong, setLocationLong] = useState('-0.48066'); //-88.06476939999999
  const [done, setDone] = useState(undefined);
  const [places, setPlaces] = useState(null);

  // const[imgArray, setImgArray] = useState([]);
  // const [imgRefArray, setImgRefArray] = useState([]);

  // const locateUser = async () => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     const loc = JSON.stringify(position);
  //     setLocation({lat: loc.coords.latitude, long: loc.coords.longitude});
  //   })
  // }

  useEffect(() => {
    setTimeout(() => {
      //fetchData();
      setDone(true);
    }, 1000);
  }, []); 
  
  async function fetchData(){
    var data = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+locationLat+'%2C'+locationLong+'&radius='+radius+'&type=restaurant&opennow=true&key='+process.env.GOOGLE_MAPS_API_KEY)
    data = await data.json();

    promises = await data.results.slice(0, ITERATION_LIMIT).map(async (place) => {
      try{
        const response = await fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+place.photos[0].photo_reference+'&key='+process.env.GOOGLE_MAPS_API_KEY);
        return {
            name: place.name,
            address: place.vicinity, 
            rating: place.rating,
            imageURL: response.url,
          }
      } catch (error) {
        console.error(error);
      }
    })
    data = await Promise.all(promises);
    setPlaces(data);
    setDone(true);
  }

  return (
    <>
    {!done?(
      <View 
        style={[styles.container, {justifyContent: 'center'}]}>
        <Text 
          style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
      </View>
    ):(
   <View 
    style={styles.container}>
    <Text 
      style={styles.header}>
        BITE BUDDY</Text>

    <View 
      style={styles.recBox}>
      <Text 
        style={{fontFamily: 'Open Sans', fontSize: 20}}>
          FOOD NEAR YOU</Text>
      <SimplePlaceView  
        name={places ? places[0].name : 
          // <ThreeDots
          //   height="40" 
          //   width="40" 
          //   radius="5"
          //   color={colors.primary}
          //   ariaLabel="three-dots-loading"/>
          "loading..."
        }
        address={places ? places[0].vicinity : 
          // <ThreeDots
          //   height="40" 
          //   width="40" 
          //   radius="5"
          //   color={colors.primary}
          //   ariaLabel="three-dots-loading"/>
          "loading..."
        }
        rating={places ? places[0].rating : 0} 
        imageUri={places ? places[0].imageURL : 
          // <TailSpin
          //   height="80"
          //   width="80"
          //   color={colors.primary}
          //   radius="1"
          //   ariaLabel="tail-spin-loading"/>
          "https://img.icons8.com/material-sharp/96/restaurant.png"
        }/>

      <SimplePlaceView  
        name={places ? places[1].name : 
          // <ThreeDots
          //   height="40" 
          //   width="40" 
          //   radius="5"
          //   color={colors.primary}
          //   ariaLabel="three-dots-loading"/>
          "loading..."
        }
        address={places ? places[1].vicinity : 
          // <ThreeDots
          //   height="40" 
          //   width="40" 
          //   radius="5"
          //   color={colors.primary}
          //   ariaLabel="three-dots-loading"/>
          "loading..."
        }
        rating={places ? places[1].rating : 0} 
        imageUri={places ? places[1].imageURL : 
          // <TailSpin
          //   height="80"
          //   width="80"
          //   color={colors.primary}
          //   radius="1"
          //   ariaLabel="tail-spin-loading"/>
          "https://img.icons8.com/material-sharp/96/restaurant.png"
        }/>
    </View>

    {/* <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '200%', position: 'absolute'}}>
      <View style={{height: 3, width: 130, backgroundColor: 'black'}}/>
       <Pressable style={{width: 97, height: 32, backgroundColor: colors.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginLeft: 10, marginRight: 10, color: 'white', fontFamily: 'Open Sans'}}>MORE →</Text>
       </Pressable>
      <View style={{height: 3, width: 130, backgroundColor: 'black'}}/>
    </View> */}

    <View>
     <TouchableHighlight 
      style={[styles.biteButtons, {marginTop: 100}]} 
      underlayColor={colors.primaryDark} 
      onPress={() => {
        if(auth.currentUser){
          navigation.navigate("Create")
        } else {
          navigation.navigate("Auth");
        }
      }}>
      <Text 
        style={styles.buttonText}>
          CREATE A BITE</Text>
     </TouchableHighlight>

     <View 
      style={styles.dividerLineContainer}>
      <View 
        style={styles.dividerLine}/>
        <Text 
          style={styles.dividerLineText}>
            OR</Text>
      <View 
        style={styles.dividerLine}/>
    </View>

     <TouchableHighlight 
      style={styles.biteButtons} 
      underlayColor={colors.primaryDark} 
      onPress={() => navigation.navigate("Join")}>
        <Text 
          style={styles.buttonText}>
            JOIN A BITE</Text>
     </TouchableHighlight>
    </View>
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
    marginTop: 80,
    alignSelf: 'center'
  },
  recBox: {
    width: Dimensions.get('screen').width - 80,
    height: '30%',
    marginTop: 34,
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
  dividerLineText: {
    marginLeft: 10, 
    marginRight: 10, 
    color: 'green', 
    fontFamily: 'Open Sans', 
    fontSize: 18
  },
  biteButtons: {
    width: Dimensions.get('screen').width - 36,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 15,
    height: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Open Sans',
  },
});