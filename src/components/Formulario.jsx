import React, { Component } from 'react'
import Slider from "./Slider";
import Sidebar from "./Sidebar";


export default class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user: {}
    }

    recibirFormulario = (e) => {
        e.preventDefault();

        var genero = 'Hombre';

        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value
        } else if (this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value
        } else {
            genero = this.generoOtroRef.current.value
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero

        };

        console.log("formulario enviado")
        console.log(user);

        this.setState({
            user: user
        })
     
    }

    

    render() {
       if (this.state.user.nombre) {
           var user = this.state.user;
       }  
        
        return (
            <div id="formulario">
                <Slider
                    titulo="Formulario"
                    size="slider-small">
                </Slider>
                <div className="center">
                    <div id="content">
                        {/*Mostrar Formulario*/}
                        {this.state.user.nombre &&
                            <div id="user-data" className="subheader-small">
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>apellidosRef: <strong>{user.apellidos}</strong></p>
                                <p>Bio: <strong>{user.bio}</strong></p>
                                <p>Genero: <strong>{user.genero}</strong></p>
                             </div>
                        }


                        {/*Crear Formulario*/}
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef} ></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} /> Hombre
                           <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} /> Mujer
                           <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} /> Otro
                       </div>

                            <div className="clearfix"></div>

                            <input type="submit-form" value="Enviar" className="btn btn-success" />

                        </form>
                    </div>
                    <Sidebar blog="false"></Sidebar>
                </div>


            </div>

        )
    }
}
