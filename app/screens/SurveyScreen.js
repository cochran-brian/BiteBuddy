import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable, SafeAreaView } from 'react-native';
import colors from '../config/colors';
import { db, auth } from '../firebase/config';
import { setDoc, doc, collection } from "firebase/firestore"
import SurveyCard from '../components/SurveyCard';
import Carousel from 'react-native-snap-carousel';

export default function SurveySceen({ route, navigation }) {

  const [done, setDone] = useState(false);

  const { data, code, name } = route.params;

  var localRatings = new Array(data.length);
  

 
  console.log(data)

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

rating = async(r) => {
  console.log('Index: ' + this._carousel.currentIndex + ' => ' + r);

  localRatings[this._carousel.currentIndex] = r

  if(this._carousel.currentIndex >= data.length - 1) {

    var userName;
    if(auth.currentUser) {
      userName = auth.currentUser.email;
    } else {
      userName = name;
    }

    const userRatingsDocRef = doc(collection(db, code), 'ratings');
    await setDoc(userRatingsDocRef, {
      survey_code: code,
    });
    const subcollectionRef = collection(userRatingsDocRef, 'user_ratings');
    const subDocRef = doc(subcollectionRef, userName);
    console.log(localRatings);
    await setDoc(subDocRef, {
      ratings_array: localRatings
    });

    navigation.navigate('Result')
  }
}


  useEffect(() => {
    setTimeout(() => {
      console.log("Loading Datum")
      setDone(true);
    }, 1000);
  }, []); 


    return(
      <>
      {!done ? (
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
