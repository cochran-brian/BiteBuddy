import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableHighlight, FlatList, Pressable, ScrollView, RefreshControl } from "react-native";
import { doc, collection, getDocs, getDoc } from "firebase/firestore"
import { db, auth } from '../firebase/config';
import { Foundation } from '@expo/vector-icons';
import model from '../model';
import RNEventSource from 'react-native-sse';

import UserView from "../components/UserView";
import colors from "../config/colors";

export default function WaitingScreen({route, navigation}){

    const [done, setDone] = useState(true);
    const [eventData, setEventData] = useState(null);

    const { uid } = route.params

    useEffect(() => {
      const eventSource = new RNEventSource(`http://localhost:3000/waiting?uid=${uid}`);
  
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

    async function handleClick(){
      const querySnapshot = await getDocs(subcollectionRef);
      var user_ratings = {};
      querySnapshot.forEach((doc) => {
        user_ratings[doc.id] = doc.data().ratings_array;
      });
    }

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
    {!done ? (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text 
            style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView>
   
      <View style={styles.headerContainer}>
        <Text style={styles.header}>BITE BUDDY</Text>
      </View>

      <Text style={[styles.header, {fontSize: 32, marginTop: 0}]}>CODE: </Text>
      
      <View style={{marginTop: '10%'}}/>

      <FlatList
        data={eventData} 
        renderItem={({item}) => <UserView name={item} readyStatus={true}/>}
        scrollEnabled={false}
        // onRefresh={() => getNames()}
        // refreshing={refreshing}
     />
        
        
    </ScrollView>
    <View 
    style={styles.buttonContainer}>
    <TouchableHighlight 
        style={styles.bottomButton} 
        underlayColor={colors.primaryDark} 
        // onPress={isHost? () => {handleClick();} : () => {navToHome();}}>
        onPress={() => handleClick()}>

    <Text 
        style={styles.buttonText}>
        {/* {isHost? 'GET RESULTS' : 'BACK TO HOME'} */}
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
    color: 'black',
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
  buttonContainer: {
    flex: 1, 
    justifyContent: 'flex-end'
  },
  bottomButton:{
    width: 344,
    height: 54,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
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


