import { useEffect, useState } from "react";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTimes,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import "./Navbaar.css";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/logo2.png";
import { auth } from "../firebase/config";
import "../main/index";
import Loader from "../main/Loader";

import back from "../../assets/images/back.png";
import { ShowOnLogin, ShowOnLogout } from "../main/HiddenLink";

// Privacy and Terms
// import TermsAndCondPopup from '../TermsAndCondPopup'
// import PrivacyAndPlicy from '../PrivacyAndPlicy'

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOPen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggle = () => {
    setIsMenuOPen(!isMenuOpen);
  };
  // monitor currentl signin user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // distructure user
        const { displayName, email } = user;

        setIsLoggedIn(true);
        if (displayName == null) {
          //  const extractu1 = email.substring(0, )
          const u1 = email.substring(0, email.indexOf("@"));
          const createUserName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setUserName(createUserName);
        } else {
          setUserName(displayName);
        }
      } else {
        setUserName("");
        setIsLoggedIn(false);
      }
    });
  }, [userName]);

  //  Log out the user
  const logoutUser = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        toast.success(" Log out Successful Bye bye hava nice day ");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <nav
        className="flex items-center justify-between px-[3.5rem] py-5 w-full tablet:px-8 "
        style={{ backgroundImage: `url(${back})` }}

        // className={`bg-white flex items-center justify-between px-[3.5rem] py-5 w-full fixed top-0 transition-all z-40 ${
        //   isScrolled ? "border-b-2 border-gray-200" : ""
        // }`}
      >
        <div className="logo">
          <Link
            to="/"
            className="text-fontSize1 font-[500] hover:font-[600] transition-opacity
      text-white hover:text-[wheat] hover:delay-[0.3s] ease-linear"
          >
            <img src={logo} alt="Logo" className="w-[150px]" />
          </Link>
        </div>
        {/* big screen */}
        <ul className="flex text-lg items-center gap-12 lg:hidden list-none">
          <li className="text-gray-light">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li className="text-gray-light">
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              About Us
            </NavLink>
          </li>

          <li className="text-gray-light">
            <NavLink
              to="/courses"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              Our Courses
            </NavLink>
          </li>

          <li className="text-gray-light">
            <NavLink
              to="/faq"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              FAQ's
            </NavLink>
          </li>
        </ul>
        {/* login */}
        <div className="flex items-center text-lg lg:hidden gap-9">
          <ShowOnLogout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
            <li className="text-gray-light list-none">
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Sign In
              </NavLink>
            </li>
          </ShowOnLogout>
          {/* Get Started */}
          <NavLink to="/getstarted">
            <button className="background3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Get Started
            </button>
          </NavLink>

          <ShowOnLogin setIsLogedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
            <div className="flex items-center sm:hidden">
              <a
                href="/"
                className="flex items-center mr-3 text-lightBlue pointer-events-none"
              >
                <img src={avatar} alt="user icon" className=" w-[25px] mr-1" />
                Hi, {userName}
              </a>
              <li className="text-white list-none">
                <NavLink
                  to="/logout"
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                  onClick={logoutUser}
                >
                  Logout
                </NavLink>
              </li>
            </div>
          </ShowOnLogin>

          {/* Get Started */}

          {/* <div className="flex items-center justify-center mt-20 w-full"> */}
        </div>
        {/* </div> */}

        {/* mobile screen */}

        <ul
          className={`hidden tablet:flex-col navbar list-none
      ${isMenuOpen ? "tablet:flex show" : "hidden"}`}
        >
          <button
            className="cursor-pointer hidden tablet:block text-white
      absolute right-10"
            onClick={toggle}
          >
            {isMenuOpen ? (
              <FaTimes className="w-7 h-7" />
            ) : (
              <FaBars className="w-7 h-7" />
            )}
          </button>
          <ShowOnLogin isLoggedIn={isLoggedIn} setIsLogedIn={setIsLoggedIn}>
            <li className="text-lightpurple flex justify-between">
              <a href="/" className="flex items-center">
                <img src={avatar} alt="user icon" className=" w-[30px] mr-2" />
                Hi, {userName}
              </a>
            </li>
          </ShowOnLogin>
          <li className="text-white">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              onClick={toggle}
            >
              Home
            </NavLink>
          </li>

          <li className="text-white">
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              onClick={toggle}
            >
              About Us
            </NavLink>
          </li>

          <li className="text-white">
            <NavLink
              to="/testimonial"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              onClick={toggle}
            >
              Testimonial
            </NavLink>
          </li>

          <li className="text-white">
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
              onClick={toggle}
            >
              Contact
            </NavLink>
          </li>

          <ShowOnLogout>
            <li className="text-white">
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                onClick={toggle}
              >
                Login
              </NavLink>
            </li>
          </ShowOnLogout>

          <ShowOnLogin setIsLogedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
            <li className="text-white">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                onClick={() => {
                  logoutUser();
                  toggle();
                }}
              >
                Log out
              </NavLink>
            </li>
          </ShowOnLogin>

          <div className="flex items-center justify-center gap-4 tablet:flex-row my-11">
            <Link to="/https://web.whatsapp.com">
              <FaWhatsapp
                className="text-lightpurple 
      delay-[0.3s] transition-all hover:font-[600] 
      hover:text-[wheat] hover:text-[2.5rem]"
                size={25}
              />
            </Link>
            <Link to="/https://web.whatsapp.com">
              <FaTwitter
                className="text-lightpurple 
      delay-[0.3s] transition-all hover:font-[600] 
      hover:text-[wheat] hover:text-[2.5rem]"
                size={25}
              />
            </Link>
            <Link to="/https://web.whatsapp.com">
              <FaInstagram
                className="text-lightpurple 
      delay-[0.3s] transition-all hover:font-[600] 
      hover:text-[wheat] hover:text-[2.5rem]"
                size={25}
              />
            </Link>
            <Link to="/https://web.whatsapp.com">
              <FaFacebook
                className="text-lightpurple 
      delay-[0.3s] transition-all hover:font-[600] 
      hover:text-[wheat] hover:text-[2.5rem]"
                size={25}
              />
            </Link>
          </div>
        </ul>

        <button
          className="cursor-pointer hidden tablet:block text-white"
          onClick={toggle}
        >
          {isMenuOpen ? (
            <FaTimes className="w-7 h-7" />
          ) : (
            <FaBars className="w-7 h-7" />
          )}
        </button>
      </nav>
    </>
  );
}

export default Navbar;
