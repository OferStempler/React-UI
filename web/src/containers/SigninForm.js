import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import {Field, reduxForm} from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {directSignUser, signUser} from '../actions';

import {TextField} from 'redux-form-material-ui';


const style = {
    margin: 12,
};


const paperStyle = {
    height: 300,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const validate = values => {
    const errors = {}
    const requiredFields = ['username', 'password']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

class SigninForm extends Component {


    constructor(props) {
        super(props);
    }

    handleFormSubmit(data) {
        return directSignUser(data);
    }


    render() {
        const {handleSubmit, pristine, reset, error, submitting, submitFailed} = this.props;

        return (
            <div style={{display: 'flex', width: '100%',alignItems: 'center', justifyContent: 'space-around'}}>
                <Paper style={paperStyle} zDepth={1}>
                    {/*<form onSubmit={this.handleFormSubmit.bind(this)}>*/}
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

                        <div style={{color: 'red', margin: 10}}>
                            {this.props.authError}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Field name="username" component={TextField} label="User Name"/>
                        </div>
                        <div>
                            <Field name="password" type="password" component={TextField} label="Password"/>
                        </div>
                        <div>
                            <RaisedButton type="submit" label="Sign In" primary={true} style={style}/>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}

SigninForm = reduxForm({
    form: 'signin', // a unique identifier for this form
    validate,
    onSubmitSuccess: (response, dispatch, props) => {
        dispatch({
            type: 'AUTH_USER',
            payload: response.data
        });
    },
    onSubmitFail: (errors, dispatch, props) => {
        // console.log(errors);
        // console.log(props);

        dispatch({
            type: 'AUTH_ERROR',
            payload: 'Username or Password invalid'
        });
    }
})(SigninForm)


SigninForm = withRouter(connect(
    null
    ,
    {signUser})(SigninForm));
export default SigninForm;

