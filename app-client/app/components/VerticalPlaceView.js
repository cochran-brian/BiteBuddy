import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { Feather } from '@expo/vector-icons';
import colors from '../config/colors';
import RatingStars from './RatingStars';

function VerticalPlaceView({ imageUri, name, address, rating}){

    const onYelpPress = () => {
        console.log("Yelp Pressed")
    }

    return(
        <View style={styles.container}>
          
            <Image
                source={{uri: imageUri}}
                style={styles.image}>
            </Image>
            <View 
                style={styles.textContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View 
                    style={{marginLeft: 5}}>
                    <Text 
                        numberOfLines={1}
                        style={styles.textTitle}>
                            {name}</Text>
                    <Text 
                        numberOfLines={2}
                        style={styles.textSubheader}>
                            {address}</Text>
                </View>
                </View>
                <View 
                    style={styles.ratingContainer}>
                     <RatingStars
                        rating={rating}
                        width={90}
                        height={30}
                     />
                     <TouchableHighlight 
                        onPress={onYelpPress} 
                        underlayColor={'lightgrey'}
                        style={{marginLeft: 8}}>
                        <Image 
                            resizeMode='contain'
                            style={styles.yelpLogo}
                            source={require('../assets/yelp_logos/Logo/yelp_logo.png')}/>
                    </TouchableHighlight>
                </View>
                <Text style={[styles.textSubheader, {lineHeight: 10, marginLeft: 6,  fontSize: 10}]}>
                    (523 reviews)</Text>
            </View>
            
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        width: 160,
        height: 210,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.primary,
        position: 'relative',
        marginTop: 0,
    },
    image:{
        width: '100%',
        height: 110,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textContainer: {
        height: 94, 
        alignItems: 'left', 
        marginTop: 10, 
        marginLeft: 10, 
        marginRight: 10,
        flex: 1, 
        flexWrap: 'wrap'
    },
    textTitle: {
        fontFamily: 'Open Sans', 
        fontSize: 16
    },
    textSubheader: {
        fontFamily: 'Open Sans Light', 
        fontSize: 12,
        width: 130
    },
    ratingContainer: {
        justifyContent: 'flex-end', 
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1, 
        marginTop: 12,
        marginLeft: 6
    },
    yelpLogo:{
        height: 20,
        width: 50,
    },
    button:{
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
        alignSelf: 'center',
        marginLeft: 44
    }
});

export default VerticalPlaceView;