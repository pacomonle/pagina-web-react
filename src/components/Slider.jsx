import React, { Component } from 'react'

export default class Slider extends Component {
    render() {
        return (
            <div>
                <div id="slider" className="slider-big">
                    <h1>{this.props.titulo}</h1>
                    <a href="#" className="btn-white">{this.props.btn}</a>
                </div>

            </div>
        )
    }
}
