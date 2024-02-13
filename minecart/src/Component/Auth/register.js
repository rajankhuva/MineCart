import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const field = event.target.name;
    let commonData = { ...registrationData };
    commonData[field] = event.target.value;
    return setRegistrationData(commonData);
  };

  const handleSubmit = () => {
    localStorage.setItem("Registration", JSON.stringify(registrationData));
    navigate("/login");
  };

  return (
    <div className="login">
      <Typography className="Head">Register to MineCart</Typography>

      <div className="input">
        <TextField
          fullWidth
          name="firstname"
          required
          type="text"
          id="firstname"
          label="First Name"
          placeholder="Enter First Name"
          onChange={handleChange}
        />
      </div>
      <div className="input">
      <TextField
          fullWidth
          name="lastname"
          required
          type="text"
          id="lastname"
          label="Last Name"
          placeholder="Enter Last Name"
          onChange={handleChange}
        />
      </div>
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
        Register
      </Button>
    </div>
  );
};

export default Register;
