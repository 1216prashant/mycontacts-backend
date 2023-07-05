const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await UserModel.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User Already Registered");
  }
  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User Created: ${user}`);
  if (user) {
    res.status(201).json({message:"Register Success", _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User Data Not Valid. User Registration Failed.");
  }
  res.json({ message: "Register the User" });
});

//@desc Login  User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
 
  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are manadatory");
  }else{
    
    const user = await UserModel.findOne({email});
  //compare password with hashed password
  if(user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    res.status(200).json({message:"Login Success",accessToken:accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password not valid");
  }
   }
  
});

//@desc Get Current User
//@route POST /api/users/currentuser
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
