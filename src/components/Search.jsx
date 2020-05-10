import React, { Component } from 'react'
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";



export default class Search extends Component {


    render() {
        // parametro que viene por la url
        var searched = this.props.match.params.search

        return (
    
         <div id="search">
            <Slider
                titulo={'Busqueda: '+ searched}
                size="slider-small">
            </Slider>
            <div className="center">
                <div id="content">
                    {/*listado de articulos que vendran del api rest de node*/}
                    <Articles
                          search={searched}>
                    </Articles>                      
                </div>
                
                <Sidebar blog="true"></Sidebar>
            </div>


        </div>
            
        )
    }
}
