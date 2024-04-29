import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import colors from '../config/colors';
import SimplePlaceView from '../components/SimplePlaceView';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';

export default function NearbyScreen({ navigation }) {

  const [data, setData] = useState([]);
  const [radius, setRadius] = useState(1500);
  const [locationLat, setLocationLat] = useState('42.095271881586406'); 
  const [locationLong, setLocationLong] = useState('-88.06476939999999'); 

  useEffect(() => {
    fetchData(locationLat, locationLong, radius);
  }, [])

  const onFilterPress = () => {
    console.log('Filter Pressed')
  }

  const fetchData = async (latitude, longitude, radius) => {
    try {
      console.log("fetching data...")
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`http://localhost:4000/restaurants`, { // apparently "localhost" makes the server host the phone instead of the computer
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
          radius: 10000,
        })
      }); 
      const result = await response.json();
      console.log(result.data.businesses)
      setData(result.data.businesses)
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }
    
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.header}>
        BITE BUDDY</Text>
     </SafeAreaView>

     <View style={styles.subHeadContainer}>
        <Text style={styles.subHeader}>Food nearby</Text>
        <Text style={[styles.lightText, {color: colors.primaryLight}]} onPress={onFilterPress}>Filter</Text>
     </View>

     {/* {!data ? <Text style={styles.flatList}>None</Text> : */}
     <FlatList
      data={data}
      renderItem={({item}) => (
        <SimplePlaceView 
          name={item.name} 
          rating={item.rating} 
          address={item.location.address1} 
          image_url={item.image_url}
          numReviews={item.review_count}
          yelp_url={item.url}/>
      )}
      ItemSeparatorComponent={<View style={{height: 14}}/>}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      contentContainerStyle={{paddingBottom: 28}}
     />
    {/* } */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: 5,
    alignSelf: 'center'
  },
  subHeadContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: Dimensions.get('screen').width * 0.1
  },
  subHeader: {
    fontFamily: 'Open Sans',
    fontSize: 28,
  },
  lightText:{
    color: colors.primary,
    fontFamily: 'Open Sans SemiBold',
    fontSize: 20
  },  
  flatList:{
    marginHorizontal: 38,
    marginTop: 14,
  }
  
});