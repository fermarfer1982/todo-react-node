const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/tasks", taskRoutes);

// Tomar PORT de entorno (Render la asigna) o 5000 por defecto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
