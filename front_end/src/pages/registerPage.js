
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.scss';
import React, { useState } from 'react';
export default function RegisterPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');



    return(
    <div className='register-page'>
        <div className='floating-container'>
            <form action="http://localhost:3001/register" method="POST">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={(e)=>{
                    setEmail(e.target.value); 
                    }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input onChange={(e)=>{
                    setName(e.target.value); 
                    }} className="form-control" id="name" aria-describedby="name" placeholder="Enter your name"/>
                    <small id="name" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
                <button onClick={(e)=>{
                    
                    console.log(email);
                    console.log(password);
                    console.log(name);

                }} className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}