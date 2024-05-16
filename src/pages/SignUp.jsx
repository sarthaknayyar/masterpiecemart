import React, { useState } from "react";
import DropdownHover from "../components/DropDown";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: ''
  });

  const navigateTo= useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");
  const roles = selectedOption;
  const successMessage = () => {
    toast.success('Signed Up successfully!');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        username: name,
        email: email,
        password: password,
        role: roles // Assuming you want to send all roles
      };

      const response = await fetch('http://localhost:8081/api/auth/signup', {
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
      setMessage(<span className='text-green-500'>Signed up successfully!</span>);

      // Optionally, reset the form after successful submission
      setName("");
      setEmail("");
      setPassword("");
      setSelectedOption(null);


      console.log(name, email, password, selectedOption);
      navigateTo('/');


    } catch (error) {
      console.log(name, email, password, selectedOption);
      setMessage(<span className='text-red-500'>Error signing up</span>);
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateCredentials = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      alert("Credentials are valid. Proceed with signup.");
      handleSubmit(event);
    } else {
      alert("Invalid credentials. Please enter a valid email and password.");
    }
  };

  return (
    <>
      <div className="bg-cover bg-center h-full p-4" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="flex justify-center mb-2">
          <img src="/logo.jpeg" alt="Masterpiece mart" className="h-20 w-20 flex border-2 border-black" />
        </div>
        <div className="flex justify-center">

          <form onSubmit={validateCredentials} className="login-form flex flex-col bg-white items-center w-1/3 p-4 gap-2 rounded-2xl border-2 border-black">
            <label htmlFor="login">User Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-black border-2 rounded-xl"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <label htmlFor="email">Email Address</label>
            <input
              className="border-black border-2 rounded-lg"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="pass">Password</label>
            <input
              className="border-black border-2 rounded-lg"
              type="password"
              name="password"
              id="pass"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span>You Are A/An?</span>
            <DropdownHover selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <p>{selectedOption}</p>

            <a href="a">Forgotten your password?</a>
            <button type="submit" className="bg-blue-600 rounded-2xl w-20 h-12">
              Sign Up
            </button>

            <div className="other-options ">
              <div className="flex justify-center">
                By continuing, you agree to Masterpiece Mart's
                Terms of Service
                and acknowledge that you've read our
                Privacy Policy
              </div>
              .
              <hr />
              <p className="flex justify-center">
                Are you a business?{" "}
                <strong>
                  <a href="a">Get started here!</a>
                </strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
