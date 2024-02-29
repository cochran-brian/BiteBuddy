import * as React from 'react';
import { Text, StyleSheet, View, Dimensions, } from 'react-native';
import colors from '../config/colors';

function LocationTextCard({name}){

    const split = name.indexOf(',');
    const placeName = name.substring(0, split);
    const address = name.substring(split + 1, name.length);

    return(
        <View style={styles.container}>
            <Text style={styles.headerText} numberOfLines={1}>{placeName}</Text>
            <Text style={styles.bodyText} numberOfLines={1}>{address}</Text>
        </View>
)}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('screen').width * 0.65,
        height: 46,
        borderRadius: 12,
        backgroundColor: colors.primary,
        marginLeft: 14,
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontFamily: 'Open Sans',
        fontSize: 14,
        marginLeft: 15,
        lineHeight: 16,
    },
    bodyText:{
        color: 'white',
        fontFamily: 'Open Sans Medium',
        fontSize: 14,
        marginHorizontal: 12,
        lineHeight: 16,
    }
});

export default LocationTextCard;