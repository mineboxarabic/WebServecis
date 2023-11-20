
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.scss';
import { useState } from 'react';
import { Header } from '../Components/HEADER';


export default function RegisterPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function submit(e){
        e.preventDefault();
        let user = {
            name : name,
            email : email,
            password : password
        }

        await fetch("http://localhost:3001/register", {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

    }

    return(
       
    <div className='register-page'>
         <Header/>
         
        <div className='floating-container'>
       

            <form>
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
                <button onClick={ async (e)=>{
                    e.preventDefault();

                    let user = {
                        name : name,
                        email : email,
                        password : password
                    }

                    const response = await fetch("http://localhost:3001/register", {
                        method: 'POST', // or 'PUT'
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    });
                    const data = await response.json();
                    console.log(data);

                }} className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}