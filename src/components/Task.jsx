import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteOutline,
  MdOutlineColorLens,
} from "react-icons/md";
import { useGlobalContext } from "../context";

const Task = ({ _id, description, isCompleted,dueDate, priority ,color, index }) => {
  const { removeTask, toggleDone, showColors } = useGlobalContext();

  const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Draggable key={_id} draggableId={"draggable-" + _id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 5rem #666" : "none",
            opacity: snapshot.isDragging
              ? "1"
              : provided.draggableProps.style.opacity,
            backgroundColor: color,
          }}
          className={`task ${isCompleted && "task-done"}`}
        >
          <p>{description}</p>
          
          <span>{formattedDate}</span>
          <button onClick={() => toggleDone(_id)}>
            {isCompleted ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </button>
          <button onClick={() => removeTask(_id)}>
            <MdDeleteOutline />
          </button>
          {/* <button onClick={() => editTask(_id)}>
            <FiEdit />
          </button> */}
          <button className='btn-colors' onClick={(e) => showColors(e, _id)}>
            <MdOutlineColorLens className='preventClick' />
          </button>
          <span className="task-priority">{priority}</span>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
