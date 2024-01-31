import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const [onHome, setOnHome] = useState(false);
  // const [onChat, setOnChat] = useState(false);
  // const [onProfile, setOnProfile] = useState(false);
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (!token) {
  //     navigate("/signin");
  //   }
  // }, []);

  // useEffect(() => {
  //   setOnHome(location.pathname === "/home");
  //   setOnHome(location.pathname === "/blogposts");
  //   setOnChat(location.pathname === "/chat");
  //   setOnProfile(location.pathname === "/profile");
  // }, [location]);

  const Navigation = () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      return [
        <>
          <div className="p-[1px]">

            <div className="sma w-screen bg-white h-16 shadow-md flex justify-between">
              <div className="sma w-screen flex justify-between">

                <img className="logo mt-2 h-12 ml-5" src="./logo.png" alt="" />
                <div className="mini flex">


                  <div><Link to="/profile">
                    <img className="img h-10 m-3" src="./profile.png" alt="" />
                  </Link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </>,
      ];
    } else {
      return [<></>];
    }
  };

  return [
    <>
      <ul>{Navigation()}</ul>
    </>,
  ];
}
