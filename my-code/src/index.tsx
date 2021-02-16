import React from 'react';
import ReactDOM from 'react-dom';
import logo from './assets/logos/logo.svg';
import './index.css';
import Home from './Home';

ReactDOM.render(
  <React.StrictMode>
    
    <div className="container-wrapper">
      <div className="container">
        <img src={logo} className="logo-icon" />
        <Home />
      </div>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);
