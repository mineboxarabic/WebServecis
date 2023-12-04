
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.scss';
import { useContext, useEffect, useState } from 'react';
import { Table, Button, Form, Modal, Alert, Toast } from "react-bootstrap";
//import axios from '../api/mainAxios';
import axiosMain from '../api/mainAxios';
import useUserToken from '../api/Context/useUserToken';
import useToken from '../api/Context/useToken';




export default function LogInPage(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ show: false, message: "" });
    
    
    const {setToken} = useUserToken();


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

                    try{
                        const response = await axiosMain.post('/login', {
                            email: email,
                            password: password
                        })
                        console.log(response.data);
                        setAlert({show:true, message:"Logged in successfully", bg:"success"})
;                       const accessToken = response.data.accessToken;
                        setToken(accessToken);
;                       const refreshToken= response.data.refreshToken;

                        localStorage.setItem('RefreshToken', refreshToken);    

                        //window.location.href = "/home";
                    }
                    catch(err){
                        const errorText = err.response.data.error;
                        setAlert({show:true, message:errorText, bg:"danger"})
                    }
                    
                    
      

                }} className="btn btn-primary">Submit</button>
            </form>
     
        </div>
        </div>
    )
}