import { useEffect } from "react";

function Join({ id }) {

  useEffect(() => {
    fetchData(id)
  }, [])

  const fetchData = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`http://localhost:3000/restaurants${id}`, { // apparently "localhost" makes the server host the phone instead of the computer
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