import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

function SimplePlaceView({imageUri, rating, margTop}){
    return(
    <View style={[styles.container, {marginTop: margTop}]}>
        <Image
            source={{uri: imageUri}}
            style={styles.image}>
        </Image>
        <View style={{flexDirection: 'column', height: 117, alignItems: 'left', marginTop: 15, marginLeft: 10}}>
            <Text style = {{fontFamily: 'Open Sans'}}>RESTURAUNT NAME</Text>
            <Text>ADDRESS</Text>
            <Text style={{marginBottom: 5}}>DETIAL INFO</Text>
            <AirbnbRating
                isDisabled={true}
                size={25}
                showRating={false}
                defaultRating={rating}
            />
        </View>
    </View>

)}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: 117,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
    },
    image:{
        width: 117,
        height: 117,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },

});

export default SimplePlaceView;