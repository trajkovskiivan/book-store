import {
  FETCHING_BOOKS,
  FETCHED_BOOKS_SUCCESS,
  FETCHED_BOOKS_FAILURE,
  DELETE_BOOK_SUCCESS,
  DELETING_BOOK,
  EDITING_BOOK,
  EDIT_BOOK_SUCCESS,
  ADDING_BOOK,
  ADD_BOOK_SUCCESS,
} from "../types";

const initialState = {
  data: [],
  isFetching: false,
  fetched: false,
  error: null,
  selectedBook: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_BOOKS:
      return { data: [], isFetching: true, fetched: false };
    case FETCHED_BOOKS_SUCCESS:
      return { data: action.payload, isFetching: false, fetched: true };
    case FETCHED_BOOKS_FAILURE:
      return {
        data: [],
        isFetching: false,
        fetched: true,
        error: action.payload,
      };

    case DELETING_BOOK:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case EDITING_BOOK:
      return {
        ...state,
        isFetching: true,
      };
    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case ADDING_BOOK:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};
