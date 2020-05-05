import React, { Component } from 'react'
import Slider from "./Slider";
import Sidebar from "./Sidebar";


export default class Home extends Component {
    render() {
        var buttonString = "Ir al blog";

        return (
            <div id="home">
                <Slider
                    titulo="Bienvenido al Curso de React con Francisco Monleon"
                    btn={buttonString}
                    size="slaider-big">
                </Slider>
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Ultimos articulos</h1>
                    </div>
                    <Sidebar></Sidebar>
                </div>


            </div>

        )
    }
}
