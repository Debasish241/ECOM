import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../context/authContext";
import image from "../../../assets/images/login.png";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
      doSendEmailVerification();
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
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main className="w-full h-screen flex ">
        <div className=" bg-cover bg-center">
          <img src={image} className="h-full w-full object-cover" />
        </div>
        <div className="w-full text-gray-600 space-y-5 p-4 ">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-gray-800 text-5xl font-semibold sm:text-5xl p-16 mt-4">
                Login
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="m-10">
              <label className="text-xl text-gray-600 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-gray-500 bg-transparent outline-none border  focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div className="space-y-2 m-10">
              <label className="text-xl text-gray-600 font-bold">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}
            <div className="space-y-2 m-10">
              <button
                type="submit"
                disabled={isSigningIn}
                className={`w-full h-[60px] px-4 py-2 text-white font-medium rounded-lg  ${
                  isSigningIn
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#4285F4] hover:bg-[$4285F4] hover:shadow-xl transition duration-300 text-2xl"
                }`}
              >
                {isSigningIn ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/register"} className="hover:underline font-bold">
              Sign up
            </Link>
          </p>
          <div className="space-y-2 m-10">
            <div className="flex flex-row text-center w-full">
              <div className="border-b-2 mb-2.5 mr-2 w-full"></div>
              <div className="text-sm font-bold w-fit">OR</div>
              <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
            </div>
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
        </div>
      </main>
    </div>
  );
};

export default Login;
