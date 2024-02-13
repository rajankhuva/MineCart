import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./style.css";
import { getRegistrationData } from "../../utils";

const Login = () => {
  const navigate = useNavigate();
  const [registration, setRegistraion] = useState({});

  useEffect(() => {
    setRegistraion(getRegistrationData());
  },[]);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const field = event.target.name;
    let commonData = { ...loginData };
    commonData[field] = event.target.value;
    return setLoginData(commonData);
  };

  const handleSubmit = () => {
    localStorage.setItem("accessToken", loginData.email);
    if (registration.email === loginData.email) {
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="login">
      <Typography className="Head">Login</Typography>

      <div className="input">
        <TextField
          fullWidth
          name="email"
          required
          type="email"
          id="email"
          label="Email"
          placeholder="Enter Email"
          onChange={handleChange}
        />
      </div>
      <div className="input">
        <TextField
          name="password"
          fullWidth
          required
          type="password"
          id="password"
          label="Password"
          placeholder="password"
          onChange={handleChange}
        />
      </div>
      <Button
        onClick={handleSubmit}
        style={{ width: "100%", marginTop: "10px" }}
        variant="contained"
      >
        Login
      </Button>

      <Typography>
        Dont Have Accont ? <Link to="/register">Register</Link>
      </Typography>
    </div>
  );
};

export default Login;
