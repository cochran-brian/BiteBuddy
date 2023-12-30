import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';



function TabNavButton ({onPress}) {
    const [isPressing, setIsPressing] = useState(false);
    return(
    <TouchableHighlight onPress={onPress} style={styles.button} underlayColor={colors.primaryDark} onPressIn={() => setIsPressing(true)} onPressOut={() => setIsPressing(false)}>
      <Feather name="plus" size={40} color="white" /> 
     </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 37,
        margin: 10,
        backgroundColor: colors.primary
        
    },
    
})

export default TabNavButton;