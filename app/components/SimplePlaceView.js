import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

function SimplePlaceView({imageUri, margTop}){
    return(
    <View style={[styles.container, {marginTop: margTop}]}>
        <Image
            source={{uri: imageUri}}
            style={styles.image}>
        </Image>
        <View style={{flexDirection: 'column', height: 117, alignItems: 'left', marginTop: 15, marginLeft: 10}}>
            <Text style = {{fontFamily: 'Open Sans'}}>RESTURAUNT NAME</Text>
            <Text>ADDRESS</Text>
            <Text>DETIAL INFO</Text>
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