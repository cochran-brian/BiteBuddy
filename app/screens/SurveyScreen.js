import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore"
import SurveyCard from '../components/SurveyCard';

export default function SurveySceen({navigation}) {

    return(
        <View style={styles.container}>
            <Text style={styles.header}>BITE BUDDY</Text>
            <SurveyCard
                name = {'Big Ben'}
                address={'1092 Baller st'}
                rating={4.2}
                imageUri={'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-95e36dc30f43e2e1e133573eb4fbbd7b_6504c03ebd0bd.jpg?1694810174'}
             />
            
        </View>
      )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    header:{
        color: 'black',
        fontFamily: 'Open Sans',
        fontSize: 45,
        marginTop: 80,
        alignSelf: 'center'
      },
});
