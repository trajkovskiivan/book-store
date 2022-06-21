import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Modal from "../../components/Modal";
import useForm from "../../hooks/useForm";
import { useBooksHook } from "../../hooks/useStateHooks";
import { addBook } from "../../store/actions";
import validate from "./validate";

const AddBook = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const books = useBooksHook();
  const state = location.state;
  const [modalVisible, setModalVisible] = useState(false);
  const { values, handleChange, handleSubmit, errors } = useForm(
    {
      name: "",
      author: "",
      year: "",
      tags: "",
    },
    validate,
    submitForm
  );

  async function submitForm(e) {
    values["tags"] = values["tags"].split(",").map((i) => i.trim()) || [];
    dispatch(
      addBook({
        books: books,
        newBook: values,
        navigation,
      })
    );
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="form-container">
          <div className="form-welcome-container">
            <p className="heading-secondary">Add new book</p>
          </div>
          <div className="form-inputs-container">
            <Input
              name={"name"}
              label="Name"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="name"
              value={values.name}
              validationMessage={errors.name}
            />
            <Input
              name={"author"}
              label="Author"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="Author"
              value={values.author}
              validationMessage={errors.author}
            />
            <Input
              name={"year"}
              label="Year"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="Year"
              value={values.year}
              validationMessage={errors.year}
            />
            <Input
              name={"tags"}
              label="Tags"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="Tags"
              value={values.tags}
            />
            <div className="buttons-wrapper">
              <div
                className="option-button-wrapper"
                onClick={() => navigation(-1)}
              >
                <div className="option-button-container">
                  <button type="submit" className={`option-button }`}>
                    <p className="option-text">Cancel</p>
                  </button>
                </div>
              </div>
              <div className="option-button-wrapper" onClick={handleSubmit}>
                <div className="option-button-container">
                  <button type="submit" className={`option-button }`}>
                    <p className="option-text">Add</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
