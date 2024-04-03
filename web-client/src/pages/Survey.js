import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NoPage from "./NoPage";

export default function Survey() {
  
  const [curSlide, setCurSlide] = useState(0);

  const location = useLocation();
  const data = location.state.data;
  console.log('Data:', data);

  var comps = [];
  data.forEach(place => {
    comps.push(
      <div>
        <h3>{place.name}</h3>
      </div>
    )
  });
 

  return (
    <div>
      <Carousel width={600} selectedItem={curSlide} swipeable={false} showArrows={false} showIndicators={false} showStatus={false}>
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
