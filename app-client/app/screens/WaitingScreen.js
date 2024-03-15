import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableHighlight, FlatList, Pressable, ScrollView, RefreshControl, Dimensions, Share } from "react-native";
import { doc, collection, getDocs, getDoc } from "firebase/firestore"
import { db, auth } from '../firebase/config';
import { Foundation } from '@expo/vector-icons';
import model from '../model';
import RNEventSource from 'react-native-sse';

import UserView from "../components/UserView";
import colors from "../config/colors";
import UserCard from "../components/UserCard";

export default function WaitingScreen({route, navigation}){

    const [eventData, setEventData] = useState(null);
    const { uid, latitude, longitude, radius } = route.params;

    const onInvitePress = async() => {
      const result = await Share.share({
        url: 'https://www.imdb.com/title/tt1823672/' //Put the link to join the survey here
      });
    }

    useEffect(() => {
      const eventSource = new RNEventSource(`http://localhost:4000/waiting?uid=${uid}`);
  
      // Event listener for receiving SSE messages
      eventSource.addEventListener('message', (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData)
        setEventData(parsedData.names);
      });
  
      // Event listener for handling errors
      eventSource.addEventListener('error', (error) => {
        console.error('SSE Error:', error);
        eventSource.close();
      });
  
      // Cleanup: Close the EventSource when the component unmounts
      return () => {
        console.log("Closed event source")
        eventSource.close();
      };
    }, []);
    
    //const[surveyUsers, setSurveyUsers] = useState([name]);
    
    // const[isHost, setIsHost] = useState(false);

    // function handleRefresh() {
    //   setRefreshing(true);
    //   setTimeout(() => {
    //     getNames()
    //     setRefreshing(false);
    //   }, 1500);
    // }

    // const userRatingsDocRef =  doc(collection(db, code), 'ratings');
    // const subcollectionRef = collection(userRatingsDocRef, 'user_ratings');
    
    // async function getNames() {
    //   const querySnapshot = await getDocs(subcollectionRef);
    //   var userNames = [];
    //   querySnapshot.forEach((doc) => {
    //     //data.push(doc.data());
    //     userNames.push(doc.id);
    //     //user_ratings[doc.id] = doc.data().ratings_array;
    //   });
    //   setSurveyUsers(userNames);
    // }


    //   const modelResponse = model(data, nonSurveyData, user_ratings)
    //   const topRecommendation = modelResponse.topVoted;
    //   const similarRecommendation = modelResponse.topSimilar
    //   const bottomRecomendation = modelResponse.bottomVoted

    //   navigation.navigate('Result', {
    //     top: topRecommendation,
    //     similar: similarRecommendation,
    //     bottom: bottomRecomendation
    //   })
    // }

    // async function checkForHost(){
    //   const placesDocRef = doc(collection(db, code), 'places');
    //   const placesDocSnap = await getDoc(placesDocRef);
    //   setIsHost(name == placesDocSnap.data().host_email);
    // }

    // function navToHome(){
    //   navigation.navigate("Home");
    // }

    

    // useEffect(() => {
    //     setTimeout(() => {
    //       console.log("Loading")
    //       checkForHost()
    //       getNames()
    //       setDone(true);
    //     }, 1500);
    //   }, []); 

  return (
    <>
    {!eventData ? (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text 
            style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
        </View>
      ) : (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>BITE BUDDY</Text>
        </View>
        <ScrollView>
   
      <View style={{marginTop: '10%'}}/>

      <FlatList
        data={eventData} 
        renderItem={({item}) => <UserCard name={item} backgroundColor={"white"} imageUri={'https://x.dpstatic.com/d/avatars/l/987/987650.jpg?1643200221'} status={true}/>}
        scrollEnabled={false}
        style={styles.flatList}
        ListFooterComponent={
            <UserCard name={"INVITE"} onPress={onInvitePress} status={false} backgroundColor={colors.neutral} imageUri={'https://cdn-icons-png.flaticon.com/512/9632/9632767.png'}/>
        }  
        // onRefresh={() => getNames()}
        // refreshing={refreshing}
     />
        
        
    </ScrollView>
    <View 
    style={styles.buttonContainer}>
      <TouchableHighlight 
              style= {styles.bottomButton} 
              onPress={() => {
                navigation.navigate('Result', { 
                  uid: uid,
                  latitude: latitude,
                  longitude: longitude,
                  radius: radius 
                });
              }} 
              underlayColor={colors.primaryDark}>
              <Text style={styles.buttonText}>
                SEE RESULTS{
              /*isHost? SEE RESULTS : BACK HOME */}
              </Text>
      </TouchableHighlight>
    </View>
    </View>
      )}</>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header:{
    color: colors.primary,
    fontFamily: 'Open Sans',
    fontSize: 45,
    marginTop: 80,
    alignSelf: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatList:{
    width: Dimensions.get('screen').width,
    paddingHorizontal: 24
  },
  buttonContainer: {
    flex: 1, 
    justifyContent: 'flex-end'
  },
  bottomButton:{
    width: 310,
    height: 54,
    borderRadius: 50,
    marginBottom: 38,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteButton:{
    width: 150,
    height: 34,
    borderRadius: 50,
    marginTop: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white', 
    fontFamily: 'Open Sans', 
    fontSize: 20
  },
  codeContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  codeText:{
    fontFamily: 'Open Sans',
    fontSize: 22,
  }
});


