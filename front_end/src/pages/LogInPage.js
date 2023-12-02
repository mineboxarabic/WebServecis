
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.scss';
import { useContext, useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Alert, Toast } from "react-bootstrap";

import { isLogged,UserTokenContext} from '../Components/context';



export default function LogInPage(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ show: false, message: "" });
    const {userToken, setUserToken} = useContext(UserTokenContext);
    
    useEffect(()=>{
       console.log(localStorage.getItem('token') == null)
    },[])

  

    return(
        
    <div className='login-page'>
       
         
        <div className='floating-container'>
        <Toast
                onClose={() => setAlert({ ...alert, show: false })}
                show={alert.show}
                delay={3000}
                autohide
                bg={alert.bg}
            >
               
                <Toast.Body>{alert.message}</Toast.Body>
            </Toast>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={(e)=>{
                    setEmail(e.target.value); 
                    }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>


                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={(e)=>{
                    setPassword(e.target.value); 
                    }} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="save"/>
                    <label  className="form-check-label" htmlFor="save">Check me out</label>
                </div>
                <button onClick={ async (e)=>{
                    e.preventDefault();

                    let user = {
                        email : email,
                        password : password
                    }

                    const response = await fetch("http://localhost:3001/login", {
                        method: 'POST', // or 'PUT'
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user)
                    });

                    const data = await response.json();
                    
                    if(data.error){
                        setAlert({show:true, message: data.error, bg:"danger"});
                    }
                    else{
                        console.log(isLogged);
                        props.setIsLoggedIn(true);
                        console.log(data);
                        localStorage.setItem('token', data.accessToken);
                        setAlert({show:true, message: "Logged in successfully", bg:"success"});
                    }

                }} className="btn btn-primary">Submit</button>
            </form>
     
        </div>
        </div>
    )
}