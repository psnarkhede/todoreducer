import React, { useReducer, useState } from "react";
import styles from "./Todo.module.css";

const handlesubmit = (state, action) => {
  switch (action.type) {
    case "add-todo":
      if(action.task !== ""){
      return [...state, { task: action.task, isCompleted: false }];
      }
      

    case "toggle-todo":
      return state.map((el, index) =>
        index === action.ind ? { ...el, isCompleted: !el.isCompleted } : el
      );

    case "Delete":
      return state.filter((el, index) => index !== action.ind);

    default:
      return state;
  }
};

const Todo = () => {
  const [todos, dispatch] = useReducer(handlesubmit, []);

  const [task, setTask] = useState("");

  return (
    <div>
      <div className={styles.inputbox}>
        <input
        className={styles.input}
          placeholder="Todo..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
        className={styles.submit}
          onClick={() => (
            dispatch({ type: "add-todo", task }, setTask(""))
          )}
        >
          Submit
        </button>
      </div>

      {todos.map((el, ind) => (
        <div className={styles.todolist} key={ind}>
          <div className={styles.check}>
            <input className={styles.checkbox}
              type="checkbox"
              onChange={() => dispatch({ type: "toggle-todo", ind })}
            />
          </div>

          <div className={el.isCompleted ? styles.strike : styles.text}>{el.task}</div>
          <div className={styles.btn}>
            <button className={styles.delete} onClick={() => dispatch({ type: "Delete", ind })}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
