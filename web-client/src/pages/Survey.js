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

  const location = useLocation();
  const data = location.state.data;
  console.log('Data:', data);

  // const onYelpPress = (place) => {
  //     window.location.replace(place.url);
  // }

  var comps = [];
  data.forEach(place => {
    comps.push(
      <div>
        <div className={styles.container}>
          <img src={place.image_url} className={styles.image} alt="Image" />
          <div className={styles.textContainer}>
            <p className={styles.textTitle}>{place.name}</p>
            <p className={styles.textSubheader}>{'$ • ' + place.categories[0].title}</p>
            <p className={styles.textSubheader}>{place.location.address1 + ' ' + place.location.city + ', ' + place.location.state}</p>
          </div>
          <div className={styles.ratingsStyle}>
            <div>
              <RatingStars rating={place.rating}/>
              <p className={styles.baseText}>Based on 235 reviews</p>
            </div>
            <button //onClick={onYelpPress(place)} 
              className={styles.yelpButton}>
              <img src={require('../assets/yelp_logo.png')} className={styles.yelpLogo} alt="Yelp Logo" />
            </button>
          </div>
        </div>
      </div>

    )
  });
 

  return (
    <div className={styles.screenContainer}>
      <Carousel width={600} selectedItem={curSlide} swipeable={false} showArrows={false} showIndicators={false} showStatus={false} showThumbs={false}>
        {comps}
      </Carousel>
      <span>
        <button onClick={() => {
          if(curSlide >= 1){
            setCurSlide(curSlide - 1);
          }
          }}>Back</button>

        <button onClick={() => {
          if(curSlide <= 8){
            setCurSlide(curSlide + 1);
          }
          }}>Next</button>
      </span>
    </div>
  )

  
};


