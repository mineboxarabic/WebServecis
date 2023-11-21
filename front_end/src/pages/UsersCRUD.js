import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Alert, Button } from 'react-bootstrap';
import { _LINK } from '../linkServer';
import '../styles/Tables.scss'

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function MyModal(props) {
  //const [show, setShow] = useState(false);

  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);

  const [emails, setEmail] = useState('');
    const [names, setName] = useState('');
    const [roles, setRole] = useState(0);
    const [passwords, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [userError, setUserError] = useState({error:'', ok:false, status:400, show:false});

    async function addUser(){
        console.log(_LINK);

        console.log({emails, names,roles, passwords})
        try{

          await fetch(_LINK+'user',{
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({email:emails, name:names, role:roles, password:passwords})
        }).then((res)=>{
          if(res.status == 400){
            
            return;
          }
            console.log(res);
            setShowAlert(true);
        })
        }catch(error){
          setUserError({error:error, ok:false, status:400, show:true});
        }
    }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

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
                onChange={
                    (e)=>{setEmail(e.target.value)}
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mohammed abdullah"
                autoFocus
                onChange={
                    (e)=>{setName(e.target.value)}
                }
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
                    onChange={
                        (e)=>{setRole(e.target.value)}
                    }
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="password"
                    autoFocus
                    onChange={
                        (e)=>{setPassword(e.target.value)}
                    }
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



export default function UsersCRUD({props}){
    

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    async function getUsers(){
        return await fetch('http://localhost:3001/users',{
            "method": "GET"
        }).then((data)=>{
            return data.json();
        })
    }

    useEffect(()=>{
        getUsers().then((data)=>{
            console.log(data);
            setUsers(data);
        })
    },[])
    return(
        <div className='tableContainer' >
        <Button className='addButton' onClick={()=>{
            setShow(true);
        }}>Add User</Button>
        <MyModal setShow={setShow} getShow={show}/>
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
{
        users && users.map((user)=>{
            return(
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <Button variant='warning'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                    </td>
            </tr>)
        })

}
        </tbody>



        </Table>
        </div>
    )
}