import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable, SafeAreaView, Image, Share } from 'react-native';
import colors from '../config/colors';
import { Feather } from '@expo/vector-icons';
import SimplePlaceView from '../components/SimplePlaceView';


export default function ResultScreen({route, navigation}) {

  const {top, similar, bottom} = route.params

  async function shareResults() {
    try {
      const result = await Share.share({
        message: "Check out our group's favorite restaurant!",
        url: top.website
      })
    } catch(error) {
      console.error(error);
    }
    
  }

    return(
        <View 
          style={styles.container}>
            <SafeAreaView 
              style={{margin: '10%', marginTop: 10, marginBottom: '7%', alignItems: 'center'}}>
              <Image 
                source={require('../assets/crown.png')}/> 
                {/* Image courtesy of zky.icon via flaticon.com */}
              <Text 
                style={styles.sectionTitle}>TOP RECOMMENDATION</Text>
              <SimplePlaceView
                name={top.name}
                address={top.address}
                rating={top.rating}
                imageUri={top.image_url}/>
            </SafeAreaView>

            <View 
              style={{height: 2, width: '90%',backgroundColor: 'black'}}/>

            <View 
              style={{margin: '10%', marginTop: 16, marginBottom: '7%', alignItems: 'center'}}>
            <Text 
              style={[styles.sectionTitle, {fontSize: 22}]}>SOMEWHERE SIMILAR</Text>
              <SimplePlaceView
                name={similar.name}
                address={similar.address}
                rating={similar.rating}
                imageUri={similar.image_url}/>
            </View>

            <View 
              style={{margin: '10%', marginTop: 0, marginBottom: '7%', alignItems: 'center'}}>
            <Text 
              style={[styles.sectionTitle, {fontSize: 22}]}>LEAST LIKED</Text>
              <SimplePlaceView
                name={bottom.name}
                address={bottom.address}
                rating={bottom.rating}
                imageUri={bottom.image_url}/>
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
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
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
