import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

let checkAuthStatus = () => { return false}

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
         <App authState={checkAuthStatus()} />  
    </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);