import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <div className="join">
          <div className="join-us-on">JOIN US ON</div>
          <div className="social">
            <div className="youtube">
              <a href="https://www.youtube.com/@muskanart3102">
              {/* <div> */}
      <FontAwesomeIcon icon={faYoutube} className="text-2xl" style={{color:'red'}} />
    {/* </div> */}
                <br />
                Youtube
                <br />
                Muskan Art
              </a>
            </div>
            <div className="insta">
              <a href="https://www.instagram.com/muskan_arts_0/?hl=en">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                <br />
                Instagram
                <br />
                Muskan Art
              </a>
            </div>
            <div className="telegram">
              <a href="#">
                <FontAwesomeIcon icon={faTelegram} className="text-2xl" style={{color:'blue'}}/>
                <br />
                Telegram
                <br />
                Muskan Art
              </a>
            </div>
          </div>
        </div>
        <div className="invitation">
          <div className="invite-main">You're invited</div>
          <div className="invite-message">
            "Stay up-to-date with monthly new art releases,
            <br />
            insightful artist profiles, and exclusive collections"
          </div>
          <div className="provide-mail">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="mail-input"
            />
            <button className="submitbtn" type="submit">
              Submit
            </button>
          </div>
        </div>
    <footer>
          <div className="footbar">
            <div className="description">
              <div className="foot-logo">
                <a href="Index.html">MasterPiece Mart</a>
              </div>
              <div className="desc">
                Masterpiece Mart is an online art gallery with a curated selection
                of original art for sale. Shop thousands of oil paintings,
                acrylics, watercolor paintings, mixed media art, and more. Contact
                us for a free art advisor consultation, and we’ll be happy to help
                you find your ideal artwork.
              </div>
            </div>
            <div className="links">
              <Link to={"/FAQ"}>FAQ</Link>
              <Link to={"/ContactUs"}>Contact Us</Link>
              <a href="#">Returns</a>
              <Link to={"/AboutUs"}>About US</Link>
              <Link to="/Blog">Blog</Link>
              <a href="#">Team Wizard</a>
            </div>
          </div>
          <div className="end">
            <div className="end-content">
              PHONE
              <br />
              8825******
            </div>
            <div className="end-content">
              EMAIL
              <br />
              teamwizard@pvt.ltd.in
            </div>
            <div className="end-content">
              SOCIAL MEDIA
              <br />
              <a href="https://www.instagram.com/muskan_arts_0/?hl=en">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <br />
              <a href="#">
                <i className="fa-brands fa-telegram"></i>
              </a>
              <br />
              <a href="https://www.youtube.com/@muskanart3102">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
            <div className="end-content">
              <a href="#">TERMS</a>
              <br />
              <a href="#">PRIVACY</a>
            </div>
            <div className="end-content">Copyright &#169; 2023</div>
          </div>
        {/* </div> */}
      </footer>
    </div>
  )
}

export default Footer
