import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NoPage from "./NoPage";
import RatingStars from "../components/RatingStars";
import styles from "../styles/Survey.module.css";

export default function Survey() {
  
  const [curSlide, setCurSlide] = useState(0);
  const [uid, setUid] = useState(null)
  var ratings = [];

  const location = useLocation();
  const data = location.state.data;
  console.log('Data:', data);

  const onYelpPress = (place) => {
      //window.location.replace(place.url);
      window.open(place.url, '_blank', 'noopener, noreferrer');

  }

  // const rating = async (rating) => {
  //   // localRatings[this._carousel.currentIndex] = rating
  //   ratings.push(rating);
  //   if(curSlide >= data.length - 1) { // LAST CARD
  
  //     const idToken = await AsyncStorage.getItem('idToken');
  //     console.log(uid)
  //     await storeRatings(ratings, uid, idToken); // RIGHT NOW ONLY AUTHENTICATED USERS WILL HAVE NAME
  //     // NEED TO CHANGE THIS WHEN WE MAKE THE WEBSITE
  
  //     navigation.navigate('Waiting', {
  //       uid: uid,
  //       latitude: latitude,
  //       longitude: longitude,
  //       radius: radius
  //     })
  //   }
  // }

  var comps = [];
  data.forEach(place => {
    comps.push(
      <div className={styles.container}>
        <div style={{height: 280}}>
          <img src={place.image_url} className={styles.image} alt="Image" />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.textTitle}>{place.name}</div>
          <div className={styles.textSubheader}>{'$ • ' + place.categories[0].title}</div>
          <div className={styles.textSubheader}>{place.location.address1 + ' ' + place.location.city + ', ' + place.location.state}</div>
        </div>
        <div className={styles.ratingsStyle}>
          <div style={{flexDirection: 'row'}}>
            <RatingStars rating={place.rating}/>
            <button onClick={ () => onYelpPress(place)} 
              className={styles.yelpButton}>
              <img src={require('../assets/yelp_logo.png')} className={styles.yelpLogo} alt="Yelp Logo" />
            </button>
          </div>
            <div className={styles.baseText}>Based on 235 reviews</div>
          
        </div>
      </div>

    )
  });
 

  return (
    <div className={styles.screenContainer}>
      <div style={{alignSelf: 'flex-start', fontFamily: 'Open Sans', fontSize: 48, marginLeft: 12}}>BITE BUDDY</div>
      <Carousel width={600} selectedItem={curSlide} swipeable={false} showArrows={false} showIndicators={false} showStatus={false} showThumbs={false}>
        {comps}
      </Carousel>
      <span>
        <button className={styles.emojiButton} onClick={() => {
          if(curSlide <= 8){
            //rating(0);
            setCurSlide(curSlide + 1);
          }
          }}>😢</button>

        <button className={styles.emojiButton} onClick={() => {
          if(curSlide <= 8){
            //rating(2);
            setCurSlide(curSlide + 1);
          }
          }}>😐</button>

        <button className={styles.emojiButton} onClick={() => {
          if(curSlide <= 8){
            //rating(5);
            setCurSlide(curSlide + 1);
          }
          }}>😁</button>
      </span>
    </div>
  )

  
};


