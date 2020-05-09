import React, { Component } from 'react'
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import Articles from "./Articles";



export default class Blog extends Component {


    render(){

        return(
            <div id="blog">
                <Slider
                    titulo="Blog"
                    size="slider-small">
                </Slider>
                <div className="center">
                    <div id="content">
                        {/*listado de articulos que vendran del api rest de node*/}
                        <Articles></Articles>                      
                    </div>
                    
                    <Sidebar blog="true"></Sidebar>
                </div>


            </div>

        )
    }
}
