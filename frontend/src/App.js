import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Main from './components/main.js'
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
      <Main />
      </BrowserRouter>
  );
}

export default App;
