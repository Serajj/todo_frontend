import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "../context";
import Colors from "./Colors";
import { useNavigate } from "react-router";

import Modal from "react-modal";
import { useState } from "react";
import "./style/main.scss";
import { createTodo, getTodoList } from "../service/api";
import LoaderModal from "./Modal";
import { toast } from "react-hot-toast";

const Main = (props) => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isLoading,
    setIsLoading,
    editId,
    setEditId,
    name,
    setName,
    filter,
    getTasks,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
  } = useGlobalContext();
  Modal.setAppElement("#root");
  const [originalTasks, setOriginalTasks] = useState(tasks);

  const [isSearching, setisSearching] = useState(false);

  const handleSearch = async (e) => {
    if (!isSearching) {
       setOriginalTasks(tasks ?? []);
       setisSearching(true);
    }

    const searchWord = e.target.value;
    setTasks(originalTasks.filter((task) => task.description.toLowerCase().includes(searchWord.toLowerCase())));
    setName(searchWord);
  };

 

  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTasks([]);
    showAlert(true, "Your list is clear!");
  };


  const navigation = useNavigate();
  useEffect(() => {
    if (!props.user) {
      navigation("/login");
    }
    //feching data from api
    const fetchData = async () => {
        await getTasks();
    };

    fetchData();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  const hideColorsContainer = (e) => {
    
    //   body.
    if (e.target.classList.contains("btn-colors")) return;
    if(isColorsOpen){
      toast.error("This feature is pendig due to lack of time.");
    }
    setIsColorsOpen(false);
  };

  //modal functions
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [formData, setFormData] = useState({
    description: "",
    dueDate: "",
    priority: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic

    closeModal();
    setIsLoading(true);
    const response = await createTodo(formData);
    setIsLoading(false);
    if(response.data.status){
      setTasks([response.data.data , ...tasks]);
      setFormData({description: "",
      dueDate: "",
      priority: "",});
    }
  };

  return (
    <>
      <div className="main-container" onClick={hideColorsContainer}>
        {isColorsOpen && <Colors />}
        {alert && <Alert msg={alert.msg} />}
        <form className="head" onSubmit={() => {}}>
          <input
            type="text"
            ref={inputRef}
            placeholder="New Task"
            value={name}
            onChange={handleSearch}
          />
          <button onClick={openModal} type="button">
            {" "}
            {"Add"}
          </button>
        </form>
        <div className="filter">
          <button
            data-filter="all"
            className={filter === "all" ? "active" : ""}
            onClick={filterTasks}
          >
            All
          </button>
          <button
            data-filter="completed"
            className={filter === "completed" ? "active" : ""}
            onClick={filterTasks}
          >
            Completed
          </button>
          <button
            data-filter="uncompleted"
            className={filter === "uncompleted" ? "active" : ""}
            onClick={filterTasks}
          >
            Uncompleted
          </button>
          <button
            data-filter="date"
            className={filter === "date" ? "active" : ""}
            onClick={filterTasks}
          >
            By date
          </button>

          <button
            data-filter="priority"
            className={filter === "priority" ? "active" : ""}
            onClick={filterTasks}
          >
            By priority
          </button>
         
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          {tasks?.length > 0 ? (
            <List />
          ) : (
            <p className="no-tasks">Your list is clear!</p>
          )}
        </DragDropContext>
        {tasks?.length > 2 && (
          <button
            className="btn-delete-all"
            onClick={deleteAll}
            title="Delete All Tasks (Completed and Uncompleted)!"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="footer"></div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="add-todo-modal"
      >
        <h2>Add a todo</h2>
        <form onSubmit={handleSubmit}>
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <div className="form-secondry-container">
            <div className="priority-container">
              <label>Priority</label>
              <input
                type="number"
                min={0}
                max={10}
                
                name="priority"
                onChange={handleChange}
              />
            </div>
            <div className="due-date-container">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="atdbtnctnr">
          <button onClick={closeModal}>Cancel</button>
            <button type="submit">Add Todo</button>
            
          </div>
        </form>
      </Modal>
      {isLoading && <LoaderModal isOpen={true} title={"Validating..."} />}
    </>
  );
};

export default Main;
