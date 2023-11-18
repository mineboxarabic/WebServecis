import './App.css';

import RegisterPage from './pages/registerPage';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

function App() {


  return (
       
       <BrowserRouter>
       <Routes>
       <Route exact path="" element={<RegisterPage />} />
        <Route path="/about" element={<RegisterPage />} />
        <Route path="/contact" element={<RegisterPage />} />

       </Routes>
    </BrowserRouter>      
    
 
  );
}

export default App;
