import React from "react";

function AboutUs() {
  return (
    <div>
    <section className="about_section layout_padding">
    <div className="container">
      <div className="custom_heading-container ">
        <h2>
          About Us
        </h2>
      </div>

      <div className="img-box">
        <img src="images/about-medicine.png" alt=""/>
      </div>
      <div className="detail-box">
        <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here', making it
        </p>
        <div className="d-flex justify-content-center">
          <a href="">
            Read More
          </a>
        </div>
      </div>
    </div>
  </section>
  <section class="discount_section">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-md-5 offset-md-2">
        <div class="detail-box">
          <h2>
            You get <br/>
            any medicine <br/>
            on
            <span>
              10% discount
            </span>

          </h2>
          <p>
            It is a long established fact that a reader will be distracted by
          </p>
          <div>
            <a href="">
              Buy Now
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-7 col-md-5">
        <div class="img-box">
          <img src="images/medicines.jpg" alt=""/>
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

    );
}

export default AboutUs;