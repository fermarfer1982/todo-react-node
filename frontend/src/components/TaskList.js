// frontend/src/components/TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Asegúrate de definir API_URL fuera del JSX:
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/tasks";

  // ---------------------------------------------------------
  // Si quieres hacer un console.log, hazlo aquí, antes del return:
console.log("→ Valor de API_URL en producción:", API_URL);
  // ---------------------------------------------------------

  // Cargar tareas al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL);
        setTasks(res.data);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };
    fetchTasks();
  }, [API_URL]);

  // Función para añadir tarea
  const addTask = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post(API_URL, { title: newTitle });
      setTasks((prev) => [...prev, res.data]);
      setNewTitle("");
    } catch (error) {
      console.error("Error al añadir tarea:", error);
    }
  };

  return (
    <div>
      <h1>Mis Tareas</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={addTask}>Añadir</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {/* ...actualizar tarea... */}}
            />
            {task.title} {task.completed && <span>(Completada)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
