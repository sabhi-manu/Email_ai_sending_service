import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppErrorHandler from "../utils/errorHandler.js";
import { redisClient } from "../config/redis/redis.js";

import notificationQueue from "../queues/notification.queue.js";

const userRegisterController = asyncHandler(async (req, res) => {
  console.log("controller register running....")
  const { userName, email, password } = req.body;
console.log(userName, email, password )
  if (!userName || !email || !password) {
    throw new AppErrorHandler(400, "All fields are required");
  }

  const isUserExists = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (isUserExists) {
    throw new AppErrorHandler(409, "User already exists");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();


  const hashPassword = await bcrypt.hash(password, 10);

  const data = {
    email,
    userName,
    password: hashPassword,
    otp,
  };

  const key = `rg:${email}`;

 await redisClient.set(key, JSON.stringify(data), "EX", 5 * 60);

   await notificationQueue.add(
    "otp",
    {
      email: email,
      subject: "OTP for registration",
      text: `Your OTP for registration is ${otp}. It will expire in 5 minutes.`,
    },
    {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
    },
  );


  res.status(200).json({
    success: true,
    message: "otp send to you email address.",
  });
});

const userLoginController = asyncHandler(async (req, res) => {
  const { email, password, userName } = req.body;
  if (!password || !(email || userName)) {
    throw new AppErrorHandler(400, "detail not provided.");
  }

  const user = await User.findOne({ $or: [{ email }, { userName }] });

  if (!user) throw new AppErrorHandler(401, "Invalid details.");
  
  if(!user.isVerified){
    throw new AppErrorHandler(401, "Please verify your email before logging in.");
  }
  const isPasswordCrt = await bcrypt.compare(password, user.password);
  if (!isPasswordCrt) throw new AppErrorHandler(401, "invalid details.");

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
console.log("login user details ===>",user )
  res.cookie("token", token);
  res.status(201).json({
    success: true,
    message: "user login successfully.",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
});

const userLogoutController = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
console.log("logout controller running....",token)
  const key = `bl:${token}`;

  if (token) {
    await redisClient.set(key, token, 
      "EX", 60 * 60 * 24,
    );
  }

  await res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "user logout successfully.",
  });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const key = `rg:${email}`;
  let redisUserRg = await redisClient.get(key);
  if (!redisUserRg) {
    throw new AppErrorHandler(400, "invalid details.");
  }
  const data = JSON.parse(redisUserRg);
  if (data.otp !== otp) {
    throw new AppErrorHandler(400, "invalid details.");
  }

  const user = await User.create({
    userName: data.userName,
    email: data.email,
    password: data.password,
    isVerified:true
  });

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  await notificationQueue.add(
    "welcome",
    {
      email: user.email,
      subject: "Welcome to our platform ",
      text: `${user.userName} , welcome !!`,
    },
    {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
    },
  );
  await redisClient.del(key);
  res.status(200).json({
    success: true,
    message: "user create successfully.",
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
  });
});

const currentUserController = asyncHandler(async (req, res) => {
  console.log("current user controller running....",req.user)
  const { id } = req.user;
  const user = await User.findById({ _id: id }).select("-password");
  if (!user) {
    throw new AppErrorHandler(404, "User not found.");
  }
  res.status(200).json({
    message: "user fetch successfully.",
    user,
  });
});

export default {
  userRegisterController,
  userLoginController,
  userLogoutController,
  verifyOtp,
  currentUserController,
};
