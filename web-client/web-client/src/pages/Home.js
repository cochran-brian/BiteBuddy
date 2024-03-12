import { useEffect } from "react";

function Home() {

  useEffect(() => {
    console.log("join screen")
  }, [])

    return <h1>Home</h1>;
  };
  
  export default Home;