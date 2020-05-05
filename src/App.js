import React from 'react';
// import logo from './assets/images/logo.svg';
import './assets/css/App.css';
// importar componentes
//import SeccionPruebas from "./components/SeccionPruebas";
//import Peliculas from "./components/Peliculas";
import Router from "./Router";


function App() {

  return (
    <div className="App">    
      
      {/**
      <Peliculas></Peliculas>
      */}
        <Router></Router>
        
    </div>
  );
}

export default App;
