// src/components/TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup, Spinner, Badge } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error al añadir tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">📝 Mis Tareas</h1>

          {/* Formulario para añadir tareas */}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
            className="mb-3"
          >
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  placeholder="Escribe una nueva tarea"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col xs={3}>
                <Button variant="primary" type="submit" className="w-100">
                  Añadir
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Indicador de carga */}
          {loading && (
            <div className="text-center my-3">
              <Spinner animation="border" variant="secondary" />
            </div>
          )}

          {/* Lista de tareas */}
          {!loading && (
            <ListGroup>
              {tasks.length === 0 && (
                <ListGroup.Item className="text-center text-muted">
                  No hay tareas aún.
                </ListGroup.Item>
              )}
              {tasks.map((task) => (
                <ListGroup.Item
                  key={task._id}
                  variant={task.completed ? "light" : ""}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div>
                    <Form.Check
                      type="checkbox"
                      label={
                        <span className={task.completed ? "text-decoration-line-through text-muted" : ""}>
                          {task.title}
                        </span>
                      }
                      checked={task.completed}
                      onChange={() => toggleComplete(task)}
                      inline
                    />
                  </div>
                  <Badge
                    bg={task.completed ? "success" : "warning"}
                    className="me-3"
                  >
                    {task.completed ? "Completada" : "Pendiente"}
                  </Badge>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteTask(task._id)}
                  >
                    Borrar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;
