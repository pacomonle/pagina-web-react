import React, { Component } from 'react'
import Slider from "./Slider";
import Sidebar from "./Sidebar";


export default class Blog extends Component {
    render() {
        
        return (
            <div id="blog">
                <Slider
                    titulo="Blog"
                    size="slider-small">
                </Slider>
                <div className="center">
                    <div id="content">
                       {/*listado de articulos que vendran del api rest de node*/}
                    </div>
                    <Sidebar blog="true"></Sidebar>
                </div>


            </div>

        )
    }
}
