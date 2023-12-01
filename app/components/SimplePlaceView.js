import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';

function SimplePlaceView({ imageUri, name, address, rating }){
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
                        style={styles.textTitle}>
                            {name.toUpperCase()}</Text>
                    <Text 
                        style={styles.textSubheader}>
                            {address}</Text>
                </View>
                <View 
                    style={styles.ratingContainer}>
                    <Rating
                        disabled={true}
                        size={25}
                        rating={rating}
                        fillColor={'gold'}/>
                </View>
            </View>
        </View>
    )}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: 125,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        position: 'relative',
        marginTop: 0
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
        marginTop: 15, 
        marginLeft: 10, 
        flex: 1, 
        flexWrap: 'wrap'
    },
    textTitle: {
        fontFamily: 'Open Sans', 
        fontSize: 16
    },
    textSubheader: {
        fontFamily: 'Open Sans Light', 
        fontSize: 12
    },
    ratingContainer: {
        justifyContent: 'flex-end', 
        flex: 1, 
        marginBottom: 30
    }
});

export default SimplePlaceView;