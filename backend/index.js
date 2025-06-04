// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();        // Opcional: ayuda a que también index.js cargue .env
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

connectDB();                       // Conecta a MongoDB antes de levantar el servidor

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de To-Do List");
});

app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => res.json({ status: "UP" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
