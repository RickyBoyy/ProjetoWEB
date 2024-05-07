import React from "react";
import "../styles/home.css";
import fb from "../images/facebook.svg";
import insta from "../images/instagram.svg";
import linkedin from "../images/linkedin.svg";
import twitter from "../images/twitter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer">
            <h4>For Business</h4>
            <a href="#">Employer</a>
            <a href="#">Company</a>
            <a href="#">Individual</a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Resources</h4>
            <a href="#">Resource center</a>
            <a href="#">Testimonials</a>
            <a href="#">STV</a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Partners</h4>
            <a href="#">Swing Tech</a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Press</a>
            <a href="#">Career</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="sb_footer-links_div">
          <h4>Coming soon on</h4>
          <div className="socialmedia">
            <p>
              <img src={fb} alt="Facebook" />
            </p>
            <p>
              <img src={twitter} alt="Twitter" />
            </p>
            <p>
              <img src={insta} alt="Instagram" />
            </p>
            <p>
              <img src={linkedin} alt="LinkedIn" />
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="sb_footer-below">
        <div className="sb_footer-copyright">
          <p>@{new Date().getFullYear()}MyGamerHouse.All rights reserved</p>
        </div>
        <div className="sb_footer-below-links">
          <a href="#">
            <div>
              <p>Terms & Conditions </p>
            </div>
          </a>
          <a href="#">
            <div>
              <p>Privacy </p>
            </div>
          </a>
          <a href="#">
            <div>
              <p>Security </p>
            </div>
          </a>
          <a href="#">
            <div>
              <p>Cookie Declarations</p>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
