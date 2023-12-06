import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableHighlight, FlatList, Pressable} from "react-native";
import { doc, collection, getDocs } from "firebase/firestore"
import { db, auth } from '../firebase/config';
import { Foundation } from '@expo/vector-icons';

import UserView from "../components/UserView";
import colors from "../config/colors";

export default function WaitingScreen({route, navigation}){

    const [done, setDone] = useState(false);

    const[refreshing, setRefreshing] = useState(false);

    const {data, nonSurveyData, code, name} = route.params;

    //TODO Create state var that contains the users joining the survey
    const[surveyUsers, setSurveyUsers] = useState([name]);

    async function getNames() {
      setRefreshing(true);

      const userRatingsDocRef =  doc(collection(db, code), 'ratings');
      const subcollectionRef = collection(userRatingsDocRef, 'user_ratings');
      const querySnapshot = await getDocs(subcollectionRef);
      var userNames = [];
      var user_ratings = {};
      await querySnapshot.forEach((doc) => {
        //data.push(doc.data());
        userNames.push(doc.id);
        user_ratings[doc.id] = doc.data().ratings_array;
      })

      setSurveyUsers(userNames);
      setRefreshing(false);
    }

    async function handleClick(){
      const modelResponse = model(data, nonSurveyData, user_ratings)
      const topRecommendation = modelResponse.topVoted;
      const similarRecommendation = modelResponse.topSimilar
      const bottomRecomendation = modelResponse.bottomVoted

      navigation.navigate('Result', {
        top: topRecommendation,
        similar: similarRecommendation,
        bottom: bottomRecomendation
      })
    }

    

    useEffect(() => {
        setTimeout(() => {
          console.log("Loading")
          setDone(true);
        }, 1000);
      }, []); 

  return (
    <>
    {!done ? (
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <Text 
            style={[styles.header, {marginTop: 0}]}>BITE BUDDY</Text>
        </View>
      ) : (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>BITE BUDDY</Text>
        <Pressable onPress={() => getNames()}>
          <Foundation name="refresh" size={24} color="black" />
        </Pressable>
      </View>

      <Text style={[styles.header, {fontSize: 32, marginTop: 0}]}>CODE: {code}</Text>
      
      <View style={{marginTop: '10%'}}/>

      <FlatList
        data = {surveyUsers} 
        renderItem={({item}) => <UserView name={item} readyStatus={true}/>}
        onRefresh={() => getNames()}
        refreshing={refreshing}
     />
        <View 
            style={styles.buttonContainer}>
            <TouchableHighlight 
                style={styles.bottomButton} 
                underlayColor={colors.primaryDark} 
                onPress={() => {
                  handleClick();
                }}>

            <Text 
                style={styles.buttonText}>
                GET RESULTS</Text>
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


