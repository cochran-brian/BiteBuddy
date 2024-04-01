import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NoPage from "./NoPage";

export default function Survey() {
  

  const { data } = useParams();
  console.log('Data:', data)

  return (
    <div>
      <Carousel>
        <div>
          <h1>{data}</h1>
        </div>
        <div>
          <h1>Item</h1>
        </div>
        <div>
          <h1>Item</h1>
        </div>
      </Carousel>
    </div>
  )
};
