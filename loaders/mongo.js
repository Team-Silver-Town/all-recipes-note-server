const mongoose = require("mongoose");
const envKeys = require("../config/config");

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error occured connecting to DB: ${error}`);

exports.connect = async () => {
  try {
    await mongoose.connect(envKeys.MONGO_DB_URL);
    require("../models/Menu");
    require("../models/Recipe");
    require("../models/Note");
    require("../models/Tip");
  } catch (error) {
    handleError(error);
  }
};

exports.close = async () => {
  try {
    await db.close();
  } catch (error) {
    handleError(error);
  }
};

db.once("open", handleOpen);
db.on("error", handleError);
