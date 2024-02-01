import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const API_BASE_URL = "http://localhost:5000/api";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email syntax
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }

    fetch(`${API_BASE_URL}/admin/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/stores");
        }
      });
  };

  return (
    <>
      <div className="background-container">
        <div className="blurred-image">
        </div>

        <div className="form-container rounded-md">
          <div className="signin-form">
            <div>
              <h2 className="font-bold text-3xl">Sign in</h2>

              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                onClick={() => {
                  postData();
                }}
              >
                Sign in
              </button>
            </div>

            <div>
              Don't have an account?
              <Link to="/admin/signup">
                <span> Sign Up</span>
              </Link>
            </div>
          </div>


        </div>
      </div>



    </>
  );
}
