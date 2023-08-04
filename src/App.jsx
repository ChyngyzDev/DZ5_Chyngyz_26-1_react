import React, { createContext, useContext, useState } from "react";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };


  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTaskStatus }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const TasksList = () => {
  const { tasks, addTask, deleteTask, toggleTaskStatus } = useContext(
    TasksContext
  );

  const handleAddTask = () => {
    const newTask = { id: Date.now(), title: "Новая задача", completed: false };
    addTask(newTask);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleToggleTaskStatus = (taskId) => {
    toggleTaskStatus(taskId);
  };

  return (
    <div>
      <button onClick={handleAddTask}>Добавить задачу</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTaskStatus(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <TasksProvider>
      <TasksList />
    </TasksProvider>
  );
};

export default App;