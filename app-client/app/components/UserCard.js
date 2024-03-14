import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';
import RatingStars from './RatingStars';

function UserCard({ imageUri, name, status, backgroundColor}){
    return(
    <View style={[styles.container, styles.shadowProps, {backgroundColor: backgroundColor}]}>
        <Image style={styles.image}
         source={{uri: imageUri}}/>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.iconContainer}>
            {status? <Ionicons name="checkmark-circle" size={40} color="green"/> : <></>}
        </View>
    </View>
)}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        height: 90,
        marginBottom: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
    },
    shadowProps:{
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 1,
        shadowColor: 'grey'
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginLeft: 18
    },
    nameText:{
        fontFamily: 'Open Sans SemiBold',
        fontSize: 24,
        marginLeft: 14,
    },
    iconContainer:{
        flex: 1, 
        alignItems: 'flex-end', 
        paddingRight: 18,
    }
});

export default UserCard;