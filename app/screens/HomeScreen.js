import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import SimplePlaceView from '../components/SimplePlaceView';


export default function HomeScreen() {
  return (
   <View style={styles.container}>
    <Text style={styles.header}>BITE BUDDY</Text>

    <View style= {styles.recBox}>
      <Text style={{fontFamily: 'Open Sans', fontSize: 20}}>FOOD NEAR YOU</Text>
      <SimplePlaceView margTop={11} imageUri={'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-95e36dc30f43e2e1e133573eb4fbbd7b_6504c03ebd0bd.jpg?1694810174'}/>
      <SimplePlaceView margTop={11} imageUri={'https://asset-cdn.schoology.com/system/files/imagecache/profile_tiny/pictures/picture-95e36dc30f43e2e1e133573eb4fbbd7b_6504c03ebd0bd.jpg?1694810174'}/>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      <View style={{height: 3, width: 100, backgroundColor: 'black'}}/>
       <Pressable style={{width: 97, height: 32, backgroundColor: colors.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginLeft: 10, marginRight: 10, color: 'white', fontFamily: 'Open Sans'}}>MORE →</Text>
       </Pressable>
      <View style={{height: 3, width: 100, backgroundColor: 'black'}}/>
    </View>

    <View>
     <TouchableHighlight style={[styles.biteButtons, {marginTop: 55}]} underlayColor={colors.primaryDark}>
      <Text style={styles.buttonText}>CREATE A BITE</Text>
     </TouchableHighlight>

     <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 32, alignSelf: 'center'}}>
      <View style={{height: 3, width: 90, backgroundColor: 'black'}}/>
        <Text style={{marginLeft: 10, marginRight: 10, color: 'green', fontFamily: 'Open Sans', fontSize: 18}}>OR</Text>
      <View style={{height: 3, width: 90, backgroundColor: 'black'}}/>
    </View>

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
  },
  biteButtons:{
    width: Dimensions.get('screen').width - 36,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 32,
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