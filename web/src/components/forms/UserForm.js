import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {TextField, Toggle} from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


import {postUser, putUser} from '../../actions';
import {grey200, grey400, lightGreen600, lightGreen200} from 'material-ui/styles/colors';

import {required} from './ValidationUtil';

const styles = {
    btn: {
        margin: 6,
        marginRight: 12,
        marginLeft: 12,
    },
    std: {
        marginRight: 12,
        marginLeft: 12
    },
    toggle: {
        marginBottom: 6,
    },
    paper: {
        margin: 6,
        // textAlign: 'center',
        display: 'inline-block',
        flex: 1,
        width: '98%'
    },

    block: {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 6,
    },
    thumbOff: {
        backgroundColor: grey400,
    },
    trackOff: {
        backgroundColor: grey200,
    },
    thumbSwitched: {
        backgroundColor: lightGreen600,
    },
    trackSwitched: {
        backgroundColor: lightGreen200,
    },
    labelStyle: {

    },
};
const validate = (value, allValues, props) => {
    const errors = {}
    if(value.password && value.password.length < 5){
        errors['password'] = 'Too Short'

    }
    return errors;
    // now you have access to the props inside the validation function
}

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.renderDelete.bind(this);

        this.state = {
            deleteOpen: false,
        };
    }

    onSubmit(data) {
        let func = postUser;
        if(data.id){
            func = putUser;
        }
        return func(data).then((response) => { // simulate server latency
            let res = response.data.toLowerCase();
            if (res !== 'ok') {
                throw new SubmissionError({
                    password: res.startsWith('pass') ? response.data : '',
                    username: res.startsWith('username') ? response.data : '',
                    _error: response.data,
                });
            }

        });
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.getUserById(this.props.match.params.id);
        }
    }


    renderDelete() {
        if (this.props.initialValues && this.props.initialValues.id) {
            return (

                <div>
                    <RaisedButton style={styles.btn} label="Delete" type="button" secondary={true}
                                  className="RaisedButton"
                                  onClick={() => this.setState({deleteOpen: true})}/>
                    {this.renderDeleteDialog()}
                </div>
            )
        }
    }

    renderDeleteDialog() {
        const actions = [
            <FlatButton
                label="Delete"
                primary={true}
                onClick={this.deleteUser.bind(this)}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.setState({deleteOpen: false})}
            />,
        ];

        return (
            <Dialog
                style={{dir: this.props.dir, direction: this.props.dir}}
                actionsContainerStyle={{textAlign: 'right'}}
                actions={actions}
                modal={true}
                open={this.state.deleteOpen}
                onRequestClose={() => this.setState({deleteOpen: false})}
            >
                Delete User?
            </Dialog>
        );
    }

    deleteUser() {
        this.props.deleteUser(this.props.initialValues.id);
        this.props.synchUsers(true);
        this.props.history.push('/settings/users');
    }

    render() {
        const {handleSubmit, pristine, reset, error, submitting, submitFailed} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div style={{display: 'flex'}}>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Field style={{marginRight: 12, marginLeft: 12, flex: 2}}
                                   name="username"
                                   label="Username"
                                   component={TextField}
                                   floatingLabelText="Username"
                                   hintText="Username"
                                   validate={required}
                                   autoComplete='new-username'
                                   disabled={this.props.initialValues !== null}
                            >
                            </Field>
                            <Field
                                style={{marginRight: 12, marginLeft: 12, marginTop: 24, width: 120, flex: 1}}
                                thumbStyle={styles.thumbOff}
                                trackStyle={styles.trackOff}
                                thumbSwitchedStyle={styles.thumbSwitched}
                                trackSwitchedStyle={styles.trackSwitched}
                                labelStyle={styles.labelStyle}
                                name="admin"
                                component={Toggle}
                                label="Admin"
                                labelPosition="right"
                            />
                            <Field style={{marginRight: 12, marginLeft: 12, flex: 2}}
                                   autoComplete='new-password'
                                   name="password"
                                   label="Password"
                                   component={TextField}
                                   floatingLabelText="Password"
                                   hintText="Password"
                                   type="password"
                                   validate={required}
                            >
                            </Field>
                        </div>
                        <div style={{display: 'flex', marginTop: 30}}>

                            <RaisedButton label="Submit" type="submit" primary={true} style={styles.btn}
                                          disabled={pristine || submitting}/>
                            <RaisedButton label="Cancel" type="button" secondary={true} style={styles.btn}
                                          onClick={reset} containerElement={<Link to={'/settings/users'}/>}/>
                            {this.renderDelete()}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

UserForm = reduxForm({
    form: 'UserForm',
    validate,
    onSubmitSuccess: (result, dispatch, props) => {
        props.synchUsers(true);
        props.history.push('/settings/users')
    },
    onSubmitFail: (errors, dispatch, props) => {
        console.log('onSubmitFail', errors, props);
        //props.reset(props.navigation.key) // <---------
        // props.history.push(getActivityTableUrl(100));
    }
})(UserForm)
UserForm = withRouter(connect(
    state => ({
        initialValues: state.user.selectedUser,
    })
    ,
    {})(UserForm));


export default UserForm;