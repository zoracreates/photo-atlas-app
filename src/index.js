import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MapWithCards from './components/layout/MapWithCards';


ReactDOM.render(
  <React.StrictMode>
    <App>      
      <MapWithCards>
      
      </MapWithCards>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);