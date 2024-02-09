import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';
import RatingStars from './RatingStars';

function SurveyCard({ imageUri, name, address, rating, date }){
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
                <Text style={[styles.textSubheader, {marginTop: 4}]} numberOfLines={1}>$ • Breakfast & Brunch</Text>
                <Text 
                    numberOfLines={2}
                    style={styles.textSubheader}>
                        {address}</Text>
                <Text style={styles.textSubheader} numberOfLines={1}>American Cuisine</Text>
            </View>
        
            <View style={styles.ratingsStyle}>
             <RatingStars
                rating={rating}
                width={160}
                height={30}
             />
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    textContainer: { 
        height: 90,
        marginTop: 38, 
        marginLeft: 18,
        marginRight: 18
    },
    textTitle: {
        fontFamily: 'Open Sans', 
        marginTop: -30,
        fontSize: 30,
        lineHeight: 35,
    },
    textSubheader: {
        fontFamily: 'Open Sans Light', 
        fontSize: 20,
        lineHeight: 26,
        marginLeft: 2
    },
    ratingsStyle:{
        paddingBottom: 22,
        marginLeft: 18,
    }
});

export default SurveyCard;