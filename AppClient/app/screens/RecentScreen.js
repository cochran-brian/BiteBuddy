import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, useState } from 'react-native';
import colors from '../config/colors';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import SurveyCard from '../components/SurveyCard';


export default function RecentScreen({ navigation }) {

    const[carouselIndex, setCarouselIndex] = useState(0);

    renderItem = ({item, index}) => {
        return (
            <SurveyCard
                name = {'Chappski'}
                imageUri={'https://lh3.googleusercontent.com/p/AF1QipP4XlKpdvnDQkFQGzxvw02lSqoFaWH64OZbnsV5=s1360-w1360-h1020'}
                address={'123 Test St, Palatine'}
                rating={4.3}
            />
        );
    }

  return (
    <View style={styles.container}>
        <SafeAreaView>
            <Text style={styles.header}>
                 BITE BUDDY</Text>
        </SafeAreaView>
     <View style={styles.subContainer}>
     <Text style={styles.subHeader}>Wed, January 24</Text>

     <Carousel
              ref={(c) => { this._carousel = c; }}
              data={[1, 2, 3, 4, 5]}
              renderItem={this.renderItem}
              sliderWidth={400}
              itemWidth={320}
              containerCustomStyle={{flexGrow: 0}}
              onSnapToItem={(index) => setCarouselIndex(index)}
      />
      <Pagination
        containerStyle={{paddingVertical: 10}}
        activeDotIndex={carouselIndex}
        dotsLength={5}
      />

     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height - 280
  },
  header: {
    color: 'black',
    fontFamily: 'Open Sans',
    fontSize: 50,
    marginTop: 5,
    alignSelf: 'center'
  },
  subHeader: {
    fontFamily: 'Open Sans',
    fontSize: 20,
    marginBottom: 12
  }
  
});