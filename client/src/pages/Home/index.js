import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useBooksHook } from "../../hooks/useStateHooks";
import { deleteBook } from "../../store/actions";

import { ReactComponent as Bin } from "../../assets/svg/bin.svg";
import { ReactComponent as Pen } from "../../assets/svg/pen.svg";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const books = useBooksHook();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const goToEditPage = (id) => {
    const sBook = books.find((book) => book.id === id);
    navigation("/editBook", { state: { selectedBook: sBook } });
  };

  const prepareDelete = (id) => {
    const sBook = books.find((book) => book.id === id);
    setSelectedBook(sBook);
    setModalVisible(true);
  };
  const renderBooks = () => {
    if (books.length > 0) {
      return books
        .filter(
          (book) =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toString().includes(searchTerm.toLowerCase()) ||
            book.tags.some((tag) =>
              tag.toString().includes(searchTerm.toLowerCase())
            )
        )
        .map((book) => {
          return (
            <tr key={book.id}>
              <td>
                <p>{book.id}</p>
              </td>
              <td>
                <p>{book.name}</p>
              </td>
              <td>
                <p>{book.author}</p>
              </td>
              <td>
                <p>{book.year}</p>
              </td>
              <td>
                <p>
                  {book.tags.length > 0
                    ? book.tags.map(
                        (tag, index) =>
                          `${tag}${index < book.tags.length - 1 ? ", " : ""}`
                      )
                    : "no tags"}
                </p>
              </td>
              <td className="action-buttons">
                <div
                  className="icon-wrapper"
                  onClick={() => goToEditPage(book.id)}
                >
                  <Pen height="20px" width="20px" />
                </div>
                <div
                  className="icon-wrapper"
                  onClick={() => prepareDelete(book.id)}
                >
                  <Bin height="20px" width="20px" />
                </div>
              </td>
            </tr>
          );
        });
    }
  };
  return (
    <div className="layout">
      <Modal
        visible={modalVisible}
        setVisible={setModalVisible}
        selectedBook={selectedBook}
        deleteBook={() => {
          dispatch(deleteBook({ id: selectedBook.id, books: books }));
          setModalVisible(false);
        }}
      />
      <div className="serch-container">
        <Input
          name={"searchTerm"}
          label="Search"
          onChange={(e) => setSearchTerm(e.value)}
          placeholder="Search"
          value={searchTerm}
        />
      </div>

      <button onClick={() => navigation("/addBook")}>Add New Book</button>
      <table>
        <tr>
          <th>
            <p>ID</p>
          </th>
          <th>
            <p>Name</p>
          </th>
          <th>
            <p>Author</p>
          </th>
          <th>
            <p>Year</p>
          </th>
          <th>
            <p>Tags</p>
          </th>
          <th>
            <p>Actions</p>
          </th>
        </tr>

        {renderBooks()}
      </table>
    </div>
  );
};

export default Home;
