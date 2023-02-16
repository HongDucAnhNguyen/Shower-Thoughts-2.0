/**
 * This module exports a user login/register form component
 *
 * author: Hong Duc Anh Nguyen
 */

import React, { useState } from "react";
import { login, register } from "../../actions/auth-action";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Input from "./Input";
const Auth = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setisRegister] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register(formData, navigate));
    } else {
      dispatch(login(formData, navigate));
    }
    console.log(formData);
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const authOptionsToggler = () => {
    setisRegister((prevState) => !prevState);
    handleShowPassword();
  };
  if (user) {
    return <Navigate replace to="/home" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h5">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid>
            {isRegister && (
              <>
                <Input
                  type="text"
                  name="firstname"
                  label="First Name"
                  handleChange={(e) => {
                    setFormData({ ...formData, firstname: e.target.value });
                  }}
                ></Input>
                <br />

                <Input
                  type="text"
                  name="lastname"
                  label="Last Name"
                  handleChange={(e) => {
                    setFormData({ ...formData, lastname: e.target.value });
                  }}
                ></Input>
              </>
            )}
            <br />

            <Input
              type="email"
              name="email"
              label="Email"
              handleChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            ></Input>
            <br />

            <Input
              autoCompleteOff
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              handleChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              handleShowPassword={handleShowPassword}
            ></Input>
            <br />
            {isRegister && (
              <>
                <Input
                  type="password"
                  name="confirmpassword"
                  label="Confirm Password"
                  handleChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                  }}
                ></Input>
              </>
            )}
          </Grid>
          <br />
          <Button type="submit" variant="contained" color="primary">
            {isRegister ? "Register" : "Login"} <LoginIcon></LoginIcon>
          </Button>
          <br />
        </form>
        <Button onClick={authOptionsToggler}>
          {isRegister ? "Already have an account? Login" : "New? Register"}
        </Button>
        <br />
      </Paper>
    </Container>
  );
};

export default Auth;
