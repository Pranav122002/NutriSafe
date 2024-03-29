import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stores from "./components/Stores";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import VNavbar from "./components/VNavbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import PersonalChat from "./components/PersonalChat";
import GroupChat from "./components/GroupChat";
import BlogPost from "./components/BlogPost";
import Landing from "./components/Landing";
import Download from "./components/Download";
import Allergy from "./components/Allergy";
import QR from "./components/QR"; 
import Recipe from "./components/Recipe"; 
import QRgen from "./components/QRgen";
import SelectedStore from "./components/SelectedStore";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <VNavbar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/admin/signup" element={<SignUp />}></Route>
          <Route path="/admin/signin" element={<SignIn />}></Route>
          <Route path="/user/:userid" element={<UserProfile />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/personal-chat" element={<PersonalChat />}></Route>
          <Route path="/group-chat" element={<GroupChat />}></Route> 
          <Route path="/blogposts" element={<BlogPost />}></Route>
          <Route path="/stores" element={<Stores />}></Route>
          <Route path="/download" element={<Download />}></Route>
          <Route path="/store" element={<SelectedStore />}></Route>
          <Route path="/allergy" element={<Allergy />}></Route>
          <Route path="/qr" element={<QR />}></Route>
          <Route path="/qrgen" element={<QRgen />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>

        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
