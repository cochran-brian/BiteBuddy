import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import colors from '../config/colors';

function RatingStars({rating}) {
    var imgPath = "";

    if(rating == 0){
        imgPath = '../assets/yelpStars/zero'
    }else if(rating == 0.5){
        imgPath = '../assets/yelpStars/half'
    }else if(rating == 1.5){
        imgPath = '../assets/yelpStars/oneAndHalf'
    }else if(rating == 2){
        imgPath = '../assets/yelpStars/two'
    }else if(rating == 2.5){
        imgPath = '../assets/yelpStars/twoAndHalf'
    }else if(rating == 3){
        imgPath = '../assets/yelpStars/three'
    }else if(rating == 3.5){
        imgPath = '../assets/yelpStars/threeAndHalf'
    }else if(rating == 4){
        imgPath = '../assets/yelpStars/four'
    }else if(rating == 4.5){
        imgPath = '../assets/yelpStars/fourAndHalf'
    }else if(rating == 5){
        imgPath = '../assets/yelpStars/five'
    }

    return(
        <Image
          
        />
    )
}

export default RatingStars;