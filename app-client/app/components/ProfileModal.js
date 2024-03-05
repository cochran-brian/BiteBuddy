import * as React from 'react';
import { Text, StyleSheet, View, Image, Dimensions, Modal, TouchableWithoutFeedback, Keyboard, Pressable, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import MainTextInput from './MainTextInput';
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker'

function ProfileModal({pendingSetter, locSetter, modalSetter, modalVisible, location, pendingLocation}){

    const [pfp, setpfp] = useState(null);

    const launchImagePick = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            quality: 1
        })

        if(!result.canceled){
            setpfp(result.assets[0].uri);
        }
    }

    return(
        <Modal visible={modalVisible} transparent={true} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={styles.modal}>
           <Pressable onPress={() => modalSetter(false)} style={styles.exitModal}>
             <Entypo name="cross" size={32} color="black"/>
           </Pressable>

            <Image style={styles.pfp}
             source={{uri: pfp? pfp : 'https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg'}}
             />

            <TouchableHighlight
             style= {[styles.bottomButton, {height: 40, width: 120, backgroundColor: colors.primaryLight}]} 
             onPress={launchImagePick} 
             underlayColor={colors.primaryDark}>
             <Text 
               style={styles.buttonText}>
                 CHANGE</Text>
           </TouchableHighlight>

           <MainTextInput label={'Location'} stateSetter={pendingSetter} placeholder={location}/> 
           <TouchableHighlight 
             style= {styles.bottomButton} 
             onPress={() => {
               locSetter(pendingLocation);
               modalSetter(false);
             }} 
             underlayColor={colors.primaryDark}>
             <Text 
               style={styles.buttonText}>
                 SAVE</Text>
           </TouchableHighlight>
         </View>
         </TouchableWithoutFeedback>
        </Modal>

)}

const styles = StyleSheet.create({
    modal:{
        height: Dimensions.get('screen').height * 0.7,
        width: Dimensions.get('screen').width * 0.9,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('screen').height * 0.15,
      },
      pfp:{
        width: 100, 
        height: 100, 
        borderRadius: 50
    },
      exitModal:{
        alignSelf: 'flex-end',
        marginRight: 12,
        marginTop: 12,
      },
      bottomButton:{
        width: 140,
        height: 54,
        borderRadius: 50,
        marginBottom: 38,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonText: {
        color: 'white', 
        fontFamily: 'Open Sans', 
        fontSize: 18
      },
});

export default ProfileModal;