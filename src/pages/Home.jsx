import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
        <div className="flex justify-center bg-gray-100 items-center p-2">
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
      <div className="bg-gray-100 w-full h-3"></div>

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
      <Footer />

      {/* 1st footer section */}
      <hr />
    </main>
  );
};

export default Home;