import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/apiConfig.js";
import Swal from "sweetalert2";

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const signInData = {
      email: email,
      password: password,
    };

    console.log("Sending sign-in request...");

    try {
      const { token, user_id } = await signIn(signInData);
      localStorage.setItem("token", token);
      onSignIn({ id: user_id, username: signInData.email }); // Pass the user data to the callback
      navigate("/profil");
    } catch (error) {
      Swal.fire(`${error}`, '', 'error');
    }
  };


  return (
    <div>
      





      <div className="sub_page">

      <section className="contact_section layout_padding">
    <div className="container">
      <div className="row">
        <div className="custom_heading-container ">
          <h2>
            Sign-In to your account
          </h2>
        </div>
      </div>
    </div>
    <div className="container layout_padding2">
      <div className="row">
        <div className="col-md-5 mt-lg-5">
          <div className="form_contaier">
            <form onSubmit={handleSignIn}>
            
              

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email </label>
                     
              <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"

          />
              
              </div>
              <div className="form-group ">
                <label htmlFor="inputState">Password</label>
            
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"

      />
              </div>
            
              <button type="submit" className="">Login</button>
            </form>
          </div>
        </div>
        <div className="col-md-7">
          <div className="detail-box">
            <h3>
              Get Now Medicines
            </h3>
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't look even slightly believable.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section className="info_section layout_padding2">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="info_contact">
            <h4>
              Contact
            </h4>
            <div className="box">
              <div className="img-box">
                <img src="images/telephone-symbol-button.png" alt=""/>
              </div>
              <div className="detail-box">
                <h6>
                +216 71 485 254
                </h6>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="images/email.png" alt=""/>
              </div>
              <div className="detail-box">
                <h6>
                  pill_pal@gmail
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="info_menu">
            <h4>
              Menu
            </h4>
            <ul className="navbar-nav  ">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about-us"> About </a>
              </li>
            
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="info_news">
            <h4>
              newsletter
            </h4>
            <form action="">
              <input type="text" placeholder="Enter Your email"/>
              <div className="d-flex justify-content-center justify-content-md-end mt-3">
                <button>
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>


 
  <section className="container-fluid footer_section">
    <p>
      &copy; 2023 All Rights Reserved
    </p>
  </section>
    </div>
    </div>
  );
}

export default SignIn;
