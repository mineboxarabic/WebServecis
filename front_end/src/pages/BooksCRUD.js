import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Alert, Toast } from "react-bootstrap";
import { _LINK } from "../linkServer";
import "../styles/Tables.scss";

function MyModal(props) {
  const handleClose = () => props.setShow(false);

  const [bookData, setBookData] = useState({ id: null, title: "", date: "", rated: 0, author_id: null });

  function getDate(){
    let date = new Date( props.bookData.date);
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }
  useEffect(() => {
    if(props.isEdit)
      setBookData(props.bookData);
  }, [props.bookData]);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.isEdit ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={props.bookData.title}
              onChange={(e) => props.setBookData({ ...props.bookData, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBookDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getDate()}
              onChange={(e) => props.setBookData({ ...props.bookData, date: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBookRated">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              value={props.bookData.rated}
              onChange={(e) => props.setBookData({ ...props.bookData, rated: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formBookAuthorId">
            <Form.Label>Author ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Author ID"
              value={props.bookData.author_id}
              onChange={(e) => props.setBookData({ ...props.bookData, author_id: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => props.handleSave(props.bookData)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function BooksCRUD() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [bookData, setBookData] = useState({ id: null, title: "", date: "", rated: 0, author_id: null });
  const [alert, setAlert] = useState({ show: false, message: "" });


  async function getBooks(){
    const faetchData = await fetch(_LINK + "books")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setBooks(data);
    })
    .catch((error) => console.log(error));

    return faetchData;
  }
  // Fetch books data from server
  useEffect(() => {
    // TODO: Fetch books from API
    //TODO: add the ok=false to the fetchs 
    //TODO: add the error handling to the fetchs
    //TODO: add the min and max for the rating
    //TODO: reform the date to the format of the date
    getBooks();
  }, []);

  const handleAdd = () => {
    // TODO: Add book logic
  };

  const handleEdit = (book) => {
    // TODO: Edit book logic
    console.log(book);
    const newDate = new Date(book.date);
    book.date = newDate.toISOString().slice(0, 10);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    };

    fetch(_LINK + 'books/' + book.id, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        getBooks();
        setAlert({ show: true, message: "Book updated successfully" });
      });

    setShowModal(false);
    setIsEdit(false);

  };

  const handleDelete = (id) => {
    // TODO: Delete book logic
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
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
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.date}</td>
              <td>{book.rated}</td>
              <td>{book.author_id}</td>
              <td>
                <Button variant="secondary" onClick={() => {
                      setShowModal(true);
                      setIsEdit(true);
                      setBookData(book);
                  //handleEdit(book)
                  }}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(book.id)}>
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
      />
      <Toast onClose={() => setAlert({ ...alert, show: false })} show={alert.show} delay={3000} autohide style={{ position: "absolute", top: 20, right: 20 }} bg="success">
        <Toast.Header>
          <strong className="mr-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{alert.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default BooksCRUD;
