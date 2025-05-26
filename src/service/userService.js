const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  const user = await User.findOne({ email });
  
  if (!user) {
    console.error("Login attempt with non-existent user:", email);
    throw new Error("Invalid credentials.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    console.error("Login attempt with incorrect password for user:", email);
    throw new Error("Invalid credentials.");
  }

  const secretKey = process.env.SECRET_KEY_JWT;
  const token = jwt.sign({ id: user._id, email: user.email, fullName: user.fullName, role: user.role }, secretKey, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    },
  };
};

module.exports = {
    login
}