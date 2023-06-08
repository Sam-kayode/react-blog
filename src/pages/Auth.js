import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { toast } from "react-toastify";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setUser,user }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        setUser(user);
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password do not match");
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/");
  };
  return (
    <>
    
    <div className="flex flex-col h-[80vh] justify-center items-center mx-auto w-screen">
      <div className="text-center py-2 mb-5 text-[25px] font-bold text-green-600">
        {!signUp ? "Sign-In" : "Sign-Up"}
      </div>
      <div className="max-w-[90vw] sm:max-w-[400px] w-[400px] rounded shadow-md px-3 py-5 sm:p-8">
        <form className="grid gap-3" onSubmit={handleAuth}>
          {signUp && (
            <>
              <div className="">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-2 rounded"
                  placeholder="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-2 rounded"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="">
            <input
              type="email"
              className="block border border-grey-light w-full p-2 rounded"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <input
              type="password"
              className="block border border-grey-light w-full p-2 rounded"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {signUp && (
            <div className="">
              <input
                type="password"
                className="block border border-grey-light w-full p-2 rounded"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          <div className=" text-center">
            <button
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-600 focus:outline-none my-1"
              type="submit"
            >
              {!signUp ? "Sign-in" : "Sign-up"}
            </button>
          </div>
        </form>
        <div>
          {!signUp ? (
            <>
              <div className="text-center justify-center mt-2 pt-2">
                <p className="small font-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <span
                    className="text-green-500 cursor-pointer"
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center justify-center mt-2 pt-2">
                <p className="small font-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setSignUp(false)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div></>
  );
};

export default Auth;
