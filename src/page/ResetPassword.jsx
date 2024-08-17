import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ResetPassword() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setMessage('Your password has been successfully reset.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

    return ( <>
    <div className="flex items-center justify-center w-full h-screen">
          <div className="container flex justify-center items-center h-[500px] w-[800px] bg-white  shadow-lg rounded-2xl">
            <form className="sign-up ml-[50px] flex-1" onSubmit={handleSubmit}> 
              <div className="word-main text-xl  mt-[50px] ml-20 mb-[50px]">
                <strong>Reset Password</strong>
              </div>
              <div className="user flex items-center mb-[20px] mt-[20px]">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="New Password:"
                  className="form-control border-b-2 bottom-[30px] border-gray-300 p-[10px] w-[82%] bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 border-none"

                />
              </div>
              {message && <p>{message}</p>}
              <button
                type="submit"
                className="register bg-yellow-500 border-none  h-16 ml-[90px] mt-[60px] text-white text-lg font-semibold rounded-lg px-4 transition duration-300 hover:bg-black border-none"
              >
                Reset Password
              </button>
            </form>

            <div className="image flex-1">
           
              <div className="image-main">
                <img
                  src="https://cdn.pixabay.com/photo/2024/02/19/02/02/meadows-8582365_1280.png"
                  className="w-96 h-112"
                  alt=""
                />
              </div>
              <div className="word mt-8 text-center">
                <a href="/login" className="underline">
                  Login
                </a>
              </div>
            </div>
          </div>
      </div>
    </> );
}

export default ResetPassword;