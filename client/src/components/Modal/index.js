import React from "react";

const Modal = ({ visible, setVisible, selectedBook, deleteBook }) => {
  return (
    <div
      className={`modal ${visible ? "visible" : "invisible"}`}
      onClick={(e) => {
        e.stopPropagation();
        setVisible(false);
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="close" onClick={() => setVisible(false)}>
          &times;
        </span>
        <p>
          Are you sure you want to delete <b>{selectedBook.name}</b>
        </p>

        <div>
          <button onClick={() => setVisible(false)}>Canel</button>
          <button onClick={deleteBook}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
