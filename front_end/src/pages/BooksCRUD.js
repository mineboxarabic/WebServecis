import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Alert, Toast } from "react-bootstrap";
import { _LINK } from "../linkServer";
import "../styles/Tables.scss";

function MyModal(props) {
  const handleClose = () => props.setShow(false);
  const [bookData, setBookData] = useState({
    title: "",
    date: "",
    author_id: 0,
    rated: 0,

  });

  function getDate() {
    let date = new Date(props.bookData.date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }
  useEffect(() => {
    if (props.isEdit) setBookData(props.bookData);
  }, [props.bookData]);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.isEdit ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger" show={props.validated.error}>
          {props.validated.message}
        </Alert>
        <Form>
          <Form.Group controlId="formBookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={props.bookData.title}
              onChange={(e) =>
                props.setBookData({ ...props.bookData, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBookDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getDate()}
              onChange={(e) =>
                props.setBookData({ ...props.bookData, date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBookRated">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              max={5}
              min={0}
              value={props.bookData.rated}
              onChange={(e) =>
                props.setBookData({ ...props.bookData, rated: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBookAuthorId">
            <Form.Label>Author ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Author ID"
              value={props.bookData.author_id}
              onChange={(e) =>
                props.setBookData({
                  ...props.bookData,
                  author_id: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => props.handleSave(props.bookData)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteModal(props) {
  const handleClose = () => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          Are you sure you want to delete this book?
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={() => props.handleDelete(props.bookData.id)}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function BooksCRUD() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    date: "",
    rated: 0,
    author_id: null,
  });
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [validated, setValidated] = useState({ error: false, message: "" });

  async function getBooks() {
    const faetchData = await fetch(_LINK + "books")
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBooks(data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({ show: true, message: "Error: " + error.error });
      });

    return faetchData;
  }
  // Fetch books data from server
  useEffect(() => {
    // TODO: Fetch books from API
    //TODO: add the ok=false to the fetchs
    //TODO: add the error handling to the fetchs
    //TODO: add the min and max for the rating
    //TODO: reform the date to the format of the date
    //TODO: fix the autor_id
    getBooks();
  }, []);

  const handleAdd = async (book) => {
    // TODO: Add book logic
    let newDate;
    if (book.date) {
      newDate = new Date(book.date);
      book.date = newDate.toISOString().slice(0, 10);
    }
    console.log(book);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    };
    await fetch(_LINK + "books", requestOptions)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        getBooks();
        setShowModal(false);
        setValidated({ error: false, message: "" });
        setAlert({ show: true, message: "Book added successfully" });
      })
      .catch(async (error) => {
        console.log(error);
        await error.json().then((data) => {
          console.log(data);
          setValidated({ error: true, message: "Error: " + data.error });
        });
      });
  };

  const handleEdit = (book) => {
    // TODO: Edit book logic
    console.log(book);
    const newDate = new Date(book.date);
    book.date = newDate.toISOString().slice(0, 10);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    };

    fetch(_LINK + "books/" + book.id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getBooks();
        setAlert({ show: true, message: "Book updated successfully" });
      });

    setShowModal(false);
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    fetch(_LINK + "books/" + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getBooks();
        setAlert({ show: true, message: "Book deleted successfully" });
      });
    setShowDeleteModal(false);
  };

  return (
    <div className="tableContainer">
      <Button
        variant="primary"
        onClick={() => {
          setBookData({ title: "", date: "", rated: 0, author_id: null });
          setIsEdit(false);
          setShowModal(true);
        }}
      >
        Add Book
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Author ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.date}</td>
                <td>{book.rated}</td>
                <td>{book.author_id}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowModal(true);
                      setIsEdit(true);
                      setBookData(book);
                      //handleEdit(book)
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setBookData(book);

                      //handleDelete(book.id)
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <MyModal
        show={showModal}
        setShow={setShowModal}
        isEdit={isEdit}
        bookData={bookData}
        setBookData={setBookData}
        handleSave={isEdit ? handleEdit : handleAdd}
        validated={validated}
        setValidated={setValidated}
      />
      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        bookData={bookData}
        handleDelete={handleDelete}
      />
      <Toast
        onClose={() => setAlert({ ...alert, show: false })}
        show={alert.show}
        delay={3000}
        autohide
        style={{ position: "absolute", top: 20, right: 20 }}
        bg="success"
      >
        <Toast.Header>
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{alert.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default BooksCRUD;
