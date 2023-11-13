import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable, SafeAreaView, Image } from 'react-native';
import colors from '../config/colors';
import { Feather } from '@expo/vector-icons';
import SimplePlaceView from '../components/SimplePlaceView';


export default function ResultScreen({navigation}) {


    return(
        <View style={styles.container}>
            <SafeAreaView style={{margin: '10%', marginTop: 70, marginBottom: '7%', alignItems: 'center'}}>
              <Image source={require('../assets/crown.png')}/> 
                 {
                    //Image courtesy of zky.icon via flaticon.com
                 }
              <Text style={styles.sectionTitle}>TOP RECOMMENDATION</Text>
              <SimplePlaceView
              name={'Chappie\'s'}
              address={'754 W Euclid Ave'}
              rating={4.2}
              imageUri={'https://lh3.googleusercontent.com/p/AF1QipP4XlKpdvnDQkFQGzxvw02lSqoFaWH64OZbnsV5=s1360-w1360-h1020'}/>
            </SafeAreaView>

            <View style={{height: 2, width: '90%',backgroundColor: 'black'}}/>

            <View style={{margin: '10%', marginTop: 30, marginBottom: '7%', alignItems: 'center'}}>
            <Text style={styles.sectionTitle}>HOST'S FAVORITE</Text>
              <SimplePlaceView
              name={'Chappie\'s'}
              address={'754 W Euclid Ave'}
              rating={4.2}
              imageUri={'https://lh3.googleusercontent.com/p/AF1QipP4XlKpdvnDQkFQGzxvw02lSqoFaWH64OZbnsV5=s1360-w1360-h1020'}/>
            </View>

            <View style={{margin: '10%', marginTop: 15, marginBottom: '7%', alignItems: 'center'}}>
            <Text style={styles.sectionTitle}>MOST HEATED</Text>
              <SimplePlaceView
              name={'Chappie\'s'}
              address={'754 W Euclid Ave'}
              rating={4.2}
              imageUri={'https://lh3.googleusercontent.com/p/AF1QipP4XlKpdvnDQkFQGzxvw02lSqoFaWH64OZbnsV5=s1360-w1360-h1020'}/>
            </View>

        <View style={{flex: 1}}/>
        <View style={{flexDirection: 'row', marginLeft: 15, marginBottom: 25}}>
            <TouchableHighlight style={[styles.biteButtons, {width: '60%'}]} underlayColor={colors.primaryDark} onPress={() => navigation.navigate('Home')}>
             <Text style={styles.buttonText}>BACK</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.biteButtons, {width: 95}]} underlayColor={colors.primaryDark}>
             <Feather name="share" size={38} color="white" />
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
        marginBottom: 22
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
