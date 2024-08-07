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
  const [ratings, setRatings] = useState([]);
  const { id } = useParams();
  
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const name = location.state.name;

  const onYelpPress = (place) => {
      //window.location.replace(place.url);
      window.open(place.url, '_blank', 'noopener, noreferrer');

  }

  const rating = async (rating) => {
    // localRatings[this._carousel.currentIndex] = rating
    setRatings([...ratings, rating]);
    console.log(ratings, curSlide, data.length - 1)
    if(curSlide >= data.length - 1) { // LAST CARD
  
     
      await storeRatings(ratings, id); // RIGHT NOW ONLY AUTHENTICATED USERS WILL HAVE NAME
      // NEED TO CHANGE THIS WHEN WE MAKE THE WEBSITE
  
      navigate(`/result`);
    }
  }

  const storeRatings = async (ratings, doc) => {
    try {
      const response = await fetch(`http://localhost:4000/survey`, { // apparently "localhost" makes the server host the phone instead of the computer
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ratings: ratings,
          doc: doc,
          guestName: name
        })
      }); 
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error storing data:', error); // error handling here
    }
  }

  

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
        <span className={styles.ratingsStyle}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <RatingStars rating={place.rating}/>
            <button onClick={ () => onYelpPress(place)} 
              className={styles.yelpButton}>
              <img src={require('../assets/yelp_logo.png')} className={styles.yelpLogo} alt="Yelp Logo" />
            </button>
          </div>
            <div className={styles.baseText}>Based on {place.review_count} reviews</div>
          
        </span>
      </div>

    )
  });
 

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Carousel width={374} selectedItem={curSlide} swipeable={false} showArrows={false} showIndicators={false} showStatus={false} showThumbs={false}>
        {comps}
      </Carousel>
      <span style={{display: 'flex', width: "100%", justifyContent: 'center'}}>
        <button className={styles.emojiButton} onClick={() => {
          rating(0);
          if(curSlide <= 8){
            setCurSlide(curSlide + 1);
          }
          }}>😢</button>

        <button className={styles.emojiButton} onClick={() => {
          rating(2);
          if(curSlide <= 8){
            setCurSlide(curSlide + 1);
          }
          }}>😐</button>

        <button className={styles.emojiButton} onClick={() => {
          rating(5);
          if(curSlide <= 8){
            setCurSlide(curSlide + 1);
          }
          }}>😁</button>
      </span>
    </div>
  )

  
};


