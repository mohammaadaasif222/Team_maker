const express = require("express");
const usersRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { createUser ,updateUserProfile} = require("./controllers/authController");

dotenv.config({ path: "config/config.env" });

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express(); 

app.use(cors("origin", "*"));  

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.diskStorage({});
const upload = multer({ storage });

app.post("/api/users", upload.single("avatar"),createUser)
app.put("/api/users/:id", upload.single("avatar"), updateUserProfile)
// Routes
app.use("/api/users", usersRoutes);
app.use("/api/team", teamRoutes);
// Middle wares
app.use(errorMiddleware);

module.exports = app;
