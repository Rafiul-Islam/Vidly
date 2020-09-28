import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Movies from "../Movies";
import Customers from "../Customers";
import Rentals from "../Rentals";
import PageNotFound from "../PageNotFound";
import LoginForm from "../LoginForm";
import RegistrationForm from "../RegistrationForm";
import MovieForm from "../MovieForm";
import Logout from "../Logout";
import Profile from "../Profile";
import ProtectedRoute from "../Common/ProtectedRoute";

class Navigations extends Component {
    render() {
        const {user} = this.props
        return (
            <Switch>
                <Route path='/login' component={LoginForm}></Route>
                <Route path='/register' component={RegistrationForm}></Route>
                <Route path='/logout' component={Logout}></Route>
                <Redirect exact from='/' to='/movies'/>
                <ProtectedRoute path='/movies/:id' component={MovieForm}></ProtectedRoute>
                <Route exact path='/movies' render={props => <Movies {...props} user={user}/>}></Route>
                <Route path='/customers' component={Customers}></Route>
                <Route path='/rentals' component={Rentals}></Route>
                <Route path='/profile' component={Profile}></Route>
                <Route path='/page-not-found' component={PageNotFound}></Route>
                <Redirect to='/page-not-found'/>
            </Switch>
        );
    }
}

export default Navigations;
