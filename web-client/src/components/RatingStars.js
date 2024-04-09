import React, { Component } from 'react';

export class RatingStars extends Component {
    render(rating){
    var imgPath = "";

    if(rating == 0){
        imgPath = require('../assets/yelpStars/zero.png')
    }else if(rating <= 0.75){
        imgPath = require('../assets/yelpStars/half.png')
    }else if(rating <= 1.75){
        imgPath = require('../assets/yelpStars/oneAndHalf.png')
    }else if(rating <= 2.25){
        imgPath = require('../assets/yelpStars/two.png')
    }else if(rating <= 2.75){
        imgPath = require('../assets/yelpStars/twoAndHalf.png')
    }else if(rating <= 3.25){
        imgPath = require('../assets/yelpStars/three.png')
    }else if(rating <= 3.75){
        imgPath = require('../assets/yelpStars/threeAndHalf.png')
    }else if(rating <= 4.25){
        imgPath = require('../assets/yelpStars/four.png')
    }else if(rating <= 4.75){
        imgPath = require('../assets/yelpStars/fourAndHalf.png')
    }else{
        imgPath = require('../assets/yelpStars/five.png')
    }
    
    return(
        <img
        //style={[styles.image, {width: width}, {height: height}]}
        src={imgPath}
        alt="RatingStars"
        style={{width: 200}}
        />
    )
    }
}

export default RatingStars;