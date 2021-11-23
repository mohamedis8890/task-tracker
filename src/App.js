import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./Footer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
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
    let data;
    try {
      const res = await fetch(baseURL);
      data = await res.json();
    } catch (error) {
      setErrorMessage("Connection Problem or Server Error!");
      return [];
    } finally {
      return data;
    }
  };

  const fetchTask = async (id) => {
    let res;
    try {
      res = await fetch(`${baseURL}/${id}`);
    } catch (error) {
      return setErrorMessage("Unable to fetch task.");
    } finally {
      const data = res && (await res.json());
      return data;
    }
  };

  const onDelete = async (id) => {
    try {
      await fetch(`${baseURL}/${id}`, { method: "DELETE" });
    } catch (error) {
      return setErrorMessage("Unable to delete task.");
    } finally {
      return setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleReminder = async (id) => {
    const curTask = await fetchTask(id);
    const updTask = { ...curTask, reminder: !curTask.reminder };

    try {
      await fetch(`${baseURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });
    } catch (error) {
      return setErrorMessage("Unable to toggle reminder.");
    } finally {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: !task.reminder } : task
        )
      );
    }
  };

  const submitTask = async (newTask) => {
    let res;
    try {
      res = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      return setErrorMessage("Unable to save task.");
    } finally {
      const data = res && (await res.json());
      setTasks([...tasks, data]);
    }
  };

  return (
    <div className="container">
      {errorMessage && <div className="error">{errorMessage}</div>}
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
              {tasks?.length > 0 ? (
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
