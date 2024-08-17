import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { loginUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let isValid = true;
    let errors = {};

    // Check email
    if (!user.email) {
      isValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    // Check password
    if (!user.password) {
      isValid = false;
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      isValid = false;
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const result = await loginUser(user);
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("UserID", result.UserID);
        localStorage.setItem("isAdmin", result.isAdmin);
        localStorage.setItem("UserName", result.UserName);

        navigate("/");
        // Redirect to dashboard or any other action
      } catch (error) {
        console.error("Login failed", error);
        // Handle login failure here (e.g., show error message)
      }
    }
  };

  const handleLoginSuccess = async (response) => {
    // Gửi mã token đến máy chủ của bạn để xác thực và lấy thông tin người dùng
    const { credential } = response;

    try {
      const res = await fetch("http://localhost:3000/users/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credential }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      const tokennn = data.token;
      const isAdminmmm = data.isAdmin;
      const UserNameeee = data.UserName;
      const UserIDddd = data.UserID;

      localStorage.setItem("authToken", tokennn);
      localStorage.setItem("UserID", UserIDddd);
      localStorage.setItem("isAdmin", isAdminmmm);
      localStorage.setItem("UserName", UserNameeee);

      navigate("/Dashboard");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleLoginError = (error) => {
    console.log("Login Failed:", error);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="container flex justify-center items-center h-[600px] w-[800px] bg-white absolute right-1/5 top-[60px] shadow-lg rounded-2xl">
          <form className="sign-up ml-[50px] flex-1" onSubmit={handleSubmit}>
            <div className="word-main text-[40px] mt-[50px] ml-20 mb-[50px]">
              <strong>Log In</strong>
            </div>
            <div className="user flex items-center mb-[20px] mt-[20px]">
              <FaUser />
              <input
                id="usernameInput"
                type="text"
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
            <div className="pass flex items-center mb-[20px] mt-[20px] text-sm hover:underline cursor-pointer">
              <a href="/ForgotPassword" className="hover:text-black">
                Forgot password?
              </a>
            </div>
            <div className="message text-red-500 border-none text-sm">
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
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
              Login
            </button>
          </form>

          <div className="image flex-1">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
             
            </div>
            <div className="image-main">
              <img
                src="https://cdn.pixabay.com/photo/2024/02/19/02/02/meadows-8582365_1280.png"
                className="w-96 h-112"
                alt=""
              />
            </div>
            <div className="word mt-8 text-center">
              <a href="/resgister" className="underline">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
