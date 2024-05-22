import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';0

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const navigateTo= useNavigate();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        username: name,
        password: password,
      };

      const response = await fetch('http://localhost:8081/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      setMessage(<span className='text-green-500'>Signed in successfully!</span>);

      // Optionally, reset the form after successful submission
      setName("");
      setPassword("");
      console.log(data);
      navigateTo('/'); // You can log data to see what the server returns
    } catch (error) {
      setMessage(<span className='text-red-500'>Error signing in</span>);
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-cover bg-center h-screen p-4" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="flex justify-center mb-2">
          <img src="/logo.jpeg" alt="Masterpiece mart" className="h-20 w-20 flex border-2 border-black" />
        </div>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="login-form flex flex-col bg-white items-center w-1/3 p-4 gap-2 rounded-2xl border-2 border-black">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-black border-2 rounded-xl"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <label htmlFor="password">Password</label>
            <input
              className="border-black border-2 rounded-lg"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <a href="a">Forgotten your password?</a>
            <button type="submit" className="bg-blue-600 rounded-2xl w-20 h-12">
              Login
            </button>
            {message}
            <article className="other-options">
              By continuing, you agree to Masterpiece Mart's <a href="a"><strong>Terms of Service</strong></a> and acknowledge that you've read our <a href=""><strong>Privacy Policy</strong></a>.
              <hr />
              <p className="flex justify-center" style={{ color: "black" }}>
                <strong>
                  Not on Masterpiece Mart yet? <Link to="/SignUp">Sign Up</Link>
                </strong>
              </p>
              <p className="flex justify-center">
                Are you a business? <strong><Link to="/SignUp">Sign Up</Link></strong>
              </p>
            </article>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
