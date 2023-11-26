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
import { LogInPage } from './pages/LogInPage';
function App() {


  return (
    
       <BrowserRouter>
         <Header/>
       <Routes>
       <Route exact path="" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UsersCRUD />} />
        <Route path="/books" element={<BooksCRUD />} />
        <Route path="/authors" element={<AuthorCRUD />} />
    
       </Routes>
       <Footer2/>
    </BrowserRouter>      
    
 
  );
}

export default App;
