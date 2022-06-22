import { combineReducers } from "redux";
import auth from "./reducer_auth";
import books from "./reducer_books";
export default combineReducers({
  auth,
  books,
});
