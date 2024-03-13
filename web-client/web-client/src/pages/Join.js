import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Join() {

  const { id } = useParams();
  console.log(id)

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
      console.log("result", result)
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

  return <h1>Join</h1>;
};
  
  export default Join;