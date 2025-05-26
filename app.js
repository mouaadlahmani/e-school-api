const express = require("express");
const connectDB = require("./src/config/Db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const cors = require("cors")
const userModel = require("./src/model/User");
const countryRoutes = require("./src/routes/countryRoutes");
const levelRoutes = require("./src/routes/levelRoutes");
const academicLevelRoutes = require("./src/routes/academicLevelRoutes");
const subjectRoutes = require("./src/routes/subjectRoutes");
const titleRoutes = require("./src/routes/titleRoutes");
const folderRoutes = require("./src/routes/folderRoutes");
const userRoutes = require("./src/routes/userRoutes");

dotenv.config();
const app = express();

const PORT = process.env.PORT || "3000";
connectDB();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api/auth", userRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/level", levelRoutes);
app.use("/api/academic", academicLevelRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/title", titleRoutes);
app.use("/api/folder", folderRoutes);
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