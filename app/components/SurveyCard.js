import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';

function SurveyCard({ imageUri, name, address, rating }){
    return(
    <View 
        style={[styles.container]}>
        <Image
            source={{uri: imageUri}}
            style={styles.image}>
        </Image>
           <View 
                style={styles.textContainer}>
                <Text 
                    numberOfLines={2}
                    style={styles.textTitle}>
                    {name.toUpperCase()}
                    {/* {(name.length > 25) ? name.substring(0, 25).toUpperCase() + "..." : name.toUpperCase()} */}
                </Text>
                <Text 
                    numberOfLines={2}
                    style={styles.textSubheader}>
                        {address}</Text>
            </View>
            <Rating
                disabled={true}
                size={40}
                rating={rating}
                fillColor={'gold'}
                style={styles.ratingsStyle}/>
    </View>

)}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 490,
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'grey',
        justifyContent: 'space-between'
    
    },
    image:{
        width: '100%',
        height: '55%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    textContainer: { 
        height: 100,
        marginTop: 20, 
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
        fontSize: 18,
        lineHeight: 25
    },
    ratingsStyle:{
        marginBottom: 25,
        marginLeft: 18
    }
});

export default SurveyCard;