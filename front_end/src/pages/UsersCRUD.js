import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button } from "react-bootstrap";
import { _LINK } from "../linkServer";
import "../styles/Tables.scss";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";

function MyModal(props) {
  //const [show, setShow] = useState(false);

  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);

  const [emails, setEmail] = useState("");
  const [names, setName] = useState("");
  const [roles, setRole] = useState(0);
  const [passwords, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [userError, setUserError] = useState({
    error: "",
    ok: false,
    status: 400,
    show: false,
  });

  async function addUser() {
    console.log(_LINK);

    console.log({ emails, names, roles, passwords });
    try {
      await fetch(_LINK + "user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emails,
          name: names,
          role: roles,
          password: passwords,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        console.log(res);
        setShowAlert(true);
      });
    } catch (err) {
      console.log(err);
      err.json().then((data) => {
        console.log(data);
        setUserError({
          error: data.error,
          ok: false,
          status: err.status,
          show: true,
        });
      });
    }
  }

  return (
    <>
  

      <Modal show={props.getShow} onHide={handleClose}>
        <Alert show={showAlert} variant="success">
          <Alert.Heading>User created successfully ! :)</Alert.Heading>
        </Alert>

        <Alert show={userError.show} variant="danger">
          <Alert.Heading>{userError.error}</Alert.Heading>
        </Alert>

        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mohammed abdullah"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>role</Form.Label>
              <Form.Control
                type="number"
                placeholder="1"
                max={1}
                min={0}
                autoFocus
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function IsSureModal(props) {
  //const [show, setShow] = useState(false);

  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);

  function onYes() {
    props.onYes();
    handleClose();
  }

  return (
    <>
      <Modal show={props.getShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you you want do delete this User !</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onYes();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function EditUserModal(props) {
  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);

  const [emails, setEmail] = useState(props.user.email);
  const [names, setName] = useState(props.user.name);
  const [roles, setRole] = useState(props.user.role);
  const [passwords, setPassword] = useState(props.user.password);
  const [showAlert, setShowAlert] = useState(false);

  const [userError, setUserError] = useState({
    error: "",
    ok: false,
    status: 400,
    show: false,
  });

  useEffect(() => {
    console.log(props.user);
    setEmail(props.user.email);
    setName(props.user.name);
    setRole(props.user.role);
    setPassword(props.user.password);
  }, [props.user]);

  /*async function addUser(){
      console.log(_LINK);

      console.log({emails, names,roles, passwords})
      try{

        await fetch(_LINK+'user',{
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify({email:emails, name:names, role:roles, password:passwords})
      }).then(async (res)=>{

        if(!res.ok){
          return Promise.reject(res);
        }
          console.log(res);
          setShowAlert(true);
      })
      } catch(err){
        console.log(err);
        err.json().then((data)=>{
          console.log(data);
          setUserError({error:data.error, ok:false, status:err.status, show:true});
        })
      }
  }*/
  async function editUser() {
    console.log(_LINK);

    console.log({ emails, names, roles, passwords });
    try {
      await fetch(_LINK + "user/" + props.user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emails,
          name: names,
          role: roles,
          password: passwords,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        console.log(res);
        setShowAlert(true);
      });
    } catch (err) {
      console.log(err);
      err.json().then((data) => {
        console.log(data);
        setUserError({
          error: data.error,
          ok: false,
          status: err.status,
          show: true,
        });
      });
    }
  }

  return (
    <>

      <Modal show={props.getShow} onHide={handleClose}>
        <Alert show={showAlert} variant="success">
          <Alert.Heading>User created successfully ! :)</Alert.Heading>
        </Alert>

        <Alert show={userError.show} variant="danger">
          <Alert.Heading>{userError.error}</Alert.Heading>
        </Alert>

        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                defaultValue={emails}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mohammed abdullah"
                autoFocus
                defaultValue={names}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>role</Form.Label>
              <Form.Control
                type="number"
                placeholder="1"
                max={1}
                min={0}
                autoFocus
                defaultValue={roles}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                defaultValue={passwords}
                disabled
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Notification(props) {
  const [show, setShow] = useState(props.show);
  return (
    <Toast
      bg={props.bg}
      onClose={() => props.setShow(false)}
      show={props.show}
      delay={3000}
      autohide
      style={{
        position: "absolute",
        top: 20,
        right: 20,
      }}
    >
      <Toast.Header>
        <strong className="me-auto">props.header</strong>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
}

export default function UsersCRUD(props) {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showIsSureModal, setShowIsSureModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);


  const userToken = localStorage.getItem("token") === null ? "" : localStorage.getItem("token");

  async function getUsers() {
    return await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    }).then((data) => {
      if(data.status == 401){
        
        console.log(userToken);

      }else{
        
        return data.json();
      }
    });
  }
  async function deleteUser() {
    let id = currentUser.id;
    await fetch(_LINK + "user/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        setShowDeleteNotification(true);
        //Delete from the users array
        let newArray = users.filter((user2) => {
          return user2.id != id;
        });
        setUsers(newArray);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        err.json().then((data) => {
          console.log(data);
          setShowIsSureModal(false);
          
          setShowDeleteNotification(true);
        });
      });
  }

  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      setUsers(data);
    });
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
      <MyModal setShow={setShow} getShow={show} />
      <IsSureModal
        setShow={setShowIsSureModal}
        getShow={showIsSureModal}
        onYes={() => {
          deleteUser();
          setShowIsSureModal(false);
        }}
      />
      <EditUserModal
        setShow={setShowEditModal}
        getShow={showEditModal}
        user={currentUser}
      />

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
          {localStorage.getItem('token') !== null && <p>Sorry you are not authorized here !!</p>}
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setCurrentUser(user);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={async () => {
                        setCurrentUser(user);
                        setShowIsSureModal(true);
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
      <Notification
        bg="success"
        header="User deleted successfully"
        message="User deleted successfully"
        show={showDeleteNotification}
        setShow={setShowDeleteNotification}
      />
    </div>
  );
}
