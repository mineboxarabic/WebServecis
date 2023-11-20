import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

export default function UsersCRUD({props}){
    

    const [users, setUsers] = useState([]);
    
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
        <Table striped bordered hover>
        
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
{
        users && users.map((user)=>{
            return(
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <Button className='danger'>Edit</Button>
                    <Button>Delete</Button>
                </td>
            </tr>)
        })

}



        </Table>
    )
}