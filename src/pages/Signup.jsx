import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      }
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: username,
        email: email,
      });

      toast.success("User registered successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/profile");
    } catch (error) {
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
      <div className="login-wrapper w-[90%] md:w-[50vw] h-[90%] md:h-[65vh] bg-[#ffff] border-[#EFEFBA] drop-shadow-xl flex flex-col md:flex-row">
        <div className="left w-full md:w-1/2 bg-[url('/assets/images/backgroundimg.png')] bg-cover flex flex-col items-center justify-end p-5">
          <div className="img mb-0 md:mb-5">
            <img
              src="/assets/images/logo.png"
              className="bg-cover w-14 bg-white rounded-full"
              alt=""
            />
          </div>
          <h1 className="text-2xl font-bold text-white mt-2 md:mt-10">Start New Journey</h1>
          <div className="mt-0 hidden md:mt-20 md:flex flex-col items-center gap-2">
            <h3 className="text-white">Already have an account?</h3>
            <Link to={"/login"}>
              <button className="rounded-lg bg-white text-black font-bold px-6 py-2 md:mb-1">Sign In</button>
            </Link>
          </div>
        </div>
        <div className="right w-full md:w-1/2 flex flex-col items-center md:p-1 p-2 xl:p-5">
          <div className="wrapper w-full h-full flex flex-col items-center gap-2">
            <h1 className="font-bold text-[#CECE48] text-2xl mt-2 md:mt-0 xl:mt-10">Create Account</h1>
            <div className="icons flex gap-2">
              <img src="/assets/images/fb-icon.png" className="w-10" alt="" />
              <img src="/assets/images/g-icon.png" className="w-10" alt="" />
              <img src="/assets/images/l-icon.png" className="w-10" alt="" />
            </div>
            <p className="text-sm">or use your email account</p>
            <form className="form flex flex-col items-center gap-2" onSubmit={handleSubmit}>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="rounded-md px-4 py-2 bg-[#EFEFBA] w-full"
                type="text"
                name="username"
                placeholder="Name"
                id="username"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="rounded-md px-4 py-2 bg-[#EFEFBA] w-full"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="rounded-md px-4 py-2 bg-[#EFEFBA] w-full"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
              />
              <h5>
                <a className="text-sm" href="#">Forgot your password?</a>
              </h5>
              <button type="submit" className="rounded-lg bg-[#dfdf69] w-fit text-black font-bold px-4 md:px-10 py-2">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
