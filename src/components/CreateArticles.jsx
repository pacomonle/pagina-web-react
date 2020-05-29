import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

import Sidebar from './Sidebar'
import { Redirect } from 'react-router-dom'

// validacion de formularios y alertas
import SimpleReactValidator from 'simple-react-validator';
// alertas
import swal from 'sweetalert';


export default class CreateArticles extends Component {
    url = Global.url;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
       // this.validator = new SimpleReactValidator();
       // personalizar mensaje validacion
        this.validator = new SimpleReactValidator({
            messages: {
              required: 'Este campo es requerido'
            
            },
          })
    }


    changeState = (e) => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        })
        this.validator.showMessages()
        this.forceUpdate()
    }


    saveArticle = (e) => {
        e.preventDefault();
        alert(this.contentRef.current.value);
        console.log(this.titleRef.current.value);
        // actualizar el estado con los datos del formulario
        this.changeState();

        console.log(this.state);
       if (this.validator.allValid()){
        // peticion http por post para guardar el articulo     
        axios.post(this.url + 'save', this.state.article)
            .then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: "waiting"
                    })
                  // alerta
                  swal(
                      "Articulo Creado",
                      "El articulo ha sido creado correctamente",
                      "success"
                  )
                    // SUBIR LA IMAGEN
                    if (this.selectedFile !== null) {
                        // sacar id del articulo guardado
                        var articleId = this.state.article._id;
                        // crear form-data y añadir fichero
                        const formData = new FormData();
                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name

                        );
                        // realizar peticion ajax - como tercer parametro se podria poner una barra de progreso
                        axios.post(this.url + 'upload-image/' + articleId, formData)
                            .then(res => {
                                if (res.data.article) {
                                    this.setState({
                                        article: res.data.article,
                                        status: "success"
                                    })
                                } else {
                                    this.setState({
                                        article: res.data.article,
                                        status: "failed"
                                    })
                                }
                            })

                    } else {
                        this.setState({
                            status: "success"
                        })
                    }

                } else {
                    this.setState({
                        status: 'failed'
                    })
                }
            })
        }else{
            this.setState({
                status: 'failed'
            })
            this.validator.showMessages()
            this.forceUpdate()
        }

    }

    fileChange = (event) => {
        console.log("evento", event);
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log("state", this.state);
    }

    render() {

        if (this.state.status === "success") {
            return <Redirect to="/blog"></Redirect>
        }

        return (
            <div id="createArticles" className="center">
                <section id="content">
                    <h1 className="subheader">Crear Articulo</h1>
                    <form onSubmit={this.saveArticle}>
                        <div className="mid-form">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alfa_num_space')}

                        </div>
                        <div className="mid-form">
                            <label htmlFor="contenido">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState}></textarea>

                            {this.validator.message('content', this.state.article.content, 'required')}

                        </div>
                        <div className="mid-form">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>

                        <input type="submit" className="btn btn-success" value="Guardar" />
                    </form>



                </section>
                <Sidebar></Sidebar>
            </div>
        )
    }
}
