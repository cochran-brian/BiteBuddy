import * as React from 'react';
import { Text, StyleSheet, View, Dimensions, } from 'react-native';
import colors from '../config/colors';

function LocationTextCard({name, }){
    return(
        <View style={styles.container}>
            <Text style={styles.bodyText} numberOfLines={2}>{name}</Text>
        </View>
)}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('screen').width * 0.65,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'lightgrey',
        marginLeft: 12,
        justifyContent: 'center'
    },
    bodyText:{
        fontFamily: 'Open Sans SemiBold',
        fontSize: 14,
        marginHorizontal: 8,
        lineHeight: 18,
    }
});

export default LocationTextCard;