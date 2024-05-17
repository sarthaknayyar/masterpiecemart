import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Navbar from "../components/Navbar";
// import "../Style/Home.css";

// import { FaSquareInstagram } from "react-icons/fa6";
// import { FaYoutube } from "react-icons/fa";
// import { FaTelegram } from "react-icons/fa";

const Home = () => {
  return (
    <main>
      {/* Front-section */}
      <Navbar />
      <div className="flex justify-around m-10">
        <div className="flex flex-col justify-center gap-8">
          <div className="text-5xl font-bold">Good Art Changes Lives</div>
          <div className="flex justify-center">

          <div className="w-96 text-2xl flex justify-center">
            Bring home your new art to view it in person. If a piece doesn't
            quite work in your space, return it within seven days of receiving
            your order and receive a full refund.*
          </div>
          </div>
          <div className="flex justify-center">

          <a href="#"> Read About Satisfaction Guaranteed &rarr;</a>
          </div>
        </div>
        <img src="/homeimg1.jpeg" className="w-96 h-96" alt="" />
      </div>

      {/* show-pieces section */}
      <section>
        <div className="flex justify-center bg-red-50 items-center p-2">
          <div > &#8595; Art Pieces &#8595; </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 bg-orange-50 mb-1">
          <div className="img1 h-full w-full"><img src="/bg1.jpg" alt="" /></div>
          <div className="img2 h-full w-full"><img src="/background.jpg" alt="" /></div>
          <div className="img3 h-full w-full"><img src="/homeimg1.jpeg" alt="" /></div>
          <div className="img4 h-full w-full"><img src="prod4.jpg" alt="" /></div>
          <div className="img5 h-full w-full"><img src="prodimg2.jpg" alt="" /></div>
          <div className="img6 h-full w-full"><img src="prod3.jpg" alt="" /></div>
        </div>
      </section>
      <div className="bg-red-50 w-full h-3"></div>

      {/* Our moto section */}
      <section>
        <div className="flex p-8 justify-around">
          <div className="flex flex-col w-1/3 text-4xl font-bold leading-12">
            We believe that good art brings people together, elevates living
            spaces, and transforms lives.
          </div>
          <div className="flex flex-col w-1/3 text-2xl leading-9">
            <div className="about-us-message">
              Founded by Team Wizard in 2023, MasterPiece Mart has developed a
              loyal following of art collectors, artists, and interior designers
              all over the country.
            </div>
            {/* <div>
              <a >About Us &rarr;</a>
            </div> */}
          </div>
        </div>
      </section>

      {/* Join Us section */}
      <section>
        <div className="join">
          <div className="join-us-on">JOIN US ON</div>
          <div className="social">
            <div className="youtube">
              {" "}
              <a href="https://www.youtube.com/@muskanart3102">
                {" "}
                <FontAwesomeIcon icon={faYoutube} className="text-2xl red" style={{color:'red'}}/> <br /> Youtube
                <br /> Muskan Art
              </a>
            </div>
            <div className="insta">
              {" "}
              <a href="https://www.instagram.com/muskan_arts_0/?hl=en">
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" /> <br /> Instagram
                <br /> Muskan Art
              </a>
            </div>
            <div className="telegram">
              {" "}
              <a href="#">
                {" "}
                <FontAwesomeIcon icon={faTelegram} className="text-2xl blue" style={{color:'blue'}}/> <br /> Telegram
                <br /> Muskan Art
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation section */}
      <section className="flex justify-center">
        <div className="flex flex-col bg-red-50 w-1/2">
          <div className="flex justify-center text-6xl font-bold p-16">You are invited</div>
          <div className="invite-message">
            "Stay up-to-date with monthly new art releases,
            <br /> insightful artist profiles, and exclusive collections"
          </div>
          <div className="flex justify-center">
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
      </section>

      {/* 1st footer section */}
      <hr />
    </main>
  );
};

export default Home;