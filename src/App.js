import React from 'react';
// import logo from './assets/images/logo.svg';
import './assets/css/App.css';
// importar componentes
import Header from "./components/Header";
import Slider from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
//import SeccionPruebas from "./components/SeccionPruebas";
import Peliculas from "./components/Peliculas";



function App() {
var buttonString = "Ir al blog" ;

  return (
    <div className="App">
      <Header></Header>
      <Slider
       titulo="Bienvenido al Curso de React con Francisco Monleon"
       btn={buttonString}>
       </Slider>
      <div className="center">
        <Peliculas></Peliculas>
        <Sidebar></Sidebar>
     </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
