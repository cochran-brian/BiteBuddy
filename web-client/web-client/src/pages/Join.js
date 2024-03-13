import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoPage from "./NoPage";

export default function Join() {

  const { id } = useParams();
  const [data, setData] = useState([]);

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
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

  return (
    <>
    {data.length > 0 ? 
      <div>
        <h1>Join</h1>
        {data}
      </div>
    : <NoPage /> }
    </>
  )
};