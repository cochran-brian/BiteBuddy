import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';

function SurveyCard({imageUri, name, address, details, rating}){
    return(
    <View style={[styles.container, {marginTop: 30}]}>
        <Image
            source={{uri: imageUri}}
            style={styles.image}>
        </Image>
           <View style={{marginLeft: 20, marginTop: 15}}>
            <Text style = {{fontFamily: 'Open Sans', fontSize: 32}}>{name.toUpperCase()}</Text>
            <Text style = {{fontFamily: 'Open Sans Light', fontSize: 24}}>{address}</Text>
            {/* <Text style = {{fontFamily: 'Open Sans Light', marginBottom: 2}}>{details}</Text> */}
           
            <Rating
                disabled={true}
                size={40}
                rating={rating}
                fillColor={'gold'}
                style={{marginTop: 7}}
            />
        
        </View>
    </View>

)}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        height: '55%',
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'grey',
        position: 'relative'
    },
    image:{
        width: '100%',
        height: '65%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },

});

export default SurveyCard;