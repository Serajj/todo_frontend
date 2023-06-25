import React, { useState, useContext, useRef } from "react";
import {deleteTodo, getTodoList, markTodo} from './service/api.js';



const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [location, setLocation] = useState({});
  const refContainer = useRef(null);

  const removeTask = async (id) => {
    setIsLoading(true);
    const data = {todo_id:id};
    await deleteTodo(data);
    await getTasks();
    setIsLoading(false);
    showAlert(true, "Todo Removed.");
  };

  const getTasks = async() => {
    const response = await getTodoList();
    setTasks(response.data.data.todos);
    return;
  };

  const toggleDone = async (id) => {
    setIsLoading(true);
    const data = {todo_id : id};
    await markTodo(data);
    await getTasks();
    setIsLoading(false);
    showAlert(true, "Todo State Changed.");
  };

  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(name);
    inputRef.current.focus();
  };

  const showAlert = (show, msg) => {
    setAlert({ show, msg });
  };

  const showColors = (e, id) => {
    const { top, right } = e.target.getBoundingClientRect();
    setLocation({ top, right, id });
    setIsColorsOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        removeTask,
        toggleDone,
        refContainer,
        alert,
        isLoading,
        setIsLoading,
        showAlert,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        editTask,
        name,
        setName,
        getTasks,
        filter,
        setFilter,
        inputRef,
        location,
        setLocation,
        isColorsOpen,
        setIsColorsOpen,
        showColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
