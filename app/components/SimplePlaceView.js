import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

function SimplePlaceView({imageUri, name, address, details, rating, margTop}){
    return(
    <View style={[styles.container, {marginTop: margTop}]}>
        <Image
            source={{uri: imageUri}}
            style={styles.image}>
        </Image>
        <View style={{flexDirection: 'column', height: 117, alignItems: 'left', marginTop: 15, marginLeft: 10}}>
           <View style={{marginLeft: 5}}>
            <Text style = {{fontFamily: 'Open Sans', fontSize: 16}}>{name}</Text>
            <Text style = {{fontFamily: 'Open Sans Light'}}>{address}</Text>
            <Text style = {{fontFamily: 'Open Sans Light', marginBottom: 2}}>{details}</Text>
           </View>
            <AirbnbRating
                isDisabled={true}
                size={22}
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