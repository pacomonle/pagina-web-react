import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Axios from 'axios'
import Global from '../Global'
import Sidebar from './Sidebar'
import Moment from "react-moment"
import 'moment/locale/es'
// importar archivo de imagen local
import defaultImages from '../assets/images/images.png'




export default class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    componentDidMount() {

        this.getArticle();

    }


    getArticle = () => {
        var id = this.props.match.params.id;

        Axios.get(this.url+'article/'+id)
            .then(res => {
                this.setState({
                    article: res.data,
                    status: 'success'
                });
            })
            .catch( err =>{
                console.log('error', err.response.data);
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }
/*
   componentDidUpdate(prevProps, prevState){
        if(this.state.article !== prevState.article){
            this.getArticle()
        };
      
   }
    

     shouldComponentUpdate(nextProps, nextState) {
        
        return nextState.article !== this.state.article

     } 
*/

    render() {
       
        const article = this.state.article;
        console.log('articulo obj', article);
        console.log('articulo-title', article.title);

        return (
            <div id="article">
                <div className="center">
                    <section id="content">
                        {this.state.article &&

                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                { 
                                    ( article.image !== null ) ? (
                                  <img src={this.url + "get-image/" + article.image} alt={article.title} />
                                  ) : ( <img src={defaultImages} alt="{article.title}" />)
                              }
                                </div>

                                <h1 className="subheader">{article.title}</h1>
                                <span className="date">
                                    <Moment locale="es" fromNow>{article.date}</Moment>
                                </span>
                                <p>
                                   {article.content}
                                </p>
                                <a href="" className="btn btn-danger">Eliminar</a>
                                <a href="" className="btn btn-warning">Editar</a>
                                <div className="clearfix"></div>
                            </article>
                        }
                        { !this.state.article && this.state.status === "success" &&
                        <div id="article">
                            <h2 className="subheader">El articlulo no existe</h2>
                            <p>intentalo mas tarde</p>
                        </div>}
                        { this.state.status === null &&
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
