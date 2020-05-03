import React, { Component } from 'react'
import MiComponente from './MiComponente'


export default class SeccionPruebas extends Component {
/*
    constructor(props){
          super(props);
          this.state= {
            contador : 0
          }

    }
   */
    state = {
        contador : 0
    }

    HolaMundo(nombre, edad) {
        var presentacion = (
            <div>
                <h2>Hola, yo soy {nombre}</h2>
                <h3>mi edad es:  {edad}</h3>
            </div>
        );
        return presentacion;
    }

    /*
      sumar(e) {
          this.setState({
              contador: (this.state.contador + 1)
          })
         // this.contador++
      }
   */
      sumar= (e) => {
        this.setState({
            contador: (this.state.contador + 1)
        })
       // this.contador++
    }



      restar(e) {
        this.setState({
            contador: (this.state.contador - 1)
        })
        // this.contador--
    }




    render() {

        var nombre = "Francisco Monleon";
        var edad = 49;

        return (
            <div className="center">
                <section id="content">
                    <h2 className="subheader">Últimos artículos</h2>
                    <p>Bienvenido al portofolio de Francisco Monleon</p>

                    <h2 className="subheader">Funciones y JSX basicos</h2>

                    {this.HolaMundo(nombre, edad)}

                    <h2 className="subheader">Componentes</h2>
                    <section className="componentes">
                        <MiComponente></MiComponente>
                       
                    </section>
                    <h2 className="subheader">Funciones y JSX basicos</h2>
                    <p>
                        {this.state.contador}
                    </p>
                    <p>
                        <input type="button" name="sumar" value="Sumar" onClick={this.sumar}/>
                        <input type="button" name="restar" value="Restar" onClick={this.restar.bind(this)}/>
                    </p>
                </section>
            </div>
        )
    }
}
