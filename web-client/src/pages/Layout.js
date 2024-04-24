import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {

  const navigate = useNavigate();
  return (
    <>
      <nav style={{display: 'flex', justifyContent: 'center', marginTop: 30, marginBottom: 50}}>
        <button style={{border: 'none', background: 'none'}} onClick={() => navigate('/')}>
          <div style={{fontFamily: 'Open Sans', fontSize: 48, color:'#111E30'}}>BITE BUDDY</div>
        </button>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;