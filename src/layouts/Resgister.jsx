import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from 'react';
import { registerUser } from '../services/apiService';
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const GoalIDv4 = uuidv4();

  const [user, setUser] = useState({ UserAccountID : GoalIDv4, username: '', email: '', password: '', confirm_password: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '', confirm_password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    // Check username
    if (!user.username) {
      isValid = false;
      errors.username = 'Username is required';
    }

    // Check email
    if (!user.email) {
      isValid = false;
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      isValid = false;
      errors.email = 'Email is invalid';
    }

    // Check password
    if (!user.password) {
      isValid = false;
      errors.password = 'Password is required';
    } else if (user.password.length < 6) {
      isValid = false;
      errors.password = 'Password must be at least 6 characters long';
    }

    // Check confirm password
    if (user.password !== user.confirm_password) {
      isValid = false;
      errors.confirm_password = 'Passwords must match';
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {


        const result = await registerUser(user);

        if (result.status === 200) {
          console.log('Registration successful');
          toast.success('Tạo mới thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          // Chuyển hướng đến trang đăng nhập
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else if (result.status === 400) {
          toast.error('Email đã được đăng ký !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error('Xảy ra lỗi !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        
        // Redirect to login or show success message
      } catch (error) {
        console.error('Registration failed', error);
        // Handle registration failure here (e.g., show error message)
      }
    }
  };

  return (
    <>
        <ToastContainer />
      <div className="flex items-center justify-center">
        <div className="container flex justify-center items-center h-[600px] w-[800px] bg-white absolute right-1/5 top-[60px] shadow-lg rounded-2xl">
          <form className="sign-up ml-[50px] flex-1" onSubmit={handleSubmit}>
            <div className="word-main text-[40px] mt-[50px] ml-20 mb-[50px]">
              <strong>Sign Up</strong>
            </div>
            <div className="user flex items-center mb-[20px] mt-[20px]">
              <FaUser />
              <input
                id="usernameInput"
                type="text"
                placeholder="Your Name"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="form-control border-b-2 bottom-[30px] border-gray-300 p-[10px] w-[82%] bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 border-none"
              />
            </div>
            <div className="email flex items-center mb-[20px] mt-[20px]">
              <FaEnvelope />
              <input
                id="emailInput"
                type="email"
                placeholder="Your Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control border-b-2 bottom-[30px] border-gray-300 p-[10px] w-[82%] bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 border-none"
              />
            </div>
            <div className="pass flex items-center mb-[20px] mt-[20px]">
              <FaLock />
              <input
                id="passwordInput"
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control border-b-2 bottom-[30px] border-gray-300 p-[10px] w-[82%] bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 border-none"
              />
            </div>
            <div className="repeat-pass flex items-center mb-[20px] mt-[20px]">
              <FaLock />
              <input
                id="repeatPasswordInput"
                type="password"
                placeholder="Repeat your password"
                name="confirm_password"
                value={user.confirm_password}
                onChange={handleChange}
                className="form-control border-b-2 bottom-[30px] border-gray-300 p-[10px] w-[82%] bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 border-none"
                required
              />
            </div>
            <div className="message text-red-500 border-none text-sm">
                {errors.username && <p className="text-red-500">{errors.username}</p>}
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                {errors.password && <p className="text-red-500">{errors.password}</p>}
                {errors.confirm_password && <p className="text-red-500">{errors.confirm_password}</p>}
            </div>
            <div className="button text-[16px] ml-4 mt-[20px]">
              <input id="agreeCheckbox" type="checkbox" className="" /> I agree
              all statements in
              <span className="underline ml-1">Term of service</span>
            </div>
            <button
              type="submit"
              className="register bg-yellow-500 border-none w-36 h-16 ml-[90px] mt-[60px] text-white text-lg font-semibold rounded-lg px-4 transition duration-300 hover:bg-black border-none"
            >
              Register
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
    </>
  );
}

export default Register;
