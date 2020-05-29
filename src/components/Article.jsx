import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
import Global from '../Global'
import Sidebar from './Sidebar'
import Moment from "react-moment"
import 'moment/locale/es'
// importar archivo de imagen local
import defaultImages from '../assets/images/images.png'
// alertas
import swal from 'sweetalert'


export default class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    componentDidMount() {

        this.getArticle();
        console.log("articulo", this.state.article, this.state.status)

    }


    getArticle = () => {
        const id = this.props.match.params.id;
        console.log("id", id)

        Axios.get(this.url + 'article/' + id)
            .then(res => {
                console.log("res", res)
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            })
            .catch(err => {
                console.log('error', err.response.data);
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }


    deleteArticle = (id) => {
    console.log("id", id)
        swal({
            title: "Estas segurlo?",
            text: "Una vez eliminado, no podrá recuperar este archivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
                if (willDelete) {
                    Axios.delete(this.url+'article/'+id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            })
                            swal(
                                "Articulo Borrado",
                                "El articulo ha sido borrado correctamente",
                                "success"
                            );
                        });
                } else {
                    swal(
                          "OK!!",
                          "Tu archivo está seguro!!",
                          "success"
                          );
                }
            });

        
    }


    componentDidUpdate(prevProps, prevState) {

        console.log(this.state.status, prevState.status)
        if (this.state.status !== prevState.status) {
            this.getArticle()
        };

    }


    render() {

        if (this.state.status === "deleted") {
            return <Redirect to="/blog"></Redirect>
        }
        const article = this.state.article;
        console.log('articulo obj', article);


        return (
            <div id="article">
                <div className="center">
                    <section id="content">
                        {article &&

                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                    {
                                        (article.image !== null) ? (
                                            <img src={this.url + "get-image/" + article.image} alt={article.title} />
                                        ) : (<img src={defaultImages} alt={article.title} />)
                                    }
                                </div>

                                <h1 className="subheader">{article.title}</h1>
                                <span className="date">
                                    <Moment locale="es" fromNow>{article.date}</Moment>
                                </span>
                                <p>
                                    {article.content}
                                </p>
                                <button onClick={
                                    () => {
                                        this.deleteArticle(article._id)
                                    }
                                } className="btn btn-danger">Eliminar</button>
                                <Link to={'/blog/editar/'+article._id} className="btn btn-warning">Editar</Link>
                                <div className="clearfix"></div>
                            </article>
                        }
                        {!article && this.state.status === "success" &&
                            <div id="article">
                                <h2 className="subheader">El articlulo no existe</h2>
                                <p>intentalo mas tarde</p>
                            </div>}
                        {this.state.status === null &&
                            <div id="article">
                                <h2 className="subheader">Cargando...</h2>
                                <p>espere unos segundos</p>
                            </div>}
                    </section>
                    <Sidebar></Sidebar>

                </div>

            </div>
        )
    }
}
