import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../store/actions";

export const useStateHook = () => {
  const state = useSelector((state) => state);
  return state;
};

export const useAuthHook = () => {
  const auth = useSelector((state) => state.auth);
  return auth;
};
export const useBooksHook = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.data);
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, []);

  return books;
};
