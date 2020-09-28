import React, {Component} from 'react';
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import Joi from 'joi-browser'
import Form from "./Common/Form";
import auth from "../services/authService";

class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: ''
        },
        error: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(5).label('Password')
    }

    render() {
        if (auth.getCurrentUser())
            return <Redirect to='/'></Redirect>

        return (
            <div className='m-4'>
                <div className='m-4'>
                    <div className="row">
                        <div className='col-sm-4 offset-md-3'>
                            <h1 className='mb-4'>Login</h1>
                            <form onSubmit={this.submitHandler}>
                                {this.renderInput('username', 'Username')}
                                {this.renderInput('password', 'Password', 'password')}
                                {this.renderButton('Login')}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    doSubmit = async () => {
        try {
            await auth.login(this.state.data)
            toast.success('Successfully login')
            const {state} = this.props.location
            window.location = state ? state.from.pathname : '/'
        } catch (e) {
            if (e.response && e.response.status === 400) {
                const error = {...this.state.error}
                error.username = e.response.data
                this.setState({error});
                toast.warn("Try again")
            }
        }
    }
}

export default LoginForm;
