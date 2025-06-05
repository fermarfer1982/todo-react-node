# To-Do List Full-Stack

![To-Do List](https://todo-frontend-ina7t.vercel.app/static/media/screenshot.abc123.png)

Una aplicación de lista de tareas (To-Do List) desarrollada con React en el frontend, Node.js y Express en el backend, y MongoDB Atlas como base de datos. El frontend está desplegado en Vercel y el backend en Render.

---

## 📚 Tecnologías y Herramientas

- **Frontend**  
  - React 19 (Create React App)  
  - Axios (para consumir la API)  
  - Bootstrap 5 (estilos básicos)  
  - CSS Grid / flexbox para maquetación  
  - Vercel (hosting / CI-CD)

- **Backend**  
  - Node.js v22  
  - Express  
  - Mongoose (ODM para MongoDB)  
  - MongoDB Atlas (base de datos en la nube)  
  - Render (hosting / CI-CD)

- **Otras Herramientas**  
  - Git / GitHub (control de versiones)  
  - Postman / cURL (pruebas de la API)  
  - ESLint / Prettier (estilo de código)  
  - dotenv (gestión de variables de entorno)

---

## 📁 Estructura de Carpetas

todo-react-node/
├── backend/
│ ├── config/
│ │ └── db.js # Conexión a MongoDB Atlas / Local
│ ├── controllers/
│ │ └── taskController.js # Lógica de CRUD de tareas
│ ├── models/
│ │ └── Task.js # Esquema de Mongoose para la colección tasks
│ ├── routes/
│ │ └── taskRoutes.js # Definición de rutas REST: GET, POST, PUT, DELETE
│ ├── .env # (Ignorado por Git) Contiene MONGO_URI
│ ├── index.js # Punto de entrada: configura Express y monta rutas
│ └── package.json # Dependencias de backend
│
├── frontend/
│ ├── public/
│ │ ├── index.html # Plantilla HTML principal
│ │ └── manifest.json # Manifest para PWA (opcional)
│ ├── src/
│ │ ├── api.js # Funciones Axios para comunicar con el backend
│ │ ├── App.js # Componente raíz de React
│ │ ├── index.js # Renderiza <App /> en el DOM
│ │ └── components/
│ │ └── TaskList.js # Lógica completa de listar, agregar, actualizar y borrar tareas
│ ├── .env # (Ignorado por Git) Contiene REACT_APP_API_URL
│ └── package.json # Dependencias de frontend
│
├── README.md # Este archivo
└── .gitignore


---

## ⚙️ Instalación y Ejecución en Desarrollo

### Prerrequisitos

- Node.js v16+ (recomendado v18 LTS o superior)  
- npm (v8+) o yarn  
- Una cuenta en MongoDB Atlas o MongoDB instalado localmente  

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/fermarfer1982/todo-react-node.git
cd todo-react-node
