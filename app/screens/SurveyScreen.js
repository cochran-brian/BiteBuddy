import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View, Pressable } from 'react-native';
import colors from '../config/colors';
import { db } from '../firebase/config';
import { collection, addDoc } from "firebase/firestore"
import SurveyCard from '../components/SurveyCard';
import Carousel from 'react-native-snap-carousel';

export default function SurveySceen({navigation}) {

  data = [
  {name: 'SUPER SOAKER DYL', address: 'Baller', rating: 5, url: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-a70804d0c37f4f34a4b7721005f0dd70_6504c016c1894.jpg?1694810134'}, 
  {name: 'Big Ben', address: 'Baller', rating: 3.4, url: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-95e36dc30f43e2e1e133573eb4fbbd7b_6504c03ebd0bd.jpg?1694810174'},
  {name: 'Bri Coc', address: 'Baller', rating: 4.2, url:'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-143dba946e5a104a83e3af1fcea12697_6504c00154c6d.jpg?1694810113'}]



  renderItem = ({item, index}) => {
    return (
        <SurveyCard
            name = {item.name}
            imageUri={item.url}
            address={item.address}
            rating={item.rating}
        />
    );
}

    return(
        <View style={styles.container}>
            <Text style={styles.header}>BITE BUDDY</Text>

            <View style={{height: '55%', marginTop: 20}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={this.renderItem}
              sliderWidth={400}
              itemWidth={320}
              containerCustomStyle={{flexGrow: 0}}
              scrollEnabled={false}
            />
            </View>

            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableHighlight style={styles.button}
              onPress={() => this._carousel.snapToNext()}>
                <Text>Skip</Text>
              </TouchableHighlight>
            
              <TouchableHighlight style={styles.button}
              onPress={() => this._carousel.snapToPrev()}>
                <Text>Last</Text>
              </TouchableHighlight>

            </View>
            
        </View>
      )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center'
    },
    header:{
        color: 'black',
        fontFamily: 'Open Sans',
        fontSize: 45,
        marginTop: 80,
        alignSelf: 'center'
    },
    button:{
      width: 50, 
      height: 50, 
      borderRadius: 25, 
      backgroundColor: colors.primary, 
      justifyContent: 'center', 
      alignItems: 'center'
    }
});
