import './App.css';

import RegisterPage from './pages/registerPage';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './Components/HEADER';
import { Footer2 } from './Components/FOOTER';
import UsersCRUD from './pages/UsersCRUD';
import BooksCRUD from './pages/BooksCRUD';
import AuthorCRUD from './pages/AuthorCRUD';
import  LogInPage  from './pages/LogInPage';
import { createContext, useContext, useEffect } from 'react';
import {useState} from 'react'
import { UserTokenContext, isLogged} from './Components/context';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState();
const [userToken, setUserToken] = useState(localStorage.getItem('token') === null ? '' : localStorage.getItem('token'));


useEffect(() => {

  console.log("userToken", userToken);

}
,[])
  return (


       <BrowserRouter>
         <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
       <Routes>
       <Route exact path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/users" element={<UsersCRUD />} />
        <Route path="/books" element={<BooksCRUD />} />
        <Route path="/authors" element={<AuthorCRUD />} />
        <Route path="/login" element={<LogInPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
    
       </Routes>
       <Footer2/>
    </BrowserRouter>      

 
  );
}

export default App;
