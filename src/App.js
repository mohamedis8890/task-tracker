import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./Footer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formVisibility, setFormVisibility] = useState(false);

  const baseURL = "http://localhost:5000/tasks";

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(baseURL);
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`${baseURL}/${id}`);
    const data = await res.json();
    return data;
  };

  const onDelete = async (id) => {
    await fetch(`${baseURL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const curTask = await fetchTask(id);
    const updTask = { ...curTask, reminder: !curTask.reminder };
    await fetch(`${baseURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const submitTask = async (newTask) => {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <div className="container">
      <Header
        setFormVisibility={setFormVisibility}
        formVisibility={formVisibility}
      />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              {formVisibility && <AddTask submitTask={submitTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={onDelete}
                  toggleReminder={toggleReminder}
                />
              ) : (
                "No Tasks Yet!"
              )}
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
