import React from "react";
// import "../Style/FAQ.css";

const FAQ = () => {
  const toggleAnswer = (event) => {
    const answer = event.target.nextElementSibling;
    if (answer.style.display === "block") {
      answer.style.display = "none";
    } else {
      answer.style.display = "block";
    }
  };

  return (
    <div className="container">
      <h1>Frequently Asked Questions</h1>
      <div className="FAQ">
        <div className="faq-item btn btn-outline-light">
          <h2 onClick={toggleAnswer}>General</h2>
          <div className="answer">
            <p>
              <strong>What is Masterpiece Mart?</strong>
            </p>
            <p>
              Masterpiece Mart is an online art gallery that offers a wide
              selection of original artworks, including paintings, photography,
              and sculptures. Shop for unique pieces and support talented
              artists on our e-commerce platform. Transform your living space
              and immerse yourself in the world of creativity, all from the
              comfort of your home.
            </p>
          </div>
        </div>

        <div className="faq-item btn btn-outline-light">
          <h2 onClick={toggleAnswer}>Art Categories</h2>
          <div className="answer">
            <p>
              <strong>
                What are the main categories of art on Masterpiece Mart?
              </strong>
            </p>
            <p>
              Masterpiece Mart offers a variety of art categories, including
              paintings and photography.
            </p>
          </div>
        </div>

        {/* Add onClick event to other FAQ items */}
        <div className="faq-item btn btn-outline-light" onClick={toggleAnswer}>
          <h2>Shipping</h2>
          <div className="answer">
            <p>
              <strong>How do you ship artwork?</strong>
            </p>
            <p>
              All artwork is packaged in custom built art boxes to insure safe
              delivery. Our boxes are lined with high density foam to protect
              your art. The foam construction also makes unpackaging quick and
              easy - no packing peanuts, no mess. We send art via FedEx, UPS and
              other common carriers. All artwork is shipped fully insured.
              Please note, a signature is not required for delivery unless you
              request that your art be delivered with a signature.
            </p>
          </div>
        </div>

        {/* Add onClick event to other FAQ items */}
        <div className="faq-item btn btn-outline-light" onClick={toggleAnswer}>
          <h2>Artwork Care</h2>
          <div className="answer">
            <p>
              <strong>
                How should I care for the art I purchase from Masterpiece Mart?
              </strong>
            </p>
            <p>
              We recommend displaying your artwork in a location that is away
              from direct sunlight and extreme temperatures. You should also
              avoid hanging the artwork in a humid environment, such as a
              bathroom.
            </p>
          </div>
        </div>

        {/* Add onClick event to other FAQ items */}
        <div className="faq-item btn btn-outline-light" onClick={toggleAnswer}>
          <h2>Artists and Artwork Submissions</h2>
          <div className="answer">
            <p>
              <strong>How can I submit my artwork to Masterpiece Mart?</strong>
            </p>
            <p>
              If you are an artist interested in submitting your artwork to
              Masterpiece Mart, please visit our "Artist Submissions" page for
              more information.
            </p>
          </div>
        </div>

        {/* Add onClick event to other FAQ items */}
        <div className="faq-item btn btn-outline-light" onClick={toggleAnswer}>
          <h2>Account and Billing</h2>
          <div className="answer">
            <p>
              <strong>How do I update my billing information?</strong>
            </p>
            <p>
              You can update your billing information by logging into your
              account and visiting the "Billing" section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;