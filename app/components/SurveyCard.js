import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';

function SurveyCard({imageUri, name, address, rating}){
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
                    style={styles.textTitle}>
                        {name.toUpperCase()}</Text>
                <Text 
                    style={styles.textSubheader}>
                        {address}</Text>
                <Rating
                    disabled={true}
                    size={40}
                    rating={rating}
                    fillColor={'gold'}
                    style={{marginTop: 12}}/>
            </View>
    </View>

)}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'grey',
    },
    image:{
        width: '100%',
        height: '65%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    textContainer: { 
        marginTop: 15, 
        marginLeft: 10, 
    },
    textTitle: {
        fontFamily: 'Open Sans', 
        fontSize: 30
    },
    textSubheader: {
        fontFamily: 'Open Sans Light', 
        fontSize: 24
    },
    ratingContainer: {
        justifyContent: 'flex-end', 
        flex: 1, 
        marginBottom: 30
    }
});

export default SurveyCard;