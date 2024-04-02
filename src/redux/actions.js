// Define action types
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";

// Action creator function to add a todo item
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    todo: text
  },
});

// Action creator function to delete a todo item
const deleteTodo = (index) => ({
  type: DELETE_TODO,
  payload: {
    index: index
  }
});

// Action creator function to edit a todo item
const editTodo = (index, text) => ({
  type: EDIT_TODO,
  payload: {
    index: index,
    text: text
  },
});

// Export the action creator functions
export { addTodo, deleteTodo, editTodo };
