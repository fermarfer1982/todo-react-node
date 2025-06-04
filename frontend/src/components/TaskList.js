// frontend/src/components/TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskList = () => {
  // Estado que contiene todas las tareas
  const [tasks, setTasks] = useState([]);
  // Estado para el título de nueva tarea
  const [newTitle, setNewTitle] = useState("");
  // Estado para controlar si estamos procesando actualización de un checkbox
  const [loadingToggleId, setLoadingToggleId] = useState(null);

  // URL de la API (production leerá de env, en dev usará localhost)
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/tasks";

  // Cargar las tareas al montar el componente
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

  // Función para añadir una nueva tarea
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

  // Función para alternar el estado "completed" de una tarea
  const toggleComplete = async (taskId, currentCompleted) => {
    // Si ya estamos procesando la misma tarea, no hacemos nada
    if (loadingToggleId === taskId) return;

    // Nuevo valor invertido para el campo completed
    const updatedCompleted = !currentCompleted;

    try {
      // Marcar que estamos procesando este toggle (para deshabilitar el checkbox)
      setLoadingToggleId(taskId);

      // Llamada PUT para actualizar la tarea en el backend
      await axios.put(`${API_URL}/${taskId}`, { completed: updatedCompleted });

      // Actualizar el estado local: 
      // mapeamos todas las tareas y solo cambiamos la que concuerda con taskId
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, completed: updatedCompleted }
            : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      // (Opcional) Mostrar un alert en la UI:
      // alert("No se pudo actualizar el estado de la tarea. Intenta de nuevo.");
    } finally {
      // Liberar el flag de procesamiento
      setLoadingToggleId(null);
    }
  };

  // Función para borrar una tarea
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error al borrar tarea:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h1>To-Do List</h1>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTitle}
          placeholder="Ingresa nueva tarea"
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ flex: 1, marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <button
          onClick={addTask}
          disabled={!newTitle.trim()}
          style={{ padding: "0.5rem 1rem" }}
        >
          Añadir
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No hay tareas. ¡Agrega una!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                borderBottom: "1px solid #ddd",
              }}
            >
              {/* Checkbox deshabilitado si estamos procesando esa tarea */}
              <input
                type="checkbox"
                checked={task.completed}
                disabled={loadingToggleId === task._id}
                onChange={() => toggleComplete(task._id, task.completed)}
                style={{ marginRight: "0.5rem" }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#888" : "#000",
                }}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  marginLeft: "0.5rem",
                  background: "transparent",
                  border: "none",
                  color: "#d00",
                  cursor: "pointer",
                }}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
