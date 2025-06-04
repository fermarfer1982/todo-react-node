// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// --- NUEVA RUTA EN LA RAÍZ PARA EVITAR 404 -------------------
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de To-Do List");
});
// ------------------------------------------------------------

app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => res.json({ status: "UP" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
