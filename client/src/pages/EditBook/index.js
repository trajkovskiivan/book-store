import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Modal from "../../components/Modal";
import useForm from "../../hooks/useForm";
import { useBooksHook } from "../../hooks/useStateHooks";
import { deleteBook, editBook } from "../../store/actions";
import validate from "../AddBook/validate";

const EditBook = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const books = useBooksHook();
  const state = location.state;
  const [modalVisible, setModalVisible] = useState(false);

  const { values, handleChange, handleSubmit, errors, setValues } = useForm(
    {
      name: "",
      author: "",
      year: "",
      tags: "",
    },
    validate,
    submitForm
  );

  useEffect(() => {
    if (state && state.selectedBook) {
      const sBook = state.selectedBook;
      setValues(sBook);
    } else {
      navigation("/home");
    }
  }, []);
  async function submitForm(e) {
    values["tags"] = values["tags"].split(",").map((i) => i.trim()) || [];
    dispatch(
      editBook({
        books: books,
        editedBook: values,
        navigation,
      })
    );
  }

  return (
    <div className="login-wrapper">
      <Modal
        visible={modalVisible}
        setVisible={setModalVisible}
        selectedBook={values}
        deleteBook={() => {
          dispatch(deleteBook({ id: values.id, books: books }));
          setModalVisible(false);
          navigation(-1);
        }}
      />
      <div className="login-container">
        <div className="form-container">
          <div className="form-welcome-container">
            <p className="heading-secondary">Edit {values.name}</p>
          </div>
          <div className="form-inputs-container">
            <Input
              name={"name"}
              label="Name"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="name"
              value={values.name}
            />
            <Input
              name={"author"}
              label="Author"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="Author"
              value={values.author}
            />
            <Input
              name={"year"}
              label="Year"
              onChange={(e) => handleChange(e.value, e.name)}
              placeholder="Year"
              value={values.year}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setModalVisible(true);
                }}
              >
                <div className="option-button-container">
                  <button type="submit" className={`option-button }`}>
                    <p className="option-text">Delete</p>
                  </button>
                </div>
              </div>
              <div
                className="option-button-wrapper"
                onClick={() => navigation.goBack()}
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
                    <p className="option-text">Save</p>
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

export default EditBook;
