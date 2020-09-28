import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";

class Routers extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <Link className="navbar-brand" to="/movies">Vidly</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-5" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/movies">Movies</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Customers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                        </li>
                        {!this.props.user &&
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        </>
                        }
                        {this.props.user &&
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">{this.props.user.name}</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Routers;
