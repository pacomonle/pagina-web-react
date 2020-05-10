import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import SeccionPruebas from './components/SeccionPruebas';
import MiComponente from './components/MiComponente';

import Blog from './components/Blog';
import Error from './components/Error';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Peliculas from "./components/Peliculas";
import Formulario from "./components/Formulario";
import Search from "./components/Search";
import Article from "./components/Article";


export default class Router extends Component {


    render() {

        return (
            <div>
                <BrowserRouter>
                    <Header></Header>


                    {/**Configurar Rutas y paginas */}
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/home" component={Home}></Route>
                        <Route exact path="/blog" component={Blog}></Route>
                        <Route exact path="/blog/article/:id" component={Article}></Route>
                        <Route exact path="/blog/busqueda/:search" component={Search}></Route>
                        <Route exact path="/redirect/:search" render={
                            (props) => {
                             var search = props.match.params.search;
                             return(
                           <Redirect to={'/blog/busqueda/'+search}></Redirect>)  
                            }
                         }>
                         </Route>
                        <Route exact path="/formulario" component={Formulario}></Route>
                        <Route exact path="/peliculas" component={Peliculas}></Route>

                        {/*rutas de prueba*/}
                        <Route exact path="/ruta-prueba" component={SeccionPruebas}></Route>
                        <Route exact path="/pagina1" render={() => (
                            <React.Fragment>
                                <h1>Hola Mundo!! desde la pagina 1</h1>
                                <MiComponente saludo="Hola amigo"></MiComponente>
                            </React.Fragment>
                        )}></Route>

                        <Route exact path="/prueba/:nombre/:apellido?" render={(props) => {
                            var nombre = props.match.params.nombre;
                            var apellido = props.match.params.apellido;
                            return (
                                <div id="content">
                                    <h1 className="subheader">Pagina de prueba</h1>
                                    <h2>
                                        {nombre && !apellido &&
                                            <span>{nombre}</span>
                                        }
                                        {nombre && apellido &&
                                            <span>{nombre} {apellido}</span>
                                        }


                                    </h2>
                                </div>
                            )
                        }}></Route>
                        <Route component={Error}></Route>
                    </Switch>

                    <div className="clearfix"></div>
                    <Footer></Footer>

                </BrowserRouter>

            </div>
        )
    }
}
