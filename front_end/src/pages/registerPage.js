
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registerPage.scss';
import { useState } from 'react';
import { Header } from '../Components/HEADER';
import { Toast, ToastBody } from 'react-bootstrap';


export default function RegisterPage(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState({message:'', showError:false})

    async function submitx(e){
        e.preventDefault();
        let user = {
            name : name,
            email : email,
            password : password
        }

        await fetch("http://localhost:3001/register", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }).then(async (res)=>{
            if(res.ok){
                window.location.href = '/login'
            }else{
                let error = await res.json();
                setError({message:error.error, showError:true})
            } 
        })


    }

    return(
       
    <div className='register-page'>
       
      
        <div className='floating-container'>
       
            <Toast bg="danger" onClose={() => setError({message:'', showError:false})} show={error.showError} delay={3000} autohide>
                <ToastBody>{error.message}</ToastBody>
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
                    e.preventDefault();
                    submitx(e);
                    }} className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}