import React, { useState } from "react";

const Auth = () => {
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
            <label for="firstname">First Name: </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={(e) => {
                setFormData({ ...formData, firstname: e.target.value });
              }}
            />
            <br />
            <label for="lastname">Last Name: </label>
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
        <label for="email">Email: </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <br />
        <label for="password">Password: </label>
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
            <label for="email">Confirm Password: </label>
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
        <button onClick={authOptionsToggler}>
          {isRegister ? "Already have an account? Login" : "New? Register"}
        </button>
      </form>
      <br />
      <a href="/home">Click here to get back to homepage</a>
    </div>
  );
};

export default Auth;
