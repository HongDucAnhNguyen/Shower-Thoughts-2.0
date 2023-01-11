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
      return res.status(404).json({ creds_err_message: "No user found with that email" });
    }

    //check if password provided is same as password stored in database
    //compare method returns boolean, pulls salt from hashedPassword, hash plaintext password and compare
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(500).json({ creds_err_message: "invalid credentials" });
    }

    //if password and email are valid, log user in

    //create jwt for user with secret key
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
     process.env.SECRET_KEY ,
      { expiresIn: "2h" }
    );
    //send client jwt
    res.status(200).json({ token: token, result: existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ creds_err_message: "something went wrong " });
  }
};

//register user and add profile to database
export const register = async (req, res) => {
  const { email, password, firstname, lastname, confirmPassword } = req.body;
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
      name: `${firstname} ${lastname}`,
    });

    //create jwt with secret key
    const token = jwt.sign({ email: email, id: UserProfile._id },  process.env.SECRET_KEY , {
      expiresIn: "4h",
    });

    //send client the jwt
    res.status(200).json({ result: UserProfile, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ creds_err_message: "something went wrong" });
  }
};
