// Import necessary modules from React and React Redux
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import action creators from local actions file
import { addTodo, deleteTodo, editTodo } from "./actions";

// Import CSS file for styling
import "./App.css";

// Define the functional component App
function App() {
  // Get the todos array from the Redux store
  const todos = useSelector((state) => state.todos);

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Initialize state variables using useState hook
  const [text, setText] = useState(""); // for input text
  const [editIndex, setEditIndex] = useState(null); // for tracking index of todo being edited

  // Function to handle adding or editing a todo
  const handleAddTodo = () => {
    if (text.trim() !== "") { // Check if input text is not empty
      if (editIndex !== null) { // If editing an existing todo
        dispatch(editTodo(editIndex, text)); // Dispatch editTodo action
        setEditIndex(null); // Reset editIndex
      } else { // If adding a new todo
        dispatch(addTodo(text)); // Dispatch addTodo action
      }
      setText(""); // Clear the input text
    }
  };

  // Function to handle editing a todo
  const handleEditTodo = (index, todo) => {
    setText(todo); // Set input text to the current todo text
    setEditIndex(index); // Set the index of todo being edited
  };

  // Render the component
  return (
    <div className="app-container">
      <h1>Todo App using Redux</h1>
      {/* Input field and add/edit button */}
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button className="add-button" onClick={handleAddTodo}>
          {editIndex !== null ? "Edit" : "Add"}
        </button>
      </div>
      {/* List of todos */}
      <ul className="todo-list">
        {/* Map over todos array to render each todo */}
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editIndex === index ? ( // If editing the current todo
              <input
                type="text"
                value={text} // Set the value to the current todo text
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              // If not editing, display todo text
              <span className="todo-text">{todo.todo}</span>
            )}
            {/* Buttons for editing/deleting todos */}
            <div className="button-container">
              {editIndex === index ? ( // If editing the current todo
                <>
                  <button
                    className="save-button"
                    onClick={() => {
                      dispatch(editTodo(index, text)); // Dispatch editTodo action
                      setEditIndex(null); // Reset editIndex
                      setText(""); // Clear input text
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setEditIndex(null); // Reset editIndex
                      setText(""); // Clear input text
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                // If not editing, display edit/delete buttons
                <>
                  <button
                    className="edit-button"
                    onClick={() => handleEditTodo(index, todo.todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => dispatch(deleteTodo(index))}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export the App component as the default export
export default App;
