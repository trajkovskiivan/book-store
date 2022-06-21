import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./sass/main.scss";
import { useAuthHook } from "./hooks/useStateHooks";
import Home from "./pages/Home";
import { logout } from "./store/actions";
import { useDispatch } from "react-redux";
import EditBook from "./pages/EditBook";
import ProtectedRoutes from "./routes/protectedRoutes";
import AddBook from "./pages/AddBook";

function App() {
  const auth = useAuthHook();
  const dispatch = useDispatch();
  console.log({ auth });
  return (
    <BrowserRouter>
      {auth.authenticated && (
        <nav className="header">
          <p>{auth.user.email}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </nav>
      )}

      <Routes>
        <Route index path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes user={auth.authenticated}>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/editBook"
          element={
            <ProtectedRoutes user={auth.authenticated}>
              <EditBook />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/addBook"
          element={
            <ProtectedRoutes user={auth.authenticated}>
              <AddBook />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
