import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import colors from '../config/colors';

function SimplePlaceView({imageUri, name, address, details, rating, margTop}){
    return(
    <View style={[styles.container, {marginTop: margTop}]}>
        <Image
            source={{uri: imageUri}}
            style={styles.image}>
        </Image>
        <View style={{flexDirection: 'column', height: 117, alignItems: 'left', marginTop: 15, marginLeft: 10, flex: 1, flexWrap: 'wrap'}}>
           <View style={{marginLeft: 5}}>
            <Text style = {{fontFamily: 'Open Sans', fontSize: 16}}>{name.toUpperCase()}</Text>
            <Text style = {{fontFamily: 'Open Sans Light', fontSize: 12}}>{address}</Text>
            {/* <Text style = {{fontFamily: 'Open Sans Light', marginBottom: 2}}>{details}</Text> */}
           </View>
           <View style={{justifyContent: 'flex-end', flex: 1, marginBottom: 30}}>
            <Rating
                disabled={true}
                size={25}
                rating={rating}
                fillColor={'gold'}
            />
            </View>
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
        position: 'relative'
    },
    image:{
        width: 117,
        height: 117,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },

});

export default SimplePlaceView;