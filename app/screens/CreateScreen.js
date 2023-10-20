import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import Slider from '@react-native-community/slider';



export default function CreateScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.header}>CREATE A BITE</Text>


            <View style={{marginTop: 80}}>
              <Text style={styles.promptText}>HOW FAR ARE YOU WILLING TO TRAVEL?</Text>
              <Slider
                step={0.1}/>
            </View>

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
      promptText:{
        fontFamily: 'Open Sans',
        fontSize: 20,
        width: 375,
        textAlign: 'center'
      }
});
