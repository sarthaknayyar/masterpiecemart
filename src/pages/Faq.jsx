import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// SVG icons for open and closed states
const ClosedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.5 5A1.5 1.5 0 0 1 5 3.5h10A1.5 1.5 0 0 1 16.5 5v10a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V5zm1-1A2.5 2.5 0 0 0 2 5.5v10A2.5 2.5 0 0 0 4.5 18h11a2.5 2.5 0 0 0 2.5-2.5V5.5A2.5 2.5 0 0 0 15.5 3H5.5z"
    />
  </svg>
);

const OpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M11.5 3A1.5 1.5 0 0 1 13 4.5v11a1.5 1.5 0 0 1-3 0v-11A1.5 1.5 0 0 1 11.5 3zm-7 4A1.5 1.5 0 0 1 8 5.5v11a1.5 1.5 0 0 1-3 0v-11A1.5 1.5 0 0 1 4.5 7z"
    />
  </svg>
);

const FAQ = () => {
  // State to track open/close state of each question
  const [openState, setOpenState] = useState({});

  // Function to toggle answer visibility and update state
  const toggleAnswer = (index) => {
    setOpenState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center text-3xl font-comic font-bold bg-gray-300 py-24 mb-10">
          Frequently Asked Questions
        </h1>
        <div className="FAQ w-full p-5 bg-white shadow-md">
          {[
            {
              question: "General",
              answer:
                "What is Masterpiece Mart? Masterpiece Mart is an online art gallery that offers a wide selection of original artworks, including paintings, photography, and sculptures. Shop for unique pieces and support talented artists on our e-commerce platform. Transform your living space and immerse yourself in the world of creativity, all from the comfort of your home.",
            },
            {
              question: "Art Categories",
              answer:
                "What are the main categories of art on Masterpiece Mart? Masterpiece Mart offers a variety of art categories, including paintings and photography.",
            },
            {
              question: "Shipping",
              answer:
                "How do you ship artwork? All artwork is packaged in custom built art boxes to insure safe delivery. Our boxes are lined with high density foam to protect your art. The foam construction also makes unpackaging quick and easy - no packing peanuts, no mess. We send art via FedEx, UPS and other common carriers. All artwork is shipped fully insured. Please note, a signature is not required for delivery unless you request that your art be delivered with a signature.",
            },
            {
              question: "Artwork Care",
              answer:
                "How should I care for the art I purchase from Masterpiece Mart? We recommend displaying your artwork in a location that is away from direct sunlight and extreme temperatures. You should also avoid hanging the artwork in a humid environment, such as a bathroom.",
            },
            {
              question: "Artists and Artwork Submissions",
              answer:
                "How can I submit my artwork to Masterpiece Mart? If you are an artist interested in submitting your artwork to Masterpiece Mart, please visit our 'Artist Submissions' page for more information.",
            },
            {
              question: "Account and Billing",
              answer:
                "How do I update my billing information? You can update your billing information by logging into your account and visiting the 'Billing' section.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="faq-item border border-gray-300 p-5 mb-5"
            >
              <h2
                className="cursor-pointer text-lg font-semibold text-gray-600 mb-2 flex items-center"
                onClick={() => toggleAnswer(index)}
              >
                {openState[index] ? <OpenIcon /> : <ClosedIcon />}
                {item.question}
              </h2>
              <div
                className={`answer ${
                  openState[index] ? "" : "hidden"
                }`}
              >
                <p>
                  <strong>{item.answer}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
