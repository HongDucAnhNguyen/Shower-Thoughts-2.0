import React, { useState } from "react";
import { login, register } from "../../actions/auth-action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Input,
} from "@mui/material";
const Auth = () => {
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
  return (
    <Container>
      <Paper>
        <a href="/home">Click here to get back to homepage</a>
        <Typography variant="h5">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid>
            {isRegister && (
              <>
                <label>First Name: </label>
                <Input
                  required={true}
                  name="firstname"
                  label="First Name"
                  handleChange={(e) => {
                    setFormData({ ...formData, firstname: e.target.value });
                  }}
                ></Input>
                <br />
                <label>Last Name: </label>
                <Input
                  required={true}
                  name="lastname"
                  label="Last Name"
                  handleChange={(e) => {
                    setFormData({ ...formData, lastname: e.target.value });
                  }}
                ></Input>
              </>
            )}
            <br />
            <label>Email: </label>
            <Input
              required={true}
              name="email"
              label="Email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            ></Input>
            <br />
            <label>Password: </label>
            <Input
              required={true}
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              handleShowPassword={handleShowPassword}
            ></Input>
            <br />
            {isRegister && (
              <>
                <label>Confirm Password: </label>
                <Input
                  required
                  type="text"
                  name="confirmpassword"
                  value={formData.confirmPassword}
                  onChange={(e) => {
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
            {isRegister ? "Register" : "Login"}
          </Button>
          <br />
        </form>
        <Button
          variant="contained"
          style={{ backgroundColor: "#2f5ca3", color: "#FFFFFF" }}
          onClick={authOptionsToggler}
        >
          {isRegister ? "Already have an account? Login" : "New? Register"}
        </Button>
        <br />
      </Paper>
    </Container>
  );
};

export default Auth;
