import { useEffect } from "react";

function Home() {

  useEffect(() => {
    console.log("join screen")
  }, [])

    return (
      <div>
        <h1>Home</h1>
        <div style={{justifyContent: 'center'}}>
          <h2 style={{textAlign: 'center'}}>Download Bite Buddy Today😮‍💨</h2>
        </div>
      </div>
    )
    
  };
  
  export default Home;