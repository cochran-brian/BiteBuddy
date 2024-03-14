import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoPage from "./NoPage";

export default function Join() {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({})

  useEffect(() => {
    fetchData(id)
  }, [])

  const fetchData = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/restaurants/${id}`, { // apparently "localhost" makes the server host the phone instead of the computer
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`
        }
      }); 
      const result = await response.json();
      console.log(result.profile)
      setData(result.restaurants);
      setProfile(result.profile);
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

  return (
    <div>
      <h1>Join</h1>
      {data.map(r => {
        return <div>{r.name}</div>
      })}
    </div>
  )
};