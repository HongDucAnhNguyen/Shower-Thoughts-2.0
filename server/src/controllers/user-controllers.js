import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/Users.js";

//login user
export const login = async (req, res) => {
  try {
    //get data from request body sent from server
    const { email, password } = req.body;
    //check if user with email exists within database, if not throw error
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "No user found with that email" });
    }

    //check if password provided is same as password stored in database
    //compare method returns boolean
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(500).json({ message: "invalid credentials" });
    }

    //if password and email are valid, log user in
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret",
      { expiresIn: "2h" }
    );
    //show user profile when loggedin as well as token
    res.status(200).json({ token: token, result: existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong " });
  }
};

//register user and add profile to database
export const register = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    //check if there is an existing user with email given
    const existingUser = await User.findOne({ email: email });

    //if there is, notify user
    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }
    //if the repeated password does not match password, notify user
    if (password !== confirmPassword) {
      return res.status(404).json({ message: "Passwords do not match" });
    }
    //begin proccess of encrypting data to create new User profile
    //hashPassword with 12 digit salt
    const hashedPassword = await bcrypt.hash(password, 12);
    const UserProfile = await User.create({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    //after new profile created, login the profile with token
    const token = jwt.sign({ email: email, id: UserProfile._id }, "secret", {
      expiresIn: "2h",
    });
    //show newly created user profile and its token
    res.status(200).json({ result: UserProfile, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
