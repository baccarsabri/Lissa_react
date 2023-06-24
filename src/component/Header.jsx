import React, { useState, useEffect } from "react";
import logo from "../logo_img-2.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({isLoggedIn,onSignOut}) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    onSignOut();
    navigate('/');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/New_York",
      };
      setCurrentTime(now.toLocaleString("en-US", options));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (

    <header className="header_section bg-info">
      <div className="container" >
        <div className="top_contact-container">
          <div className="tel_container">
            <NavLink to={'/'}>
              <img src="images/telephone-symbol-button.png" alt=""/> Call : +216 71 485 254
            </NavLink>
          </div>
          <div className="social-container">
            <NavLink to={'/'} >
              <img src="images/fb.png" alt="" className="s-1"/>
            </NavLink>
            <NavLink to={'/'} >
              <img src="images/twitter.png" alt="" className="s-2"/>
            </NavLink>
            <NavLink to={'/'}>
              <img src="images/instagram.png" alt="" className="s-3"/>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <a className="navbar-brand" href="/">
            <img src={logo} width="500px" alt=""/>
            <span>
              PILL/PAL
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex  flex-column flex-lg-row align-items-center w-100 justify-content-between">
              <ul className="navbar-nav  ">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about-us"> AboutUs </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" >   {currentTime} </NavLink>
                </li>
                
              </ul>
       

              <div className="dropdown">
  <button className="btn btn-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <img src="images/user.png" alt=""/>

  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ transform: 'translate(-50%, 0%)' }}>
    {!isLoggedIn ? (<>
      <NavLink className="dropdown-item" to="/sign-in">Login</NavLink>
    <NavLink className="dropdown-item" to="/sign-up">Sign-up</NavLink> 
    </>    ):(   <> <NavLink className="dropdown-item" to="/profil">Profile</NavLink>
    <NavLink className="dropdown-item" to={'/'} onClick={handleSignOut}>Log-out</NavLink></>) }



  </div>
</div>
             
            </div>
          </div>

        </nav>
      </div>
    </header>
   
  );
}

export default Header;
