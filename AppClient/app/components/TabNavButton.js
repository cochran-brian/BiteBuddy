import { TouchableHighlight, StyleSheet, Text, View, Pressable  } from "react-native";
import colors from "../config/colors";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';



function TabNavButton ({onPress}) {
    const [isPressing, setIsPressing] = useState(false);
    return(
    <Pressable onPress={onPress} style={styles.button} onPressIn={() => setIsPressing(true)} onPressOut={() => setIsPressing(false)}>
      <Feather name="plus" size={40} color="white" /> 
     </Pressable>
    )
};

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        backgroundColor: colors.primary
        
    },
    
})

export default TabNavButton;