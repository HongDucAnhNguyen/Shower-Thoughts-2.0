import React, { useState } from "react";
import { login, register } from "../../actions/auth-action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    <div>
      <h5>{isRegister ? "Register" : "Login"}</h5>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label>First Name: </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={(e) => {
                setFormData({ ...formData, firstname: e.target.value });
              }}
            />
            <br />
            <label>Last Name: </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={(e) => {
                setFormData({ ...formData, lastname: e.target.value });
              }}
            />
          </>
        )}
        <br />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <br />
        <label>Password: </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <br />
        {isRegister && (
          <>
            <label>Confirm Password: </label>
            <input
              type="text"
              name="confirmpassword"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
            />
          </>
        )}
        <br />
        <input type="submit" value={isRegister ? "Register" : "Login"} />
        <br />
      </form>
      <button onClick={authOptionsToggler}>
        {isRegister ? "Already have an account? Login" : "New? Register"}
      </button>
      <br />
      <a href="/home">Click here to get back to homepage</a>
    </div>
  );
};

export default Auth;
