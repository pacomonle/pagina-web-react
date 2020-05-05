import React, { Component } from 'react';
import MensajeEstatico from './MensajeEstatico';
import Pelicula from './Pelicula';
import Slider from "./Slider";
import Sidebar from "./Sidebar";

export default class Peliculas extends Component {
  // inicializar el state vacio
  state = {
    peliculas: [],
    nombre: "",
    favorita: {}
  }

  cambiarTitulo = () => {
    var { peliculas } = this.state;
    // var random = Math.floor(Math.random() * 3);
    peliculas[0].titulo = "Batman Begins"; // aqui poner random en vez de 0
    this.setState({
      peliculas: peliculas
    })
  }


  favorita = (pelicula, indice) => {
    console.log(pelicula);
    this.setState({
      favorita: pelicula
    })
  }

  componentDidMount() {
    //alert('se acaba de cargar el componente peliculas');

    this.setState({
      peliculas: [
        { titulo: 'Batman vs Superman', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzLoD1WrG3h3umsuul7zAWZpGPKrYZyyxoCIUTynacSGBFBwbT&usqp=CAU' },
        { titulo: 'Gran Torino', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhe1DCp_4VAfwJvBOskbMjiBeCufCYQc4CrmDXg7eKapNXUNE_&usqp=CAU' },
        { titulo: 'Looper', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAPPYebHwo-sFrAXODe993sHg6cm4Xz2SE3k_-Pp7BFWXZOil_&usqp=CAU' }
      ],
      nombre: "Fransico Monleon",
      favorita: {}
    })

  }


  render() {

    var estilos = {
      background: 'green',
      color: 'white',
      padding: '10px'
    }

    var miFavorita;

    if (this.state.favorita.titulo) {
      miFavorita = (
        <p className="favorita" style={estilos}>
          <strong>La pelicula favorita es: </strong>
          <span>{this.state.favorita.titulo}</span>
        </p>)
    } else {
      miFavorita = (<p>TIENES QUE SELECCIONAR UNA PELICULA FAVORITA</p>)
    }





    return (
      <React.Fragment>

        <Slider
          titulo="Peliculas"
          size="slider-small">
        </Slider>
        <div className="center">
          <div id="content" className="peliculas">
            <h2 className="subheader">Listado de Peliculas</h2>
            <MensajeEstatico></MensajeEstatico>
            <p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
            <span>
              <button onClick={this.cambiarTitulo}>press</button>
            </span>
            {/*this.state.favorita.titulo ? 
         ( <p className="favorita" style= {estilos}>
            <strong>La pelicula favorita es: </strong>
            <span>{this.state.favorita.titulo}</span>
          </p>) : (<p>TIENES QUE SELECCIONAR UNA PELICULA FAVORITA</p> )
        */}
            {miFavorita}
            <div id="articles" className="peliculas">

              {
                this.state.peliculas.map((pelicula, i) => {
                  return (
                    <Pelicula key={i} indice={i} pelicula={pelicula} marcarFavorita={this.favorita}></Pelicula>

                  )
                })

              }
            </div>
          </div>
          <Sidebar blog="false"></Sidebar>
        </div>
      </React.Fragment>
    )
  }
}
