import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

// Define the initial state of the store
const initialState = [];

// Define a reducer function to handle actions
function reducer(state = initialState, action) {
  switch (action.type) {
    case "getRequest":
      return { ...state, getRequest: action.payload };
    case "feedData":
      return { ...state, feedData: action.payload };
    case "responseData":
      return { ...state, responseData: action.payload };
    case "user":
      return { ...state, user: action.payload };
    case "userInput":
      return { ...state, userInput: action.payload };
    default:
      return state;
  }
}

// Create the Redux store with the reducer function and middleware
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
