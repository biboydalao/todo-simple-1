import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("todo");

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, text: input } : t));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    }

    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const filteredTasks = tasks
    .filter(t => (tab === "todo" ? !t.completed : t.completed))
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <h1>To-Do App</h1>

      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 20 }}
      />

      <input
        placeholder="Enter task..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <div className="tabs" style={{ marginTop: 20 }}>
        <button
          onClick={() => setTab("todo")}
          style={{ background: tab === "todo" ? "#ddd" : "#fff" }}
        >
          To Do
        </button>
        <button
          onClick={() => setTab("completed")}
          style={{ background: tab === "completed" ? "#ddd" : "#fff" }}
        >
          Completed
        </button>
      </div>

      <ul style={{ marginTop: 20, padding: 0 }}>
        {filteredTasks.length === 0 && <p>No tasks found.</p>}

        {filteredTasks.map(task => (
          <li key={task.id} className="todo-item">
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>

            <div>
              <button
                onClick={() => {
                  setEditId(task.id);
                  setInput(task.text);
                }}
              >
                Edit
              </button>

              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
