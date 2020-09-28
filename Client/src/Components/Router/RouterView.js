import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import Routers from "./Routers";
import Navigations from "./Navigations";
import jwtDecode from "jwt-decode";
import auth from "../../services/authService";

class RouterView extends Component {
    state = {}

    componentDidMount() {
        const user = auth.getCurrentUser()
        this.setState({user});
    }

    render() {
        return (
            <BrowserRouter>
                <Routers user={this.props.user}/>
                <Navigations {...this.props} user={this.state.user}/>
            </BrowserRouter>
        );
    }
}

export default RouterView;
