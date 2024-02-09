import * as React from 'react';
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { TextInput } from 'react-native-paper'
import colors from '../config/colors';

function MainTextInput({ width, label, stateSetter, keyboardType, password }){
    return(
        <TextInput 
        mode='outlined'
        contentStyle={{fontFamily: 'Open Sans'}}
        outlineStyle={{borderRadius: 15, borderWidth: 1}}
        activeOutlineColor={colors.primary}
        onChangeText={(text) => stateSetter(text)} 
        label={<Text style={{ fontFamily: 'Open Sans SemiBold', color: colors.primary, backgroundColor: 'white'}}>{label}</Text>}
        outlineColor='grey'
        secureTextEntry={password}
        autoCapitalize='none' 
        keyboardType={keyboardType}
        style={styles.box} />

)}

const styles = StyleSheet.create({
    box:{
        width: Dimensions.get('screen').width * 0.7,
        marginTop: 16,
    }
});

export default MainTextInput;