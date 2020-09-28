import React, {Component} from 'react';
import Form from "./Common/Form";
import Joi from "joi-browser";
import * as userService from '../services/userService'
import {toast} from "react-toastify";
import auth from "../services/authService";

class RegistrationForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        error: {}
    }
    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }

    render() {
        return (
            <div className='m-4'>
                <div className='m-4'>
                    <div className="row">
                        <div className='col-sm-4 offset-md-3'>
                            <h1 className='mb-4'>Register</h1>
                            <form onSubmit={this.submitHandler}>
                                {this.renderInput('username', 'Username')}
                                {this.renderInput('password', 'Password', 'password')}
                                {this.renderInput('name', 'Name')}
                                {this.renderButton('Register')}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data)
            auth.loginWithJWT(response.headers['x-auth-token'])
            toast.success("Registration Completed")
            window.location = '/'
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const error = {...this.state.error}
                error.username = e.response.data
                this.setState({error});
            }
            toast.warn("Please change your username")
        }
    }
}

export default RegistrationForm;
