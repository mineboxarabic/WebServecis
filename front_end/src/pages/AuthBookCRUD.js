import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Alert, Toast } from "react-bootstrap";
import { _LINK } from "../linkServer";
import "../styles/Tables.scss";

function MyModal(props) {
  const handleClose = () => props.setShow(false);
  const [authorData, setAuthorData] = useState({
    name: "",
    date: "",
    rate: 0
  });

  function getDate() {
    let date = new Date(props.authorData.date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }
  useEffect(() => {
    if (props.isEdit) setAuthorData(props.authorData);
  }, [props.authorData]);

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.isEdit ? "Edit Author" : "Add Author"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger" show={props.validated.error}>
          {props.validated.message}
        </Alert>
        <Form>
          <Form.Group controlId="formAuthorName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={props.authorData.name}
              onChange={(e) =>
                props.setAuthorData({ ...props.authorData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAuthorDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              defaultValue={getDate()}
              onChange={(e) =>
                props.setAuthorData({ ...props.authorData, date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAuthorRate">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              max={5}
              min={0}
              value={props.authorData.rate}
              onChange={(e) =>
                props.setAuthorData({ ...props.authorData, rate: e.target.value })
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
          onClick={() => props.handleSave(props.authorData)}
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
        <Modal.Title>Delete Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          Are you sure you want to delete this author?
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={() => props.handleDelete(props.authorData.id)}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AuthBooksCRUD() {
  const [AuthBooks, setAuthBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [authorData, setAuthorData] = useState({
    name: "",
    date: "",
    rate: 0
  });
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [validated, setValidated] = useState({ error: false, message: "" });

  async function getAuthBooks() {
    const faetchData = await fetch(_LINK + "AuthBooks")
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAuthBooks(data);
      })
      .catch((error) => {
        console.log(error);
        setAlert({ show: true, message: "Error: " + error.error });
      });

    return faetchData;
  }
  // Fetch AuthBooks data from server
  useEffect(() => {
    // TODO: Fetch AuthBooks from API
    //TODO: add the ok=false to the fetchs
    //TODO: add the error handling to the fetchs
    //TODO: add the min and max for the rating
    //TODO: reform the date to the format of the date
    //TODO: fix the autor_id
    getAuthBooks();
  }, []);

  const handleAdd = async (author) => {
    // TODO: Add author logic
    let newDate;
    if (author.date) {
      newDate = new Date(author.date);
      author.date = newDate.toISOString().slice(0, 10);
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author),
    };

    await fetch(_LINK + "AuthBooks", requestOptions)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        getAuthBooks();
        setShowModal(false);
        setValidated({ error: false, message: "" });
        setAlert({ show: true, message: "Author added successfully" });


      })
      .catch(async (error) => {
        console.log(error);
        const errorMessage = await error.json();
        setValidated({ error: true, message: errorMessage.error });
      
      });
  };

  const handleEdit = (author) => {
    // TODO: Edit author logic
    console.log(author);
    const newDate = new Date(author.date);
    author.date = newDate.toISOString().slice(0, 10);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author),
    };

    fetch(_LINK + "author/" + author.id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getAuthBooks();
        setAlert({ show: true, message: "Author updated successfully" });
      });

    setShowModal(false);
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    fetch(_LINK + "author/" + id, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getAuthBooks();
        setAlert({ show: true, message: "Author deleted successfully" });
      });
    setShowDeleteModal(false);
  };

  return (
    <div className="tableContainer">
      <Button
        variant="primary"
        onClick={() => {
          setAuthorData({ name: "", date: "", rate: 0 });
          setIsEdit(false);
          setShowModal(true);
        }}
      >
        Add Author
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {AuthBooks &&
            AuthBooks.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.date}</td>
                <td>{author.rate}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowModal(true);
                      setIsEdit(true);
                      setAuthorData(author);
                      //handleEdit(author)
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setAuthorData(author);

                      //handleDelete(author.id)
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
        authorData={authorData}
        setAuthorData={setAuthorData}
        handleSave={isEdit ? handleEdit : handleAdd}
        validated={validated}
        setValidated={setValidated}
      />
      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        authorData={authorData}
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

export default AuthBooksCRUD;
