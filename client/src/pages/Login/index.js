import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import { validateEmail } from "../../helpers/validators";
import useForm from "../../hooks/useForm";
import { useAuthHook } from "../../hooks/useStateHooks";
import { loginUser, tryLocalSignin } from "../../store/actions";
import validate from "./validate";

function Login() {
  const dispatch = useDispatch();
  const auth = useAuthHook();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors } = useForm(
    {
      email: "",
      password: "",
    },
    validate,
    submitForm
  );

  useEffect(() => {
    dispatch(tryLocalSignin());
    if (auth.authenticated) {
      navigate("/home");
    }
  }, [auth.authenticated]);

  async function submitForm(e) {
    dispatch(loginUser({ values }));
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="form-container">
          <div className="form-welcome-container">
            <p className="heading-secondary">Login</p>
          </div>
          <div className="form-inputs-container">
            <Input
              name={"email"}
              label="Email"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="Email"
              value={values.email}
              validationMessage={errors.email}
            />
            <Input
              name={"password"}
              label="Password"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="Password"
              value={values.password}
              validationMessage={errors.password}
            />

            <div className="login-button-wrapper" onClick={handleSubmit}>
              <div className="login-button-container">
                <button
                  type="submit"
                  className={`login-button }`}
                  // className={`login-button ${
                  //   loading && "login-button--loading"
                  // }`}
                >
                  <p className="login-text">Sign In</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
