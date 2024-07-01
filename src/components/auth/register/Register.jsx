import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../context/authContext";
import image from "../../../assets/images/login.png";
import { FcGoogle } from "react-icons/fc";
const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main className="w-full h-screen flex   ">
      <div className="">
          <img src={image} className="h-full w-full object-cover " />
        </div>
        <div className="w-full  text-gray-600 m-12  rounded-bl-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="text-gray-800 text-5xl font-semibold sm:text-5xl p-16 mt-4">
                Sign Up
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-10">
            <div className="m-10">
              <label className="text-xl text-gray-600 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your Email Here"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-6 py-4 text-gray-500 bg-transparent outline-none border  focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div className="space-y-2 m-10">
              <label className="text-xl text-gray-600 font-bold">
                Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                placeholder="******"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-6 py-4 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div className="space-y-2 m-10">
              <label className="text-xl text-gray-600 font-bold">
                Confirm Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                placeholder="*******"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
                className="w-full px-6 py-4 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}
            <div className="space-y-2 m-10">
            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full h-[60px] px-4 py-2 text-white font-medium rounded-lg ${
                isRegistering
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#4285F4] hover:bg-[$4285F4] hover:shadow-xl transition duration-300 text-2xl"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            </div>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-center text-sm hover:underline font-bold"
              >
                Continue
              </Link>
            </div>
            <div className="m-10 space-y-2">
            <button
              disabled={isSigningIn}
              onClick={(e) => {
                onGoogleSignIn(e);
              }}
              className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${
                isSigningIn
                  ? "cursor-not-allowed"
                  : "hover:bg-gray-100 transition duration-300 active:bg-gray-100"
              }`}
            >
              <FcGoogle size={30} />
              {isSigningIn ? "Signing In..." : "Continue with Google"}
            </button>
          </div>
          </form>
        </div>
      </main>
    </>


   
  );
};

export default Register;
