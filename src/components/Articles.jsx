import React, { Component } from 'react'
// importar libreria AJAX
import axios from "axios";
// importar variable Globar - url
import Global from '../Global'
// importar archivo de imagen local
import defaultImages from '../assets/images/images.png'
// importar libreria moment en español
import Monment from 'react-moment'
import 'moment/locale/es'
// importar el link
import {Link} from 'react-router-dom'

export default class Articles extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null
    }

    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;

        if (home === 'true'){
            this.getLastArticles();
        }else if(search && search != null && search !=undefined){
     
             this.getArticlesBySearch(search);

        }else{
            this.getArticles();
        }
        
        
       
        
    }


    getArticlesBySearch = (searched) => {
        console.log('articulos')
        axios.get(this.url+'search/'+ searched)
            .then(res => {
               if (res.data.articles){
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            } /*else{
                this.setState({
                    articles: res.data.articles,
                    status: 'failed'
                });
            }*/
                console.log('estado', this.state);
            }).catch( err =>{
                console.log('error', err.response.data);
                this.setState({
                    articles:[],
                    status: 'success'
                });
            });

    }




  
    getLastArticles = () => {
        console.log('ultimos articulos')
        axios.get(this.url + 'articles/last')
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                console.log('last', this.state);
            }).catch(
                console.log
            )

    }




    getArticles = () => {
        console.log('articulos')
        axios.get(this.url + 'articles')
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                console.log(this.state);
            }).catch(
                console.log
            )

    }


    render() {
        console.log(this.state.status);
        console.log(this.state.articles.length);
        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map((article, index) => {
                return (
                    <article className="article-item article-detail">
                        <div className="image-wrap">
                          { 
                              ( article.image !== null ) ? (
                        <img src={this.url + "get-image/" + article.image} alt={article.title} />
                            ) : ( <img src={defaultImages} alt="{article.title}" />)
                        }
                        </div>

                            <h2 className="subheader">{article.title}</h2>
                                <span className="date">
                                    <Monment locale="es" fromNow>{article.date}</Monment>
                                </span>
                                <Link to={'/blog/article/'+article._id}>Leer mas</Link>
                            <div className="clearfix"></div>
                    </article>
                );
            });
            return (
                        <div id="articles">
                            <h2 className="subheader">LISTADO DE ARTICULOS</h2>
                            {listArticles}
                        </div>
            );
        } else if (this.state.status === 'success' && this.state.articles.length <= 0) {
            return (
                        <div id="articles">
                            <h2 className="subheader">No hay articulos para mostrar</h2>
                            <p>Todavia no hay contenido en esta seccion</p>
                        </div>
            )
        } else {
            return (
                        <div id="articles">
                            <h2 className="subheader" >Cargando.....</h2>
                            <p>Espere mientras carga el contenido</p>
                        </div>
            )
        }
    }
}
