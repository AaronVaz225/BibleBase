//Login Page
import React from "react";

import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../../utils/helper";
import axiosInstance from "../../../utils/axiosInstance";
import Logo from "../../../public/BibleBaseNoBg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); //keeps form from refreshing

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(""); //setting error to nothing if everything is good

    //Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //Handle Successful Login Response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      //Handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-96 border rounded px-7 py-10 bg-gradient-to-r from-violet-50 to-purple-50">
          <img src={Logo} className="w-15 h-15 mx-auto " />
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 font-mono ">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/*Only renders if error has a value (short-Circuit Rendering aka conditional rendering)*/}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary cursor-pointer relative p-[3px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="font-mono px-8 py-2 pt-2 pb-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent text-xl">
                Log In
              </div>
            </button>

            <p className="text-sm text-center mt-4 font-mono">
              Not registered yet?{" "}
              <Link to="/signUp" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
