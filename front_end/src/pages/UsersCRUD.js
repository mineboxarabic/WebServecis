import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button } from "react-bootstrap";

import "../styles/Tables.scss";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";


import axios from "../api/mainAxios";
import useUserToken from "../api/Context/useUserToken";
import axiosMain, { checkAndRefreshToken } from "../api/mainAxios";


function MyModal(props) {
  const handleClose = () => props.setShow(false);
  const [bookData, setBookData] = useState({
    title: "",
    date: "",
    rated: 0,
    author_id: null,
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


export default function UsersCRUD(props) {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const [isExpiredMessage, setIsExpiredMessage] = useState('');

  //const [token, setToken] = useState(localStorage.getItem("AccessToken"));
 // const {token, setToken} = useUserToken(localStorage.getItem("AccessToken"));

  async function getUsers(){

    const res = await axiosMain.get("/users",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
      },
    }).catch((err) => {
      if(err.response.status === 401 || err.response.status === 403){
        setIsExpiredMessage("Your session has expired. Please Refresh the page");
        checkAndRefreshToken();
      }

    })

    if(res){
      setIsExpiredMessage('');
      setUsers(res.data);
    }


  }

  const handleAdd = async (bookData) => {
    const res = await axios.post("/books", bookData);
    setUsers([...users, res.data]);
    setShow(false);
  }
  const handleSave = async (bookData) => {
    const res = await axios.put("/books/" + bookData.id, bookData);
    setUsers(
      users.map((book) => {
        if (book.id === bookData.id) {
          return res.data;
        }
        return book;
      })
    );
    setShow(false);
  };
  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div className="tableContainer">
      <Button
        className="addButton"
        onClick={() => {
          setShow(true);
        }}
      >
        Add User
      </Button>
      <MyModal show={show} setShow={setShow} handleSave={handleSave} validated={{error:false, message:""}} bookData={{title:"", date:"", rated:0, author_id:null}} setBookData={()=>{}} isEdit={false}/>


      <Table hover bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isExpiredMessage != '' && (<tr><td colSpan="5">{isExpiredMessage}</td></tr>)}
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td>
                    <Button
                      variant="warning"
                      onClick={() => {
                      
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={async () => {
                      
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

    </div>
  );
}
