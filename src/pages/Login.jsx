import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/profile";
      }
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser.uid;
      console.log(user);
      window.location.href = "/profile";
      toast.success("You have successfully logged in.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (user) {
        try {
          const querySnapshot = await getDoc(doc(db, "users", user));
          if (querySnapshot.exists()) {
            console.log("Document data:", querySnapshot.data());
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f5f5dc]">
      <div className="login-wrapper w-[90%] md:w-[50vw] h-[90%] md:h-[65vh] bg-[#ffff] border-[#EFEFBA] drop-shadow-xl flex flex-col-reverse md:flex-row">
        <div className="left w-full h-full md:w-2/3 flex flex-col items-center md:p-1 p-5">
          <div className="img">
            <img
              src="/assets/images/logo.png"
              className="bg-cover w-14"
              alt=""
            />
          </div>
          <div className="wrapper w-full p-4 md:w-[250px]  flex flex-col items-center gap-2">
            <h1 className="font-bold text-[#CECE48] text-2xl">
              Sign in to StarFills
            </h1>
            <div className="icons flex gap-2">
              <img src="/assets/images/fb-icon.png" className="w-10" alt="" />
              <img src="/assets/images/g-icon.png" className="w-10" alt="" />
              <img src="/assets/images/l-icon.png" className="w-10" alt="" />
            </div>
            <p className="text-sm">or use your email account</p>
            <form
              onSubmit={handleSubmit}
              className="form flex flex-col gap-2 w-full"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-sm px-4 py-2 bg-[#EFEFBA] w-full"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-sm px-4 py-2 bg-[#EFEFBA] w-full"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
              />
              <h5>
                <a className="text-sm" href="#">
                  Forgot your password?
                </a>
              </h5>
              <button
                type="submit"
                className="rounded-lg bg-[#dfdf69] text-black font-bold px-10 py-2"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="right w-full md:w-1/2 bg-[#CECE48] bg-[url('/assets/images/backgroundimg.png')] bg-cover flex flex-col items-center justify-center p-5">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <div className="mt-10 flex flex-col gap-2">
            <h3 className="text-white">Don't have an account?</h3>
            <Link
              to="/signup"
              className="rounded-lg bg-white text-black font-bold px-10 py-2 text-center inline-block"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
