import { useEffect } from "react";

function Home() {

  useEffect(() => {
    console.log("join screen")
  }, [])

    return (
      <div>
        <div style={{justifyContent: 'center'}}>
          <h2 style={{textAlign: 'center'}}>Coming Soon...</h2>
        </div>
      </div>
    )
    
  };
  
  export default Home;