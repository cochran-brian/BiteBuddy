import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import colors from '../config/colors';
import SimplePlaceView from '../components/SimplePlaceView';


export default function NearbyScreen({ navigation }) {

  const onFilterPress = () => {
    console.log('Filter Pressed')
  }
    
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.header}>
        BITE BUDDY</Text>
     </SafeAreaView>

     <View style={styles.subHeadContainer}>
        <Text style={styles.subHeader}>Food nearby</Text>
        <Text style={[styles.lightText, {color: "#000080"}]} onPress={onFilterPress}>Filter</Text>
     </View>

     <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      renderItem={(name, rating, address, uri) => <SimplePlaceView name={'Chappies'} rating={Math.round(Math.random() * 7 + 3) * 0.5} address={'123 Testing St, Palatine'} imageUri={'https://s3-media0.fl.yelpcdn.com/bphoto/rfEpgx_TydswsZCxN4KcBA/348s.jpg'}/>}
      ItemSeparatorComponent={<View style={{height: 32}}/>}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      contentContainerStyle={{paddingBottom: 28}}
     />

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
  flatList:{
    marginHorizontal: 38,
    marginTop: 14,
  }
  
});