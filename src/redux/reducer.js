import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "./actions";

const initialState = {
  todos: [], // Initialize the todos array
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            todo: action.payload.todo,
          },
        ],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload.index),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((item, index) =>
          index === action.payload.index
            ? { ...item, todo: action.payload.text }
            : item
        ),
      };

    default:
      return state;
  }
};

export default reducer;
