const express = require("express");
const connectDB = require("./src/config/Db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const userModel = require("./src/model/User");

dotenv.config();
const app = express();

const PORT = process.env.PORT || "3000";
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

const createAdmin = async () =>{
  try {
    const fullname = "E-School";
    const email = "admin@gmail.com";
    const password = "admin";
    const role = "admin"

    const existingAdmin = await userModel.findOne({ email });
    if(!existingAdmin){

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new userModel({fullname, email, password: hashedPassword, role});
      await newAdmin.save();
      console.log("Admin created successfully.");
    }else{
      console.log("Admin already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

app.listen(PORT, async ()=> {
  await createAdmin();
  console.log(`E-shcool running on http://localhost:${PORT}`);
})

module.exports = app;