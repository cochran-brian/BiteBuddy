import { StyleSheet, Image } from 'react-native';
import colors from '../config/colors';

function RatingStars({rating, width, height}) {
    var imgPath = "";

    if(rating == 0){
        imgPath = require('../assets/yelpStars/zero.png')
    }else if(rating == 0.5){
        imgPath = require('../assets/yelpStars/half.png')
    }else if(rating == 1.5){
        imgPath = require('../assets/yelpStars/oneAndHalf.png')
    }else if(rating == 2){
        imgPath = require('../assets/yelpStars/two.png')
    }else if(rating == 2.5){
        imgPath = require('../assets/yelpStars/twoAndHalf.png')
    }else if(rating == 3){
        imgPath = require('../assets/yelpStars/three.png')
    }else if(rating == 3.5){
        imgPath = require('../assets/yelpStars/threeAndHalf.png')
    }else if(rating == 4){
        imgPath = require('../assets/yelpStars/four.png')
    }else if(rating == 4.5){
        imgPath = require('../assets/yelpStars/fourAndHalf.png')
    }else{
        imgPath = require('../assets/yelpStars/five.png')
    }

    return(
        <Image
        style={[styles.image, {width: width}, {height: height}]}
        source={imgPath}
        />
    )
}

const styles = StyleSheet.create({
    image:{
        resizeMode: 'contain',
        width: 50,
        height: 50
    }
})

export default RatingStars;