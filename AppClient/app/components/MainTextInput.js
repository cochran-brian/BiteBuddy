import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Rating } from '@kolking/react-native-rating';
import { TextInput } from 'react-native-paper'
import colors from '../config/colors';

function MainTextInput({ label, stateSetter, keyboardType, password }){
    return(
        <TextInput 
        mode='outlined'
        contentStyle={{width: 270, fontFamily: 'Open Sans'}}
        outlineStyle={{width: 270, borderRadius: 10, borderWidth: 2}}
        onChangeText={(text) => stateSetter(text)} 
        label={label}
        activeOutlineColor={colors.primary}
        outlineColor='black'
        secureTextEntry={password}
        autoCapitalize='none' 
        keyboardType={keyboardType} />

)}

const styles = StyleSheet.create({
    
});

export default MainTextInput;