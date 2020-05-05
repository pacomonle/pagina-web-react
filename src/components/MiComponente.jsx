import React, { Component } from 'react'

export default class MiComponent extends Component {
    render() {

        let receta = {
            nombre: "Pizza",
            ingredientes: ['tomate', 'queso', 'jamon'],
            calorias: 400
        };


        return (
            <div className="mi-componente">
                <h1>{receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>
                <hr></hr>
                {this.props.saludo &&
                    <>
                        <h1>Desde una prop</h1>
                        <h3>{this.props.saludo}</h3>
                    </>
                }

                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            )
                        })
                    }
                </ol>

            </div>
        )
    }
}

