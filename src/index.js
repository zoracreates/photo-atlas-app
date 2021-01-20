import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

let checkAuthStatus = () => { return true}

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
         <App userAuth={checkAuthStatus()} />  
    </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);