import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context";
import Task from "./Task";

const List = () => {
  const { tasks, filter } = useGlobalContext();

  let filtred = [...tasks];

  switch (filter) {
    case "all":
      filtred = [...tasks];
      break;
    case "completed":
      filtred = tasks.filter((task) => task.isCompleted);
      break;
    case "uncompleted":
      filtred = tasks.filter((task) => !task.isCompleted);
      break;
    case "date":
      filtred = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "priority":
      filtred = tasks.sort((a, b) => a.priority - b.priority);
      break;
    default:
      filtred = [...tasks];
      break;
  }
  
  return (
    <Droppable droppableId='droppable-1'>
      {(provided, snapshot) => (
        <ul
          className='tasks-wrapper'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filtred.map((task, i) => (
            <Task key={task._id} {...task} index={i} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default List;
