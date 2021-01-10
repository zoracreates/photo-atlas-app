import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SearchBar from './components/forms/SearchBar';
import MapWithCards from './components/layout/MapWithCards';


ReactDOM.render(
  <React.StrictMode>
    <App>      
      <MapWithCards>
        <SearchBar/>
      </MapWithCards>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);