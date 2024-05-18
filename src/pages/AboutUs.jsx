import React from "react";
import "./Style/About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUS = () => {
  return (
    <>
    <Navbar />
    <div>
      <div id="wrapperM">
        <sectionA>
          <h1>Good art brings people together</h1>
          <p className="text text1">
            Welcome to Masterpiece Mart, where art meets passion and creativity
            knows no bounds. At Masterpiece Mart, we curate a symphony of
            artistic expressions, offering a diverse collection of captivating
            pieces that transcend time and captivate the soul. <br />
            <br /> Whether you're an art enthusiast seeking the perfect piece or
            an artist aiming to reach a global audience, Masterpiece Mart is
            your platform for creativity and connection.
          </p>
          <div className="bg bg1"></div>
          <div className="container2">
            <h1>Our Mission</h1>
            <p className="text text2">
              At Masterpiece Mart, our mission is to be a catalyst for artistic
              discovery and expression. We strive to create a vibrant online
              platform that serves as a bridge between talented artists and
              passionate art enthusiasts. <br />
              <br />
              We offer a space where creativity knows no bounds, and every
              masterpiece finds its rightful place in the hearts and homes of
              art lovers worldwide. Join us on this journey of artistic
              discovery and expression.
            </p>
            <div className="bg bg2"></div>
          </div>
          <div className="container3">
            <h1>Our Team</h1>
            <p className="text text4">
              Our team works closely with our artists to ensure artworks are
              professionally constructed, priced consistently and listed with
              accurate information. We guarantee that every artwork is heirloom
              quality and arrives as described. <br />
              <br />
              We are more than just a group; we are a collective of individuals
              deeply passionate about art and committed to bringing a seamless
              and enjoyable e-commerce experience to our customers.
            </p>
            <div className="bg bg3"></div>
          </div>
        </sectionA>
      </div>
    </div>
    <Footer />
    </>
  );
};
export default AboutUS;