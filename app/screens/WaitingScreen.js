import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableHighlight, FlatList } from "react-native";
import UserView from "../components/UserView";
import colors from "../config/colors";

export default function WaitingScreen({route, navigation}){

    const [done, setDone] = useState(false);

    const {allData, code} = route.params;

    //TODO Create state var that contains the users joining the survey
    const[surveyUsers, setSurveyUsers] = useState(['Goon', 'Bum', 'Boomjamin', 'Chappie']);


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
      <Text style={styles.header}>BITE BUDDY</Text>
      <UserView 
        name = {'Bozo Bucket'}
        readyStatus={true}
      />

      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>CODE: {code}</Text>
      </View>

      <FlatList
        data = {surveyUsers} 
        renderItem={({item}) => <UserView name={item} readyStatus={true}/>}
     />
        <View 
            style={styles.buttonContainer}>
            <TouchableHighlight 
                style={styles.bottomButton} 
                underlayColor={colors.primaryDark} 
                onPress={() => {
                    navigation.navigate('Survey', {
                        allData: allData,
                        code: code
                      })
                }}>

            <Text 
                style={styles.buttonText}>
                START SURVEY</Text>
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


