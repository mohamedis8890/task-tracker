import React, { useState } from "react";

export default function AddTask({ submitTask }) {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please enter Task Text!");
      return;
    }

    submitTask({ text, day, reminder });

    setText("");
    setReminder(false);
    setDay("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Task Text</label>
        <input
          type="text"
          placeholder="Add Task text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Date and time</label>
        <input
          type="text"
          placeholder="Add Task date and time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
}
