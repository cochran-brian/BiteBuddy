import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';
import RatingStars from './RatingStars';

function UserCard({ imageUri, name, status}){

    return(
    <View style={styles.container}>
        <Image style={{width: 100, height: 100}}
         source={{uri: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-143dba946e5a104a83e3af1fcea12697_6504c00154c6d.jpg?1694810113'}}/>
        <Text>Brian</Text>
    </View>
)}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        height: 90,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center'
    },
});

export default UserCard;