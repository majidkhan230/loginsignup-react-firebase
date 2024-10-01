import React, { useEffect, useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import SplitType from "split-type";
const Home = () => {
  //   console.log(gsap);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const boxRefs = useRef([]);
  console.log(boxRefs);
  useEffect(() => {
    const myText = new SplitType(boxRefs.current);
    // console.log(boxRefs.current.innerHTML);

    gsap.from(".char", {
      y: 20,
      opacity: 0,
      stagger: 0.05,
      delay: 0.2,
      duration: 0.5,
    });

    return () => {
      myText.revert();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#f2f2f2]">
      <header className="w-full bg-white  p-4 flex justify-between items-center relative">
        <div className="logo flex items-center">
          <img
            src="/assets/images/logo.png"
            className="w-10 bg-white rounded-full"
            alt="logo"
          />
        </div>
        <nav className=" gap-4 hidden md:flex">
          <a href="#home" className=" hover:text-[#C9C742]">
            Home
          </a>
          <a href="#about" className=" hover:text-[#C9C742]">
            About
          </a>
          <a href="#services" className=" hover:text-[#C9C742]">
            Services
          </a>
          <a href="#contact" className=" hover:text-[#C9C742]">
            Contact
          </a>
        </nav>
        <div className="bttn hidden md:flex gap-2">
          <Link to={"/login"}>
            {" "}
            <button className="rounded-full bg-[#C9C742] text-white font-bold px-6 py-2">
              Login
            </button>
          </Link>
          <Link to={"/signup"}>
            {" "}
            <button className="rounded-full bg-[#C9C742] text-white font-bold px-6 py-2">
              Sign Up
            </button>
          </Link>
        </div>
        <div
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          className="bar md:hidden"
        >
          <IoIosMenu size={40} />
        </div>

       
          <div className={`mobMenu bg-red absolute bg-white z-10 md:hidden top-16 left-0 w-full flex flex-col items-center gap-4 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`} style={{transition:"transform 0.3s ease,opacity 0.3s ease"}}>
            <a href="#home" className=" hover:bg-[#C9C742] hover:text-white py-1 px-10 rounded-md ">
              Home
            </a>
            <a href="#about" className=" hover:bg-[#C9C742] hover:text-white py-1 px-10 rounded-md">
              About
            </a>
            <a href="#services" className=" hover:bg-[#C9C742] hover:text-white py-1 px-10 rounded-md">
              Services
            </a>
            <a href="#contact" className=" hover:bg-[#C9C742] hover:text-white py-1 px-10 rounded-md">
              Contact
            </a>
          </div>
      </header>

      <div className="w-full h-[70vh] bg-[url('/assets/images/bgimg.png')] bg-cover bg-center flex flex-col items-center justify-center text-white text-center">
        <div className="text-center">
          <h1
            ref={(el) => (boxRefs.current[0] = el)}
            className="text-4xl font-bold mb-4"
          >
            Welcome to Our Website
          </h1>
          <p ref={(el) => (boxRefs.current[1] = el)} className="text-lg mb-6">
            We offer the best services to help you grow.
          </p>
          <Link to={"/login"}>
            <button className="rounded-full bg-white text-black font-bold px-6 py-2">
              Get Started
            </button>
          </Link>
        </div>
        ٖ
      </div>

      <div
        id="about"
        className="w-full py-10 flex justify-center items-center bg-white"
      >
        <div className="w-3/4 flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl font-bold text-[#CECE48]">About Us</h2>
          <p className="text-gray-600">
            We are a leading company in our industry, committed to providing
            top-quality services to our clients.
          </p>
        </div>
      </div>

      <div
        id="services"
        className="w-full py-10 bg-[#EFEFBA] flex justify-center"
      >
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="service-card bg-white p-6 rounded-md shadow-md flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-[#CECE48]">Service 1</h3>
            <p className="text-gray-600 mt-2">Description of service 1.</p>
          </div>
          <div className="service-card bg-white p-6 rounded-md shadow-md flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-[#CECE48]">Service 2</h3>
            <p className="text-gray-600 mt-2">Description of service 2.</p>
          </div>
          <div className="service-card bg-white p-6 rounded-md shadow-md flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-[#CECE48]">Service 3</h3>
            <p className="text-gray-600 mt-2">Description of service 3.</p>
          </div>
        </div>
      </div>

      <div id="contact" className="w-full py-10 flex justify-center bg-white">
        <div className="w-3/4 flex flex-col items-center text-center gap-4">
          <h2 className="text-3xl font-bold text-[#CECE48]">Contact Us</h2>
          <p className="text-gray-600">
            Feel free to reach out for more information.
          </p>
          <button className="rounded-lg bg-[#dfdf69] text-black font-bold px-6 py-2 mt-4">
            Contact Us
          </button>
        </div>
      </div>

      <footer className="w-full bg-[#c6c681] p-4 flex justify-center items-center">
        <p className="text-white">© 2024 MyWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
