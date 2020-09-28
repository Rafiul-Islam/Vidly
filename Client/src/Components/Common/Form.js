import React, {Component} from 'react';
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
    state = {
        data: {},
        error: {}
    }

    submitHandler = (event) => {
        event.preventDefault()

        const error = this.validate()
        this.setState({error: error || {}});
        if (error) return

        this.doSubmit()
    }

    changeHandler = ({target: input}) => {
        const error = {...this.state.error}
        const errorMessage = this.validationProperty(input)
        if (errorMessage) error[input.name] = errorMessage
        else delete error[input.name]

        const data = {...this.state.data}
        data[input.name] = input.value

        this.setState({data, error});
    }

    validationProperty = ({name, value}) => {
        const obj = {[name]: value}
        const schema = {[name]: this.schema[name]}
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null
    }

    validate = () => {
        const options = {abortEarly: false}
        const {error} = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null
        const errors = {}
        for (const item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors
    }

    renderButton = (label) => {
        return <button disabled={this.validate()} type="submit" className="btn btn-primary">{label}</button>
    }
    renderInput = (name, label, type = 'text') => {
        const {data, error} = this.state
        return <Input name={name}
                      label={label}
                      type={type}
                      value={data[name]}
                      error={error[name]}
                      onChange={this.changeHandler}/>
    }
    renderSelect = (name, label, options) => {
        const {data, error} = this.state
        return <Select name={name}
                       label={label}
                       value={data[name]}
                       options={options}
                       error={error[name]}
                       onChange={this.changeHandler}/>
    }
}

export default Form;
