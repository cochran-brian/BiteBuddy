import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';



export default function CreateScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.header}>CREATE A BITE</Text>


            <View style={{flex: 1, justifyContent: 'flex-end'}}>
             <TouchableHighlight style= {styles.bottomButton} underlayColor={colors.primaryDark}>
              <Text style={{color: 'white', fontFamily: 'Open Sans', fontSize: 20}}>CREATE BITE</Text>
             </TouchableHighlight>
            </View>

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
    bottomButton:{
        width: 344,
        height: 54,
        borderRadius: 10,
        marginBottom: 14,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
      },
});
