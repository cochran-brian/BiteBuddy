import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { Feather } from '@expo/vector-icons';
import colors from '../config/colors';
import RatingStars from './RatingStars';

function SimplePlaceView({ imageUri, name, address, rating}){

    const onSharePressed = () => {
        console.log('Share Pressed')
    }
    return(
        <View style={styles.container}>
          
            <Image
                source={{uri: imageUri}}
                style={styles.image}>
            </Image>
            <View 
                style={styles.textContainer}>
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
                <View 
                    style={styles.ratingContainer}>
                     <RatingStars
                        rating={rating}
                        width={120}
                        height={30}
                     />
                </View>
            </View>
            <TouchableHighlight 
            underlayColor={'grey'}
            onPress={onSharePressed}
            style={styles.button}>
                <Feather name="share" size={22} color="black" style={{marginLeft: 1}} />
            </TouchableHighlight>
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: 110,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
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
        height: 125, 
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
        flex: 1, 
        marginBottom: 42,
        marginLeft: 6
    },
    button:{
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
        alignSelf: 'center',
        marginRight: 12
    }
});

export default SimplePlaceView;