import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import colors from '../config/colors';


export default function HomeScreen() {
  return (
   <View style={styles.container}>
    <Text style={styles.header}>BITE BUDDY</Text>

    <View style= {styles.recBox}>
      <Text style={{fontFamily: 'Open Sans', fontSize: 20}}>FOOD NEAR YOU</Text>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      <View style={{height: 3, width: 100, backgroundColor: colors.primary}}/>
      <Text style={{marginLeft: 10, marginRight: 10}}>MORE</Text>
      <View style={{height: 3, width: 100, backgroundColor: colors.primary}}/>
    </View>

    <View>
     <TouchableHighlight style={[styles.biteButtons, {marginTop: 60}]} underlayColor={colors.primaryDark}>
      <Text style={styles.buttonText}>CREATE A BITE</Text>
     </TouchableHighlight>
     <TouchableHighlight style={styles.biteButtons} underlayColor={colors.primaryDark}>
      <Text style={styles.buttonText}>JOIN A BITE</Text>
     </TouchableHighlight>
    </View>


   </View>
  );
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
    fontSize: 50,
    marginTop: 80,
    alignSelf: 'center'
  },
  recBox:{
    width: Dimensions.get('screen').width - 80,
    height: '35%',
    marginTop: 43,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'grey'
  },
  biteButtons:{
    width: Dimensions.get('screen').width - 36,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 40,
    height: 86,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText:{
    color: 'white',
    fontSize: 20,
    fontFamily: 'Open Sans',
  },
});