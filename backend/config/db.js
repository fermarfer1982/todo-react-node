// backend/config/db.js
const mongoose = require("mongoose");
require("dotenv").config(); // <-- Asegúrate de que está aquí

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado a MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
