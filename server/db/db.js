const mongoose = require("mongoose");

const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`The db is connected to the host: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to the mongo db", error.message);
    process.exit(1);
  }
};

module.exports = db;
