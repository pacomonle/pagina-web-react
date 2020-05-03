import React, { Component } from 'react'

export default class Sidebar extends Component {
    render() {
        return (
            <div>
                <aside id="sidebar">
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puedes hacer esto</h3>
                        <a href="#" className="btn btn-success">Crear artículo</a>
                    </div>

                    <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el artículo que buscas</p>
                        <form>
                            <input type="text" name="search" />
                            <input type="submit" name="submit" value="Buscar" className="btn" />
                        </form>
                    </div>
                </aside>

                <div className="clearfix"></div>
            </div>
        )
    }
}
