import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUS = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const successMessage = () => {
    toast.success("Your query has been submitted successfully!");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        message : formData.message // Assuming you want to send all roles
      };

      const response = await fetch('http://localhost:8083/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      successMessage();
    //   setMessage(<span className='text-green-500'>Signed up successfully!</span>);

      // Optionally, reset the form after successful submission
      setFormData({
        fullName: "",
        email: "",
        message: "",
        });
    
    //   setSelectedOption(null);


    //   console.log(fullName, email, message);
    //   navigateTo('/');


    } catch (error) {
    //   console.log(name, email, password, selectedOption);
    // console.log(fullName, email, message);
    //   setMessage(<span className='text-red-500'>Error signing up</span>);
      console.log(error);
    }
  };


  const validateSubmit = (e) => {
    e.preventDefault();
    const { fullName, email } = formData;
    const letters = /^[A-Za-z]+$/;
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (fullName.trim() === "" || email.trim() === "") {
      alert("Please enter all details correctly");
    } else if (!fullName.match(letters)) {
      alert("Name is incorrect, it must contain alphabets only");
    } else if (!emailRegex.test(email)) {
      alert("Invalid email format, please enter a valid email address");
    } else {
      alert("Your query has been submitted successfully...");
      handleSubmit(e);
    }
  };

  return (
    <>
    <Navbar />
    <section className="p-4 contact min-h-screen flex justify-center items-center flex-col bg-cover bg-fixed" style={{backgroundImage: "url(https://images.unsplash.com/photo-1511389026070-a14ae610a1be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"}}>
      <div className="content text-center max-w-3xl">
        <h2 className="text-4xl font-bold text-black">Contact Us</h2>
        <p className="text-lg text-black mt-4">
          Welcome to MASTERPIECE MART! <br />
          We're delighted to hear from you. Whether you have a question about
          our products, need assistance, or just want to say hello, we're here
          to help. Please use the information below to get in touch with us.
        </p>
      </div>
      <div className="flex justify-around items-center m-10">
        <div className="contactInfo w-1/2">
          <div className="box flex items-center mb-4">
            <div className="icon w-12 h-12 flex justify-center items-center bg-red-600 text-white rounded-full">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div className="text ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">
                IIIT Lucknow <br />
                Chak Ganjaria, C. G. City <br />
                Lucknow – 226002
              </p>
            </div>
          </div>

          <div className="box flex items-center mb-4">
            <div className="icon w-12 h-12 flex justify-center items-center bg-red-600 text-white rounded-full">
              <i className="fa fa-phone" aria-hidden="true"></i>
            </div>
            <div className="text ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600">123-999-9999</p>
            </div>
          </div>

          <div className="box flex items-center">
            <div className="icon w-12 h-12 flex justify-center items-center bg-red-600 text-white rounded-full">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </div>
            <div className="text ml-4">
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">masterpiecemart@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="contactForm w-1/2 p-8 bg-gray-200 rounded-lg shadow-md">
          <form onSubmit={validateSubmit}>
            <div className="flex justify-center text-2xl font-semibold text-gray-800 mb-6">Send Message</div>
            <span className="text-gray-500">Full Name</span>
            <div className="inputBox mb-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 rounded-lg bg-gray-300 focus:outline-none focus:bg-white"
              />
              
            </div>
                <span className="text-gray-500">Email</span>
            <div className="inputBox mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 rounded-lg bg-gray-300 focus:outline-none focus:bg-white"
              />
            </div>
                <span className="text-gray-500">Type your Message...</span>
            <div className="inputBox mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full py-2 px-3 rounded-lg bg-gray-300 focus:outline-none focus:bg-white"
              ></textarea>
            </div>
            <div className="flex justify-center inputBox">
              <input
                type="submit"
                value="Send"
                className="flex justify-center py-2 px-6 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 transition duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    <Footer/>
    </section>
    </>
  );
};

export default ContactUS;
