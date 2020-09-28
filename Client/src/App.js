import React, {Component} from 'react';
import {ToastContainer} from "react-toastify";
import RouterView from "./Components/Router/RouterView";
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import jwtDecode from "jwt-decode";


class App extends Component {
    state = {}
    componentDidMount() {
        try {
            const jwt = localStorage.getItem('token')
            const user = jwtDecode(jwt)
            this.setState({user});
        } catch (e) {

        }
    }
    render() {
        return (
            <div>
                <ToastContainer/>
                <RouterView user={this.state.user}/>
            </div>
        );
    }
}

export default App;
