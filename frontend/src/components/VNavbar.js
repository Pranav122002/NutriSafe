import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function VNavbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  return (
    <>
      {user && (
        <div className="vnavbarr pt-16 min-w-[18rem] h-screen bg-white shadow-lg ">
          <div className="flex m-3 p-3 rounded shadow-md">
            <img src="./lines2.png" className="liness h-7" alt="" />
            <h1 className="ml-4 text-lg font-medium">NutriSafe</h1>
          </div>

          <NavLink
            to="/stores"
            className="w-11/12 ml-3 flex hover:pl-2 hover:mr-2 rounded hover:bg-gray-100 mt-1.5 "
          >
            <img className="h-6 m-3" src="./store.png" alt="" />
            <h1 className="text-base text-gray-700  pt-3 pb-3 tracking-tight font-medium ">
              Stores
            </h1>
          </NavLink>

          {/* <NavLink
            to="/chat"
            className="w-11/12 ml-3 flex hover:pl-2 hover:mr-2 rounded hover:bg-gray-100 mt-1.5 "
          >
            <img className="h-6 m-3" src="./diseases.png" alt="" />
            <h1 className="text-base text-gray-700  pt-3 pb-3 tracking-tight font-medium ">
              Chat
            </h1>
          </NavLink> */}

          <NavLink
            to="/blogposts"
            className="w-11/12 ml-3 flex hover:bg-gray-100 rounded mt-1.5"
          >
            <img className="h-6 m-3" src="./blog.png" alt="" />
            <h1 className="pt-3 pb-3  font-medium text-base tracking-tight">
              Blogs
            </h1>
          </NavLink>

          <NavLink
            to="/recipe"
            className="w-11/12 ml-3 flex rounded hover:bg-gray-100 mt-1.5"
          >
            <img className="h-6 m-3" src="./recipe.png" alt="" />
            <h1 className=" pt-3 pb-3 font-medium text-base tracking-tight">
              Recipe
            </h1>
          </NavLink>

          <NavLink
            to="/download"
            className="w-11/12 ml-3 flex rounded hover:bg-gray-100 mt-1.5"
          >
            <img className="h-6 m-3" src="./chat.png" alt="" />
            <h1 className=" pt-3 pb-3 font-medium text-base tracking-tight">
              Download Data
            </h1>
          </NavLink>

          <NavLink
            to="/qr"
            className="w-11/12 ml-3 flex rounded hover:bg-gray-100 mt-1.5"
          >
            <img className="h-6 m-3" src="./chat.png" alt="" />
            <h1 className=" pt-3 pb-3 font-medium text-base tracking-tight">
              QR Scanner
            </h1>
          </NavLink>

          <NavLink
            to="/allergy"
            className="w-11/12 ml-3 flex rounded hover:bg-gray-100 mt-1.5"
          >
            <img className="h-6 m-3" src="./allergy.png" alt="" />
            <h1 className=" pt-3 pb-3 font-medium text-base tracking-tight">
              Allergies
            </h1>
          </NavLink>

          <NavLink
            to="/qrgen"
            className="w-11/12 ml-3 flex rounded hover:bg-gray-100 mt-1.5"
          >
            <img className="h-6 m-3" src="./chat.png" alt="" />
            <h1 className=" pt-3 pb-3 font-medium text-base tracking-tight">
              Generate QR
            </h1>
          </NavLink>

          <div
            className="cursor-pointer w-11/12 ml-3 flex rounded hover:bg-gray-100 bottom-3 absolute "
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <img className="h-6 m-3" src="./logout2.png" alt="" />
            <h1 className="pl-1 pt-3 pb-3 font-medium text-red-500 text-base tracking-tight">
              Logout
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
