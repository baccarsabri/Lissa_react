import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header.jsx";
import Nav from "./component/Nav.jsx";
import SignUp from "./component/SignUp.jsx";
import SignIn from "./component/SignIn.jsx";
import GetProfile from "./component/GetProfile.jsx";
import SignOut from "./component/SignOut.jsx";
import Home from "./component/Home.jsx";
import MedicationTable from "./component/MedicationTable.jsx";
import { fetchProfileData } from "./services/apiConfig.js";
import AboutUs from "./component/AboutUs.jsx";
import Profile from "./component/Profile_new.jsx";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [profileData, setProfileData] = useState(null); // Add state for profile data

  useEffect(() => {
    // Fetch profile data and set it to the state
    console.log('login :: ',isLoggedIn);
    if (isLoggedIn) {
      fetchProfileData(localStorage.getItem("token"))
        .then((data) => {
          setProfileData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
        <Header isLoggedIn={isLoggedIn} onSignOut={() => setIsLoggedIn(false)}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
      {isLoggedIn ? (<>  <Route path="/profil" element={<Profile profileData={profileData} />} />
        <Route path="*" element={<Profile profileData={profileData} />} /></>

      ) : <><Route path="/sign-in" element={<SignIn onSignIn={() => setIsLoggedIn(true)} />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Home />} /></>  }
      
      
      

    
  
      </Routes>
    </div>
  );
}

export default App;