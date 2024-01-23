import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import colors from '../config/colors';


export default function NearbyScreen({ navigation }) {
    
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.header}>
        BITE BUDDY</Text>
     </SafeAreaView>

     <View style={styles.subHeadContainer}>
        <Text style={styles.subHeader}>Food nearby</Text>
        <Text style={[styles.lightText, {color: "#000080"}]}>Filter</Text>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: 5,
    alignSelf: 'center'
  },
  subHeadContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: Dimensions.get('screen').width * 0.1
  },
  subHeader: {
    fontFamily: 'Open Sans',
    fontSize: 28,
  },
  lightText:{
    color: colors.primary,
    fontFamily: 'Open Sans SemiBold',
    fontSize: 20
  },  
  
});