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
import useUserToken from './api/Context/useUserToken';
import { useEffect } from 'react';
import NotAuthorized from './pages/NotAuthorized';
function fetchProtectedData (){

}
function App() {
  const {token} = useUserToken();

  useEffect(() => {
    console.log(token);
  }
, [token]);

  const userRole = localStorage.getItem("Role") || 0;

  function checkUserShowElement(element){
    if(userRole == 0){
      return <NotAuthorized/>
    }
    return element;
  }
  return (


       <BrowserRouter>
         <Header/>
       <Routes>
        
       <Route exact path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/users" element={checkUserShowElement(<UsersCRUD />)} />
        <Route path="/books" element={checkUserShowElement(<BooksCRUD />)} />
        <Route path="/authors" element={checkUserShowElement(<AuthorCRUD />)} />
        <Route path="/login" element={<LogInPage/>} />
    
       </Routes>
       <Footer2/>
    </BrowserRouter>      

 
  );
}

export default App;
