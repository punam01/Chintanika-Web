import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  //const { showAlert } = props;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent from reload
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //save auth token and redirect localstorage
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userId", json._id);
      navigate("/");
      //showAlert("Loggrd In successfully", "success");
    } else {
      //showAlert("Invalid Details", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="container my-5">
        <h5 className="hero-heading fs-1">Login</h5>
        <p>Let's get started</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start col-6">
            <label htmlFor="email" className="form-label is-valid">
              Email address
            </label>
            <input
              type="email"
              className="form-control w-30"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3 text-start col-6">
            <label htmlFor="password" className="form-label is-valid">
              Password
            </label>
            <input
              type="password"
              className="form-control w-30"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="my-3 col-6">
            <button className="btn hero" type="submit">
              Login
            </button>
          </div>
          <p>
            Don't have an Account?
            <Link className="" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};
export default Login;
