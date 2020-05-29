import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
// importar archivo de imagen local
import defaultImages from '../assets/images/images.png'

import Sidebar from './Sidebar'
import { Redirect } from 'react-router-dom'

// 1. recoger id del articulo a editar de la url
// 2. crear metodo para sacar el obj del api-backend
// 3. rellenar el formulario con los datos traidos
// 4. actualizar el objeto haciendo una peticion al backend

import SimpleReactValidator from 'simple-react-validator';
// alertas
import swal from 'sweetalert';


export default class EditarArticles extends Component {
    url = Global.url;
    articleId = null;
    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        // this.validator = new SimpleReactValidator();
        // personalizar mensaje validacion
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'

            },
        })
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    changeState = (e) => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })
        this.validator.showMessages()
        this.forceUpdate()
    }


    saveArticle = (e) => {
        e.preventDefault();
       // alert(this.contentRef.current.value);
        console.log(this.titleRef.current.value);
        // actualizar el estado con los datos del formulario
        this.changeState();

        console.log(this.state);
        if (this.validator.allValid()) {
            // peticion http por post para guardar el articulo     
            axios.put(this.url + 'article/'+this.articleId, this.state.article)
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
        } else {
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
                    <h1 className="subheader">Editar Articulo</h1>
                    {this.state.article.title &&
                        <form onSubmit={this.saveArticle}>
                            <div className="mid-form">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alfa_num_space')}

                            </div>
                            <div className="mid-form">
                                <label htmlFor="contenido">Contenido</label>
                                <textarea name="content" defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeState}></textarea>

                                {this.validator.message('content', this.state.article.content, 'required')}

                            </div>
                            <div className="mid-form">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {
                                        (this.state.article.image !== null) ? (
                                            <img src={this.url + "get-image/" + this.state.article.image} alt={this.state.article.title} className="thumb"></img>
                                        ) : (<img src={defaultImages} alt={this.state.article.title} className="thumb"></img>)
                                    }
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" className="btn btn-success" value="Guardar" />
                        </form>
                    }
                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando ...</h1>
                    }





                </section>
                <Sidebar></Sidebar>
            </div>
        )
    }
}
