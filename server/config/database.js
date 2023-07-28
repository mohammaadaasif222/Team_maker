const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });
const connectDataBase = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DATABASE_CLOUD, {
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("DB connected");
    });
};
module.exports = connectDataBase;
