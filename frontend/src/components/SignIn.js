import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

    fetch(`${API_BASE_URL}/signin`, {
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

          navigate("/home");
        }
      });
  };

  return (
    <>
      <div className="background-container">
        <div className="blurred-image">
        {/* <img src="./assets/images/a.jpg" alt="SignInImage" /> */}
</div>
        
        <div className="form-container">
          {/* Your content here */}
          {/* <h1>Welcome to My Website</h1>
        <p>This is a sample text.</p> */}
          <div className="signin-form">
            <div>
            <h2>Sign in</h2>

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
              <Link to="/signup">
                <span> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/images/a.jpg" alt="SignInImage" />
          </div> */}
      {/* <div className="col-md-4 form-container"> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
