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
                    style={{marginLeft: 2}}>
                    <Text 
                        numberOfLines={1}
                        style={styles.textTitle}>
                            {name}</Text>
                    <Text 
                        numberOfLines={1}
                        style={styles.textSubheader}>
                            {address}</Text>
                </View>
                </View>
                <View 
                    style={styles.ratingContainer}>
                     <RatingStars
                        rating={rating}
                        width={90}
                        height={20}
                     />
                     <TouchableHighlight 
                        onPress={onYelpPress} 
                        underlayColor={'lightgrey'}
                        style={{marginLeft: 2}}>
                        <Image 
                            resizeMode='contain'
                            style={styles.yelpLogo}
                            source={require('../assets/yelp_logos/Logo/yelp_logo.png')}/>
                    </TouchableHighlight>
                </View>
                <Text style={styles.reviewCountText}>
                    (523 reviews)</Text>
            </View>
            
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        width: 164,
        height: 220,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.primary,
        position: 'relative',
        marginRight: 10,
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
    },
    textTitle: {
        fontFamily: 'Open Sans', 
        fontSize: 16
    },
    textSubheader: {
        fontFamily: 'Open Sans Light', 
        fontSize: 12,
        width: 140,
        marginLeft: 2
    },
    reviewCountText: {
        fontFamily: 'Open Sans Light', 
        color: 'grey',
        width: 130,
        lineHeight: 10, 
        marginLeft: 4,  
        fontSize: 10, 
        marginBottom: 10,
        marginTop: -10
    },
    ratingContainer: {
       
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1, 
        marginLeft: 2
    },
    yelpLogo:{
        height: 16,
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