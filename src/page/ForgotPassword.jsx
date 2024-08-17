import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('A password reset link has been sent to your email.');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    
    <div className="flex items-center justify-center w-full h-screen">
          <div className="container flex justify-center items-center h-[400px] w-[800px] bg-white  shadow-lg rounded-2xl">
            <form className="sign-up ml-[50px] flex-1" onSubmit={handleSubmit}> 
              <div className="word-main text-xl  mt-[50px] ml-20 mb-[50px]">
                <strong>Forgot Password</strong>
              </div>
              <div className="user flex items-center mb-[20px] mt-[20px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your Email"
                  className="form-control border-b-2 bottom-[30px] border-gray-300 p-[10px] w-[82%] bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 border-none"

                />
                
              </div>
              <a href='/PhoneForgot' className='text-xs underline cursor-pointer font-medium'>Bằng điện thoại ? </a>
              {message && <p>{message}</p>}
              <button
                type="submit"
                className="register bg-yellow-500 border-none  h-16 ml-[90px] mt-[60px] text-white text-lg font-semibold rounded-lg px-4 transition duration-300 hover:bg-black border-none"
              >
                Send Reset Link
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
              
            </div>
          </div>
      </div>
  );
};

export default ForgotPassword;
