import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserTokenProvider } from './api/Context/context';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserTokenProvider>
    <App />
  </UserTokenProvider>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
