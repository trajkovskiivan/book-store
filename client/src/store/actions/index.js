import axios from "axios";
import {
  SAVE_AUTH_STATE,
  FETCHING_BOOKS,
  FETCHED_BOOKS_SUCCESS,
  FETCHED_BOOKS_FAILURE,
  CLEAN_AUTH_STATE,
  DELETING_BOOK,
  DELETE_BOOK_SUCCESS,
  EDITING_BOOK,
  EDIT_BOOK_SUCCESS,
  ADDING_BOOK,
  ADD_BOOK_SUCCESS,
} from "../types";
import {
  cacheUser,
  getCacheUser,
  uncacheUser,
} from "../../hooks/useLocalStorage";
import { nanoid } from "nanoid";

const baseRoute = "http://localhost:4000/api";

// Example actions with thunk dispatch

export const tryLocalSignin = () => async (dispatch) => {
  const user = await getCacheUser();
  if (user) {
    const { email, password } = user;
    return dispatch({
      type: SAVE_AUTH_STATE,
      payload: {
        user: {
          email,
          password,
        },
        authenticated: true,
      },
    });
  }
  return null;
};

export const loginUser =
  ({ values }) =>
  async (dispatch) => {
    const { email, password } = values;
    cacheUser({ email, password });

    dispatch({
      type: SAVE_AUTH_STATE,
      payload: {
        user: {
          email,
          password,
        },
        authenticated: true,
      },
    });
  };
export const logout = () => async (dispatch) => {
  uncacheUser();

  dispatch({
    type: CLEAN_AUTH_STATE,
  });
};

export const fetchBooks = () => async (dispatch) => {
  dispatch({
    type: FETCHING_BOOKS,
  });

  return axios
    .get(`${baseRoute}/books`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: FETCHED_BOOKS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: FETCHED_BOOKS_FAILURE,
          error: "fail",
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: FETCHED_BOOKS_FAILURE,
        error: err.code,
      });
    });
};

export const deleteBook =
  ({ id, books }) =>
  async (dispatch) => {
    dispatch({
      type: DELETING_BOOK,
    });
    const filteredBooks = books.filter((book) => book.id !== id);
    dispatch({
      type: DELETE_BOOK_SUCCESS,
      payload: filteredBooks,
    });
  };

export const editBook =
  ({ books, editedBook, navigation }) =>
  async (dispatch) => {
    dispatch({
      type: EDITING_BOOK,
    });
    const bookIndex = books.findIndex((book) => book.id === editedBook.id);
    books[bookIndex] = editedBook;

    dispatch({
      type: EDIT_BOOK_SUCCESS,
      payload: books,
    });
    navigation(-1);
  };

export const addBook =
  ({ books, newBook, navigation }) =>
  async (dispatch) => {
    dispatch({
      type: ADDING_BOOK,
    });
    newBook["id"] = nanoid();
    const newBooks = [...books, newBook];

    dispatch({
      type: ADD_BOOK_SUCCESS,
      payload: newBooks,
    });
    navigation(-1);
  };
