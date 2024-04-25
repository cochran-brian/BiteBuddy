import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Survey.module.css";

export default function Join() {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
      console.log(result);
      console.log(result.restaurants);
      console.log(result.profile)
      setData(result.restaurants);
      setProfile(result.profile);
    } catch (error) {
      console.error('Error fetching data:', error); // error handling here
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', width: '100%'}}>
      <img style={{maxHeight: 200, maxWidth: 200, borderRadius: '50%'}} src={profile.profile_image ? profile.profile_image : "https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg"}></img>
      <p style={{fontSize: 32}}>{profile.firstName}'s Bite</p>
      <input type="text" placeholder="Name" id="fName" style={{height: 30, borderRadius: 20, borderColor: "#111e30", marginBottom: 30, paddingLeft: 10, outline: 'none'}}></input>
      <button style={{width: 100, height: 40, borderRadius: 50, backgroundColor: "#111e30", alignItems: 'center', justifyContent: 'center', color: "#FFFFFF", border: "none"}} onClick={() => {
        const input = document.getElementById('fName').value
        navigate(`/survey/${id}`, {state:{
        data: data,
        name: input
      }})}}>Join</button>
    </div>
  )
};