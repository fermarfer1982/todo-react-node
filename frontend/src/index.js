// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";

// Importa el CSS de Bootstrap (sin invocar PostCSS ni Tailwind)
import "bootstrap/dist/css/bootstrap.min.css";

// Si tenías un index.css con Tailwind, coméntalo o elimínalo:
// import "./index.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

