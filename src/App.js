import React, { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "task 1", day: "Feb 5th at 2:30pm", reminder: true },
    { id: 2, text: "task 2", day: "Feb 5th at 2:30pm", reminder: false },
    { id: 3, text: "task 3", day: "Feb 5th at 2:30pm", reminder: true },
  ]);

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={onDelete}
          toggleReminder={toggleReminder}
        />
      ) : (
        "No Tasks Yet!"
      )}
    </div>
  );
}

export default App;
