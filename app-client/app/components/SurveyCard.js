import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableHighlight, Linking } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';
import RatingStars from './RatingStars';

function SurveyCard({ imageUri, name, address, rating, cuisine, date, yelp_url }){

    const onYelpPress = () => {
        console.log("Yelp Pressed");
        Linking.openURL(yelp_url)
    }
    return(
    <View>
     <Text style={styles.dateText}>{date}</Text>
    <View 
        style={styles.container}>
        <Image
            source={{uri: imageUri}}
            style={styles.image}>
        </Image>
           <View 
                style={styles.textContainer}>
                <Text 
                    numberOfLines={2}
                    style={styles.textTitle}>
                    {name}
                    {/* {(name.length > 25) ? name.substring(0, 25).toUpperCase() + "..." : name.toUpperCase()} */}
                </Text>
                <Text style={[styles.textSubheader, {fontFamily: 'Open Sans Medium'}]} numberOfLines={1}>$ • Breakfast & Brunch</Text>
                <Text 
                    numberOfLines={1}
                    style={styles.textSubheader}>
                        {address}</Text>
                <Text style={styles.textSubheader} numberOfLines={1}>{cuisine} Cuisine</Text>
            </View>
        
            <View style={styles.ratingsStyle}>
            <View>
             <RatingStars
                rating={rating}
                width={160}
                height={30}
             />
             <Text style={styles.baseText}>Based on 235 reviews</Text>
             </View>
             <TouchableHighlight 
                onPress={onYelpPress} 
                underlayColor={'lightgrey'}
                style={styles.yelpButton}>
              <Image
                resizeMode='contain'
                style={styles.yelpLogo}
                source={require('../assets/yelp_logos/Logo/yelp_logo.png')}
              />
             </TouchableHighlight>
            </View>
    </View>
    </View>
)}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 480,
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 4,
        borderColor: colors.primary,
        justifyContent: 'space-between'
    
    },
    dateText:{
        fontFamily: 'Open Sans',
        fontSize: 20,
        marginBottom: 12,
        alignSelf: 'center'
    },
    image:{
        width: '100%',
        height: '56%',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26
    },
    textContainer: { 
        height: 90,
        marginTop: 38, 
        marginLeft: 18,
        marginRight: 18
    },
    textTitle: {
        fontFamily: 'Open Sans', 
        marginTop: -36,
        fontSize: 26,
        lineHeight: 28,
    },
    textSubheader: {
        fontFamily: 'Open Sans Light', 
        fontSize: 18,
        lineHeight: 23,
        marginLeft: 2
    },
    ratingsStyle:{
        paddingBottom: 0,
        marginLeft: 18,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginBottom: 20
    },
    baseText: {
        fontFamily: 'Open Sans Light', 
        fontSize: 12,
        width: 130,
        marginTop: 2,
        color: 'grey'
    },
    yelpButton:{
        marginLeft: 20, 
        height: 36, 
        marginBottom: 18,
    },
    yelpLogo:{
        width: 80, 
        height: 30,
        alignSelf: 'center'
    }
});

export default SurveyCard;