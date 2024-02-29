import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableHighlight, Linking } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import RatingStars from './RatingStars';

function SimplePlaceView({ image_url, name, address, rating, numReviews, yelp_url }){

    const onSharePressed = () => {
        console.log('Share Pressed')
    }

    const onYelpPress = () => {
        console.log("Yelp Pressed")
        Linking.openURL(yelp_url)
    }

    return(
        <View style={styles.container}>
          
            <Image
                source={{uri: image_url}}
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
                    <TouchableHighlight 
                        underlayColor={'grey'}
                        onPress={onSharePressed}
                        style={styles.button}>
                            <MaterialCommunityIcons name="share-variant" size={18} color="black" style={{marginLeft: 1}} />
                    </TouchableHighlight>
                </View>
                <View 
                    style={styles.ratingContainer}>
                     <RatingStars
                        rating={rating}
                        width={120}
                        height={30}
                     />
                     <TouchableHighlight 
                        onPress={onYelpPress} 
                        underlayColor={'lightgrey'}
                        style={{marginLeft: 26}}>
                        <Image 
                            resizeMode='contain'
                            style={styles.yelpLogo}
                            source={require('../assets/yelp_logos/Logo/yelp_logo.png')}/>
                    </TouchableHighlight>
                </View>
                <Text style={styles.reviewCountText}>
                    Based on {numReviews} reviews</Text>
            </View>
            
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: 110,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.primary,
        position: 'relative',
        marginTop: 0,
    },
    image:{
        width: 120,
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    textContainer: {
        flexDirection: 'column', 
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
    reviewCountText:{
        fontFamily: 'Open Sans Light', 
        color: 'grey',
        width: 130,
        lineHeight: 10, 
        marginLeft: 6,  
        fontSize: 10
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
        width: 60,
    },
    button:{
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: '#fafafa',
        alignSelf: 'center',
        marginLeft: 42
    }
});

export default SimplePlaceView;